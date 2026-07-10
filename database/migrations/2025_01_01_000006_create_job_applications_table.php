<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vacancy_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('message')->nullable();
            $table->string('resume_path')->nullable();
            $table->enum('status', ['new', 'reviewed', 'interview', 'hired', 'rejected'])->default('new');
            $table->json('additional_data')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['email', 'phone']);
            $table->index('status');
            $table->index('vacancy_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
