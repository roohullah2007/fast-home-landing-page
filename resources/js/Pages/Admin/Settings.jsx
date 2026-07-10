import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Settings({ auth, settings }) {
    const { flash } = usePage().props;
    const [testingGooglePlaces, setTestingGooglePlaces] = useState(false);
    const [googlePlacesTestResult, setGooglePlacesTestResult] = useState(null);
    const [saved, setSaved] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const bannerRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        google_places_api_key: settings.google_places_api_key || '',
        google_recaptcha_site_key: settings.google_recaptcha_site_key || '',
        google_recaptcha_secret_key: settings.google_recaptcha_secret_key || '',
        lead_webhook_url: settings.lead_webhook_url || '',
        contact_webhook_url: settings.contact_webhook_url || '',
    });

    // When a save succeeds, scroll the confirmation into view (the Save button
    // is at the bottom, the banner at the top) and auto-dismiss it after a few
    // seconds so it doesn't linger as stale.
    useEffect(() => {
        if (saved) {
            bannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const timer = setTimeout(() => setSaved(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [saved]);

    // Editing any field after a save means there are unsaved changes again, so
    // hide the "saved" confirmation to avoid a misleading message.
    const updateField = (key, value) => {
        setData(key, value);
        if (saved) setSaved(false);
        if (saveError) setSaveError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaved(false);
        setSaveError(null);
        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => setSaved(true),
            onError: () => setSaveError('Please fix the errors below and try again.'),
        });
    };

    const testGooglePlacesKey = async () => {
        if (!data.google_places_api_key) {
            setGooglePlacesTestResult({ valid: false, error: 'Please enter an API key first' });
            return;
        }

        setTestingGooglePlaces(true);
        setGooglePlacesTestResult(null);

        try {
            const response = await fetch(route('admin.settings.test-google-places'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
                },
                body: JSON.stringify({ api_key: data.google_places_api_key }),
            });

            // A non-OK response means the request never reached the test logic
            // (e.g. 419 expired session, 404 route not deployed) — surface the
            // real reason instead of a generic "invalid key" that blames Google.
            if (!response.ok) {
                const hint = response.status === 419
                    ? 'Your session expired — refresh the page and try again.'
                    : `Server returned ${response.status} ${response.statusText}.`;
                setGooglePlacesTestResult({ valid: false, error: hint });
                return;
            }

            const result = await response.json();
            setGooglePlacesTestResult(result);
        } catch (error) {
            setGooglePlacesTestResult({ valid: false, error: 'Could not reach the server to test the key.' });
        } finally {
            setTestingGooglePlaces(false);
        }
    };

    return (
        <AdminLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {(saved || flash?.success) && (
                                <div ref={bannerRef} className="mb-6 rounded-md bg-green-50 border border-green-200 p-4 flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm font-medium text-green-800">
                                        {flash?.success || 'Settings saved successfully.'}
                                    </p>
                                </div>
                            )}
                            {(saveError || flash?.error) && (
                                <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-4">
                                    <p className="text-sm font-medium text-red-800">
                                        {flash?.error || saveError}
                                    </p>
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Google Places API Section */}
                                <div className="border-b border-gray-200 pb-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Google Places API</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Configure Google Places API for address autocomplete functionality.
                                        <a href="https://developers.google.com/maps/documentation/places/web-service/get-api-key" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="text-blue-600 hover:text-blue-800 ml-1">
                                            Get API Key →
                                        </a>
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="google_places_api_key" className="block text-sm font-medium text-gray-700 mb-2">
                                                Google Places API Key
                                            </label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="text"
                                                    id="google_places_api_key"
                                                    value={data.google_places_api_key}
                                                    onChange={(e) => updateField('google_places_api_key', e.target.value)}
                                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    placeholder="Enter your Google Places API key"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={testGooglePlacesKey}
                                                    disabled={testingGooglePlaces || !data.google_places_api_key}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {testingGooglePlaces ? 'Testing...' : 'Test'}
                                                </button>
                                            </div>
                                            {errors.google_places_api_key && (
                                                <p className="mt-1 text-sm text-red-600">{errors.google_places_api_key}</p>
                                            )}
                                            
                                            {googlePlacesTestResult && (
                                                <div className={`mt-2 p-3 rounded-md ${googlePlacesTestResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                                    <div className="flex">
                                                        {googlePlacesTestResult.valid ? (
                                                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        <div className="ml-3">
                                                            <p className={`text-sm font-medium ${googlePlacesTestResult.valid ? 'text-green-800' : 'text-red-800'}`}>
                                                                {googlePlacesTestResult.valid ? 'API Key is valid!' : 'API Key is invalid'}
                                                            </p>
                                                            {googlePlacesTestResult.error && (
                                                                <p className="text-sm text-red-600 mt-1">
                                                                    Error: {googlePlacesTestResult.error}
                                                                    {googlePlacesTestResult.error_message && ` - ${googlePlacesTestResult.error_message}`}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Google reCAPTCHA Section */}
                                <div className="border-b border-gray-200 pb-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Google reCAPTCHA</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Configure Google reCAPTCHA for form spam protection.
                                        <a href="https://www.google.com/recaptcha/admin/create" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="text-blue-600 hover:text-blue-800 ml-1">
                                            Get reCAPTCHA Keys →
                                        </a>
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="google_recaptcha_site_key" className="block text-sm font-medium text-gray-700 mb-2">
                                                Site Key
                                            </label>
                                            <input
                                                type="text"
                                                id="google_recaptcha_site_key"
                                                value={data.google_recaptcha_site_key}
                                                onChange={(e) => updateField('google_recaptcha_site_key', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Enter your reCAPTCHA site key"
                                            />
                                            {errors.google_recaptcha_site_key && (
                                                <p className="mt-1 text-sm text-red-600">{errors.google_recaptcha_site_key}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="google_recaptcha_secret_key" className="block text-sm font-medium text-gray-700 mb-2">
                                                Secret Key
                                            </label>
                                            <input
                                                type="password"
                                                id="google_recaptcha_secret_key"
                                                value={data.google_recaptcha_secret_key}
                                                onChange={(e) => updateField('google_recaptcha_secret_key', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Enter your reCAPTCHA secret key"
                                            />
                                            {errors.google_recaptcha_secret_key && (
                                                <p className="mt-1 text-sm text-red-600">{errors.google_recaptcha_secret_key}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Webhook URLs Section */}
                                <div className="border-b border-gray-200 pb-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Webhook URLs</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Configure webhook URLs for form submissions to integrate with external services.
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="lead_webhook_url" className="block text-sm font-medium text-gray-700 mb-2">
                                                Lead Webhook URL
                                            </label>
                                            <input
                                                type="url"
                                                id="lead_webhook_url"
                                                value={data.lead_webhook_url}
                                                onChange={(e) => updateField('lead_webhook_url', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="https://example.com/webhook/leads"
                                            />
                                            {errors.lead_webhook_url && (
                                                <p className="mt-1 text-sm text-red-600">{errors.lead_webhook_url}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="contact_webhook_url" className="block text-sm font-medium text-gray-700 mb-2">
                                                Contact Webhook URL
                                            </label>
                                            <input
                                                type="url"
                                                id="contact_webhook_url"
                                                value={data.contact_webhook_url}
                                                onChange={(e) => updateField('contact_webhook_url', e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="https://example.com/webhook/contact"
                                            />
                                            {errors.contact_webhook_url && (
                                                <p className="mt-1 text-sm text-red-600">{errors.contact_webhook_url}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                    >
                                        {processing && (
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        {processing ? 'Saving...' : 'Save Settings'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}