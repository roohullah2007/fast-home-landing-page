import { useState, useEffect, useRef, useCallback } from 'react';

export const useGooglePlaces = (apiKey) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const autocompleteRef = useRef(null);

    useEffect(() => {
        if (!apiKey) {
            // Silently skip if no API key provided
            return;
        }

        // Check if Google Maps is already loaded
        if (window.google && window.google.maps && window.google.maps.places) {
            setIsLoaded(true);
            return;
        }

        // Load Google Places script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
            setIsLoaded(true);
        };

        script.onerror = () => {
            setError('Failed to load Google Places script');
            console.error('Failed to load Google Places script');
        };

        document.head.appendChild(script);

        return () => {
            // Clean up script if component unmounts
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [apiKey]);

    const initializeAutocomplete = useCallback((inputElement, options = {}) => {
        if (!isLoaded || !window.google || !window.google.maps || !window.google.maps.places) {
            console.warn('Google Places not loaded');
            return null;
        }

        if (!inputElement) {
            console.warn('Input element not provided');
            return null;
        }

        try {
            const defaultOptions = {
                types: ['address'],
                componentRestrictions: { country: 'us' },
                fields: ['address_components', 'formatted_address', 'geometry', 'place_id'],
                ...options
            };

            const autocomplete = new window.google.maps.places.Autocomplete(inputElement, defaultOptions);
            autocompleteRef.current = autocomplete;
            
            return autocomplete;
        } catch (error) {
            console.error('Failed to initialize Google Places Autocomplete:', error);
            setError('Failed to initialize address autocomplete');
            return null;
        }
    }, [isLoaded]);

    const addPlaceChangedListener = useCallback((autocomplete, callback) => {
        if (!autocomplete || !callback) {
            console.warn('Autocomplete instance or callback not provided');
            return;
        }

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            
            if (!place.address_components) {
                console.warn('No address components found');
                callback(null);
                return;
            }

            // Parse address components
            const addressData = {
                formatted_address: place.formatted_address || '',
                street_number: '',
                route: '',
                city: '',
                state: '',
                postal_code: '',
                country: '',
                place_id: place.place_id || ''
            };

            place.address_components.forEach(component => {
                const types = component.types;
                
                if (types.includes('street_number')) {
                    addressData.street_number = component.long_name;
                } else if (types.includes('route')) {
                    addressData.route = component.long_name;
                } else if (types.includes('locality')) {
                    addressData.city = component.long_name;
                } else if (types.includes('administrative_area_level_1')) {
                    addressData.state = component.short_name;
                } else if (types.includes('postal_code')) {
                    addressData.postal_code = component.long_name;
                } else if (types.includes('country')) {
                    addressData.country = component.long_name;
                }
            });

            // Construct full street address
            addressData.street_address = [addressData.street_number, addressData.route]
                .filter(Boolean)
                .join(' ');

            callback(addressData);
        });
    }, []);

    const clearAutocomplete = useCallback(() => {
        if (autocompleteRef.current) {
            window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
            autocompleteRef.current = null;
        }
    }, []);

    return {
        isLoaded,
        error,
        initializeAutocomplete,
        addPlaceChangedListener,
        clearAutocomplete
    };
};