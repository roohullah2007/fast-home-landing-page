import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const IMAGE_DIRS = [
    path.join(__dirname, '../public/images'),
    path.join(__dirname, '../storage/app/public/uploads')
];

const QUALITY = {
    webp: 85,
    jpg: 90
};

const MAX_WIDTH = {
    desktop: 1920,
    tablet: 1024,
    mobile: 768
};

/**
 * Convert image to WebP format
 */
async function convertToWebP(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
        return false;
    }

    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Skip if WebP already exists
    if (fs.existsSync(outputPath)) {
        console.log(`⏭️  Skipped: ${path.basename(outputPath)} (already exists)`);
        return false;
    }

    try {
        const metadata = await sharp(inputPath).metadata();
        
        // Convert to WebP
        await sharp(inputPath)
            .webp({ quality: QUALITY.webp })
            .toFile(outputPath);

        // Get file sizes
        const originalSize = fs.statSync(inputPath).size;
        const webpSize = fs.statSync(outputPath).size;
        const savings = ((1 - webpSize / originalSize) * 100).toFixed(2);

        console.log(`✅ Converted: ${path.basename(inputPath)} → WebP (${savings}% smaller)`);

        // Create responsive versions
        await createResponsiveVersions(inputPath, metadata);
        
        return true;
    } catch (error) {
        console.error(`❌ Failed: ${path.basename(inputPath)} - ${error.message}`);
        return false;
    }
}

/**
 * Create responsive versions of the image
 */
async function createResponsiveVersions(inputPath, metadata) {
    const dir = path.dirname(inputPath);
    const baseName = path.basename(inputPath, path.extname(inputPath));
    
    const versions = [
        { suffix: '-mobile', width: MAX_WIDTH.mobile },
        { suffix: '-tablet', width: MAX_WIDTH.tablet }
    ];

    for (const version of versions) {
        // Skip if image is already smaller than target width
        if (metadata.width <= version.width) continue;

        const outputPath = path.join(dir, `${baseName}${version.suffix}.webp`);
        
        // Skip if already exists
        if (fs.existsSync(outputPath)) continue;

        try {
            await sharp(inputPath)
                .resize(version.width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({ quality: QUALITY.webp - 5 }) // Slightly lower quality for smaller versions
                .toFile(outputPath);

            console.log(`  📱 Created ${version.suffix} version: ${baseName}${version.suffix}.webp`);
        } catch (error) {
            console.error(`  ❌ Failed to create ${version.suffix} version: ${error.message}`);
        }
    }
}

/**
 * Optimize original images (reduce size without changing format)
 */
async function optimizeOriginal(inputPath) {
    const ext = path.extname(inputPath).toLowerCase();
    
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
        return false;
    }

    const tempPath = inputPath + '.tmp';

    try {
        const metadata = await sharp(inputPath).metadata();
        
        // Skip if already optimized (has .min in filename)
        if (inputPath.includes('.min.')) {
            return false;
        }

        // Optimize based on format
        if (ext === '.png') {
            await sharp(inputPath)
                .png({ 
                    quality: 95,
                    compressionLevel: 9,
                    adaptiveFiltering: true
                })
                .toFile(tempPath);
        } else {
            await sharp(inputPath)
                .jpeg({ 
                    quality: QUALITY.jpg,
                    progressive: true,
                    mozjpeg: true
                })
                .toFile(tempPath);
        }

        const originalSize = fs.statSync(inputPath).size;
        const optimizedSize = fs.statSync(tempPath).size;

        // Only replace if we achieved significant savings (>10%)
        if (optimizedSize < originalSize * 0.9) {
            fs.renameSync(tempPath, inputPath);
            const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(2);
            console.log(`  🔧 Optimized original: ${path.basename(inputPath)} (${savings}% smaller)`);
            return true;
        } else {
            fs.unlinkSync(tempPath);
            return false;
        }
    } catch (error) {
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
        console.error(`  ❌ Optimization failed: ${error.message}`);
        return false;
    }
}

/**
 * Process all images in a directory
 */
async function processDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        console.log(`📁 Directory not found: ${dirPath}`);
        return { converted: 0, optimized: 0 };
    }

    console.log(`\n📁 Processing: ${dirPath}`);
    console.log('━'.repeat(50));

    let converted = 0;
    let optimized = 0;

    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dirPath, file.name);

        if (file.isDirectory()) {
            // Recursively process subdirectories
            const subResult = await processDirectory(fullPath);
            converted += subResult.converted;
            optimized += subResult.optimized;
        } else if (file.isFile()) {
            // Convert to WebP
            if (await convertToWebP(fullPath)) {
                converted++;
            }
            
            // Optimize original
            if (await optimizeOriginal(fullPath)) {
                optimized++;
            }
        }
    }

    return { converted, optimized };
}

/**
 * Main execution
 */
async function main() {
    console.log('🖼️  Image Optimization & WebP Conversion');
    console.log('═'.repeat(50));
    console.log(`Quality: WebP ${QUALITY.webp}%, JPEG ${QUALITY.jpg}%`);
    console.log(`Creating responsive versions for mobile & tablet`);

    let totalConverted = 0;
    let totalOptimized = 0;

    for (const dir of IMAGE_DIRS) {
        const result = await processDirectory(dir);
        totalConverted += result.converted;
        totalOptimized += result.optimized;
    }

    console.log('\n' + '═'.repeat(50));
    console.log('✨ Complete!');
    console.log(`   ${totalConverted} images converted to WebP`);
    console.log(`   ${totalOptimized} original images optimized`);
    
    if (totalConverted === 0 && totalOptimized === 0) {
        console.log('   All images are already optimized!');
    }
}

// Check if sharp is installed
try {
    await import('sharp');
    main().catch(console.error);
} catch (error) {
    console.error('⚠️  Sharp is not installed. Installing...');
    console.log('Run: npm install --save-dev sharp');
    process.exit(1);
}