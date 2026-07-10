<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HandleFaviconRequests
{
    public function handle(Request $request, Closure $next)
    {
        // Handle favicon requests
        if ($request->is('favicon*') || $request->is('apple-touch-icon*')) {
            // Check if file exists
            $requestedFile = public_path($request->path());
            if (file_exists($requestedFile)) {
                return response()->file($requestedFile);
            }
            
            // Fallback to main favicon.ico
            $faviconPath = public_path('favicon.ico');
            if (file_exists($faviconPath)) {
                return response()->file($faviconPath);
            }
            
            // Return 204 No Content if no favicon exists
            return response('', 204);
        }

        return $next($request);
    }
}