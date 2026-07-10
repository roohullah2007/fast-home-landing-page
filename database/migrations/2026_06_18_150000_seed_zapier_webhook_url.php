<?php

use App\Models\SiteSetting;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Seed the Zapier webhook URL into site_settings so every form forwards
     * submissions on production.
     *
     * The server's .env is not deployed via git, so the webhook can't be set
     * there from here. AppServiceProvider applies lead_webhook_url and
     * contact_webhook_url from site_settings onto config() at runtime, so
     * seeding them here makes the lead, contact, FAQ and newsletter forms all
     * forward to Zapier after deploy. Only fills empty values, so an
     * admin-entered URL in Settings is never overwritten.
     */
    private string $webhook = 'https://hooks.zapier.com/hooks/catch/14072040/4onvv0l/';

    public function up(): void
    {
        foreach (['lead_webhook_url', 'contact_webhook_url'] as $key) {
            $existing = SiteSetting::get($key);
            if (empty($existing)) {
                SiteSetting::set($key, $this->webhook);
            }
        }
    }

    public function down(): void
    {
        foreach (['lead_webhook_url', 'contact_webhook_url'] as $key) {
            if (SiteSetting::get($key) === $this->webhook) {
                SiteSetting::set($key, '');
            }
        }
    }
};
