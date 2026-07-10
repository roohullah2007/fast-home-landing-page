# Fast Home Cash Offers - Project Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Installation Steps](#installation-steps)
4. [Configuration](#configuration)
5. [Database Setup](#database-setup)
6. [Frontend Setup](#frontend-setup)
7. [Third-party Integrations](#third-party-integrations)
8. [Testing Setup](#testing-setup)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- **PHP**: 8.1 or higher
- **Node.js**: 18.x or higher
- **MySQL**: 8.0 or higher
- **Redis**: 6.x or higher
- **Composer**: Latest version
- **NPM/Yarn**: Latest version

### Development Tools
- **Git**: Version control
- **Code Editor**: VS Code (recommended)
- **API Testing**: Postman or Insomnia
- **Database Tool**: phpMyAdmin, MySQL Workbench, or TablePlus

### Server Requirements (Production)
- **Memory**: Minimum 2GB RAM (4GB recommended)
- **Storage**: Minimum 20GB SSD
- **Bandwidth**: Unmetered
- **SSL Certificate**: Required for production

## Environment Setup

### 1. Install PHP and Extensions

#### Ubuntu/Debian
```bash
# Update package list
sudo apt update

# Install PHP 8.1 and required extensions
sudo apt install php8.1-fpm php8.1-cli php8.1-mysql php8.1-xml php8.1-curl \
php8.1-gd php8.1-mbstring php8.1-zip php8.1-intl php8.1-bcmath \
php8.1-redis php8.1-imagick

# Verify PHP installation
php -v
```

#### macOS (using Homebrew)
```bash
# Install PHP
brew install php@8.1

# Install extensions
brew install redis

# Add PHP to PATH
echo 'export PATH="/usr/local/opt/php@8.1/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

#### Windows
1. Download PHP 8.1 from [php.net](https://windows.php.net/download/)
2. Extract to `C:\php`
3. Add `C:\php` to system PATH
4. Copy `php.ini-development` to `php.ini`
5. Enable required extensions in `php.ini`

### 2. Install Composer
```bash
# Download and install Composer globally
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Verify installation
composer --version
```

### 3. Install Node.js and NPM
```bash
# Using Node Version Manager (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js 18
nvm install 18
nvm use 18

# Verify installation
node --version
npm --version
```

### 4. Install MySQL
```bash
# Ubuntu/Debian
sudo apt install mysql-server mysql-client

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure MySQL installation
sudo mysql_secure_installation
```

### 5. Install Redis
```bash
# Ubuntu/Debian
sudo apt install redis-server

# Start Redis service
sudo systemctl start redis
sudo systemctl enable redis

# Test Redis
redis-cli ping
```

## Installation Steps

### 1. Clone Repository
```bash
# Clone the project
git clone https://github.com/your-repo/fasthomecashoffers.git
cd fasthomecashoffers

# Create development branch
git checkout -b development
```

### 2. Install Laravel React Starter Kit
```bash
# Install Laravel with React preset
composer create-project laravel/laravel . --prefer-dist

# Install Laravel Breeze with React
composer require laravel/breeze --dev
php artisan breeze:install react

# Install additional packages
composer require laravel/sanctum
composer require spatie/laravel-permission
composer require intervention/image
composer require league/flysystem-aws-s3-v3
```

### 3. Install Frontend Dependencies
```bash
# Install Node.js dependencies
npm install

# Install additional React packages
npm install @headlessui/react @heroicons/react
npm install react-hook-form yup
npm install axios react-query
npm install chart.js react-chartjs-2
npm install leaflet react-leaflet

# Install development dependencies
npm install --save-dev @tailwindcss/forms @tailwindcss/typography
```

### 4. Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

Edit `.env` file with your configuration:
```env
APP_NAME="Fast Home Cash Offers"
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fasthomecash
DB_USERNAME=your_username
DB_PASSWORD=your_password

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="noreply@fasthomecashoffers.com"
MAIL_FROM_NAME="${APP_NAME}"

# Google Services
GOOGLE_RECAPTCHA_SITE_KEY=your_site_key
GOOGLE_RECAPTCHA_SECRET_KEY=your_secret_key
GOOGLE_ANALYTICS_ID=GA4_measurement_id
GOOGLE_TAG_MANAGER_ID=GTM_container_id

# AWS (for file storage)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your_bucket_name

# SendGrid (for emails)
SENDGRID_API_KEY=your_sendgrid_api_key

# Twilio (for SMS - optional)
TWILIO_SID=your_twilio_sid
TWILIO_TOKEN=your_twilio_token
TWILIO_FROM=your_twilio_phone
```

## Database Setup

### 1. Create Database
```sql
-- Connect to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE fasthomecash CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create database user (optional)
CREATE USER 'fasthomecash_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON fasthomecash.* TO 'fasthomecash_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Run Migrations
```bash
# Run database migrations
php artisan migrate

# Seed database with initial data
php artisan db:seed
```

### 3. Create Database Migrations
```bash
# Create migrations for all tables
php artisan make:migration create_leads_table
php artisan make:migration create_utm_tracking_table
php artisan make:migration create_careers_table
php artisan make:migration create_applications_table
php artisan make:migration create_blog_posts_table
php artisan make:migration create_seo_settings_table

# Create models with factories and seeders
php artisan make:model Lead -mfs
php artisan make:model UTMTracking -mfs
php artisan make:model Career -mfs
php artisan make:model Application -mfs
php artisan make:model BlogPost -mfs
php artisan make:model SEOSetting -mfs
```

### 4. Sample Migration File
```php
<?php
// database/migrations/xxxx_create_leads_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('property_address');
            $table->enum('property_type', ['single_family', 'condo', 'townhouse', 'multi_family', 'other']);
            $table->enum('property_condition', ['excellent', 'good', 'fair', 'poor', 'needs_major_repairs']);
            $table->enum('timeline', ['asap', '1_month', '3_months', '6_months', 'flexible']);
            $table->string('contact_name');
            $table->string('contact_phone');
            $table->string('contact_email');
            $table->enum('status', ['new', 'contacted', 'qualified', 'appointment_set', 'offer_made', 'under_contract', 'closed', 'lost', 'disqualified'])->default('new');
            $table->string('source')->nullable();
            $table->unsignedBigInteger('assigned_to')->nullable();
            $table->decimal('estimated_value', 10, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('set null');
            $table->index(['status', 'created_at']);
            $table->index(['assigned_to']);
            $table->index(['contact_email']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('leads');
    }
};
```

## Frontend Setup

### 1. Configure Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### 2. Configure Vite
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
```

### 3. Setup React Application Structure
```bash
# Create directory structure
mkdir -p resources/js/{components,pages,hooks,services,utils,contexts}
mkdir -p resources/js/components/{common,forms,dashboard,public}

# Create main App component
touch resources/js/App.jsx
touch resources/js/app.jsx

# Create routing setup
touch resources/js/router.jsx
```

### 4. Basic React App Setup
```jsx
// resources/js/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </Layout>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
```

## Third-Party Integrations

### 1. Google reCAPTCHA v3
```bash
# Install reCAPTCHA package
composer require google/recaptcha
```

```javascript
// Install React reCAPTCHA
npm install react-google-recaptcha-v3
```

```jsx
// Setup reCAPTCHA in React
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function App() {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
            <YourComponent />
        </GoogleReCaptchaProvider>
    );
}
```

### 2. Google Analytics 4
```bash
# Install GA4 package
npm install @google-analytics/data
```

```javascript
// resources/js/utils/analytics.js
export const gtag = (...args) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
};

export const initGA = (measurementId) => {
    gtag('js', new Date());
    gtag('config', measurementId);
};

export const trackEvent = (eventName, parameters = {}) => {
    gtag('event', eventName, parameters);
};
```

### 3. SendGrid Email Integration
```bash
# Install SendGrid
composer require sendgrid/sendgrid
```

```php
// config/mail.php - Add SendGrid configuration
'sendgrid' => [
    'driver' => 'smtp',
    'host' => 'smtp.sendgrid.net',
    'port' => 587,
    'encryption' => 'tls',
    'username' => 'apikey',
    'password' => env('SENDGRID_API_KEY'),
],
```

### 4. AWS S3 for File Storage
```bash
# Install AWS SDK
composer require aws/aws-sdk-php
```

```php
// config/filesystems.php
's3' => [
    'driver' => 's3',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION'),
    'bucket' => env('AWS_BUCKET'),
    'url' => env('AWS_URL'),
    'endpoint' => env('AWS_ENDPOINT'),
    'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
],
```

## Testing Setup

### 1. Install Testing Dependencies
```bash
# Install PHP testing tools
composer require --dev phpunit/phpunit
composer require --dev mockery/mockery
composer require --dev fakerphp/faker

# Install JavaScript testing tools
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
```

### 2. Configure PHPUnit
```xml
<!-- phpunit.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="./vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true">
    <testsuites>
        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
    </testsuites>
    <coverage processUncoveredFiles="true">
        <include>
            <directory suffix=".php">./app</directory>
        </include>
    </coverage>
    <php>
        <server name="APP_ENV" value="testing"/>
        <server name="BCRYPT_ROUNDS" value="4"/>
        <server name="CACHE_DRIVER" value="array"/>
        <server name="DB_CONNECTION" value="sqlite"/>
        <server name="DB_DATABASE" value=":memory:"/>
        <server name="MAIL_MAILER" value="array"/>
        <server name="QUEUE_CONNECTION" value="sync"/>
        <server name="SESSION_DRIVER" value="array"/>
        <server name="TELESCOPE_ENABLED" value="false"/>
    </php>
</phpunit>
```

### 3. Create Sample Tests
```php
<?php
// tests/Feature/LeadTest.php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LeadTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_lead()
    {
        $leadData = [
            'property_address' => '123 Test St, Test City, TS 12345',
            'property_type' => 'single_family',
            'property_condition' => 'good',
            'timeline' => 'asap',
            'contact_name' => 'John Doe',
            'contact_phone' => '+1234567890',
            'contact_email' => 'john@example.com',
        ];

        $response = $this->postJson('/api/leads', $leadData);

        $response->assertStatus(201)
                ->assertJson(['success' => true]);

        $this->assertDatabaseHas('leads', [
            'contact_email' => 'john@example.com'
        ]);
    }
}
```

## Development Workflow

### 1. Start Development Servers
```bash
# Terminal 1 - Start Laravel development server
php artisan serve

# Terminal 2 - Start Vite development server
npm run dev

# Terminal 3 - Start queue worker
php artisan queue:work

# Terminal 4 - Start scheduler (for production)
php artisan schedule:work
```

### 2. Database Operations
```bash
# Fresh migration with seeding
php artisan migrate:fresh --seed

# Create new migration
php artisan make:migration add_column_to_table

# Create model with migration
php artisan make:model ModelName -m

# Create controller
php artisan make:controller API/LeadController --api
```

### 3. Frontend Development
```bash
# Build for development
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Deployment

### 1. Production Server Setup
```bash
# Install required software
sudo apt update
sudo apt install nginx mysql-server redis-server
sudo apt install php8.1-fpm php8.1-mysql php8.1-redis

# Configure Nginx
sudo nano /etc/nginx/sites-available/fasthomecashoffers.com
```

### 2. Nginx Configuration
```nginx
server {
    listen 80;
    server_name fasthomecashoffers.com www.fasthomecashoffers.com;
    root /var/www/fasthomecashoffers/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### 3. SSL Certificate Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d fasthomecashoffers.com -d www.fasthomecashoffers.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 4. Deployment Script
```bash
#!/bin/bash
# deploy.sh

# Pull latest code
git pull origin main

# Install/update dependencies
composer install --no-dev --optimize-autoloader
npm ci
npm run build

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Restart services
sudo systemctl restart nginx
sudo systemctl restart php8.1-fpm
sudo supervisorctl restart all

echo "Deployment completed successfully!"
```

## Troubleshooting

### Common Issues

#### Permission Issues
```bash
# Fix storage permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

#### Database Connection Issues
```bash
# Check MySQL service
sudo systemctl status mysql

# Test connection
php artisan tinker
>>> DB::connection()->getPdo();
```

#### Redis Connection Issues
```bash
# Check Redis service
sudo systemctl status redis

# Test Redis connection
redis-cli ping
```

#### Composer Issues
```bash
# Clear Composer cache
composer clear-cache

# Update Composer
composer self-update

# Reinstall dependencies
rm -rf vendor
composer install
```

#### NPM Issues
```bash
# Clear NPM cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Performance Issues

#### Slow Page Loads
1. Enable opcache in `php.ini`
2. Use Redis for caching
3. Optimize database queries
4. Enable compression in Nginx
5. Use CDN for static assets

#### High Memory Usage
1. Increase PHP memory limit
2. Optimize database queries
3. Use pagination for large datasets
4. Implement proper caching

### Security Issues

#### Blocked by Firewall
```bash
# Check firewall status
sudo ufw status

# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443
```

#### File Upload Issues
```bash
# Check PHP upload settings
php -i | grep upload

# Increase limits in php.ini
upload_max_filesize = 10M
post_max_size = 10M
max_file_uploads = 20
```

---

## Next Steps

After completing the setup:

1. **Configure Google Analytics and Search Console**
2. **Set up monitoring and alerting**
3. **Create backup procedures**
4. **Implement proper logging**
5. **Set up automated testing pipeline**
6. **Configure staging environment**
7. **Create documentation for content management**
8. **Set up performance monitoring**

## Support Resources

- **Laravel Documentation**: https://laravel.com/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Project Repository**: https://github.com/your-repo/fasthomecashoffers
- **Issue Tracking**: Use GitHub Issues for bug reports
- **Team Communication**: Slack/Discord channel

---

**Document Version:** 1.0  
**Created:** June 16, 2025  
**Last Updated:** June 16, 2025  
**Next Review:** July 1, 2025