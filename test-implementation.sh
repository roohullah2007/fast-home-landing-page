#!/bin/bash

# Quick test script to verify the spam protection implementation

echo "=== Testing FastHomeCash Spam Protection Implementation ==="
echo ""

# Test 1: Check if all required files exist
echo "🔍 Checking required files..."

files=(
    "app/Services/RecaptchaService.php"
    "app/Services/SpamProtectionService.php"
    "app/Models/SpamLog.php"
    "app/Http/Controllers/Admin/SpamProtectionController.php"
    "resources/js/hooks/useConfig.js"
    "resources/js/hooks/useRecaptcha.js"
    "resources/js/hooks/useGooglePlaces.js"
    "resources/js/Components/Shared/RecaptchaV2.jsx"
    "resources/js/Components/Shared/AddressAutocomplete.jsx"
    "database/migrations/2025_01_09_create_spam_logs_table.php"
)

all_files_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        all_files_exist=false
    fi
done

echo ""

# Test 2: Check environment configuration
echo "🔧 Checking .env configuration..."

if [ -f ".env" ]; then
    echo "✅ .env file exists"
    
    # Check for new environment variables
    env_vars=(
        "GOOGLE_RECAPTCHA_SITE_KEY"
        "GOOGLE_RECAPTCHA_SECRET_KEY"
        "GOOGLE_PLACES_API_KEY"
    )
    
    for var in "${env_vars[@]}"; do
        if grep -q "^$var=" .env; then
            echo "✅ $var is configured"
        else
            echo "⚠️  $var not found in .env"
        fi
    done
else
    echo "❌ .env file not found"
    all_files_exist=false
fi

echo ""

# Test 3: PHP syntax check
echo "🔍 Checking PHP syntax..."

php_files=(
    "app/Services/RecaptchaService.php"
    "app/Services/SpamProtectionService.php"
    "app/Models/SpamLog.php"
    "app/Http/Controllers/Admin/SpamProtectionController.php"
    "app/Http/Controllers/LeadController.php"
    "app/Http/Controllers/ContactController.php"
)

syntax_ok=true
for file in "${php_files[@]}"; do
    if [ -f "$file" ]; then
        if php -l "$file" > /dev/null 2>&1; then
            echo "✅ $file syntax OK"
        else
            echo "❌ $file syntax error"
            php -l "$file"
            syntax_ok=false
        fi
    fi
done

echo ""

# Test 4: Check Laravel configuration
echo "🔧 Testing Laravel configuration..."

if command -v php > /dev/null && [ -f "artisan" ]; then
    echo "✅ PHP and Laravel artisan available"
    
    # Test config cache
    if php artisan config:cache > /dev/null 2>&1; then
        echo "✅ Configuration cache successful"
    else
        echo "❌ Configuration cache failed"
        syntax_ok=false
    fi
    
    # Test route cache
    if php artisan route:cache > /dev/null 2>&1; then
        echo "✅ Route cache successful"
    else
        echo "❌ Route cache failed"
        syntax_ok=false
    fi
else
    echo "❌ PHP or Laravel artisan not available"
    syntax_ok=false
fi

echo ""

# Summary
echo "=== Test Summary ==="
if [ "$all_files_exist" = true ] && [ "$syntax_ok" = true ]; then
    echo "🎉 All tests passed! Implementation looks good."
    echo ""
    echo "Next steps:"
    echo "1. Run: php artisan migrate"
    echo "2. Configure Google API keys in .env"
    echo "3. Build frontend: npm run build"
    echo "4. Test forms on your website"
else
    echo "❌ Some tests failed. Please review the errors above."
fi
