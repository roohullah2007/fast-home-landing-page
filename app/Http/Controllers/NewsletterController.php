<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'utm' => 'nullable|array',
            // Honeypot field
            'website' => 'nullable|max:0',
        ]);

        $this->sendToWebhook($request->email, $request->input('utm') ?: []);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for subscribing!',
        ]);
    }

    private function sendToWebhook($email, $utm)
    {
        // Newsletter has no dedicated webhook variable. Use the shared Zapier
        // default, falling back to the contact/lead webhooks (which are
        // admin-manageable via the database) so a single configured webhook
        // covers every form on production.
        $webhookUrl = config('services.zapier_webhook_url')
            ?: config('services.contact_webhook_url')
            ?: config('services.lead_webhook_url');

        if (!$webhookUrl) {
            return;
        }

        $utm = is_array($utm) ? $utm : [];

        try {
            $data = [
                'email' => $email,
                'source' => 'newsletter',
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
                Log::info('Newsletter subscription sent to webhook successfully', ['email' => $email]);
            } else {
                Log::error('Failed to send newsletter subscription to webhook', [
                    'email' => $email,
                    'http_code' => $httpCode,
                    'response' => $response,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error sending newsletter subscription to webhook: ' . $e->getMessage(), ['email' => $email]);
        }
    }
}
