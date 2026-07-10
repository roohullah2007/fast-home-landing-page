# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fast Home Cash Offers is a Laravel 12 + Inertia.js + React application for a real estate cash buying business. The application features:
- Public-facing pages (home, about, FAQ, blog, careers, testimonials)
- Lead capture forms with analytics
- Admin dashboard for managing content, leads, and applications
- Server-Side Rendering (SSR) for improved SEO and performance
- Comprehensive caching system (browser, application, service worker)

**Tech Stack:**
- Backend: Laravel 12 (PHP 8.2+)
- Frontend: React 18 + Inertia.js 2.0
- Build: Vite 6 with SSR support
- Styling: Tailwind CSS 3
- Database: MySQL (configurable to Redis for caching)

## Development Commands

### Setup
```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Build assets (client + SSR)
npm run build
```

### Development Server
```bash
# Start all services (Laravel, Queue, Logs, Vite) - Recommended
composer dev

# Or manually:
php artisan serve          # Backend (http://localhost:8000)
npm run dev                # Frontend hot reload
php artisan queue:listen   # Background jobs
npm run ssr:serve          # SSR server (port 13714)
```

### Testing
```bash
# Run all tests
composer test
# Or: php artisan test

# Run specific test file
php artisan test --filter=TestClassName

# Code formatting (Laravel Pint)
./vendor/bin/pint
```

### Production Build & Deployment
```bash
# Build for production (includes SSR bundle)
npm run build

# Deploy (clears caches, optimizes, warms cache, restarts SSR)
./deploy.sh

# Manual deployment steps:
php artisan config:clear
php artisan cache:clear-all --warm-up
php artisan config:cache
php artisan route:cache
php artisan view:cache
pm2 restart inertia-ssr
```

### Cache Management
```bash
# Clear all caches
php artisan cache:clear-all

# Warm up application caches
php artisan cache:warm-up

# Clear and warm up
php artisan cache:clear-all --warm-up

# Individual cache clearing
php artisan config:clear   # Config cache
php artisan route:clear    # Route cache
php artisan view:clear     # Compiled views
php artisan cache:clear    # Application cache
```

### Image Optimization
```bash
# Convert images to WebP format
npm run optimize-images
```

## Architecture

### Frontend (Inertia.js + React)

**Entry Points:**
- `resources/js/app.jsx` - Client-side entry, registers service worker
- `resources/js/ssr.jsx` - Server-side rendering entry
- `resources/views/app.blade.php` - Root Blade template with meta tags

**Page Components:** `resources/js/Pages/`
- Public pages: `HomePage.jsx`, `ApproachPage.jsx`, `FAQPage.jsx`, etc.
- Admin pages: `Admin/` subdirectory with CRUD interfaces
- Auth pages: `Auth/` subdirectory

**Shared Props:** Configured in `HandleInertiaRequests` middleware:
- `auth.user` - Current authenticated user
- `siteSettings` - Global settings (phone, email, address)

**Routing:** Inertia uses Laravel routes (`routes/web.php`) and resolves React components automatically via `resolvePageComponent()`.

### Backend (Laravel)

**Key Models:** (`app/Models/`)
- `Lead` - Customer inquiries from forms
- `BlogPost` - Blog articles
- `Testimonial` - Customer testimonials
- `TeamMember` - Team profiles
- `Vacancy` - Job openings
- `SiteSetting` - Key-value configuration store
- `AnalyticsEvent` - Custom event tracking

**Controllers:**
- Public controllers in `app/Http/Controllers/`
- Admin controllers in `app/Http/Controllers/Admin/`
- Admin routes prefixed with `/admin` and require authentication

**Middleware:**
- `HandleInertiaRequests` - Shares global props to all Inertia pages
- `CacheResponse` - HTTP response caching (use alias: `cache.response`)
- Apply caching to public routes: `->middleware('cache.response:TTL_IN_SECONDS')`

**Services:**
- `CacheService` (`app/Services/CacheService.php`) - Centralized cache management with predefined TTLs and methods for common data (blog posts, testimonials, FAQs, etc.)

### Server-Side Rendering (SSR)

**SSR is REQUIRED for production.** Without it running, pages will not render properly.

**Configuration:**
- `config/inertia.php` - SSR enabled on port 13714
- `ssr-server.js` - Node.js server that dynamically loads SSR bundle
- `ecosystem.config.cjs` - PM2 process manager configuration

**Running SSR:**
```bash
# Development
npm run ssr:serve

# Production (using PM2)
pm2 start ecosystem.config.cjs
pm2 status
pm2 logs inertia-ssr
```

**How SSR Works:**
1. Vite builds two bundles: client (`public/build/`) and SSR (`bootstrap/ssr/`)
2. `ssr-server.js` starts Node server on port 13714
3. Laravel sends Inertia page data to SSR server
4. SSR server renders React to HTML string
5. Laravel returns fully-rendered HTML + hydration script

**Troubleshooting SSR:**
- If pages show blank: Check SSR server is running (`pm2 status`)
- If SSR crashes: Check logs (`pm2 logs inertia-ssr`)
- Server-side code cannot use browser APIs (`window`, `document`, `localStorage`)
- Use `typeof window !== 'undefined'` checks for client-only code

### Caching Strategy

**Three-layer caching system:**

1. **Browser/HTTP Caching** (`.htaccess`)
   - Static assets: 1 year cache
   - HTML: No cache
   - Gzip/Brotli compression enabled

