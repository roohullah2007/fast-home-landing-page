<?php

namespace App\Providers;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Map of site_settings keys -> config paths they override.
     */
    private const SETTING_CONFIG_MAP = [
        'google_places_api_key' => 'services.google.places.api_key',
        'google_recaptcha_site_key' => 'services.google.recaptcha.site_key',
        'google_recaptcha_secret_key' => 'services.google.recaptcha.secret_key',
        'lead_webhook_url' => 'services.lead_webhook_url',
        'contact_webhook_url' => 'services.contact_webhook_url',
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Built assets live in public/app-assets (not the default public/build);
        // see vite.config.js for why. The PHP @vite directive must match.
        Vite::useBuildDirectory('app-assets');

        Vite::prefetch(concurrency: 3);

        $this->applyDatabaseSettings();
    }

    /**
     * Apply admin-managed settings stored in the database on top of config().
     *
     * The admin Settings page saves API keys and webhook URLs to the
     * site_settings table (not .env). Applying them here — at runtime, on every
     * request — means saved values take effect immediately and survive a cached
     * config, while .env values continue to serve as defaults for any key that
     * has not been overridden.
     */
    private function applyDatabaseSettings(): void
    {
        try {
            if (! Schema::hasTable('site_settings')) {
                return;
            }

            $stored = SiteSetting::whereIn('key', array_keys(self::SETTING_CONFIG_MAP))
                ->pluck('value', 'key');

            foreach (self::SETTING_CONFIG_MAP as $key => $configPath) {
                $value = $stored->get($key);

                // Only override when an actual value is set; empty/cleared
                // settings fall through to the .env/config default.
                if ($value !== null && $value !== '') {
                    config([$configPath => $value]);
                }
            }
        } catch (\Throwable $e) {
            // The database/table may be unavailable during early bootstrap
            // (e.g. before migrations run). Silently fall back to config defaults.
        }
    }
}
