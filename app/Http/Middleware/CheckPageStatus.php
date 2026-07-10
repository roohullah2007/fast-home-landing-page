<?php

namespace App\Http\Middleware;

use App\Models\Page;
use Closure;
use Illuminate\Http\Request;

class CheckPageStatus
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $routeName = null)
    {
        // Get the route name to check
        $routeToCheck = $routeName ?? $request->route()->getName();
        
        // Skip check for admin routes
        if (str_starts_with($routeToCheck, 'admin.') || 
            str_starts_with($routeToCheck, 'login') || 
            str_starts_with($routeToCheck, 'register') ||
            $routeToCheck === 'dashboard') {
            return $next($request);
        }
        
        // Find the page by route name
        $page = Page::findByRoute($routeToCheck);
        
        // If page exists and is inactive, return 404 or redirect
        if ($page && !$page->isAccessible()) {
            abort(404, 'This page is currently unavailable.');
        }
        
        return $next($request);
    }
}