2. **Application Caching** (Laravel)
   - Config/route/view caching for production
   - Database query results via `CacheService`
   - Response caching via `CacheResponse` middleware
   - Current driver: Database (switch to Redis recommended)

3. **Service Worker** (`public/service-worker.js`)
   - Offline support with fallback page
   - Asset caching (images, fonts, CSS, JS)
   - Auto-updates with version management

**Cache Keys Convention:**
- `response_cache:*` - HTTP responses
- `blog:posts:all` - All blog posts
- `blog:post:{slug}` - Individual post
- `testimonials:active` - Active testimonials
- `team:members:active` - Team members
- `settings:all` - Site settings

**Cache Invalidation:**
- Manual: `$cacheService->invalidateBlogCache()`
- Automatic: On model save/delete (implement in model events)
- Deployment: `deploy.sh` clears and warms caches

### Build Configuration

**Vite Setup** (`vite.config.js`):
- **Code Splitting:** React/Inertia in one vendor chunk, charts lazy-loaded
- **Compression:** Gzip + Brotli for all assets
- **Optimization:** Terser with console removal, CSS code splitting
- **SSR:** Separate SSR bundle built alongside client bundle

**Important:** React/React-DOM/Inertia MUST stay in same chunk to prevent module duplication errors.

## Common Workflows

### Adding a New Page

1. Create React component in `resources/js/Pages/NewPage.jsx`
2. Add route in `routes/web.php`:
   ```php
   Route::get('/new-page', function () {
       return Inertia::render('NewPage', ['data' => ...]);
   });
   ```
3. Optionally add caching: `->middleware('cache.response:300')`
4. No import needed - Inertia auto-resolves via glob pattern

### Adding Admin CRUD

1. Create model + migration
2. Create controller in `app/Http/Controllers/Admin/`
3. Add routes with `auth` middleware
4. Create React components in `resources/js/Pages/Admin/`
5. Use `AdminLayout` for consistent admin UI

### Modifying Shared Data

Edit `app/Http/Middleware/HandleInertiaRequests.php` `share()` method to add data available to all Inertia pages.

### Working with Forms

- Lead forms POST to `/api/leads` (CSRF exempt)
- Contact forms POST to `/api/contact` (CSRF exempt)
- Use `useForm` from `@inertiajs/react` for admin forms
- Forms include Google reCAPTCHA and spam prevention

### Performance Optimization

After making changes that affect performance:

1. Rebuild assets: `npm run build`
2. Restart SSR: `pm2 restart inertia-ssr`
3. Clear caches: `php artisan cache:clear-all --warm-up`
4. Test with Lighthouse in Chrome DevTools
5. Target scores: 90+ mobile, 95+ desktop

## Important Files

- `deploy.sh` - Production deployment script
- `ssr-server.js` - SSR server entry point
- `ecosystem.config.cjs` - PM2 configuration
- `public/service-worker.js` - Offline/caching service worker
- `app/Services/CacheService.php` - Cache management
- `app/Http/Middleware/CacheResponse.php` - HTTP caching
- `bootstrap/app.php` - Application bootstrap, middleware registration
- `config/inertia.php` - SSR configuration

## Database Seeding

```bash
# Run seeders
php artisan db:seed

# Specific seeder
php artisan db:seed --class=BlogPostSeeder
```

## Environment Variables

Critical `.env` settings:
- `APP_NAME="Fast Home Cash Offers"` - Used in page titles
- `CACHE_STORE=database` (or `redis` for better performance)
- `VITE_APP_NAME="${APP_NAME}"` - Passed to frontend
- SSR enabled in `config/inertia.php`, not `.env`

## Production Checklist

Before deploying:
- [ ] Run `npm run build` (includes SSR)
- [ ] Set `APP_ENV=production` and `APP_DEBUG=false`
- [ ] Configure `CACHE_STORE=redis` (recommended)
- [ ] Start SSR server with PM2: `pm2 start ecosystem.config.cjs`
- [ ] Run `./deploy.sh` or manually clear/warm caches
- [ ] Verify SSR working: view-source should show rendered HTML
- [ ] Test Lighthouse score: should be 90+ mobile

## Troubleshooting

**Page shows blank/white screen:**
- Check SSR server is running: `pm2 status`
- Check browser console for JavaScript errors
- Verify build completed: `public/build/` and `bootstrap/ssr/` exist

**Title still shows "Laravel":**
- Update `.env`: `APP_NAME="Fast Home Cash Offers"`
- Clear config: `php artisan config:clear`
- Rebuild: `npm run build`
- Restart SSR: `pm2 restart inertia-ssr`
- Hard refresh browser (Ctrl+Shift+R)

**Stale cached data:**
- Clear all: `php artisan cache:clear-all --warm-up`
- Or manually: `Cache::forget('key')`

**Service worker issues:**
- Update `CACHE_VERSION` in `public/service-worker.js`
- Rebuild and clear browser cache

**React module duplication errors:**
- Don't split React/React-DOM/Inertia into separate chunks
- Current config in `vite.config.js` prevents this

## Reference Documentation

Additional docs in repository:
- `SSR-SETUP.md` - Detailed SSR configuration guide
- `CACHING-GUIDE.md` - Comprehensive caching documentation
- `DEPLOYMENT-CHECKLIST.md` - Production deployment steps
- `PERFORMANCE_OPTIMIZATION.md` - Performance tuning guide
