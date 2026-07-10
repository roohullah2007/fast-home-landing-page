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
        Schema::create('spam_logs', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address', 45);
            $table->string('user_agent')->nullable();
            $table->string('form_type'); // 'lead' or 'contact'
            $table->string('reason'); // 'rate_limit', 'honeypot', 'keywords', etc.
            $table->json('data')->nullable(); // Additional data about the spam attempt
            $table->timestamps();
            
            $table->index(['ip_address', 'created_at']);
            $table->index(['form_type', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spam_logs');
    }
};
