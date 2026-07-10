// Global error handling utilities

// Suppress browser extension errors that we can't control
export const suppressBrowserExtensionErrors = () => {
    // Override console.error to filter out extension-related errors
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;
    
    console.error = (...args) => {
        const message = args.join(' ');
        
        // Filter out common browser extension errors
        const extensionErrors = [
            'A listener indicated an asynchronous response by returning true',
            'message channel closed before a response was received',
            'Extension context invalidated',
            'chrome-extension://',
            'moz-extension://',
            'Unchecked runtime.lastError',
            'runtime.lastError',
            'Google Places API key not provided',
            'Google Maps JavaScript API'
        ];
        
        const isExtensionError = extensionErrors.some(error => 
            message.toLowerCase().includes(error.toLowerCase())
        );
        
        if (!isExtensionError) {
            originalError.apply(console, args);
        }
    };
    
    // Also filter console.warn for Google Maps warnings
    console.warn = (...args) => {
        const message = args.join(' ');
        
        const suppressedWarnings = [
            'Google Maps',
            'google.maps.places',
            'PlaceAutocompleteElement',
            'Google Places API'
        ];
        
        const shouldSuppress = suppressedWarnings.some(warning => 
            message.includes(warning)
        );
        
        if (!shouldSuppress) {
            originalWarn.apply(console, args);
        }
    };
    
    // Filter console.log for Google Places messages
    console.log = (...args) => {
        const message = args.join(' ');
        
        const suppressedLogs = [
            'Google Places API key not provided'
        ];
        
        const shouldSuppress = suppressedLogs.some(log => 
            message.includes(log)
        );
        
        if (!shouldSuppress) {
            originalLog.apply(console, args);
        }
    };

    // Add global error handler for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        const message = event.reason?.message || event.reason;
        
        // Suppress extension-related rejections
        if (message && typeof message === 'string') {
            const extensionErrors = [
                'A listener indicated an asynchronous response by returning true',
                'message channel closed',
                'Extension context invalidated'
            ];
            
            const isExtensionError = extensionErrors.some(error => 
                message.toLowerCase().includes(error.toLowerCase())
            );
            
            if (isExtensionError) {
                event.preventDefault();
                return;
            }
        }
    });

    // Add global error handler for runtime errors
    window.addEventListener('error', (event) => {
        const message = event.message || '';
        
        // Suppress extension-related errors
        const extensionErrors = [
            'A listener indicated an asynchronous response by returning true',
            'message channel closed',
            'Extension context invalidated',
            'chrome-extension',
            'moz-extension'
        ];
        
        const isExtensionError = extensionErrors.some(error => 
            message.toLowerCase().includes(error.toLowerCase())
        ) || (event.filename && (
            event.filename.includes('chrome-extension://') || 
            event.filename.includes('moz-extension://')
        ));
        
        if (isExtensionError) {
            event.preventDefault();
            return;
        }
    });
};

// Initialize error handling
export const initializeErrorHandling = () => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
        suppressBrowserExtensionErrors();
    }
};

// Format API errors for user display
export const formatApiError = (error) => {
    if (error?.response?.status === 419) {
        return 'Session expired. Please refresh the page and try again.';
    }
    
    if (error?.response?.status === 422) {
        return error.response.data?.message || 'Please check your input and try again.';
    }
    
    if (error?.response?.status >= 500) {
        return 'Server error. Please try again later.';
    }
    
    if (error?.message?.includes('Failed to fetch')) {
        return 'Network error. Please check your connection and try again.';
    }
    
    if (error?.message?.includes('JSON')) {
        return 'Invalid server response. Please try again.';
    }
    
    return error?.message || 'An unexpected error occurred. Please try again.';
};