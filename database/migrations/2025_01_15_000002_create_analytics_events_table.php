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
        Schema::create('analytics_events', function (Blueprint $table) {
            $table->id();
            $table->string('event_type'); // page_view, button_click, form_submission, etc.
            $table->string('event_name'); // specific event name
            $table->string('page_url');
            $table->string('page_title')->nullable();
            $table->string('referrer')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('session_id')->nullable();
            $table->json('event_data')->nullable(); // Additional event-specific data
            $table->timestamp('created_at');
            
            $table->index(['event_type', 'created_at']);
            $table->index(['page_url', 'created_at']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analytics_events');
    }
};
