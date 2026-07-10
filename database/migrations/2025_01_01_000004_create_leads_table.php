<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state', 2)->nullable();
            $table->string('zip_code', 10)->nullable();
            $table->enum('is_listed', ['yes', 'no'])->nullable();
            $table->enum('is_owner', ['yes', 'no'])->nullable();
            $table->string('source')->default('lead_capture'); // lead_capture, contact_form, etc.
            $table->text('message')->nullable();
            $table->json('additional_data')->nullable();
            $table->enum('status', ['new', 'contacted', 'qualified', 'converted', 'closed'])->default('new');
            $table->timestamps();
            
            // Indexes
            $table->index(['email', 'phone']);
            $table->index('status');
            $table->index('source');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
