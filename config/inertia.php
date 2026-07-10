<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Server Side Rendering
    |--------------------------------------------------------------------------
    |
    | These options configures if and how Inertia uses Server Side Rendering
    | to pre-render the initial visits made to your application's pages.
    |
    | You can specify a custom SSR bundle path, or use the default that Inertia
    | will automatically detect for you.
    |
    */

    'ssr' => [

        'enabled' => true,

        'url' => 'http://127.0.0.1:13714',

    ],

    /*
    |--------------------------------------------------------------------------
    | Testing
    |--------------------------------------------------------------------------
    |
    | The values described here are used to configure Inertia's testing helpers.
    | These are used to locate your pages and components when performing
    | assertions using the Inertia testing helpers.
    |
    */

    'testing' => [

        'page_paths' => [
            resource_path('js/Pages'),
        ],

    ],

];
