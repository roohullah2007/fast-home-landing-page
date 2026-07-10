import { useEffect } from 'react';
import { router } from '@inertiajs/react';

// Analytics tracking utility
export const analytics = {
    track: (eventType, eventName, eventData = null) => {
        const data = {
            event_type: eventType,
            event_name: eventName,
            page_url: window.location.href,
            page_title: document.title,
            event_data: eventData
        };

        // Send to backend
        fetch('/api/analytics/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
            },
            body: JSON.stringify(data)
        }).catch(error => {
            console.warn('Analytics tracking failed:', error);
        });
    },

    trackPageView: () => {
        analytics.track('page_view', 'Page View');
    },

    trackButtonClick: (buttonText, location = null) => {
        analytics.track('button_click', buttonText, { location });
    },

    trackFormSubmission: (formType, formData = null) => {
        analytics.track('form_submission', formType, formData);
    },

    trackCashOfferButton: (buttonText, location) => {
        analytics.track('button_click', `Cash Offer Button: ${buttonText}`, { 
            location, 
            button_type: 'cash_offer' 
        });
    }
};

// Analytics Provider Component
export default function AnalyticsProvider({ children }) {
    useEffect(() => {
        // Track initial page view
        analytics.trackPageView();

        // Track page views on route changes
        const handleRouteChange = () => {
            // Small delay to ensure page title is updated
            setTimeout(() => {
                analytics.trackPageView();
            }, 100);
        };

        // Listen for Inertia navigation events
        router.on('success', handleRouteChange);

        return () => {
            router.off('success', handleRouteChange);
        };
    }, []);

    return children;
}

// Hook for easy analytics access
export const useAnalytics = () => {
    return analytics;
};
