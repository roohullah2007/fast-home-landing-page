import { useEffect, useRef } from 'react';
import { useGooglePlaces } from '../../hooks/useGooglePlaces';

export default function AddressAutocomplete({
    apiKey,
    value,
    onChange,
    onPlaceChanged,
    placeholder = "Enter address",
    className = "",
    required = false,
    name = "address",
    ...props
}) {
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    // Always invoke the LATEST onPlaceChanged without re-initializing the widget.
    // Critical: when a suggestion is picked, Google writes the input value, which
    // fires React's onChange and re-renders the parent. If the setup effect
    // depended on onPlaceChanged (a new function each render), that re-render
    // would tear the listener down before Google's `place_changed` event fires —
    // so City/State/ZIP never populated. The ref keeps the widget alive.
    const onPlaceChangedRef = useRef(onPlaceChanged);
    const { isLoaded, initializeAutocomplete, addPlaceChangedListener, clearAutocomplete } = useGooglePlaces(apiKey);

    useEffect(() => {
        onPlaceChangedRef.current = onPlaceChanged;
    }, [onPlaceChanged]);

    // Initialize the autocomplete exactly once (after the script loads). It is
    // intentionally NOT torn down on every parent re-render — keeping it alive is
    // what makes selection autofill reliable.
    useEffect(() => {
        if (!isLoaded || !inputRef.current || !apiKey || autocompleteRef.current) {
            return;
        }

        const autocomplete = initializeAutocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'us' }
        });
        if (!autocomplete) return;

        autocompleteRef.current = autocomplete;
        addPlaceChangedListener(autocomplete, (addressData) => {
            if (addressData && onPlaceChangedRef.current) {
                onPlaceChangedRef.current(addressData);
            }
        });

        return () => {
            clearAutocomplete();
            autocompleteRef.current = null;
        };
    }, [isLoaded, apiKey, initializeAutocomplete, addPlaceChangedListener, clearAutocomplete]);

    const handleInputChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={className}
                required={required}
                name={name}
                autoComplete="address-line1"
                {...props}
            />
            {!isLoaded && apiKey && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                </div>
            )}
        </div>
    );
}