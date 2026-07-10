import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeErrorHandling } from './utils/errorHandling.js';
import { registerServiceWorker } from './utils/serviceWorker.js';
import { captureUtmParams } from './utils/utm.js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Initialize global error handling
initializeErrorHandling();

// Register service worker for offline support and caching
registerServiceWorker();

// Capture UTM / click-id attribution from the landing URL.
captureUtmParams();

// Re-capture on client-side navigations so deep-linked campaign URLs are caught.
router.on('navigate', () => captureUtmParams());

// Configure Inertia to handle CSRF token errors
router.on('error', (event) => {
    if (event.detail.response?.status === 419) {
        // CSRF token mismatch
        console.error('CSRF token mismatch detected by Inertia');
        alert('Your session has expired. The page will reload to refresh your session.');
        window.location.reload();
    }
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
