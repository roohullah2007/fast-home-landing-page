<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Jennifer Martinez',
                'location' => 'Austin, TX',
                'content' => 'Fast Home Cash Offers saved me from foreclosure. They made me a fair offer within 24 hours and closed in just 2 weeks. The entire team was professional, compassionate, and made a stressful situation so much easier. I cannot recommend them enough!',
                'video_url' => '/videos/testimonial-1.mp4',
                'image_url' => '/images/testimonials/jennifer-martinez.jpg',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'testimonial_date' => '2024-12-15',
            ],
            [
                'name' => 'Robert Kim',
                'location' => 'Dallas, TX',
                'content' => 'After my divorce, I needed to sell our house quickly. Fast Home Cash Offers bought it as-is, no repairs needed. The process was transparent, and they closed exactly when they said they would. Highly recommend!',
                'video_url' => '/videos/testimonial-2.mp4',
                'image_url' => '/images/testimonials/robert-kim.jpg',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'testimonial_date' => '2024-11-28',
            ],
            [
                'name' => 'Maria Santos',
                'location' => 'Houston, TX',
                'content' => 'I inherited my grandmother\'s house and didn\'t know what to do with it. Fast Home Cash Offers made the process so simple. They handled everything and I was able to close quickly without any hassle.',
                'video_url' => null,
                'image_url' => '/images/testimonials/maria-santos.jpg',
                'rating' => 5,
                'is_featured' => false,
                'is_active' => true,
                'testimonial_date' => '2024-12-01',
            ],
            [
                'name' => 'Thomas Brown',
                'location' => 'San Antonio, TX',
                'content' => 'We were relocating for work and needed to sell fast. The traditional market was taking too long. Fast Home Cash Offers gave us a competitive offer and closed in 3 weeks. Perfect solution for our timeline!',
                'video_url' => null,
                'image_url' => '/images/testimonials/thomas-brown.jpg',
                'rating' => 5,
                'is_featured' => false,
                'is_active' => true,
                'testimonial_date' => '2024-11-15',
            ],
            [
                'name' => 'Linda Davis',
                'location' => 'Fort Worth, TX',
                'content' => 'As a landlord, I was tired of dealing with problem tenants. Fast Home Cash Offers bought all three of my rental properties. The process was smooth and professional from start to finish.',
                'video_url' => '/videos/testimonial-3.mp4',
                'image_url' => '/images/testimonials/linda-davis.jpg',
                'rating' => 5,
                'is_featured' => false,
                'is_active' => true,
                'testimonial_date' => '2024-10-22',
            ],
            [
                'name' => 'Carlos Rodriguez',
                'location' => 'El Paso, TX',
                'content' => 'The house needed major repairs that I couldn\'t afford. Fast Home Cash Offers bought it as-is and saved me from months of stress and expense. Great experience overall!',
                'video_url' => null,
                'image_url' => '/images/testimonials/carlos-rodriguez.jpg',
                'rating' => 4,
                'is_featured' => false,
                'is_active' => true,
                'testimonial_date' => '2024-11-05',
            ],
            [
                'name' => 'Patricia Wilson',
                'location' => 'Arlington, TX',
                'content' => 'My husband passed away and I needed to downsize quickly. The team at Fast Home Cash Offers was incredibly understanding and helped me through every step. They made a difficult time much easier.',
                'video_url' => null,
                'image_url' => '/images/testimonials/patricia-wilson.jpg',
                'rating' => 5,
                'is_featured' => false,
                'is_active' => true,
                'testimonial_date' => '2024-09-18',
            ],
            [
                'name' => 'James Thompson',
                'location' => 'Plano, TX',
                'content' => 'Fast, fair, and professional. They did exactly what they promised. No hidden fees, no last-minute surprises. I got my cash and they got the house. Win-win situation!',
                'video_url' => null,
                'image_url' => '/images/testimonials/james-thompson.jpg',
                'rating' => 5,
                'is_featured' => false,
                'is_active' => true,
                'testimonial_date' => '2024-10-08',
            ],
        ];

        foreach ($testimonials as $testimonial) {
            // Idempotent so the seeder can be re-run safely without duplicating.
            Testimonial::updateOrCreate(
                ['name' => $testimonial['name']],
                $testimonial
            );
        }
    }
}
