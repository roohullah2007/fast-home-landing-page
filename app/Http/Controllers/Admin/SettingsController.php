<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Admin-managed settings keys. These are stored in the site_settings
     * database table and applied to config() at runtime (see AppServiceProvider),
     * so they persist reliably and take effect immediately — without rewriting
     * .env or rebuilding the config cache inside a live request.
     */
    private const SETTING_KEYS = [
        'google_places_api_key',
        'google_recaptcha_site_key',
        'google_recaptcha_secret_key',
        'lead_webhook_url',
        'contact_webhook_url',
    ];

    public function index()
    {
        // config() already reflects any database overrides applied during boot,
        // so reading from config returns the saved value when present and the
        // .env default otherwise.
        return Inertia::render('Admin/Settings', [
            'settings' => [
                'google_places_api_key' => config('services.google.places.api_key'),
                'google_recaptcha_site_key' => config('services.google.recaptcha.site_key'),
                'google_recaptcha_secret_key' => config('services.google.recaptcha.secret_key'),
                'lead_webhook_url' => config('services.lead_webhook_url'),
                'contact_webhook_url' => config('services.contact_webhook_url'),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'google_places_api_key' => 'nullable|string',
            'google_recaptcha_site_key' => 'nullable|string',
            'google_recaptcha_secret_key' => 'nullable|string',
            'lead_webhook_url' => 'nullable|url',
            'contact_webhook_url' => 'nullable|url',
        ]);

        foreach (self::SETTING_KEYS as $key) {
            // Store an empty string when a field is cleared; AppServiceProvider
            // treats empty values as "unset" and falls back to the .env default.
            SiteSetting::set($key, $validated[$key] ?? '');
        }

        // Settings are read from the database on every request, so the change is
        // live immediately. Clear the cached settings array (used by warm-up and
        // shared props) so any cached reads also pick up the new values.
        Cache::forget('settings:all');

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }

    public function testGooglePlaces(Request $request)
    {
        $apiKey = $request->input('api_key');

        if (! $apiKey) {
            return response()->json(['valid' => false, 'error' => 'API key is required']);
        }

        try {
            // Use the HTTP client (Guzzle) rather than file_get_contents, which is
            // silently disabled on many hosts (allow_url_fopen=Off) and would make
            // a perfectly valid key look broken.
            $response = Http::timeout(10)->get(
                'https://maps.googleapis.com/maps/api/place/autocomplete/json',
                ['input' => 'test', 'key' => $apiKey]
            );

            $data = $response->json();

            if (isset($data['status'])) {
                if (in_array($data['status'], ['OK', 'ZERO_RESULTS'], true)) {
                    return response()->json(['valid' => true, 'status' => $data['status']]);
                }

                return response()->json([
                    'valid' => false,
                    'error' => $data['status'],
                    'error_message' => $data['error_message'] ?? '',
                ]);
            }

            return response()->json(['valid' => false, 'error' => 'Invalid response from Google Places API']);
        } catch (\Throwable $e) {
            return response()->json(['valid' => false, 'error' => 'Failed to connect to Google Places API']);
        }
    }
}
