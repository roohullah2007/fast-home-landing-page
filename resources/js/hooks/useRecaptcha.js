import { useState, useEffect, useCallback } from 'react';

export const useRecaptcha = (siteKey) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [recaptchaInstance, setRecaptchaInstance] = useState(null);

    useEffect(() => {
        if (!siteKey) {
            console.log('reCAPTCHA site key not provided');
            return;
        }

        // Check if reCAPTCHA is already loaded
        if (window.grecaptcha) {
            setIsLoaded(true);
            return;
        }

        // Load reCAPTCHA script
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
            setIsLoaded(true);
        };

        script.onerror = () => {
            console.error('Failed to load reCAPTCHA script');
        };

        document.head.appendChild(script);

        return () => {
            // Clean up script if component unmounts
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [siteKey]);

    const executeRecaptcha = useCallback(async () => {
        if (!isLoaded || !window.grecaptcha || !siteKey) {
            console.warn('reCAPTCHA not loaded or site key missing');
            return null;
        }

        try {
            await window.grecaptcha.ready();
            const token = await window.grecaptcha.execute(siteKey, { action: 'submit' });
            return token;
        } catch (error) {
            console.error('reCAPTCHA execution failed:', error);
            return null;
        }
    }, [isLoaded, siteKey]);

    const renderRecaptcha = useCallback((elementId, callback) => {
        if (!isLoaded || !window.grecaptcha || !siteKey) {
            console.warn('reCAPTCHA not ready for rendering');
            return null;
        }

        try {
            window.grecaptcha.ready(() => {
                const widgetId = window.grecaptcha.render(elementId, {
                    sitekey: siteKey,
                    callback: callback,
                    'expired-callback': () => {
                        console.log('reCAPTCHA expired');
                        callback(null);
                    },
                    'error-callback': () => {
                        console.error('reCAPTCHA error occurred');
                        callback(null);
                    }
                });
                setRecaptchaInstance(widgetId);
            });
        } catch (error) {
            console.error('reCAPTCHA render failed:', error);
        }
    }, [isLoaded, siteKey]);

    const resetRecaptcha = useCallback(() => {
        if (window.grecaptcha && recaptchaInstance !== null) {
            try {
                window.grecaptcha.reset(recaptchaInstance);
            } catch (error) {
                console.error('reCAPTCHA reset failed:', error);
            }
        }
    }, [recaptchaInstance]);

    return {
        isLoaded,
        executeRecaptcha,
        renderRecaptcha,
        resetRecaptcha
    };
};