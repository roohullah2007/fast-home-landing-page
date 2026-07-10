<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Services\RecaptchaService;
use App\Services\ResendMailService;
use App\Services\SpamProtectionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    protected $recaptchaService;
    protected $spamProtectionService;
    protected $mailService;

    public function __construct(
        RecaptchaService $recaptchaService,
        SpamProtectionService $spamProtectionService,
        ResendMailService $mailService
    ) {
        $this->recaptchaService = $recaptchaService;
        $this->spamProtectionService = $spamProtectionService;
        $this->mailService = $mailService;
    }

    public function store(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string|max:2000',
            'address' => 'nullable|string|max:500',
            'isOwner' => 'nullable|string|in:yes,no',
            'isListed' => 'nullable|string|in:yes,no',
            'bestTime' => 'nullable|string|in:morning,afternoon,evening,anytime',
            'contactMethod' => 'nullable|string|in:phone,email,text',
            'hearAbout' => 'nullable|string|in:google,friend,facebook,letter,sign,other',
            'agreeToTerms' => 'required|accepted',
            'g-recaptcha-response' => 'nullable|string',
            // Marketing attribution (utm_source, utm_medium, gclid, etc.)
            'utm' => 'nullable|array',
            // Honeypot fields
            'website' => 'nullable|max:0',
            'url' => 'nullable|max:0',
            'company' => 'nullable|max:0',
        ]);

        // Check spam protection
        if ($this->spamProtectionService->isSpam($request, 'contact')) {
            return response()->json([
                'success' => false,
                'message' => 'Your submission appears to be spam. Please try again later.'
            ], 422);
        }

        // Verify reCAPTCHA if enabled
        if ($this->recaptchaService->isEnabled()) {
            $recaptchaResponse = $request->input('g-recaptcha-response');
            if (!$this->recaptchaService->verify($recaptchaResponse)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please complete the reCAPTCHA verification.'
                ], 422);
            }
        }

        try {
            // Create contact message record
            $contact = ContactMessage::create([
                'full_name' => $request->fullName,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'message' => $request->message,
                'is_owner' => $request->isOwner,
                'is_listed' => $request->isListed,
                'best_time' => $request->bestTime,
                'contact_method' => $request->contactMethod,
                'hear_about' => $request->hearAbout,
                'status' => 'new',
                'additional_data' => array_merge(
                    $request->only(['agreeToTerms']),
                    ['utm' => $request->input('utm') ?: null]
                )
            ]);

            // Send to external webhook if configured
            $this->sendToWebhook($contact);

            // Send notification email if configured
            $this->sendNotificationEmail($contact);

            return response()->json([
                'success' => true,
                'message' => 'Thank you! Your message has been sent successfully. We will get back to you shortly.',
                'contact_id' => $contact->id,
                'redirect_url' => route('thank-you', ['type' => 'contact'])
            ]);

        } catch (\Exception $e) {
            Log::error('Error creating contact message: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'There was an error sending your message. Please try again.'
            ], 500);
        }
    }

    private function sendToWebhook($contact)
    {
        $webhookUrl = config('services.contact_webhook_url');
        
        if (!$webhookUrl) {
            return;
        }

        try {
            $utm = $contact->additional_data['utm'] ?? [];
            $utm = is_array($utm) ? $utm : [];

            $data = [
                'name' => $contact->full_name,
                'email' => $contact->email,
                'phone' => $contact->phone,
                'address' => $contact->address,
                'message' => $contact->message,
                'is_owner' => $contact->is_owner,
                'is_listed' => $contact->is_listed,
                'best_time' => $contact->best_time,
                'contact_method' => $contact->contact_method,
                'hear_about' => $contact->hear_about,
                'source' => 'contact_form',
                'submitted_at' => $contact->created_at->toISOString(),
                'utm_source' => $utm['utm_source'] ?? null,
                'utm_medium' => $utm['utm_medium'] ?? null,
                'utm_campaign' => $utm['utm_campaign'] ?? null,
                'utm_term' => $utm['utm_term'] ?? null,
                'utm_content' => $utm['utm_content'] ?? null,
                'gclid' => $utm['gclid'] ?? null,
                'fbclid' => $utm['fbclid'] ?? null,
                'msclkid' => $utm['msclkid'] ?? null,
                'landing_page' => $utm['landing_page'] ?? null,
                'referrer' => $utm['referrer'] ?? null,
            ];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $webhookUrl);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($httpCode >= 200 && $httpCode < 300) {
                Log::info('Contact message sent to webhook successfully', ['contact_id' => $contact->id]);
            } else {
                Log::error('Failed to send contact message to webhook', [
                    'contact_id' => $contact->id,
                    'http_code' => $httpCode,
                    'response' => $response
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error sending contact message to webhook: ' . $e->getMessage(), ['contact_id' => $contact->id]);
        }
    }

    private function sendNotificationEmail($contact)
    {
        // Notify the admin about the new contact message.
        $adminEmail = config('services.admin_email');
        if ($adminEmail) {
            $this->mailService->sendView(
                $adminEmail,
                'New Contact Message: '.$contact->full_name,
                'emails.contact.admin',
                ['contact' => $contact],
                ['reply_to' => $contact->email]
            );
        }

        // Send a confirmation to the person who submitted the form.
        if ($contact->email) {
            $this->mailService->sendView(
                $contact->email,
                'We received your message',
                'emails.contact.user',
                ['contact' => $contact]
            );
        }
    }
}
