<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generate and return XML sitemap
     */
    public function index()
    {
        // Static pages with their priorities and change frequencies
        $staticPages = [
            [
                'url' => url('/'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '1.0'
            ],
            [
                'url' => url('/our-advantage'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.8'
            ],
            [
                'url' => url('/our-approach'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.8'
            ],
            [
                'url' => url('/meet-the-team'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.7'
            ],
            [
                'url' => url('/testimonials'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.7'
            ],
            [
                'url' => url('/careers'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.6'
            ],
            [
                'url' => url('/blog'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'daily',
                'priority' => '0.9'
            ],
            [
                'url' => url('/faq'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.6'
            ],
            [
                'url' => url('/contact'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.7'
            ],
            [
                'url' => url('/received-letter'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.5'
            ],
            [
                'url' => url('/get-cash-offer'),
                'lastmod' => now()->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.9'
            ]
        ];

        // Get published blog posts
        $blogPosts = BlogPost::published()
            ->select(['slug', 'updated_at', 'created_at'])
            ->get()
            ->map(function ($post) {
                return [
                    'url' => url('/blog/' . $post->slug),
                    'lastmod' => $post->updated_at->toAtomString(),
                    'changefreq' => 'weekly',
                    'priority' => '0.8'
                ];
            });

        // Combine all URLs
        $urls = collect($staticPages)->concat($blogPosts);

        // Generate XML
        $xml = $this->generateXmlSitemap($urls);

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
            'Cache-Control' => 'public, max-age=3600' // Cache for 1 hour
        ]);
    }

    /**
     * Generate XML sitemap content
     */
    private function generateXmlSitemap($urls)
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($urls as $url) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($url['url']) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $url['lastmod'] . '</lastmod>' . "\n";
            $xml .= '    <changefreq>' . $url['changefreq'] . '</changefreq>' . "\n";
            $xml .= '    <priority>' . $url['priority'] . '</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        $xml .= '</urlset>';

        return $xml;
    }
}
