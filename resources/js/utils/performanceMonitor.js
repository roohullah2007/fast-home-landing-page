/**
 * Performance Monitoring Utility
 * Tracks page load metrics and identifies performance bottlenecks
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
        this.init();
    }

    init() {
        if (typeof window === 'undefined' || !window.performance) {
            console.log('Performance API not available');
            return;
        }

        // Start monitoring when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startMonitoring());
        } else {
            this.startMonitoring();
        }

        // Monitor when page is fully loaded
        window.addEventListener('load', () => this.collectMetrics());
    }

    startMonitoring() {
        this.monitorLCP();
        this.monitorFID();
        this.monitorCLS();
        this.monitorResources();
        this.monitorLongTasks();
    }

    // Largest Contentful Paint
    monitorLCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
            });

            observer.observe({ type: 'largest-contentful-paint', buffered: true });
            this.observers.push(observer);
        } catch (e) {
            console.log('LCP monitoring not supported');
        }
    }

    // First Input Delay
    monitorFID() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                });
            });

            observer.observe({ type: 'first-input', buffered: true });
            this.observers.push(observer);
        } catch (e) {
            console.log('FID monitoring not supported');
        }
    }

    // Cumulative Layout Shift
    monitorCLS() {
        let clsValue = 0;
        let clsEntries = [];

        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        clsEntries.push({
                            value: entry.value,
                            time: entry.startTime
                        });
                    }
                }
                this.metrics.cls = clsValue;
            });

            observer.observe({ type: 'layout-shift', buffered: true });
            this.observers.push(observer);
        } catch (e) {
            console.log('CLS monitoring not supported');
        }
    }

    // Monitor resource loading
    monitorResources() {
        const resources = performance.getEntriesByType('resource');
        
        const slowResources = [];
        const largeResources = [];
        
        resources.forEach(resource => {
            // Find slow resources (>1s)
            if (resource.duration > 1000) {
                slowResources.push({
                    name: resource.name,
                    duration: resource.duration,
                    type: resource.initiatorType
                });
            }
            
            // Find large resources (>500KB)
            if (resource.transferSize > 500000) {
                largeResources.push({
                    name: resource.name,
                    size: resource.transferSize,
                    type: resource.initiatorType
                });
            }
        });

        if (slowResources.length > 0) {
            this.metrics.slowResources = slowResources;
            console.warn('🐌 Slow resources detected:', slowResources);
        }

        if (largeResources.length > 0) {
            this.metrics.largeResources = largeResources;
            console.warn('📦 Large resources detected:', largeResources);
        }
    }

    // Monitor long tasks
    monitorLongTasks() {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`);
                        
                        if (!this.metrics.longTasks) {
                            this.metrics.longTasks = [];
                        }
                        
                        this.metrics.longTasks.push({
                            duration: entry.duration,
                            startTime: entry.startTime
                        });
                    }
                }
            });

            observer.observe({ entryTypes: ['longtask'] });
            this.observers.push(observer);
        } catch (e) {
            console.log('Long task monitoring not supported');
        }
    }

    // Collect all metrics
    collectMetrics() {
        // Navigation timing
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
            this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            this.metrics.loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
        }

        // Paint timing
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
                this.metrics.fcp = entry.startTime;
            }
            if (entry.name === 'first-paint') {
                this.metrics.fp = entry.startTime;
            }
        });

        // Log results
        this.logMetrics();
        
        // Send to analytics if needed
        this.sendAnalytics();
    }

    logMetrics() {
        console.group('📊 Performance Metrics');
        
        // Core Web Vitals
        console.group('Core Web Vitals');
        console.log(`LCP: ${this.metrics.lcp?.toFixed(2) || 'N/A'}ms ${this.getScore('lcp', this.metrics.lcp)}`);
        console.log(`FID: ${this.metrics.fid?.toFixed(2) || 'N/A'}ms ${this.getScore('fid', this.metrics.fid)}`);
        console.log(`CLS: ${this.metrics.cls?.toFixed(3) || 'N/A'} ${this.getScore('cls', this.metrics.cls)}`);
        console.groupEnd();

        // Other metrics
        console.group('Other Metrics');
        console.log(`FCP: ${this.metrics.fcp?.toFixed(2) || 'N/A'}ms`);
        console.log(`TTFB: ${this.metrics.ttfb?.toFixed(2) || 'N/A'}ms`);
        console.log(`DOM Content Loaded: ${this.metrics.domContentLoaded?.toFixed(2) || 'N/A'}ms`);
        console.log(`Page Load Complete: ${this.metrics.loadComplete?.toFixed(2) || 'N/A'}ms`);
        console.groupEnd();

        console.groupEnd();
    }

    getScore(metric, value) {
        if (!value) return '';

        const thresholds = {
            lcp: { good: 2500, poor: 4000 },
            fid: { good: 100, poor: 300 },
            cls: { good: 0.1, poor: 0.25 }
        };

        const threshold = thresholds[metric];
        if (!threshold) return '';

        if (value <= threshold.good) return '✅';
        if (value <= threshold.poor) return '⚠️';
        return '❌';
    }

    sendAnalytics() {
        // Send to Google Analytics if available
        if (window.gtag) {
            window.gtag('event', 'web_vitals', {
                event_category: 'Performance',
                lcp: Math.round(this.metrics.lcp || 0),
                fid: Math.round(this.metrics.fid || 0),
                cls: (this.metrics.cls || 0).toFixed(3)
            });
        }
    }

    // Cleanup
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Export singleton
let monitor = null;

export const initPerformanceMonitor = () => {
    if (!monitor) {
        monitor = new PerformanceMonitor();
    }
    return monitor;
};

export const getPerformanceMetrics = () => {
    return monitor ? monitor.metrics : {};
};