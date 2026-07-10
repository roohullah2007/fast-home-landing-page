import { useEffect, useRef } from 'react';
import { useRecaptcha } from '../../hooks/useRecaptcha';

export default function RecaptchaV2({ siteKey, onVerify, onExpire, onError }) {
    const containerRef = useRef(null);
    const { isLoaded, renderRecaptcha, resetRecaptcha } = useRecaptcha(siteKey);

    useEffect(() => {
        if (isLoaded && containerRef.current && siteKey) {
            const containerId = `recaptcha-${Date.now()}`;
            containerRef.current.id = containerId;

            const handleCallback = (token) => {
                if (token) {
                    onVerify && onVerify(token);
                } else {
                    onExpire && onExpire();
                }
            };

            renderRecaptcha(containerId, handleCallback);
        }
    }, [isLoaded, siteKey, renderRecaptcha, onVerify, onExpire]);

    if (!siteKey) {
        return null;
    }

    return (
        <div className="recaptcha-container">
            <div ref={containerRef} className="g-recaptcha"></div>
            {!isLoaded && (
                <div className="text-sm text-gray-500">
                    Loading reCAPTCHA...
                </div>
            )}
        </div>
    );
}