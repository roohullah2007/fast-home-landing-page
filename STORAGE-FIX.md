# Storage 403 Forbidden Error Fix

## Problem
Team member images are getting `403 Forbidden` errors on production:
```
GET https://fastcash.wpbun.xyz/storage/uploads/team/[image].jpg 403 (Forbidden)
```

## Root Cause
The Laravel storage symlink is missing or has incorrect permissions on your production server.

## Fix on Production Server

### Step 1: SSH into Your Production Server
```bash
ssh your-user@fastcash.wpbun.xyz
cd /path/to/your/laravel/app
```

### Step 2: Create Storage Symlink
```bash
php artisan storage:link
```

Expected output:
```
The [public/storage] link has been connected to [storage/app/public].
The links have been created.
```

### Step 3: Verify Symlink Was Created
```bash
ls -la public/ | grep storage
```

You should see:
```
lrwxrwxrwx ... storage -> /full/path/to/storage/app/public
```

### Step 4: Set Correct Permissions

```bash
# Make storage writable
chmod -R 775 storage
chmod -R 775 public/storage

# If using www-data as web server user
sudo chown -R www-data:www-data storage
sudo chown -R www-data:www-data public/storage
```

### Step 5: Verify Apache/Nginx Configuration

#### For Apache (.htaccess in public folder)
Make sure your `.htaccess` allows access to storage:
```apache
# Already configured - no changes needed
```

#### For Nginx
Add to your server block if not present:
```nginx
location ~ ^/storage/(.*)$ {
    try_files $uri $uri/ =404;
}
```

### Step 6: Test the Fix

Visit your site and check if images load:
```
https://fastcash.wpbun.xyz/storage/uploads/team/Sl8wa2BTgDvLP1eRK1Sw_1761246425.jpg
```

Should now return the image instead of 403.

## Alternative: Manual Symlink (if artisan fails)

If `php artisan storage:link` fails:

```bash
# Remove old symlink if exists
rm public/storage

# Create new symlink manually
ln -s ../storage/app/public public/storage

# Set permissions
chmod -R 775 storage
chmod -R 775 public/storage
```

## Troubleshooting

### If still getting 403:

1. **Check SELinux** (CentOS/RHEL):
```bash
sudo setenforce 0  # Temporary disable
# Or permanently:
sudo setsebool -P httpd_unified 1
```

2. **Check file ownership**:
```bash
ls -la storage/app/public/uploads/team/
# All files should be owned by your web server user (www-data, apache, nginx, etc.)
```

3. **Check directory permissions**:
```bash
# Should be at least 755
stat -c "%a" storage
stat -c "%a" storage/app
stat -c "%a" storage/app/public
```

4. **Check Apache error log**:
```bash
tail -f /var/log/apache2/error.log
# or
tail -f /var/log/httpd/error_log
```

## Verification Checklist

- [ ] Symlink exists: `ls -la public/storage`
- [ ] Points to correct location: should point to `../storage/app/public`
- [ ] Storage directory is writable: `chmod 775 storage`
- [ ] Files exist in storage: `ls storage/app/public/uploads/team/`
- [ ] Web server can access files: `curl -I https://fastcash.wpbun.xyz/storage/uploads/team/[filename].jpg`
- [ ] No 403 errors in browser console

## After Fix

Once fixed, all team member images should load correctly at:
```
https://fastcash.wpbun.xyz/storage/uploads/team/[filename].jpg
```
