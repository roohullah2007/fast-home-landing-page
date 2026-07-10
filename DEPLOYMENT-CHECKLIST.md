# 🚀 Production Deployment Checklist

## Before Deployment

- [ ] All code committed to git
- [ ] Tests passing locally
- [ ] `.env` updated with correct `APP_NAME="Fast Home Cash Offers"`
- [ ] Build assets locally to verify: `npm run build`

## On Production Server

### 1. Update Code
```bash
git pull origin main
# or upload files via FTP/SSH
```

### 2. Install/Update Dependencies
```bash
composer install --no-dev --optimize-autoloader
npm install --production
```

### 3. Build Assets
```bash
npm run build
```
This creates:
- `public/build/` - Client-side assets
- `bootstrap/ssr/` - SSR server bundle

### 4. Update Environment
Ensure production `.env` has:
```env
APP_NAME="Fast Home Cash Offers"
APP_ENV=production
APP_DEBUG=false
```

### 5. Clear & Optimize Caches
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 6. Start/Restart SSR Server

**First Time Setup:**
```bash
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # Follow the instructions it gives you
```

**For Updates:**
```bash
pm2 restart inertia-ssr
```

**Or use the automated script:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### 7. Verify Deployment

- [ ] Visit website - no errors
- [ ] Check title shows "Fast Home Cash Offers"
- [ ] View page source - see rendered HTML content (SSR working)
- [ ] Check browser console - no JavaScript errors
- [ ] Test mobile responsiveness
- [ ] Run Lighthouse audit - Performance > 90%

## Quick Commands Reference

```bash
# Deploy everything
npm run build && ./deploy.sh

# Just restart SSR
pm2 restart inertia-ssr

# Check SSR status
pm2 status
pm2 logs inertia-ssr

# Check if SSR port is open
curl http://127.0.0.1:13714

# Clear all caches
php artisan optimize:clear

# View Laravel logs
tail -f storage/logs/laravel.log
```

## Troubleshooting

### Title still shows "Laravel"
```bash
# Clear config cache on production
php artisan config:clear
php artisan config:cache

# Rebuild assets
npm run build
pm2 restart inertia-ssr

# Hard refresh browser (Ctrl+Shift+R)
```

### SSR not working
```bash
# Check if SSR server is running
pm2 status

# View SSR logs
pm2 logs inertia-ssr

# Restart SSR server
pm2 restart inertia-ssr

# If still issues, rebuild:
npm run build
pm2 restart inertia-ssr
```

### Performance issues
```bash
# Check PHP opcache is enabled
php -i | grep opcache

# Optimize Laravel
php artisan optimize

# Check SSR server memory
pm2 monit
```

## Rollback Plan

If deployment fails:

1. **Revert code:**
   ```bash
   git reset --hard HEAD~1
   ```

2. **Restore assets:**
   ```bash
   npm run build
   ```

3. **Restart services:**
   ```bash
   pm2 restart inertia-ssr
   php artisan optimize:clear
   ```

## Performance Targets

After deployment, verify these metrics with Lighthouse:

- **Performance:** 90-95% (Mobile), 95-99% (Desktop)
- **Accessibility:** 90+%
- **Best Practices:** 100%
- **SEO:** 90+%

Key metrics:
- **FCP:** < 1.8s
- **LCP:** < 2.5s
- **TBT:** < 200ms
- **CLS:** < 0.1

---

**Last Updated:** $(date +"%Y-%m-%d")
