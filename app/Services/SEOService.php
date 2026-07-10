<?php

namespace App\Services;

class SEOService
{
    /**
     * Get SEO data for a specific page
     */
    public static function getPageSEO($page, $customData = [])
    {
        $seoConfig = config('seo');
        $defaultSEO = $seoConfig['default'];
        $pageSEO = $seoConfig['pages'][$page] ?? [];

        return array_merge($defaultSEO, $pageSEO, $customData);
    }

    /**
     * Get blog post SEO data
     */
    public static function getBlogPostSEO($blogPost)
    {
        $seoConfig = config('seo');
        
        return [
            'title' => $blogPost->meta_title ?: $blogPost->title . $seoConfig['blog']['title_suffix'],
            'description' => $blogPost->meta_description ?: $blogPost->excerpt,
            'keywords' => is_array($blogPost->tags) ? implode(', ', $blogPost->tags) : $blogPost->tags,
            'og_image' => $blogPost->featured_image ?: $seoConfig['blog']['default_image'],
            'canonical_url' => url('/blog/' . $blogPost->slug),
            'author' => $blogPost->author_name ?: $seoConfig['blog']['author_fallback'],
            'published_date' => $blogPost->published_at,
            'modified_date' => $blogPost->updated_at,
        ];
    }

    /**
     * Generate structured data for organization
     */
    public static function getOrganizationSchema()
    {
        $org = config('seo.organization');
        
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => $org['name'],
            'url' => $org['url'],
            'logo' => url($org['logo']),
            'description' => $org['description'],
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => $org['address']['streetAddress'],
                'addressLocality' => $org['address']['addressLocality'],
                'addressRegion' => $org['address']['addressRegion'],
                'postalCode' => $org['address']['postalCode'],
                'addressCountry' => $org['address']['addressCountry'],
            ],
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'telephone' => $org['contactPoint']['telephone'],
                'contactType' => $org['contactPoint']['contactType'],
            ],
            'sameAs' => $org['sameAs'],
        ];
    }

    /**
     * Generate structured data for blog post
     */
    public static function getBlogPostSchema($blogPost)
    {
        $org = config('seo.organization');
        
        return [
            '@context' => 'https://schema.org',
            '@type' => 'BlogPosting',
            'headline' => $blogPost->title,
            'description' => $blogPost->meta_description ?: $blogPost->excerpt,
            'image' => url($blogPost->featured_image ?: config('seo.blog.default_image')),
            'author' => [
                '@type' => 'Person',
                'name' => $blogPost->author_name ?: config('seo.blog.author_fallback'),
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => $org['name'],
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => url($org['logo']),
                ],
            ],
            'datePublished' => $blogPost->published_at->toISOString(),
            'dateModified' => $blogPost->updated_at->toISOString(),
            'url' => url('/blog/' . $blogPost->slug),
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => url('/blog/' . $blogPost->slug),
            ],
        ];
    }

    /**
     * Generate breadcrumb structured data
     */
    public static function getBreadcrumbSchema($breadcrumbs)
    {
        $items = [];
        
        foreach ($breadcrumbs as $index => $breadcrumb) {
            $items[] = [
                '@type' => 'ListItem',
                'position' => $index + 1,
                'name' => $breadcrumb['name'],
                'item' => url($breadcrumb['url']),
            ];
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $items,
        ];
    }
}
