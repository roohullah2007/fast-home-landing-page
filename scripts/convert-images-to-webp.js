#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts all JPG/PNG images to WebP format for better performance
 *
 * Usage: node scripts/convert-images-to-webp.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to process
const directories = [
    'public/images',
    'storage/app/public/uploads',
];

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png'];

/**
 * Check if ImageMagick or Sharp is installed
 */
function checkDependencies() {
    try {
        execSync('convert -version', { stdio: 'ignore' });
        console.log('✅ ImageMagick found');
        return 'imagemagick';
    } catch (e) {
        console.log('❌ ImageMagick not found');
        console.log('Install with: sudo apt-get install imagemagick (Linux) or brew install imagemagick (Mac)');
        console.log('\nOr install Sharp: npm install sharp --save-dev');
        return null;
    }
}

/**
 * Convert image to WebP using ImageMagick
 */
function convertToWebP(inputPath, quality = 85) {
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    // Skip if WebP already exists and is newer
    if (fs.existsSync(outputPath)) {
        const inputStat = fs.statSync(inputPath);
        const outputStat = fs.statSync(outputPath);
        if (outputStat.mtime > inputStat.mtime) {
            console.log(`⏭️  Skipped (already exists): ${outputPath}`);
            return;
        }
    }

    try {
        execSync(`convert "${inputPath}" -quality ${quality} "${outputPath}"`, { stdio: 'inherit' });
        console.log(`✅ Converted: ${outputPath}`);
    } catch (e) {
        console.error(`❌ Failed to convert: ${inputPath}`);
        console.error(e.message);
    }
}

/**
 * Recursively find and convert images
 */
function processDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.log(`⚠️  Directory not found: ${directory}`);
        return;
    }

    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (imageExtensions.includes(ext)) {
                convertToWebP(filePath);
            }
        }
    });
}

/**
 * Main execution
 */
function main() {
    console.log('🚀 Starting Image Optimization...\n');

    const tool = checkDependencies();
    if (!tool) {
        process.exit(1);
    }

    console.log('\n📂 Processing directories...\n');

    directories.forEach(dir => {
        console.log(`\n📁 Processing: ${dir}`);
        processDirectory(dir);
    });

    console.log('\n✨ Image optimization complete!\n');
    console.log('📊 Recommendations:');
    console.log('   1. Update image references to use <picture> with WebP');
    console.log('   2. Use OptimizedImage component for automatic WebP/fallback');
    console.log('   3. Configure server to serve WebP when supported');
}

main();
