<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <!-- Resource Hints for Performance Optimization -->
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link rel="preconnect" href="https://doctor-home.com" crossorigin>
        <link rel="dns-prefetch" href="https://images.unsplash.com">
        <link rel="dns-prefetch" href="https://www.google-analytics.com">

        <!-- SEO Meta Tags -->
        <meta name="description" content="Get a fair cash offer for your house in just 24 hours. We buy houses as-is, no repairs needed, fast closing. Trusted home buyers serving nationwide.">
        <meta name="keywords" content="sell house fast, cash home buyers, we buy houses, sell house as-is, fast home cash offers, quick house sale, sell house without repairs, foreclosure help, inherited property">
        <meta name="author" content="Fast Home Cash Offers">
        <meta name="robots" content="index, follow">

        <!-- Open Graph Meta Tags -->
        <meta property="og:site_name" content="Fast Home Cash Offers">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="en_US">

        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Favicons -->
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2">
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=2">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2">
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2">
        <link rel="manifest" href="/manifest.json">
        <meta name="theme-color" content="#03407F">

        <!-- Apple Touch Icons -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">

        <!-- Microsoft Tiles -->
        <meta name="msapplication-TileColor" content="#03407F">
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png?v=2">

        <!-- Load fonts - optimized for critical rendering path -->
        <link href="https://fonts.bunny.net/css?family=figtree:400,600|lato:400,700&display=swap" rel="stylesheet" />

        <!-- Preload critical resources -->
        @if(isset($page['component']))
            @php
                $manifestPath = public_path('app-assets/manifest.json');
                $manifest = file_exists($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : [];
                $mainJs = $manifest['resources/js/app.jsx']['file'] ?? null;
                $mainCss = $manifest['resources/js/app.jsx']['css'][0] ?? null;

                // Find vendor chunk
                $vendorJs = null;
                foreach ($manifest as $key => $value) {
                    if (isset($value['file']) && str_contains($value['file'], 'vendor-')) {
                        $vendorJs = $value['file'];
                        break;
                    }
                }
            @endphp
            @if($mainCss)
                <link rel="preload" href="/app-assets/{{ $mainCss }}" as="style">
            @endif
            @if($vendorJs)
                <link rel="modulepreload" href="/app-assets/{{ $vendorJs }}" as="script" crossorigin>
            @endif
            @if($mainJs)
                <link rel="modulepreload" href="/app-assets/{{ $mainJs }}" as="script" crossorigin>
            @endif
        @endif

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
