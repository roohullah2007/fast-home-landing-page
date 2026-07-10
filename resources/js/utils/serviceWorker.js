/**
 * Service Worker Registration and Management
 */

export function registerServiceWorker() {
    // Only register in production
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('✅ Service Worker registered:', registration.scope);

                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60 * 60 * 1000); // Check every hour

                    // Listen for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;

                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New service worker available
                                console.log('🔄 New version available! Refresh to update.');

                                // Optionally notify user
                                if (window.confirm('New version available! Reload to update?')) {
                                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                                    window.location.reload();
                                }
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.error('❌ Service Worker registration failed:', error);
                });

            // Listen for controller change (new SW activated)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('🔄 Service Worker updated, reloading page...');
                window.location.reload();
            });
        });
    }
}

/**
 * Unregister service worker (for development/debugging)
 */
export function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => {
                registration.unregister();
                console.log('🗑️ Service Worker unregistered');
            });
        });
    }
}

/**
 * Check if service worker is supported
 */
export function isServiceWorkerSupported() {
    return 'serviceWorker' in navigator;
}

/**
 * Get service worker registration status
 */
export async function getServiceWorkerStatus() {
    if (!('serviceWorker' in navigator)) {
        return { supported: false };
    }

    try {
        const registration = await navigator.serviceWorker.getRegistration();

        return {
            supported: true,
            registered: !!registration,
            active: !!registration?.active,
            waiting: !!registration?.waiting,
            installing: !!registration?.installing,
        };
    } catch (error) {
        return { supported: true, error: error.message };
    }
}

/**
 * Precache specific URLs
 */
export async function precacheUrls(urls) {
    if (!('serviceWorker' in navigator)) {
        return { success: false, error: 'Service Worker not supported' };
    }

    try {
        const registration = await navigator.serviceWorker.ready;

        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();

            messageChannel.port1.onmessage = (event) => {
                resolve(event.data);
            };

            registration.active.postMessage(
                { type: 'CACHE_URLS', urls },
                [messageChannel.port2]
            );
        });
    } catch (error) {
        return { success: false, error: error.message };
    }
}
