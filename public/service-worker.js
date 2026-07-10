// Service Worker for Fast Home Cash Offers
// Version: 1.0.0

const CACHE_VERSION = 'fhco-v3';
const CACHE_NAME = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/offline',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[ServiceWorker] Installed successfully');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('[ServiceWorker] Install failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            // Delete old version caches
                            return cacheName.startsWith('fhco-') && cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                        })
                        .map((cacheName) => {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[ServiceWorker] Activated successfully');
                return self.clients.claim(); // Take control immediately
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip admin routes
    if (url.pathname.startsWith('/admin')) {
        return;
    }

    // Skip API routes
    if (url.pathname.startsWith('/api')) {
        return;
    }

    // Skip browser extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }

    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('[ServiceWorker] Serving from cache:', request.url);
                    return cachedResponse;
                }

                // Clone the request
                return fetch(request.clone())
                    .then((response) => {
                        // Don't cache unsuccessful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Cache images, fonts, and static assets
                        if (shouldCache(url)) {
                            const responseToCache = response.clone();
                            caches.open(RUNTIME_CACHE)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                });
                        }

                        return response;
                    })
                    .catch((error) => {
                        console.error('[ServiceWorker] Fetch failed:', error);

                        // Return offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/offline');
                        }

                        throw error;
                    });
            })
    );
});

// Helper: Determine if request should be cached
function shouldCache(url) {
    const cacheableExtensions = [
        '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
        '.woff', '.woff2', '.ttf', '.otf',
        '.css', '.js',
        '.ico'
    ];

    return cacheableExtensions.some((ext) => url.pathname.endsWith(ext));
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        const urls = event.data.urls || [];
        caches.open(RUNTIME_CACHE)
            .then((cache) => {
                return cache.addAll(urls);
            })
            .then(() => {
                event.ports[0].postMessage({ success: true });
            })
            .catch((error) => {
                event.ports[0].postMessage({ success: false, error: error.message });
            });
    }
});
