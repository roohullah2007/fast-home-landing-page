import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for lazy loading images on mobile devices
 * @param {string} src - The image source URL
 * @param {Object} options - Configuration options
 * @returns {Object} - { imageSrc, imageRef, isLoaded }
 */
export const useLazyLoad = (src, options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '50px',
        placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect width="1" height="1" fill="%23e5e7eb"/%3E%3C/svg%3E',
        mobileOnly = true
    } = options;

    const [imageSrc, setImageSrc] = useState(placeholder);
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        
        // If mobileOnly is true and we're not on mobile, load immediately
        if (mobileOnly && !isMobile) {
            setImageSrc(src);
            setIsLoaded(true);
            return;
        }

        const currentRef = imageRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Create new image to preload
                        const img = new Image();
                        img.src = src;
                        
                        img.onload = () => {
                            setImageSrc(src);
                            setIsLoaded(true);
                        };
                        
                        img.onerror = () => {
                            setImageSrc(src); // Still set the src even on error
                            setIsLoaded(true);
                        };
                        
                        // Unobserve after loading
                        observer.unobserve(currentRef);
                    }
                });
            },
            {
                threshold,
                rootMargin
            }
        );

        observer.observe(currentRef);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [src, threshold, rootMargin, placeholder, mobileOnly]);

    return {
        imageSrc,
        imageRef,
        isLoaded
    };
};