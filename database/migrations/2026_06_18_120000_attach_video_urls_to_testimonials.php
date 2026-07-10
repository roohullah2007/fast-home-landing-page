<?php

use App\Models\Testimonial;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Attach the local testimonial videos to the corresponding records.
     *
     * The `video_url` column was previously missing from the model's $fillable,
     * so seeded video URLs never persisted on production. This runs on deploy
     * (php artisan migrate --force) and idempotently backfills the real video
     * paths onto the existing records — or creates them if they don't exist —
     * so the video testimonials show up on live without a manual db:seed.
     */
    private array $videos = [
        [
            'name' => 'Jennifer Martinez',
            'location' => 'Austin, TX',
            'content' => 'Fast Home Cash Offers saved me from foreclosure. They made me a fair offer within 24 hours and closed in just 2 weeks. The entire team was professional, compassionate, and made a stressful situation so much easier. I cannot recommend them enough!',
            'video_url' => '/videos/testimonial-1.mp4',
        ],
        [
            'name' => 'Robert Kim',
            'location' => 'Dallas, TX',
            'content' => 'After my divorce, I needed to sell our house quickly. Fast Home Cash Offers bought it as-is, no repairs needed. The process was transparent, and they closed exactly when they said they would. Highly recommend!',
            'video_url' => '/videos/testimonial-2.mp4',
        ],
        [
            'name' => 'Linda Davis',
            'location' => 'Fort Worth, TX',
            'content' => 'As a landlord, I was tired of dealing with problem tenants. Fast Home Cash Offers bought all three of my rental properties. The process was smooth and professional from start to finish.',
            'video_url' => '/videos/testimonial-3.mp4',
        ],
    ];

    public function up(): void
    {
        foreach ($this->videos as $video) {
            $testimonial = Testimonial::firstOrNew(['name' => $video['name']]);

            // Always (re)attach the video and ensure it's visible.
            $testimonial->video_url = $video['video_url'];
            $testimonial->is_active = true;

            // Only populate required fields when creating a brand-new record,
            // so existing/admin-edited copy is preserved.
            if (! $testimonial->exists) {
                $testimonial->location = $video['location'];
                $testimonial->content = $video['content'];
                $testimonial->rating = 5;
                $testimonial->is_featured = true;
            }

            $testimonial->save();
        }
    }

    public function down(): void
    {
        Testimonial::whereIn('video_url', array_column($this->videos, 'video_url'))
            ->update(['video_url' => null]);
    }
};
