<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheService
{
    /**
     * Cache durations in seconds
     */
    const CACHE_FOREVER = 31536000; // 1 year
    const CACHE_LONG = 86400;       // 1 day
    const CACHE_MEDIUM = 3600;      // 1 hour
    const CACHE_SHORT = 300;        // 5 minutes

    /**
     * Remember data with automatic cache invalidation
     */
    public function remember(string $key, int $ttl, callable $callback)
    {
        return Cache::remember($key, $ttl, $callback);
    }

    /**
     * Cache blog posts
     */
    public function cacheBlogPosts()
    {
        return $this->remember('blog:posts:all', self::CACHE_MEDIUM, function () {
            return \App\Models\BlogPost::with(['author', 'category'])
                ->published()
                ->latest()
                ->get();
        });
    }

    /**
     * Cache single blog post
     */
    public function cacheBlogPost($slug)
    {
        return $this->remember("blog:post:{$slug}", self::CACHE_MEDIUM, function () use ($slug) {
            return \App\Models\BlogPost::where('slug', $slug)
                ->with(['author', 'category'])
                ->published()
                ->firstOrFail();
        });
    }

    /**
     * Cache testimonials
     */
    public function cacheTestimonials()
    {
        return $this->remember('testimonials:active', self::CACHE_LONG, function () {
            return \App\Models\Testimonial::where('is_active', true)
                ->latest()
                ->get();
        });
    }

    /**
     * Cache team members
     */
    public function cacheTeamMembers()
    {
        return $this->remember('team:members:active', self::CACHE_LONG, function () {
            return \App\Models\TeamMember::where('is_active', true)
                ->orderBy('sort_order')
                ->get();
        });
    }

    /**
     * Cache FAQs
     */
    public function cacheFAQs()
    {
        if (! class_exists(\App\Models\FAQ::class) || ! \Schema::hasTable('faqs')) {
            return collect();
        }

        return $this->remember('faqs:active', self::CACHE_LONG, function () {
            return \App\Models\FAQ::where('is_active', true)
                ->orderBy('sort_order')
                ->get();
        });
    }

    /**
     * Cache site settings
     */
    public function cacheSiteSettings()
    {
        return $this->remember('settings:all', self::CACHE_FOREVER, function () {
            return \App\Models\SiteSetting::pluck('value', 'key')->toArray();
        });
    }

    /**
     * Invalidate blog cache
     */
    public function invalidateBlogCache()
    {
        Cache::forget('blog:posts:all');
        // Also clear individual post caches if needed
        $posts = \App\Models\BlogPost::pluck('slug');
        foreach ($posts as $slug) {
            Cache::forget("blog:post:{$slug}");
        }
    }

    /**
     * Invalidate specific cache by tag
     */
    public function invalidateByTag(string $tag)
    {
        if (config('cache.default') === 'redis') {
            Cache::tags($tag)->flush();
        } else {
            // Fallback for non-taggable cache drivers
            $this->invalidateAll();
        }
    }

    /**
     * Invalidate all application caches
     */
    public function invalidateAll()
    {
        Cache::flush();
    }

    /**
     * Warm up critical caches
     */
    public function warmUp()
    {
        $this->cacheSiteSettings();
        $this->cacheTestimonials();
        $this->cacheTeamMembers();
        $this->cacheFAQs();
        $this->cacheBlogPosts();
    }

    /**
     * Get cache statistics
     */
    public function getStats(): array
    {
        $store = Cache::getStore();

        return [
            'driver' => config('cache.default'),
            'prefix' => config('cache.prefix'),
            'store' => get_class($store),
        ];
    }
}
