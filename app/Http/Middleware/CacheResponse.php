<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class CacheResponse
{
    /**
     * Cache TTL in seconds (5 minutes)
     */
    protected int $ttl = 300;

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ?int $ttl = null): Response
    {
        // Only cache GET requests
        if (! $request->isMethod('GET')) {
            return $next($request);
        }

        // Don't cache if user is authenticated
        if ($request->user()) {
            return $next($request);
        }

        // Don't cache admin routes
        if ($request->is('admin/*')) {
            return $next($request);
        }

        // Use custom TTL if provided
        $cacheTtl = $ttl ?? $this->ttl;

        // Generate unique cache key
        $cacheKey = $this->getCacheKey($request);

        // Try to get cached response
        $cachedResponse = Cache::get($cacheKey);

        if ($cachedResponse) {
            return $this->makeCachedResponse($cachedResponse);
        }

        // Get fresh response
        $response = $next($request);

        // Only cache successful responses
        if ($response->isSuccessful() && $response instanceof \Illuminate\Http\Response) {
            Cache::put($cacheKey, [
                'content' => $response->getContent(),
                'headers' => $response->headers->all(),
                'status' => $response->getStatusCode(),
            ], $cacheTtl);
        }

        return $response;
    }

    /**
     * Generate cache key from request
     */
    protected function getCacheKey(Request $request): string
    {
        $url = $request->fullUrl();
        $queryString = $request->getQueryString();

        return 'response_cache:' . md5($url . $queryString);
    }

    /**
     * Make response from cached data
     */
    protected function makeCachedResponse(array $cached): Response
    {
        $response = response($cached['content'], $cached['status']);

        // Restore headers
        foreach ($cached['headers'] as $key => $values) {
            foreach ($values as $value) {
                $response->header($key, $value);
            }
        }

        // Add cache hit header
        $response->header('X-Cache', 'HIT');

        return $response;
    }
}
