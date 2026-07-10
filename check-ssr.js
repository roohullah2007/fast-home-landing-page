#!/usr/bin/env node

/**
 * SSR Verification Script
 * Checks if Server-Side Rendering is working correctly
 */

import https from 'https';
import http from 'http';

const PRODUCTION_URL = 'https://fastcash.wpbun.xyz';
const LOCAL_SSR_URL = 'http://127.0.0.1:13714';

console.log('🔍 Checking SSR Status...\n');

// Check if local SSR server is running
function checkLocalSSR() {
    return new Promise((resolve) => {
        console.log('1️⃣  Checking local SSR server on port 13714...');

        const req = http.get(LOCAL_SSR_URL, (res) => {
            if (res.statusCode === 404) {
                console.log('✅ Local SSR server is running (404 is expected)\n');
                resolve(true);
            } else {
                console.log(`⚠️  SSR server responded with status: ${res.statusCode}\n`);
                resolve(true);
            }
        });

        req.on('error', (err) => {
            console.log('❌ Local SSR server is NOT running!');
            console.log('   Start it with: npm run ssr:serve');
            console.log('   Or with PM2: pm2 start ecosystem.config.cjs\n');
            resolve(false);
        });

        req.setTimeout(3000, () => {
            req.destroy();
            console.log('⏱️  Connection timeout - SSR server may not be running\n');
            resolve(false);
        });
    });
}

// Check if production site has SSR-rendered HTML
function checkProductionSSR() {
    return new Promise((resolve) => {
        console.log('2️⃣  Checking production site for SSR-rendered content...');

        https.get(PRODUCTION_URL, (res) => {
            let html = '';

            res.on('data', (chunk) => {
                html += chunk;
            });

            res.on('end', () => {
                // Check if HTML contains rendered content inside #app div
                const appDivMatch = html.match(/<div id="app"[^>]*>([\s\S]*?)<\/div>/);

                if (appDivMatch && appDivMatch[1].trim().length > 100) {
                    console.log('✅ SSR is working! HTML contains pre-rendered content');
                    console.log(`   Content inside app div: ${appDivMatch[1].substring(0, 100)}...`);
                    resolve(true);
                } else {
                    console.log('❌ SSR NOT working! App div is empty or too small');
                    console.log('   Expected: Rendered HTML content');
                    console.log('   Found: Empty div (client-side rendering only)');
                    console.log('\n📋 Troubleshooting steps:');
                    console.log('   1. Make sure SSR server is running on production');
                    console.log('   2. Check PM2 status: pm2 status');
                    console.log('   3. Check SSR logs: pm2 logs inertia-ssr');
                    console.log('   4. Verify config/inertia.php has SSR enabled');
                    resolve(false);
                }
                console.log('');
            });
        }).on('error', (err) => {
            console.log('❌ Failed to check production site');
            console.log(`   Error: ${err.message}\n`);
            resolve(false);
        });
    });
}

// Check cache headers
function checkCacheHeaders() {
    return new Promise((resolve) => {
        console.log('3️⃣  Checking cache headers...');

        https.get(`${PRODUCTION_URL}/build/assets/js/vendor-CF2XpCjb.js`, (res) => {
            const cacheControl = res.headers['cache-control'];

            if (cacheControl && cacheControl.includes('max-age=31536000')) {
                console.log('✅ Cache headers are working!');
                console.log(`   Cache-Control: ${cacheControl}`);
            } else {
                console.log('❌ Cache headers NOT set properly');
                console.log(`   Found: ${cacheControl || 'none'}`);
                console.log('   Expected: public, max-age=31536000, immutable');
                console.log('\n📋 Troubleshooting:');
                console.log('   1. Enable Apache modules: sudo a2enmod headers expires');
                console.log('   2. Check if .htaccess is being read (AllowOverride All)');
                console.log('   3. Or add cache headers to VirtualHost config');
            }
            console.log('');
            resolve(cacheControl && cacheControl.includes('max-age'));
        }).on('error', (err) => {
            console.log(`⚠️  Could not check cache headers: ${err.message}\n`);
            resolve(false);
        });
    });
}

// Run all checks
async function runChecks() {
    const localSSR = await checkLocalSSR();
    const prodSSR = await checkProductionSSR();
    const cacheHeaders = await checkCacheHeaders();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Summary:');
    console.log(`   Local SSR Server: ${localSSR ? '✅' : '❌'}`);
    console.log(`   Production SSR: ${prodSSR ? '✅' : '❌'}`);
    console.log(`   Cache Headers: ${cacheHeaders ? '✅' : '❌'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (localSSR && prodSSR && cacheHeaders) {
        console.log('🎉 Everything is working perfectly!');
        console.log('   Your site should score 90+ on PageSpeed Insights.\n');
    } else {
        console.log('⚠️  Some issues found. Please fix them and run this script again.\n');
    }
}

runChecks().catch(console.error);
