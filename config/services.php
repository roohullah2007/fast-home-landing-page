<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
        'from' => env('RESEND_FROM', env('MAIL_FROM_ADDRESS')),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    // Form submission webhooks. ZAPIER_WEBHOOK_URL acts as the default for every
    // form; the per-form variables override it when set.
    'zapier_webhook_url' => env('ZAPIER_WEBHOOK_URL') ?: null,
    'lead_webhook_url' => env('LEAD_WEBHOOK_URL') ?: env('ZAPIER_WEBHOOK_URL') ?: null,
    'contact_webhook_url' => env('CONTACT_WEBHOOK_URL') ?: env('ZAPIER_WEBHOOK_URL') ?: null,

    // Admin notification recipient.
    'admin_email' => env('ADMIN_EMAIL'),

    // Google Services
    'google' => [
        'recaptcha' => [
            'site_key' => env('GOOGLE_RECAPTCHA_SITE_KEY'),
            'secret_key' => env('GOOGLE_RECAPTCHA_SECRET_KEY'),
        ],
        'places' => [
            'api_key' => env('GOOGLE_PLACES_API_KEY'),
        ],
    ],

];
