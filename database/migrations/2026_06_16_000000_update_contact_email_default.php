<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Update the seeded placeholder contact email to the real address.
     * Only replaces the old default so a value already customised via the
     * admin Site Settings page is left untouched.
     */
    public function up(): void
    {
        // Replace the old seeded default only.
        DB::table('site_settings')
            ->where('key', 'contact_email')
            ->where('value', 'info@fasthomecashoffers.com')
            ->update(['value' => 'sellnow@fasthomecashoffers.com']);

        // Create the row if it was never seeded; leave any custom value alone.
        if (! DB::table('site_settings')->where('key', 'contact_email')->exists()) {
            DB::table('site_settings')->insert([
                'key' => 'contact_email',
                'value' => 'sellnow@fasthomecashoffers.com',
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('site_settings')
            ->where('key', 'contact_email')
            ->where('value', 'sellnow@fasthomecashoffers.com')
            ->update(['value' => 'info@fasthomecashoffers.com']);
    }
};
