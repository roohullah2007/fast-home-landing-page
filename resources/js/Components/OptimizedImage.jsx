import { useState, useEffect, useRef } from 'react';

/**
 * Optimized Image Component with WebP support, lazy loading, and progressive enhancement
 * Automatically handles WebP fallback for browsers that don't support it
 */
export default function OptimizedImage({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false,
    objectFit = 'cover',
    loading = 'lazy',
    onLoad,
    placeholder = 'blur',
    ...props
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef(null);

    // Generate WebP and fallback URLs
    const getImageUrls = (imageSrc) => {
        if (!imageSrc) return { webp: '', fallback: '' };

        // If it's an external URL, return as-is
        if (imageSrc.startsWith('http')) {
            return { webp: imageSrc, fallback: imageSrc };
        }

        // For local images, generate WebP version
        const ext = imageSrc.split('.').pop();
        const basePath = imageSrc.replace(`.${ext}`, '');

        return {
            webp: `${basePath}.webp`,
            fallback: imageSrc
        };
    };

    const { webp, fallback } = getImageUrls(src);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (priority || !imgRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before image enters viewport
            }
        );

        observer.observe(imgRef.current);

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
    };

    // Placeholder styles
    const placeholderStyle = {
        backgroundColor: '#f3f4f6',
        ...(placeholder === 'blur' && !isLoaded ? { filter: 'blur(10px)', transform: 'scale(1.1)' } : {})
    };

    return (
        <div
            ref={imgRef}
            className={`relative overflow-hidden ${className}`}
            style={{ width, height }}
        >
            {isInView ? (
                <picture>
                    {/* WebP version for modern browsers */}
                    <source srcSet={webp} type="image/webp" />

                    {/* Fallback for older browsers */}
                    <img
                        src={fallback}
                        alt={alt}
                        width={width}
                        height={height}
                        loading={priority ? 'eager' : loading}
                        decoding={priority ? 'sync' : 'async'}
                        onLoad={handleLoad}
                        className={`w-full h-full transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            objectFit,
                            ...placeholderStyle
                        }}
                        {...props}
                    />
                </picture>
            ) : (
                // Placeholder before image is in view
                <div
                    className="w-full h-full"
                    style={placeholderStyle}
                />
            )}
        </div>
    );
}
