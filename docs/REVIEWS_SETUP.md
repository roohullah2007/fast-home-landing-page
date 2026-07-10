# Reviews Section Setup Guide

## Overview
The website now has a reviews section on the homepage that displays customer reviews using embed codes from TrustIndex or any other review platform.

## Features
- Admin can add/update review embed code through the admin panel
- Reviews automatically display on the homepage
- Supports TrustIndex, Google Reviews, Trustpilot, and any other platform that provides embed codes
- Section only appears if embed code is added (gracefully hidden if empty)

## How to Add Reviews

### Step 1: Get Your Embed Code from TrustIndex (or other platform)

#### For TrustIndex:
1. Go to [https://www.trustindex.io/](https://www.trustindex.io/)
2. Sign up or log in to your account
3. Connect your review source (Google, Facebook, Yelp, etc.)
4. Customize your widget design
5. Copy the embed code (usually starts with `<script>` or `<iframe>`)

#### For Google Reviews Widget:
1. Use TrustIndex Google Reviews widget
2. Or use Google My Business embed code

#### For Trustpilot:
1. Log in to Trustpilot Business
2. Go to Integrations > TrustBox
3. Choose a widget design
4. Copy the embed code

### Step 2: Add Embed Code to Your Website

1. Log in to your admin panel: `http://yourdomain.com/login`
2. Go to **Site Settings** (http://yourdomain.com/admin/site-settings)
3. Paste your embed code in the "Reviews Embed Code" textarea
4. Click **Save Settings**
5. Visit your homepage to see the reviews section

## Admin Panel Location

**URL:** `/admin/site-settings`

**Menu Path:** Admin Dashboard → Site Settings

## Example Embed Codes

### TrustIndex Example:
```html
<script src="https://cdn.trustindex.io/loader.js?..." async></script>
```

### Iframe Example:
```html
<iframe src="https://example.com/reviews-widget" width="100%" height="500px"></iframe>
```

### Widget Example:
```html
<div id="trustindex-widget"></div>
<script src="https://..."></script>
```

## Technical Details

### Files Created:
- **Component:** `resources/js/Components/Homepage/ReviewsSection.jsx`
- **Model:** `app/Models/SiteSetting.php`
- **Controller:** `app/Http/Controllers/Admin/SiteSettingsController.php`
- **Admin Page:** `resources/js/Pages/Admin/SiteSettings.jsx`
- **Migration:** `database/migrations/2025_10_23_211125_create_site_settings_table.php`

### Database:
- Table: `site_settings`
- Key: `reviews_embed_code`

### How It Works:
1. Admin adds embed code in admin panel
2. Code is saved to database in `site_settings` table
3. Homepage controller retrieves the embed code
4. ReviewsSection component receives and renders the embed code
5. If no code exists, the section doesn't display

## Customization

### Change Section Title
Edit `resources/js/Components/Homepage/ReviewsSection.jsx`:
```jsx
<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#03407F] mb-4">
    Your Custom Title
</h2>
```

### Change Section Position
Edit `resources/js/Pages/HomePage.jsx` and move the ReviewsSection component:
```jsx
{/* Move this block wherever you want */}
<ReviewsSection embedCode={reviewsEmbedCode} />
```

### Styling
The reviews section has:
- Gray background (`bg-gray-50`)
- Responsive padding
- Centered content
- Maximum width container

## Troubleshooting

### Reviews not showing?
1. Check if embed code is saved in admin panel
2. Verify the embed code is valid
3. Check browser console for JavaScript errors
4. Make sure the embed code source URL is accessible

### Admin page not accessible?
1. Make sure you're logged in
2. Check if migration ran successfully: `php artisan migrate:status`
3. Clear cache: `php artisan config:clear`

### Embed code not saving?
1. Check file permissions
2. Verify database connection
3. Check Laravel logs: `storage/logs/laravel.log`

## Support

For issues or questions, check:
- Laravel logs: `storage/logs/laravel.log`
- Browser console for JavaScript errors
- Database: verify `site_settings` table exists

## Security Note

The embed code uses `dangerouslySetInnerHTML` in React, which is necessary for third-party widgets. Only trusted admin users should have access to add embed codes.
