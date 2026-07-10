import { useState, useEffect } from 'react';

export const useConfig = () => {
    const [config, setConfig] = useState({
        recaptcha: { enabled: false, site_key: null },
        google_places: { enabled: false, api_key: null }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/api/config');
                if (!response.ok) {
                    throw new Error('Failed to fetch configuration');
                }
                const data = await response.json();
                setConfig(data);
            } catch (err) {
                setError(err.message);
                console.error('Config fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    return { config, loading, error };
};