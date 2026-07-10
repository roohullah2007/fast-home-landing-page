# Contact Information Management System

## Overview
The website now has a centralized contact information management system that allows admins to update the phone number, email address, and office address from the admin panel. These values are automatically displayed throughout the entire website.

## Features
- Admin can update contact phone, email, and office address
- Changes apply globally across all pages and components
- Centralized management through admin panel
- Automatic phone link formatting (tel: links)
- Email link formatting (mailto: links)
- SEO schema.org markup automatically updates

## How to Update Contact Information

### Step 1: Access Admin Panel
1. Log in to your admin panel: `http://yourdomain.com/login`
2. Go to **Site Settings**: `http://yourdomain.com/admin/site-settings`

### Step 2: Update Contact Details
1. In the "Contact Information" section, you'll find three fields:
   - **Phone Number** - Format: (888) 555-1234
   - **Email Address** - Format: info@yourdomain.com
   - **Office Address** - Full address with city, state, zip

2. Update any or all fields as needed
3. Click **Save All Settings**

### Step 3: Verify Changes
Visit any page on your website to see the updated contact information:
- Homepage
- Contact page
- FAQ page
- Thank You pages
- Get Cash Offer page
- And all other pages

## Where Contact Info Appears

### Pages:
- **HomePage** - Call to action sections
- **ContactPage** - Contact information cards
- **FAQPage** - Contact section and CTA buttons
- **GetCashOfferPage** - Call buttons
- **ThankYouPage** - Contact info boxes
- **OurApproachPage** - CTA sections
- **ReceivedLetterPage** - CTA buttons

### Components:
- All Call to Action (CTA) sections
- Footer contact information
- SEO schema markup (Organization structured data)
- Phone number links (automatically formatted as tel: links)
- Email links (automatically formatted as mailto: links)

## Technical Details

### Database Structure
**Table:** `site_settings`

**Keys:**
- `contact_phone` - Phone number
- `contact_email` - Email address
- `office_address` - Full office address

### Backend Files

#### Migration
**File:** `database/migrations/2025_10_23_214801_add_contact_info_to_site_settings.php`
- Inserts default contact settings into database

#### Model
**File:** `app/Models/SiteSetting.php`
- Methods: `get()`, `set()`
- Handles reading and writing settings

#### Controller
**File:** `app/Http/Controllers/Admin/SiteSettingsController.php`
- `index()` - Display settings page
- `update()` - Save settings
- Validation rules for contact info

#### Middleware
**File:** `app/Http/Middleware/HandleInertiaRequests.php`
- Shares `siteSettings` globally to all pages via Inertia
- Makes contact info available to all React components

### Frontend Files

#### Admin Interface
**File:** `resources/js/Pages/Admin/SiteSettings.jsx`
- Contact information form
- Phone, email, and address input fields
- Validation and error display

#### Components Updated (All use `usePage().props.siteSettings`):
1. `resources/js/Components/Homepage/CallToActionSection.jsx`
2. `resources/js/Components/Contact/ContactInfoSection.jsx`
3. `resources/js/Components/Contact/ContactCTASection.jsx`
4. `resources/js/Components/Approach/CallToActionSection.jsx`
5. `resources/js/Components/CallNowSection.jsx`
6. `resources/js/Components/FAQ/FAQContactSection.jsx`
7. `resources/js/Components/FAQ/FAQQuestionsSection.jsx`
8. `resources/js/Components/ReceivedLetter/LetterCallToActionSection.jsx`
9. `resources/js/Components/SEO.jsx`
10. `resources/js/Pages/ThankYouPage.jsx`
11. `resources/js/Pages/GetCashOfferPage.jsx`

## How It Works

### 1. Admin Updates Settings
```php
// Admin saves through form
SiteSetting::set('contact_phone', '(888) 555-1234');
SiteSetting::set('contact_email', 'info@fasthomecashoffers.com');
SiteSetting::set('office_address', '123 Main Street, Your City, State 12345');
```

### 2. Middleware Shares Globally
```php
// HandleInertiaRequests.php
public function share(Request $request): array
{
    return [
        'siteSettings' => [
            'contactPhone' => SiteSetting::get('contact_phone'),
            'contactEmail' => SiteSetting::get('contact_email'),
            'officeAddress' => SiteSetting::get('office_address'),
        ],
    ];
}
```

### 3. Components Use Settings
```jsx
// Any component
import { usePage } from '@inertiajs/react';

export default function MyComponent() {
    const { siteSettings } = usePage().props;
    const phoneLink = siteSettings.contactPhone.replace(/\D/g, '');

    return (
        <a href={`tel:${phoneLink}`}>
            {siteSettings.contactPhone}
        </a>
    );
}
```

## Phone Link Formatting

Phone numbers are automatically formatted for tel: links:
```jsx
const phoneLink = siteSettings.contactPhone.replace(/\D/g, '');
// "(888) 555-1234" becomes "8885551234"

<a href={`tel:${phoneLink}`}>
    {siteSettings.contactPhone}
</a>
// Renders: <a href="tel:8885551234">(888) 555-1234</a>
```

## Email Link Formatting

Email addresses are automatically formatted for mailto: links:
```jsx
<a href={`mailto:${siteSettings.contactEmail}`}>
    {siteSettings.contactEmail}
</a>
// Renders: <a href="mailto:info@fasthomecashoffers.com">info@fasthomecashoffers.com</a>
```

## Default Values

If settings are not configured, the system uses these defaults:
- **Phone:** (888) 555-1234
- **Email:** info@fasthomecashoffers.com
- **Address:** 123 Main Street, Your City, Your State, 12345

## Validation Rules

### Phone Number
- Type: String
- Max length: 20 characters
- Optional (uses default if empty)

### Email Address
- Type: Email
- Max length: 100 characters
- Must be valid email format
- Optional (uses default if empty)

### Office Address
- Type: String
- Max length: 255 characters
- Optional (uses default if empty)

## SEO Impact

Contact information is automatically included in Schema.org Organization markup:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fast Home Cash Offers",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-8885551234",
    "contactType": "customer service"
  }
}
```

This helps search engines understand your business contact information.

## Troubleshooting

### Contact info not updating?
1. Clear browser cache
2. Check if migration ran: `php artisan migrate:status`
3. Verify settings saved in database: Check `site_settings` table
4. Clear Laravel cache: `php artisan config:clear`

### Phone links not working?
- Ensure phone number format doesn't break the `replace(/\D/g, '')` regex
- Test on mobile device (tel: links only work on devices with phone capability)

### Changes not appearing on all pages?
- The `siteSettings` prop is shared globally via Inertia middleware
- Make sure all components import and use `usePage()` from '@inertiajs/react'
- Check browser console for JavaScript errors

## Security Notes

- Only authenticated admin users can access the settings page
- Input validation prevents malicious data
- No sensitive information should be stored in plain text settings
- Settings are stored in database, not in code files

## Future Enhancements

Possible improvements:
- Add social media links management
- Add business hours settings
- Add multiple office locations
- Add fax number field
- Add WhatsApp/SMS contact options
- Add contact preferences (call/email/text)
