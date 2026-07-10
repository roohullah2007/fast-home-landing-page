import React from 'react';
import { useLazyLoad } from '@/hooks/useLazyLoad';

/**
 * LazyImage component for optimized image loading
 * Automatically handles WebP format and lazy loading on mobile
 */
const LazyImage = ({ 
    src, 
    alt = '', 
    className = '',
    width,
    height,
    sizes,
    placeholder,
    eager = false,
    ...props 
}) => {
    // Skip lazy loading if eager is true
    const { imageSrc, imageRef, isLoaded } = useLazyLoad(src, {
        mobileOnly: !eager,
        placeholder
    });

    // Generate WebP source if the original is jpg/png
    const getWebPSrc = (originalSrc) => {
        if (!originalSrc) return null;
        
        // Check if it's a local image
        const isLocal = !originalSrc.startsWith('http://') && !originalSrc.startsWith('https://');
        if (!isLocal) return null;
        
        // Check if it's a jpg or png
        if (originalSrc.match(/\.(jpg|jpeg|png)$/i)) {
            return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        }
        
        return null;
    };

    const webpSrc = getWebPSrc(src);
    const finalSrc = eager ? src : imageSrc;

    // Generate sizes for responsive images
    const imageSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

    return (
        <picture>
            {webpSrc && (
                <source 
                    srcSet={webpSrc}
                    type="image/webp"
                    sizes={imageSizes}
                />
            )}
            <img
                ref={imageRef}
                src={finalSrc}
                alt={alt}
                width={width}
                height={height}
                className={`${className} ${!isLoaded && !eager ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                loading={eager ? 'eager' : 'lazy'}
                sizes={imageSizes}
                decoding={eager ? 'sync' : 'async'}
                {...props}
            />
        </picture>
    );
};

export default LazyImage;