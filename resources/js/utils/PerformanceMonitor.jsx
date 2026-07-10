import { useEffect } from 'react';

/**
 * Performance Monitoring Utility
 * Tracks Core Web Vitals and other performance metrics
 */
export function usePerformanceMonitor() {
    useEffect(() => {
        if (typeof window === 'undefined' || !window.performance) return;

        // Track page load time
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;

            console.log('Performance Metrics:', {
                pageLoadTime: `${pageLoadTime}ms`,
                connectTime: `${connectTime}ms`,
                renderTime: `${renderTime}ms`,
            });
        });

        // Track Core Web Vitals (LCP, FID, CLS)
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // LCP not supported
            }

            // First Input Delay
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                // FID not supported
            }

            // Cumulative Layout Shift
            try {
                let clsScore = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (!entry.hadRecentInput) {
                            clsScore += entry.value;
                            console.log('CLS:', clsScore);
                        }
                    });
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                // CLS not supported
            }
        }
    }, []);
}

/**
 * Prefetch links for faster navigation
 */
export function usePrefetch(urls = []) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prefetchLink = (url) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        };

        urls.forEach(prefetchLink);
    }, [urls]);
}

/**
 * Preconnect to external domains
 */
export function usePreconnect(domains = []) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        domains.forEach((domain) => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }, [domains]);
}

export default {
    usePerformanceMonitor,
    usePrefetch,
    usePreconnect,
};
