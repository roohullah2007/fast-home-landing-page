<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Insert default contact information
        $settings = [
            ['key' => 'contact_phone', 'value' => '(888) 555-1234'],
            ['key' => 'contact_email', 'value' => 'info@fasthomecashoffers.com'],
            ['key' => 'office_address', 'value' => '123 Main Street, Your City, Your State, 12345'],
        ];

        foreach ($settings as $setting) {
            \DB::table('site_settings')->insertOrIgnore($setting);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        \DB::table('site_settings')->whereIn('key', [
            'contact_phone',
            'contact_email',
            'office_address',
        ])->delete();
    }
};
