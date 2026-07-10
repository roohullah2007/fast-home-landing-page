<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\View;

/**
 * Lightweight wrapper around the Resend HTTP API (https://resend.com/docs/api-reference/emails/send-email).
 *
 * Sending happens over the REST API directly so the app does not depend on the
 * resend-php SMTP transport package. All failures are swallowed and logged so a
 * mail problem never breaks a form submission or registration.
 */
class ResendMailService
{
    protected const ENDPOINT = 'https://api.resend.com/emails';

    /**
     * Whether Resend is configured (an API key is present).
     */
    public function isEnabled(): bool
    {
        return ! empty(config('services.resend.key'));
    }

    /**
     * Render a Blade view and send it as an HTML email via Resend.
     *
     * @param  string|array  $to       Recipient address(es).
     * @param  string        $subject  Email subject line.
     * @param  string        $view     Blade view name, e.g. "emails.lead.admin".
     * @param  array         $data     Data passed to the view.
     * @param  array         $options  Optional overrides: from, reply_to, cc, bcc.
     */
    public function sendView($to, string $subject, string $view, array $data = [], array $options = []): bool
    {
        try {
            $html = View::make($view, $data)->render();
        } catch (\Throwable $e) {
            Log::error('ResendMailService: failed to render view '.$view.': '.$e->getMessage());

            return false;
        }

        return $this->send($to, $subject, $html, $options);
    }

    /**
     * Send a raw HTML email via the Resend API.
     *
     * @param  string|array  $to
     */
    public function send($to, string $subject, string $html, array $options = []): bool
    {
        if (! $this->isEnabled()) {
            Log::warning('ResendMailService: RESEND_KEY not configured, skipping email.', [
                'subject' => $subject,
            ]);

            return false;
        }

        $fromName = $options['from_name'] ?? config('mail.from.name', config('app.name'));
        $fromAddress = $options['from'] ?? config('services.resend.from', config('mail.from.address'));

        $payload = [
            'from' => $fromName ? sprintf('%s <%s>', $fromName, $fromAddress) : $fromAddress,
            'to' => (array) $to,
            'subject' => $subject,
            'html' => $html,
        ];

        if (! empty($options['reply_to'])) {
            $payload['reply_to'] = $options['reply_to'];
        }
        if (! empty($options['cc'])) {
            $payload['cc'] = (array) $options['cc'];
        }
        if (! empty($options['bcc'])) {
            $payload['bcc'] = (array) $options['bcc'];
        }

        try {
            $response = Http::withToken(config('services.resend.key'))
                ->acceptJson()
                ->timeout(15)
                ->post(self::ENDPOINT, $payload);

            if ($response->successful()) {
                Log::info('ResendMailService: email sent', [
                    'to' => $payload['to'],
                    'subject' => $subject,
                    'id' => $response->json('id'),
                ]);

                return true;
            }

            Log::error('ResendMailService: Resend API returned an error', [
                'to' => $payload['to'],
                'subject' => $subject,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        } catch (\Throwable $e) {
            Log::error('ResendMailService: exception while sending email: '.$e->getMessage(), [
                'to' => $payload['to'],
                'subject' => $subject,
            ]);
        }

        return false;
    }
}
