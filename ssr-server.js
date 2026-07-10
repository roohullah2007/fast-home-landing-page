import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find the SSR bundle dynamically
const ssrPath = path.resolve(__dirname, 'bootstrap/ssr/assets/js');
const files = fs.readdirSync(ssrPath);
const ssrBundle = files.find(file => file.startsWith('ssr-') && file.endsWith('.js'));

if (!ssrBundle) {
    console.error('❌ SSR bundle not found! Please run "npm run build" first.');
    process.exit(1);
}

const ssrBundlePath = path.join(ssrPath, ssrBundle);
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
