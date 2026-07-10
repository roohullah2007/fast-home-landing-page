<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Services\RecaptchaService;
use App\Services\ResendMailService;
use App\Services\SpamProtectionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LeadController extends Controller
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
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:2',
            'zipCode' => 'nullable|string|max:10',
            'isListed' => 'nullable|string|in:yes,no',
            'isOwner' => 'nullable|string|in:yes,no',
            'address' => 'nullable|string|max:500',
            'g-recaptcha-response' => 'nullable|string',
            // Marketing attribution (utm_source, utm_medium, gclid, etc.)
            'utm' => 'nullable|array',
            // Honeypot fields
            'website' => 'nullable|max:0',
            'url' => 'nullable|max:0',
            'company' => 'nullable|max:0',
        ]);

        // Check spam protection
        if ($this->spamProtectionService->isSpam($request, 'lead')) {
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
            // Create lead record
            $lead = Lead::create([
                'full_name' => $request->fullName,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'zip_code' => $request->zipCode,
                'is_listed' => $request->isListed,
                'is_owner' => $request->isOwner,
                'source' => 'lead_capture',
                'status' => 'new',
                'additional_data' => array_merge(
                    $request->only(['robotCheck']),
                    ['utm' => $request->input('utm') ?: null]
                )
            ]);

            // Send to external webhook if configured
            $this->sendToWebhook($lead);

            // Send notification email if configured
            $this->sendNotificationEmail($lead);

            // Qualifying leads (property owner AND listed on the market) go to the
            // confirmed page; everyone else goes to the standard thank-you page.
            $qualified = $request->isOwner === 'yes' && $request->isListed === 'yes';
            $redirectUrl = $qualified
                ? route('confirmed')
                : route('thank-you', ['type' => 'lead']);

            return response()->json([
                'success' => true,
                'message' => 'Thank you! We have received your information and will contact you soon.',
                'lead_id' => $lead->id,
                'redirect_url' => $redirectUrl,
            ]);

        } catch (\Exception $e) {
            Log::error('Error creating lead: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'There was an error submitting your information. Please try again.'
            ], 500);
        }
    }

    private function sendToWebhook($lead)
    {
        $webhookUrl = config('services.lead_webhook_url');
        
        if (!$webhookUrl) {
            return;
        }

        try {
            $utm = $lead->additional_data['utm'] ?? [];
            $utm = is_array($utm) ? $utm : [];

            $data = [
                'name' => $lead->full_name,
                'email' => $lead->email,
                'phone' => $lead->phone,
                'address' => $lead->address,
                'city' => $lead->city,
                'state' => $lead->state,
                'zip_code' => $lead->zip_code,
                'is_listed' => $lead->is_listed,
                'is_owner' => $lead->is_owner,
                'source' => $lead->source,
                'submitted_at' => $lead->created_at->toISOString(),
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
                Log::info('Lead sent to webhook successfully', ['lead_id' => $lead->id]);
            } else {
                Log::error('Failed to send lead to webhook', [
                    'lead_id' => $lead->id,
                    'http_code' => $httpCode,
                    'response' => $response
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error sending lead to webhook: ' . $e->getMessage(), ['lead_id' => $lead->id]);
        }
    }

    private function sendNotificationEmail($lead)
    {
        // Notify the admin about the new lead.
        $adminEmail = config('services.admin_email');
        if ($adminEmail) {
            $this->mailService->sendView(
                $adminEmail,
                'New Cash Offer Lead: '.$lead->full_name,
                'emails.lead.admin',
                ['lead' => $lead],
                ['reply_to' => $lead->email]
            );
        }

        // Send a confirmation to the person who submitted the form.
        if ($lead->email) {
            $this->mailService->sendView(
                $lead->email,
                'We received your cash offer request',
                'emails.lead.user',
                ['lead' => $lead]
            );
        }
    }
}
