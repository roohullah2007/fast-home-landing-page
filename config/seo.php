<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default SEO Configuration
    |--------------------------------------------------------------------------
    |
    | Default values for meta tags and SEO settings
    |
    */

    'default' => [
        'title' => 'Fast Home Cash Offers - We Buy Houses in Any Condition',
        'description' => 'Get a fair cash offer for your house in 24 hours. We buy houses in any condition - no repairs needed, no commissions, fast closing.',
        'keywords' => 'sell house fast, cash home buyers, we buy houses, sell house as is, fast home sale',
        'og_image' => '/images/default-og-image.jpg',
        'twitter_handle' => '@fasthomecash',
    ],

    /*
    |--------------------------------------------------------------------------
    | Page-specific SEO Settings
    |--------------------------------------------------------------------------
    |
    | SEO settings for specific pages
    |
    */

    'pages' => [
        'home' => [
            'title' => 'Fast Home Cash Offers - Sell Your House Fast for Cash',
            'description' => 'Need to sell your house fast? Get a fair cash offer in 24 hours. No repairs, no commissions, no hassles. We buy houses in any condition.',
            'keywords' => 'sell house fast, cash home buyers, we buy houses, fast home sale, sell house as is',
        ],
        'blog' => [
            'title' => 'Real Estate Blog - Fast Home Cash Offers',
            'description' => 'Expert tips and insights on selling your home, real estate market trends, and cash home sales. Get informed before you sell.',
            'keywords' => 'real estate blog, home selling tips, cash home sales, property market insights',
        ],
        'our-advantage' => [
            'title' => 'Our Advantage - Why Choose Fast Home Cash Offers',
            'description' => 'Discover the advantages of working with Fast Home Cash Offers. Fair prices, fast closings, no repairs needed.',
            'keywords' => 'cash home buyer advantage, fast closing, no repairs needed, fair cash offer',
        ],
        'contact' => [
            'title' => 'Contact Us - Fast Home Cash Offers',
            'description' => 'Contact Fast Home Cash Offers today for a free, no-obligation cash offer on your property. Call or fill out our form.',
            'keywords' => 'contact cash home buyer, get cash offer, sell house contact',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Blog SEO Settings
    |--------------------------------------------------------------------------
    |
    | Default settings for blog posts
    |
    */

    'blog' => [
        'title_suffix' => ' - Fast Home Cash Offers Blog',
        'default_image' => '/images/default-blog-image.jpg',
        'author_fallback' => 'Fast Home Cash Offers Team',
    ],

    /*
    |--------------------------------------------------------------------------
    | Schema.org Settings
    |--------------------------------------------------------------------------
    |
    | Organization information for structured data
    |
    */

    'organization' => [
        'name' => 'Fast Home Cash Offers',
        'url' => env('APP_URL', 'https://fasthomecashoffers.com'),
        'logo' => '/images/logo.png',
        'description' => 'Professional cash home buyers helping homeowners sell their properties quickly and fairly.',
        'address' => [
            'streetAddress' => '123 Main Street',
            'addressLocality' => 'Your City',
            'addressRegion' => 'Your State',
            'postalCode' => '12345',
            'addressCountry' => 'US',
        ],
        'contactPoint' => [
            'telephone' => '+1-555-123-4567',
            'contactType' => 'customer service',
        ],
        'sameAs' => [
            'https://www.facebook.com/fasthomecashoffers',
            'https://www.twitter.com/fasthomecash',
            'https://www.linkedin.com/company/fasthomecashoffers',
        ],
    ],
];
