@echo off
REM Deployment script for Fast Home Cash Offers (Windows)
REM This script handles cache clearing and optimization after deployment

echo Starting deployment process...
echo.

REM Create storage symlink (fix 403 errors for uploaded images)
echo Creating storage symlink...
php artisan storage:link
echo.

REM Clear all Laravel caches
echo Clearing Laravel caches...
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
echo.

REM Optimize for production
echo Optimizing for production...
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo.

echo Deployment complete!
echo.
echo Next steps:
echo 1. Clear your browser cache (Ctrl+Shift+R)
echo 2. Verify the site title shows 'Fast Home Cash Offers'
echo.
pause
