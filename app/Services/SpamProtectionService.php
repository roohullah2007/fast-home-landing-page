<?php

namespace App\Services;

use App\Models\SpamLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SpamProtectionService
{
    /**
     * Honeypot field names that should remain empty
     */
    protected $honeypotFields = ['website', 'url', 'company'];

    /**
     * Blocked keywords in messages/content
     */
    // Note: real-estate sellers legitimately mention "loan", "credit" and
    // "investment", so those words are intentionally NOT blocked here.
    protected $blockedKeywords = [
        'viagra', 'cialis', 'casino', 'poker', 'gambling',
        'seo service', 'marketing service', 'crypto', 'bitcoin',
        'make money fast', 'work from home', 'guaranteed income'
    ];

    /**
     * Check if the request appears to be spam
     *
     * @param Request $request
     * @param string $formType
     * @return bool
     */
    public function isSpam(Request $request, $formType = 'unknown')
    {
        // Check rate limiting
        if ($this->isRateLimited($request)) {
            SpamLog::logSpamAttempt($formType, 'rate_limit', [
                'ip' => $request->ip(),
                'attempts' => Cache::get('form_submissions:' . $request->ip(), 0)
            ]);
            Log::warning('Rate limit exceeded', ['ip' => $request->ip()]);
            return true;
        }

        // Check honeypot fields
        if ($this->hasHoneypotContent($request)) {
            SpamLog::logSpamAttempt($formType, 'honeypot', [
                'ip' => $request->ip(),
                'filled_fields' => array_filter([
                    'website' => $request->get('website'),
                    'url' => $request->get('url'),
                    'company' => $request->get('company')
                ])
            ]);
            Log::warning('Honeypot field filled', ['ip' => $request->ip()]);
            return true;
        }

        // Check for blocked keywords
        if ($this->hasBlockedKeywords($request)) {
            SpamLog::logSpamAttempt($formType, 'blocked_keywords', [
                'ip' => $request->ip(),
                'content_sample' => substr($request->get('message', ''), 0, 100)
            ]);
            Log::warning('Blocked keywords detected', ['ip' => $request->ip()]);
            return true;
        }

        // Check submission speed (too fast indicates bot)
        if ($this->submittedTooFast($request)) {
            SpamLog::logSpamAttempt($formType, 'too_fast', [
                'ip' => $request->ip(),
                'time_taken' => $this->getTimeTaken($request)
            ]);
            Log::warning('Form submitted too fast', ['ip' => $request->ip()]);
            return true;
        }

        // Check for suspicious patterns
        if ($this->hasSuspiciousPatterns($request)) {
            SpamLog::logSpamAttempt($formType, 'suspicious_patterns', [
                'ip' => $request->ip(),
                'name' => $request->get('fullName', ''),
                'email' => $request->get('email', '')
            ]);
            Log::warning('Suspicious patterns detected', ['ip' => $request->ip()]);
            return true;
        }

        return false;
    }

    /**
     * Check if IP is rate limited
     *
     * @param Request $request
     * @return bool
     */
    protected function isRateLimited(Request $request)
    {
        $ip = $request->ip();
        $key = 'form_submissions:' . $ip;
        $maxAttempts = 5; // Max 5 submissions per hour
        $decayMinutes = 60;

        $attempts = Cache::get($key, 0);
        
        if ($attempts >= $maxAttempts) {
            return true;
        }

        Cache::put($key, $attempts + 1, now()->addMinutes($decayMinutes));
        return false;
    }

    /**
     * Check if honeypot fields have content
     *
     * @param Request $request
     * @return bool
     */
    protected function hasHoneypotContent(Request $request)
    {
        foreach ($this->honeypotFields as $field) {
            if ($request->filled($field)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check for blocked keywords in content
     *
     * @param Request $request
     * @return bool
     */
    protected function hasBlockedKeywords(Request $request)
    {
        $content = strtolower(implode(' ', [
            $request->get('message', ''),
            $request->get('fullName', ''),
            $request->get('email', ''),
        ]));

        foreach ($this->blockedKeywords as $keyword) {
            if (strpos($content, strtolower($keyword)) !== false) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if form was submitted too fast
     *
     * @param Request $request
     * @return bool
     */
    protected function submittedTooFast(Request $request)
    {
        $sessionStart = $request->session()->get('form_start_time');
        
        if (!$sessionStart) {
            // If no start time recorded, allow it but record current time
            $request->session()->put('form_start_time', now()->timestamp);
            return false;
        }

        $minTime = 10; // Minimum 10 seconds to fill form
        $timeTaken = now()->timestamp - $sessionStart;

        return $timeTaken < $minTime;
    }

    /**
     * Get time taken to fill form
     *
     * @param Request $request
     * @return int
     */
    protected function getTimeTaken(Request $request)
    {
        $sessionStart = $request->session()->get('form_start_time');
        return $sessionStart ? now()->timestamp - $sessionStart : 0;
    }

    /**
     * Check for suspicious patterns
     *
     * @param Request $request
     * @return bool
     */
    protected function hasSuspiciousPatterns(Request $request)
    {
        $name = $request->get('fullName', '');
        $email = $request->get('email', '');
        $phone = $request->get('phone', '');

        // Check for obviously fake data
        if (strlen($name) < 2 || preg_match('/[0-9]/', $name)) {
            return true;
        }

        // Check for suspicious email patterns
        if (preg_match('/[0-9]{5,}@/', $email)) {
            return true;
        }

        // Check for all fields being identical
        if ($name === $email || $name === $phone) {
            return true;
        }

        // Check for excessive special characters
        if (preg_match_all('/[^a-zA-Z0-9\s@._-]/', $name . $email) > 3) {
            return true;
        }

        return false;
    }

    /**
     * Record form start time for timing validation
     *
     * @param Request $request
     */
    public function recordFormStart(Request $request)
    {
        $request->session()->put('form_start_time', now()->timestamp);
    }
}
