<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RecaptchaService
{
    protected $secretKey;
    protected $siteKey;

    public function __construct()
    {
        $this->secretKey = config('services.google.recaptcha.secret_key');
        $this->siteKey = config('services.google.recaptcha.site_key');
    }

    /**
     * Verify reCAPTCHA response
     *
     * @param string $response
     * @param string|null $remoteIp
     * @return bool
     */
    public function verify($response, $remoteIp = null)
    {
        // If reCAPTCHA is not configured, allow the request to proceed
        if (empty($this->secretKey)) {
            Log::warning('reCAPTCHA secret key not configured, skipping verification');
            return true;
        }

        if (empty($response)) {
            return false;
        }

        try {
            $verification = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => $this->secretKey,
                'response' => $response,
                'remoteip' => $remoteIp ?? request()->ip(),
            ]);

            $result = $verification->json();

            if (!$result['success']) {
                Log::warning('reCAPTCHA verification failed', [
                    'error_codes' => $result['error-codes'] ?? [],
                    'ip' => $remoteIp ?? request()->ip()
                ]);
                return false;
            }

            // Optional: Check score for reCAPTCHA v3 (if using v3)
            if (isset($result['score'])) {
                $minScore = config('services.google.recaptcha.min_score', 0.5);
                if ($result['score'] < $minScore) {
                    Log::warning('reCAPTCHA score too low', [
                        'score' => $result['score'],
                        'min_score' => $minScore,
                        'ip' => $remoteIp ?? request()->ip()
                    ]);
                    return false;
                }
            }

            return true;

        } catch (\Exception $e) {
            Log::error('reCAPTCHA verification error: ' . $e->getMessage());
            // In case of error, allow the request (fail open)
            return true;
        }
    }

    /**
     * Check if reCAPTCHA is enabled
     *
     * @return bool
     */
    public function isEnabled()
    {
        return !empty($this->secretKey) && !empty($this->siteKey);
    }

    /**
     * Get the site key for frontend
     *
     * @return string|null
     */
    public function getSiteKey()
    {
        return $this->siteKey;
    }
}
