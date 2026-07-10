<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->text('address')->nullable();
            $table->text('message');
            $table->enum('is_owner', ['yes', 'no'])->nullable();
            $table->enum('is_listed', ['yes', 'no'])->nullable();
            $table->enum('best_time', ['morning', 'afternoon', 'evening', 'anytime'])->nullable();
            $table->enum('contact_method', ['phone', 'email', 'text'])->nullable();
            $table->enum('hear_about', ['google', 'friend', 'facebook', 'letter', 'sign', 'other'])->nullable();
            $table->enum('status', ['new', 'replied', 'closed'])->default('new');
            $table->json('additional_data')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['email', 'phone']);
            $table->index('status');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
