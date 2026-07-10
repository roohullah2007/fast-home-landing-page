import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find the SSR bundle. Since the vite.config.js fix, the SSR entry is emitted
// unhashed at bootstrap/ssr/ssr.js (which Laravel's Inertia BundleDetector
// also requires). Fall back to scanning for a legacy hashed bundle.
let ssrBundlePath = path.resolve(__dirname, 'bootstrap/ssr/ssr.js');
let ssrBundle = 'ssr.js';

if (!fs.existsSync(ssrBundlePath)) {
    const legacyPath = path.resolve(__dirname, 'bootstrap/ssr/assets/js');
    const files = fs.existsSync(legacyPath) ? fs.readdirSync(legacyPath) : [];
    ssrBundle = files.find(file => file.startsWith('ssr-') && file.endsWith('.js'));

    if (!ssrBundle) {
        console.error('❌ SSR bundle not found! Please run "npm run build" first.');
        process.exit(1);
    }

    ssrBundlePath = path.join(legacyPath, ssrBundle);
}

// Convert Windows path to file:// URL for ESM import
const ssrBundleURL = pathToFileURL(ssrBundlePath).href;

console.log('🚀 Starting Inertia SSR server...');
console.log(`📦 Loading SSR bundle: ${ssrBundle}`);
console.log(`🌐 Server will listen on: http://127.0.0.1:13714`);
console.log('');

// Import and start the SSR bundle
import(ssrBundleURL)
    .then(() => {
        console.log('✅ SSR server started successfully!');
    })
    .catch((error) => {
        console.error('❌ Failed to start SSR server:', error);
        process.exit(1);
    });
