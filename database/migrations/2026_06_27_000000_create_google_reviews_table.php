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
        Schema::create('google_reviews', function (Blueprint $table) {
            $table->id();
            // Stable dedupe key. Legacy Places review objects have no id of their
            // own, so we synthesise one (md5 of author name + unix time) and key
            // updateOrCreate on it so re-downloading never duplicates reviews.
            $table->string('external_id')->unique()->nullable();
            $table->string('author_name');
            $table->string('author_photo_url')->nullable();
            $table->string('author_url')->nullable();
            $table->unsignedTinyInteger('rating')->default(5);
            $table->text('text')->nullable();
            $table->string('relative_time_description')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('google_reviews');
    }
};
