<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \App\Http\Middleware\HandleFaviconRequests::class,
            \App\Http\Middleware\AddSecurityHeaders::class,
        ]);

        // Register middleware aliases
        $middleware->alias([
            'cache.response' => \App\Http\Middleware\CacheResponse::class,
        ]);

        // Exclude API routes from CSRF protection
        $middleware->validateCsrfTokens(except: [
            'api/leads',
            'api/contact',
            'api/newsletter',
            'api/analytics/track',
            'api/config',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
