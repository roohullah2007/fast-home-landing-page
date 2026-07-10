<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddSecurityHeaders
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only add headers to successful responses
        if (!$response->isSuccessful()) {
            return $response;
        }

        $path = $request->path();

        // Cache headers for static assets
        if ($this->isStaticAsset($path)) {
            $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
            $response->headers->set('Expires', gmdate('D, d M Y H:i:s \G\M\T', time() + 31536000));
        }
        // Cache headers for images
        elseif ($this->isImage($path)) {
            $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
            $response->headers->set('Expires', gmdate('D, d M Y H:i:s \G\M\T', time() + 31536000));
        }
        // No cache for HTML/dynamic content
        elseif ($response->headers->get('Content-Type') && str_contains($response->headers->get('Content-Type'), 'text/html')) {
            $response->headers->set('Cache-Control', 'no-cache, no-store, must-revalidate');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', '0');
        }

        // Security headers
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        return $response;
    }

    /**
     * Check if the path is a static asset
     */
    protected function isStaticAsset(string $path): bool
    {
        return preg_match('/\.(js|css|woff|woff2|ttf|otf|eot)$/', $path);
    }

    /**
     * Check if the path is an image
     */
    protected function isImage(string $path): bool
    {
        return preg_match('/\.(jpg|jpeg|png|gif|webp|svg|ico)$/', $path);
    }
}
