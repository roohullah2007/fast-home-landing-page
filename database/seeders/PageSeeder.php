<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $pages = [
            [
                'name' => 'Home Page',
                'slug' => '',
                'route' => 'welcome',
                'title' => 'Fast Home Cash Offers - Sell Your House Fast',
                'description' => 'Get a fair cash offer for your house in 24 hours. We buy houses in any condition.',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Get Cash Offer',
                'slug' => 'get-cash-offer',
                'route' => 'get-cash-offer',
                'title' => 'Get Your Cash Offer Today',
                'description' => 'Fill out our simple form to get a no-obligation cash offer for your house.',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Our Advantage',
                'slug' => 'our-advantage',
                'route' => 'our-advantage',
                'title' => 'Our Advantage - Why Choose Us',
                'description' => 'Learn about our competitive advantages and why homeowners choose us.',
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Our Approach',
                'slug' => 'our-approach',
                'route' => 'our-approach',
                'title' => 'Our Approach to Home Buying',
                'description' => 'Discover our proven approach to buying homes quickly and fairly.',
                'is_active' => true,
                'sort_order' => 4
            ],
            [
                'name' => 'Meet the Team',
                'slug' => 'meet-the-team',
                'route' => 'meet-the-team',
                'title' => 'Meet Our Team',
                'description' => 'Get to know the experienced professionals behind Fast Home Cash Offers.',
                'is_active' => true,
                'sort_order' => 5
            ],
            [
                'name' => 'Testimonials',
                'slug' => 'testimonials',
                'route' => 'testimonials',
                'title' => 'Customer Testimonials',
                'description' => 'Read what our satisfied customers have to say about their experience.',
                'is_active' => true,
                'sort_order' => 6
            ],
            [
                'name' => 'Careers',
                'slug' => 'careers',
                'route' => 'careers',
                'title' => 'Careers - Join Our Team',
                'description' => 'Explore career opportunities and join our growing team.',
                'is_active' => true,
                'sort_order' => 7
            ],
            [
                'name' => 'Blog',
                'slug' => 'blog',
                'route' => 'blog',
                'title' => 'Real Estate Blog',
                'description' => 'Read our latest articles about real estate, home selling, and market trends.',
                'is_active' => true,
                'sort_order' => 8
            ],
            [
                'name' => 'Contact',
                'slug' => 'contact',
                'route' => 'contact',
                'title' => 'Contact Us',
                'description' => 'Get in touch with our team for questions or support.',
                'is_active' => true,
                'sort_order' => 9
            ],
            [
                'name' => 'FAQ',
                'slug' => 'faq',
                'route' => 'faq',
                'title' => 'Frequently Asked Questions',
                'description' => 'Find answers to commonly asked questions about our services.',
                'is_active' => true,
                'sort_order' => 10
            ],
            [
                'name' => 'Received Letter',
                'slug' => 'received-letter',
                'route' => 'received-letter',
                'title' => 'Received Our Letter?',
                'description' => 'Information for homeowners who received our letter.',
                'is_active' => true,
                'sort_order' => 11
            ]
        ];

        foreach ($pages as $pageData) {
            Page::updateOrCreate(
                ['route' => $pageData['route']],
                $pageData
            );
        }
    }
}
