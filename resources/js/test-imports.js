// Test file to verify React imports are working
import React from 'react';

// Test imports of potentially problematic files
try {
    console.log('Testing AddressAutocomplete import...');
    import('./Components/Shared/AddressAutocomplete.jsx').then(() => {
        console.log('✅ AddressAutocomplete imported successfully');
    }).catch(err => {
        console.error('❌ AddressAutocomplete import failed:', err);
    });

    console.log('Testing RecaptchaV2 import...');
    import('./Components/Shared/RecaptchaV2.jsx').then(() => {
        console.log('✅ RecaptchaV2 imported successfully');
    }).catch(err => {
        console.error('❌ RecaptchaV2 import failed:', err);
    });

    console.log('Testing useGooglePlaces import...');
    import('./hooks/useGooglePlaces.js').then(() => {
        console.log('✅ useGooglePlaces imported successfully');
    }).catch(err => {
        console.error('❌ useGooglePlaces import failed:', err);
    });

    console.log('Testing useRecaptcha import...');
    import('./hooks/useRecaptcha.js').then(() => {
        console.log('✅ useRecaptcha imported successfully');
    }).catch(err => {
        console.error('❌ useRecaptcha import failed:', err);
    });

    console.log('Testing useConfig import...');
    import('./hooks/useConfig.js').then(() => {
        console.log('✅ useConfig imported successfully');
    }).catch(err => {
        console.error('❌ useConfig import failed:', err);
    });

} catch (error) {
    console.error('Import test failed:', error);
}

console.log('Import tests initiated. Check console for results.');