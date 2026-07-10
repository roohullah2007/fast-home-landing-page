# SSR Verification and Troubleshooting

## How to Verify SSR is Working

### Method 1: Check Page Source
1. Visit your website
2. Right-click → "View Page Source" (Ctrl+U)
3. Look for actual content in the HTML

**With SSR Working:**
```html
<div id="app" data-page="{...}">
  <div>
    <h1>Fast Home Cash Offers</h1>
    <p>Get a fair cash offer...</p>
    <!-- Actual rendered content here -->
  </div>
</div>
```

**Without SSR (Client-Side Only):**
```html
<div id="app" data-page="{...}"></div>
<!-- Empty div, content loaded by JavaScript -->
```

### Method 2: Disable JavaScript
1. Open DevTools (F12)
2. Ctrl+Shift+P → "Disable JavaScript"
3. Reload page
4. You should still see content (though not interactive)

### Method 3: Check Response Time
With SSR, the initial HTML response should contain rendered content immediately, not after JavaScript loads.

## Current Issues on fastcash.wpbun.xyz

Based on PageSpeed analysis, here are the problems:

### 1. Cache Headers Not Working
**Problem:** All assets show "Cache TTL: None"

**Solution:**
```bash
# On your server, check if mod_headers and mod_expires are enabled:
sudo a2enmod headers
sudo a2enmod expires
sudo systemctl restart apache2

# Or if using nginx, cache headers must be in nginx config
```

### 2. SSR Server Not Running
**Check if SSR is running:**
```bash
# SSH into your server
pm2 status

# Should show:
# │ inertia-ssr │ online │

# If not running:
pm2 start ecosystem.config.cjs
pm2 save
```

**Check SSR server directly:**
```bash
curl http://127.0.0.1:13714
# Should return: {"error":"Not found"}
```

### 3. Large JavaScript Bundles

**Current Issues:**
- vendor-C8QsXppn.js: 152.4 KiB (96.6 KiB unused)
- Need better code splitting

**Solutions Applied:**
- Split Headless UI into separate chunk (only loaded when needed)
- Keep React core minimal
- Lazy load charts

## Production Deployment Steps

### On Your Production Server:

```bash
# 1. Navigate to project
cd /path/to/your/project

# 2. Pull latest code
git pull origin main

# 3. Install dependencies
composer install --no-dev --optimize-autoloader
npm ci --production

# 4. Build assets (includes SSR)
npm run build

# 5. Verify SSR bundle exists
ls -lh bootstrap/ssr/assets/js/ssr-*.js
# Should show a file like: ssr-IHl9BQzx.js

# 6. Clear and optimize Laravel
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

# 7. Start/Restart SSR server
pm2 delete inertia-ssr  # If exists
pm2 start ecosystem.config.cjs
pm2 save

# 8. Check SSR is running
pm2 status
pm2 logs inertia-ssr --lines 50

# 9. Test SSR locally on server
curl -I http://127.0.0.1:13714
# Should return: HTTP/1.1 404 Not Found (this is expected)

# 10. Restart web server
sudo systemctl restart apache2
# or
sudo systemctl restart nginx

# 11. Warm up caches
php artisan cache:warm-up
```

## Apache Configuration for Cache Headers

If .htaccess isn't working, add this to your Apache VirtualHost config:

```apache
<VirtualHost *:80>
    ServerName fastcash.wpbun.xyz
    DocumentRoot /path/to/public

    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
    </IfModule>

    # Cache headers for static assets
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/webp "access plus 1 year"
        ExpiresByType image/svg+xml "access plus 1 year"
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType font/woff "access plus 1 year"
        ExpiresByType font/woff2 "access plus 1 year"
    </IfModule>

    <IfModule mod_headers.c>
        # Cache static assets
        <FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|css|js|woff|woff2|ttf|otf)$">
            Header set Cache-Control "public, max-age=31536000, immutable"
        </FilesMatch>
    </IfModule>
</VirtualHost>
```

Then reload Apache:
```bash
sudo apache2ctl configtest
sudo systemctl reload apache2
```

## Nginx Configuration (If Using Nginx)

```nginx
server {
    listen 80;
    server_name fastcash.wpbun.xyz;
    root /path/to/public;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_vary on;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2|ttf|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # PHP-FPM for Laravel
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

## Verify Everything is Working

```bash
# 1. Check cache headers
curl -I https://fastcash.wpbun.xyz/build/assets/js/vendor-C8QsXppn.js
# Should show: Cache-Control: public, max-age=31536000, immutable

# 2. Check if SSR rendered content
curl https://fastcash.wpbun.xyz | grep "Fast Home Cash Offers"
# Should find the text in HTML

# 3. Check SSR server logs
pm2 logs inertia-ssr --lines 20
# Should show successful renders

# 4. Performance test
# Run PageSpeed Insights again
# Should see improved scores
```

## Common SSR Issues

### Issue: SSR server crashes immediately

**Check logs:**
```bash
pm2 logs inertia-ssr --err --lines 50
```

**Common causes:**
- Port 13714 already in use
- Node modules not installed
- SSR bundle not built

**Solutions:**
```bash
# Kill process on port
lsof -ti:13714 | xargs kill -9

# Reinstall node modules
rm -rf node_modules
npm ci

# Rebuild
npm run build

# Restart
pm2 restart inertia-ssr
```

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Ensure production dependencies installed
npm ci --production=false
npm run build
pm2 restart inertia-ssr
```

### Issue: SSR works locally but not on server

**Check:**
1. Node version matches: `node -v` (should be 16+)
2. File permissions: `chmod -R 755 bootstrap/ssr`
3. SELinux not blocking: `sudo setenforce 0` (temporarily)

## Performance Targets

After fixing:
- **FCP**: < 1.8s (currently 2.6s)
- **LCP**: < 2.5s (currently 4.5s)
- **Mobile Score**: 90+ (currently 78)
- **Desktop Score**: 95+ (currently likely higher)

All assets should show "Cache TTL: 1 year" in PageSpeed Insights.

---

**Need Help?**
- Check PM2 logs: `pm2 logs inertia-ssr`
- Check Laravel logs: `tail -f storage/logs/laravel.log`
- Check web server logs: `tail -f /var/log/apache2/error.log`
