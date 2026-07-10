/**
 * Link Prefetching Utility
 * Preloads pages when users hover over links for instant navigation
 */

class LinkPrefetcher {
    constructor() {
        this.prefetchedUrls = new Set();
        this.prefetchQueue = [];
        this.isPrefetching = false;
        this.maxPrefetches = 3; // Limit concurrent prefetches
        this.init();
    }

    init() {
        // Check for browser support
        if (!this.checkSupport()) {
            console.log('Link prefetching not supported');
            return;
        }

        // Add event listeners
        document.addEventListener('mouseover', this.handleHover.bind(this), { passive: true });
        document.addEventListener('touchstart', this.handleTouch.bind(this), { passive: true });
        
        // Clean up on page unload
        window.addEventListener('beforeunload', this.cleanup.bind(this));
    }

    checkSupport() {
        // Check for required APIs
        return 'IntersectionObserver' in window && 
               'fetch' in window &&
               'requestIdleCallback' in window;
    }

    handleHover(event) {
        const link = event.target.closest('a');
        if (!link) return;

        this.prefetchLink(link);
    }

    handleTouch(event) {
        const link = event.target.closest('a');
        if (!link) return;

        // On mobile, prefetch with lower priority
        this.prefetchLink(link, { priority: 'low' });
    }

    prefetchLink(link, options = {}) {
        const href = link.getAttribute('href');
        
        // Validation checks
        if (!this.shouldPrefetch(href)) return;

        // Add to queue
        this.addToQueue(href, options);
    }

    shouldPrefetch(url) {
        if (!url) return false;

        // Skip if already prefetched
        if (this.prefetchedUrls.has(url)) return false;

        // Skip external links
        if (url.startsWith('http://') || url.startsWith('https://')) {
            const urlObj = new URL(url);
            if (urlObj.hostname !== window.location.hostname) return false;
        }

        // Skip special protocols
        if (url.startsWith('#') || 
            url.startsWith('mailto:') || 
            url.startsWith('tel:') || 
            url.startsWith('javascript:')) {
            return false;
        }

        // Skip if on slow connection
        if (this.isSlowConnection()) return false;

        return true;
    }

    isSlowConnection() {
        // Check Network Information API
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // Skip on data saver mode
            if (connection.saveData) return true;
            
            // Skip on slow connections
            const slowTypes = ['slow-2g', '2g'];
            if (slowTypes.includes(connection.effectiveType)) return true;
        }

        return false;
    }

    addToQueue(url, options = {}) {
        // Check if already in queue
        if (this.prefetchQueue.some(item => item.url === url)) return;

        this.prefetchQueue.push({ url, options });
        
        // Process queue when idle
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => this.processQueue());
        } else {
            setTimeout(() => this.processQueue(), 100);
        }
    }

    async processQueue() {
        if (this.isPrefetching || this.prefetchQueue.length === 0) return;

        this.isPrefetching = true;

        // Process up to maxPrefetches at once
        const batch = this.prefetchQueue.splice(0, this.maxPrefetches);
        
        await Promise.all(batch.map(item => this.prefetch(item.url, item.options)));

        this.isPrefetching = false;

        // Continue processing if more items in queue
        if (this.prefetchQueue.length > 0) {
            this.processQueue();
        }
    }

    async prefetch(url, options = {}) {
        try {
            // Mark as prefetched immediately to avoid duplicates
            this.prefetchedUrls.add(url);

            // Create prefetch link
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            link.as = 'document';
            
            if (options.priority === 'high') {
                link.fetchpriority = 'high';
            }

            document.head.appendChild(link);

            // Also use fetch for better browser support
            const fetchOptions = {
                method: 'GET',
                mode: 'no-cors',
                cache: 'force-cache',
                priority: options.priority || 'low'
            };

            await fetch(url, fetchOptions);

            console.log(`✅ Prefetched: ${url}`);
        } catch (error) {
            console.error(`❌ Prefetch failed: ${url}`, error);
            // Remove from prefetched set so it can be retried
            this.prefetchedUrls.delete(url);
        }
    }

    cleanup() {
        // Remove all prefetch links
        const links = document.querySelectorAll('link[rel="prefetch"]');
        links.forEach(link => link.remove());
    }
}

// Export singleton instance
let prefetcher = null;

export const initLinkPrefetching = () => {
    if (!prefetcher) {
        prefetcher = new LinkPrefetcher();
    }
    return prefetcher;
};

export const prefetchUrl = (url) => {
    if (!prefetcher) {
        prefetcher = new LinkPrefetcher();
    }
    prefetcher.addToQueue(url, { priority: 'high' });
};