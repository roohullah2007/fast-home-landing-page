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
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('department')->nullable();
            $table->text('description');
            $table->text('requirements')->nullable();
            $table->text('responsibilities')->nullable();
            $table->string('location')->nullable();
            $table->string('employment_type')->default('full-time'); // full-time, part-time, contract
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->string('experience_level')->nullable(); // entry, mid, senior
            $table->boolean('is_active')->default(true);
            $table->string('podio_webhook_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
