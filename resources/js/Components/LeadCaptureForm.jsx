import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { router } from '@inertiajs/react';
import { useConfig } from '../hooks/useConfig';
import { getUtmParams } from '../utils/utm';
import { formatPhoneNumber } from '../utils/phone';
import RecaptchaV2 from './Shared/RecaptchaV2';
import AddressAutocomplete from './Shared/AddressAutocomplete';

export default function LeadCaptureForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        isListed: '',
        isOwner: '',
        robotCheck: false,
        // Honeypot fields
        website: '',
        url: '',
        company: ''
    });
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const { config, loading: configLoading } = useConfig();

    // Record form start time for spam protection
    useEffect(() => {
        // Record when user first interacts with form
        const recordFormStart = () => {
            fetch('/api/config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ action: 'form_start' })
            }).catch(() => {}); // Silent fail
        };
        
        recordFormStart();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const nextValue = type === 'checkbox'
            ? checked
            : (name === 'phone' ? formatPhoneNumber(value) : value);
        setFormData(prev => ({
            ...prev,
            [name]: nextValue
        }));
        // Clear error when user starts typing
        if (submitError) {
            setSubmitError('');
        }
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (currentStep === 1) {
            setIsModalOpen(true);
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        }
    };

    const handlePrevStep = () => {
        if (currentStep === 3) {
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setIsModalOpen(false);
            setCurrentStep(1);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handlePlaceChanged = useCallback((addressData) => {
        if (addressData) {
            setFormData(prev => ({
                ...prev,
                // Prefer the street line ("123 Main St") so the Property Address
                // field isn't redundant with the separate City/State/ZIP fields;
                // fall back to the full formatted address if no street was parsed.
                address: addressData.street_address || addressData.formatted_address || '',
                city: addressData.city || '',
                state: addressData.state || '',
                zipCode: addressData.postal_code || ''
            }));
        }
    }, []);

    const handleRecaptchaVerify = (token) => {
        setRecaptchaToken(token);
    };

    const handleRecaptchaExpire = () => {
        setRecaptchaToken('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        // Check if reCAPTCHA is required and verified
        if (config.recaptcha?.enabled && !recaptchaToken) {
            setSubmitError('Please complete the reCAPTCHA verification.');
            setIsSubmitting(false);
            return;
        }

        try {
            // Get CSRF token
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (!csrfToken) {
                setSubmitError('Session expired. Please refresh the page and try again.');
                setIsSubmitting(false);
                return;
            }

            // Prepare form data with reCAPTCHA token and marketing attribution
            const submitData = {
                ...formData,
                'g-recaptcha-response': recaptchaToken,
                utm: getUtmParams()
            };

            // Submit to backend API
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(submitData),
                credentials: 'same-origin'
            });

            // Check if response is ok
            if (!response.ok) {
                if (response.status === 419) {
                    setSubmitError('Session expired. Please refresh the page and try again.');
                    setIsSubmitting(false);
                    return;
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // Parse response
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format. Expected JSON.');
            }

            const result = await response.json();

            if (result.success) {
                // Use Inertia router for better navigation
                try {
                    if (result.redirect_url) {
                        const url = new URL(result.redirect_url, window.location.origin);
                        router.visit(url.pathname + url.search);
                    } else {
                        // Fallback if no redirect URL provided
                        router.visit('/thank-you?type=lead');
                    }
                    return; // Exit early to prevent any further processing
                } catch (redirectError) {
                    console.error('Redirect error:', redirectError);
                    // Final fallback - use window.location
                    window.location.href = '/thank-you?type=lead';
                }
                
                // Reset form (this won't execute due to redirect)
                setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    isListed: '',
                    isOwner: '',
                    robotCheck: false,
                    website: '',
                    url: '',
                    company: ''
                });
                setCurrentStep(1);
                setIsModalOpen(false);
            } else {
                setSubmitError(result.message || 'An error occurred while submitting your information.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            if (error.message.includes('JSON')) {
                setSubmitError('Server error. Please try again or contact support.');
            } else if (error.message.includes('Failed to fetch')) {
                setSubmitError('Network error. Please check your connection and try again.');
            } else {
                setSubmitError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const states = [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' }
    ];

    const getProgressPercentage = () => {
        switch (currentStep) {
            case 1: return 33;
            case 2: return 66;
            case 3: return 100;
            default: return 33;
        }
    };

    return (
        <>
            {/* Step 1 - Contact Information */}
            {currentStep === 1 && (
                <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 w-full max-w-md relative z-10">
                    <div className="text-gray-500 text-sm mb-2">Step 1 of 3</div>
                    <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-[#03407F] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">Get Your Cash Offer</h2>
                    <div className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">100% Free & Confidential</div>
                    
                    <form onSubmit={handleNextStep}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-md focus:border-[#03407F] focus:outline-none transition-colors duration-200" 
                                placeholder="Full Name" 
                                required 
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-md focus:border-[#03407F] focus:outline-none transition-colors duration-200"
                                placeholder="(123) 456-7890"
                                pattern="[\d\s\(\)\+\-]+"
                                title="Please enter a valid phone number (numbers, spaces, parentheses, plus sign, and hyphens allowed)"
                                required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-md focus:border-[#03407F] focus:outline-none transition-colors duration-200" 
                                placeholder="Email Address" 
                                required 
                            />
                        </div>
                        
                        {submitError && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {submitError}
                            </div>
                        )}
                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#03407F] text-white py-4 px-6 sm:px-8 font-bold text-lg rounded-md hover:bg-[#02356b] transition-colors duration-200 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Processing...' : 'Next'}
                        </button>
                    </form>
                </div>
            )}

            {/* Modal for Steps 2 & 3.
                Rendered through a portal to document.body so it escapes the hero's
                `z-10` stacking context — otherwise the fixed overlay is trapped
                below the z-50 header and can't center over it, no matter its
                z-index. */}
            {isModalOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4" style={{ zIndex: 9999 }}>
                    <div className="bg-white rounded-lg max-w-2xl w-full" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                        {/* Modal Header */}
                        <div className="bg-[#03407F] text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center sticky top-0 z-10">
                            <h5 className="text-lg sm:text-xl font-semibold">Property Information</h5>
                            <button 
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setCurrentStep(1);
                                    setSubmitError('');
                                }}
                                className="text-white hover:text-gray-200 text-2xl leading-none p-1"
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-4 sm:p-6">
                            {submitError && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {submitError}
                                </div>
                            )}

                            {/* Step 2 - Property Details */}
                            {currentStep === 2 && (
                                <div>
                                    <div className="text-gray-500 text-sm mb-2">Step 2 of 3</div>
                                    <div className="mb-4">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-[#03407F] h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${getProgressPercentage()}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <form onSubmit={handleNextStep}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-semibold mb-2">Property Address</label>
                                            <AddressAutocomplete
                                                apiKey={config.google_places?.api_key}
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                onPlaceChanged={handlePlaceChanged}
                                                name="address"
                                                placeholder="Start typing your address..."
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-md focus:border-[#03407F] focus:outline-none transition-colors duration-200"
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-gray-700 font-semibold mb-2">City <span className="text-red-500">*</span></label>
                                                <input 
                                                    type="text" 
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-md focus:border-[#03407F] focus:outline-none transition-colors duration-200" 
                                                    placeholder="City"
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-semibold mb-2">State <span className="text-red-500">*</span></label>
                                                <select 
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-md focus:border-[#03407F] focus:outline-none transition-colors duration-200" 
                                                    required
                                                >
                                                    <option value="">Select State</option>
                                                    {states.map(state => (
                                                        <option key={state.value} value={state.value}>{state.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-6">
                                            <label className="block text-gray-700 font-semibold mb-2">ZIP Code <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" 
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-md focus:border-[#03407F] focus:outline-none transition-colors duration-200" 
                                                placeholder="ZIP Code"
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="flex gap-3">
                                            <button 
                                                type="button" 
                                                onClick={handlePrevStep}
                                                className="bg-gray-500 text-white py-2 sm:py-3 px-4 sm:px-6 font-semibold text-sm sm:text-base rounded-md hover:bg-gray-600 transition-colors duration-200"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 bg-[#03407F] text-white py-4 px-4 sm:px-6 font-bold text-lg rounded-md hover:bg-[#02356b] transition-colors duration-200"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Step 3 - Final Questions */}
                            {currentStep === 3 && (
                                <div>
                                    <div className="text-gray-500 text-sm mb-2">Step 3 of 3</div>
                                    <div className="mb-4">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-[#03407F] h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${getProgressPercentage()}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <h6 className="text-lg font-semibold mb-6">Final Details</h6>
                                    
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                Is the property listed on the market? <span className="text-red-500">*</span>
                                            </label>
                                            <select 
                                                name="isListed"
                                                value={formData.isListed}
                                                onChange={handleInputChange}
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-md focus:border-[#03407F] focus:outline-none transition-colors duration-200" 
                                                required
                                            >
                                                <option value="">Yes or No</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                        
                                        <div className="mb-6">
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                Are you the property owner? <span className="text-red-500">*</span>
                                            </label>
                                            <select 
                                                name="isOwner"
                                                value={formData.isOwner}
                                                onChange={handleInputChange}
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-md focus:border-[#03407F] focus:outline-none transition-colors duration-200" 
                                                required
                                            >
                                                <option value="">Yes or No</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                        
                                        {/* Honeypot fields - hidden from users */}
                                        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                            <input 
                                                type="text" 
                                                name="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                tabIndex="-1"
                                                autoComplete="off"
                                            />
                                            <input 
                                                type="text" 
                                                name="url"
                                                value={formData.url}
                                                onChange={handleInputChange}
                                                tabIndex="-1"
                                                autoComplete="off"
                                            />
                                            <input 
                                                type="text" 
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                tabIndex="-1"
                                                autoComplete="off"
                                            />
                                        </div>

                                        {/* reCAPTCHA */}
                                        {config.recaptcha?.enabled && (
                                            <div className="mb-6">
                                                <RecaptchaV2
                                                    siteKey={config.recaptcha.site_key}
                                                    onVerify={handleRecaptchaVerify}
                                                    onExpire={handleRecaptchaExpire}
                                                />
                                            </div>
                                        )}

                                        {/* Simple checkbox if reCAPTCHA is not enabled */}
                                        {!config.recaptcha?.enabled && (
                                            <div className="mb-6">
                                                <div className="flex items-center">
                                                    <input 
                                                        type="checkbox" 
                                                        name="robotCheck"
                                                        checked={formData.robotCheck}
                                                        onChange={handleInputChange}
                                                        className="h-4 w-4 text-[#03407F] border-gray-300 rounded focus:ring-[#03407F]" 
                                                        required 
                                                    />
                                                    <label className="ml-2 text-gray-700">
                                                        I'm not a robot
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="flex gap-3">
                                            <button 
                                                type="button" 
                                                onClick={handlePrevStep}
                                                className="bg-gray-500 text-white py-2 sm:py-3 px-4 sm:px-6 font-semibold text-sm sm:text-base rounded-md hover:bg-gray-600 transition-colors duration-200"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 bg-[#03407F] text-white py-4 px-4 sm:px-6 font-bold text-lg rounded-md hover:bg-[#02356b] transition-colors duration-200 disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
