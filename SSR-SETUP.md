# Server-Side Rendering (SSR) Setup Guide

## Overview

Your application is now configured with Inertia.js SSR for improved performance and SEO. SSR requires running a Node.js server alongside your Laravel application.

## Current Status

✅ SSR configuration completed
✅ SSR build files generated
✅ SSR server script created
✅ Process manager configuration ready

## Quick Start

### Local Development

1. **Start the SSR server:**
   ```bash
   npm run ssr:serve
   ```

2. **Keep it running** in a separate terminal while developing

3. **Verify it's working:**
   - Visit your site: http://localhost
   - View page source (Ctrl+U)
   - You should see fully rendered HTML content, not just empty divs

### Production Deployment

#### Option 1: Using PM2 (Recommended)

PM2 is a process manager that keeps your SSR server running and restarts it automatically if it crashes.

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Start the SSR server:**
   ```bash
   pm2 start ecosystem.config.cjs
   ```

3. **Useful PM2 commands:**
   ```bash
   pm2 status                    # Check status
   pm2 logs inertia-ssr          # View logs
   pm2 restart inertia-ssr       # Restart server
   pm2 stop inertia-ssr          # Stop server
   pm2 delete inertia-ssr        # Remove from PM2

   # Make PM2 start on system boot
   pm2 startup
   pm2 save
   ```

#### Option 2: Using systemd (Linux servers)

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/inertia-ssr.service
```

Add the following (adjust paths):

```ini
[Unit]
Description=Inertia SSR Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/your/project
ExecStart=/usr/bin/node /path/to/your/project/ssr-server.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=inertia-ssr
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl enable inertia-ssr
sudo systemctl start inertia-ssr
sudo systemctl status inertia-ssr
```

#### Option 3: Using screen/tmux (Quick but not ideal)

```bash
# Using screen
screen -S ssr
npm run ssr:serve
# Press Ctrl+A then D to detach

# Reattach later with:
screen -r ssr
```

## Deployment Workflow

### Every time you deploy new code:

1. **Build the assets:**
   ```bash
   npm run build
   ```

2. **Restart the SSR server:**
   ```bash
   # If using PM2:
   pm2 restart inertia-ssr

   # If using systemd:
   sudo systemctl restart inertia-ssr

   # If running manually:
   # Stop the existing process and run: npm run ssr:serve
   ```

3. **Clear Laravel caches:**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

### Automated Deployment Script

Use the included `deploy.sh` script:

```bash
chmod +x deploy.sh
./deploy.sh
```

This script will:
- Clear all Laravel caches
- Optimize for production
- Automatically restart the SSR server (if using PM2)

## Verifying SSR is Working

### Method 1: View Page Source

1. Visit your website
2. Right-click → "View Page Source" (or press Ctrl+U)
3. Search for your page content in the HTML

**Without SSR:** You'll see mostly empty `<div id="app"></div>`

**With SSR:** You'll see fully rendered HTML content with all your text and components

### Method 2: Check Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Reload the page
4. Check the initial document response
5. It should contain rendered HTML content

### Method 3: Disable JavaScript

1. Open DevTools (F12)
2. Press Ctrl+Shift+P → type "Disable JavaScript"
3. Reload the page
4. With SSR, you should still see content (though interactive features won't work)

## Troubleshooting

### SSR server won't start

**Error:** `SSR bundle not found`
```bash
# Solution: Build the SSR bundle first
npm run build
```

**Error:** `Port 13714 already in use`
```bash
# Solution: Stop the existing SSR server
pm2 stop inertia-ssr
# or find and kill the process:
lsof -ti:13714 | xargs kill -9  # Linux/Mac
netstat -ano | findstr :13714   # Windows (then kill the PID)
```

### SSR server crashes frequently

Check logs for errors:
```bash
pm2 logs inertia-ssr

# Or check Laravel logs
tail -f storage/logs/ssr-error.log
```

Common causes:
- Memory issues: Increase `max_memory_restart` in `ecosystem.config.cjs`
- Code errors: Check for server-side incompatible code (like `window`, `document`)
- Missing dependencies: Ensure all npm packages are installed

### Laravel can't connect to SSR server

1. **Check if SSR server is running:**
   ```bash
   curl http://127.0.0.1:13714
   # Should return: {"error":"Not found"}
   ```

2. **Check `config/inertia.php`:**
   ```php
   'ssr' => [
       'enabled' => true,
       'url' => 'http://127.0.0.1:13714',
   ],
   ```

3. **Verify firewall isn't blocking port 13714**

### Pages show blank or errors

1. **Check browser console for errors**
2. **Verify all JavaScript is built correctly**
3. **Try disabling SSR temporarily:**
   ```php
   // config/inertia.php
   'ssr' => [
       'enabled' => false,  // Temporarily disable
   ],
   ```

## Performance Benefits

With SSR enabled, you should see:

✅ **Faster First Contentful Paint (FCP)** - Content appears quicker
✅ **Better SEO** - Search engines can read your content
✅ **Improved Lighthouse scores** - Performance score should increase significantly
✅ **Faster perceived load times** - Users see content while JavaScript loads

## Server Requirements

- Node.js 16.x or higher
- 512MB RAM minimum per SSR process
- Port 13714 open for localhost connections
- Process manager (PM2 recommended) for production

## Files Reference

- `ssr-server.js` - SSR server startup script
- `ecosystem.config.cjs` - PM2 configuration
- `config/inertia.php` - Laravel SSR configuration
- `resources/js/ssr.jsx` - SSR entry point
- `bootstrap/ssr/` - Built SSR bundle (auto-generated)

## Additional Resources

- [Inertia.js SSR Documentation](https://inertiajs.com/server-side-rendering)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Laravel Inertia SSR Guide](https://laravel.com/docs/vite#react)

---

**Need Help?** Check the logs first, they usually contain the answer:
```bash
# PM2 logs
pm2 logs inertia-ssr

# Laravel logs
tail -f storage/logs/laravel.log

# SSR logs (if using systemd)
sudo journalctl -u inertia-ssr -f
```
