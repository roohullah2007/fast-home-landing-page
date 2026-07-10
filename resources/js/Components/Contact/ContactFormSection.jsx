import { useState, useEffect } from 'react';
import { useConfig } from '../../hooks/useConfig';
import { getUtmParams } from '../../utils/utm';
import { formatPhoneNumber } from '../../utils/phone';
import RecaptchaV2 from '../Shared/RecaptchaV2';
import AddressAutocomplete from '../Shared/AddressAutocomplete';

export default function ContactFormSection() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        message: '',
        isOwner: '',
        isListed: '',
        bestTime: '',
        contactMethod: '',
        hearAbout: '',
        agreeToTerms: false,
        // Honeypot fields
        website: '',
        url: '',
        company: ''
    });
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const { config, loading: configLoading } = useConfig();
    
    // Record form start time for spam protection
    useEffect(() => {
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
    
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const nextValue = type === 'checkbox'
            ? checked
            : (name === 'phone' ? formatPhoneNumber(value) : value);
        setFormData({
            ...formData,
            [name]: nextValue
        });
        // Clear error when user starts typing
        if (submitError) {
            setSubmitError('');
        }
    };

    const handlePlaceChanged = (addressData) => {
        if (addressData) {
            setFormData(prev => ({
                ...prev,
                address: addressData.formatted_address || addressData.street_address || ''
            }));
        }
    };

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
            // Prepare form data with reCAPTCHA token and marketing attribution
            const submitData = {
                ...formData,
                'g-recaptcha-response': recaptchaToken,
                utm: getUtmParams()
            };

            // Submit to backend API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(submitData),
            });

            const result = await response.json();

            if (result.success) {
                // Show success message
                setFormSubmitted(true);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    setFormSubmitted(false);
                    setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        address: '',
                        message: '',
                        isOwner: '',
                        isListed: '',
                        bestTime: '',
                        contactMethod: '',
                        hearAbout: '',
                        agreeToTerms: false
                    });
                }, 5000);
            } else {
                setSubmitError(result.message || 'An error occurred while sending your message.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitError('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-8 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
                        <p className="text-gray-600">
                            Fill out the form below and our team will get back to you as soon as possible.
                        </p>
                    </div>
                    
                    {formSubmitted ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Thank You!</h3>
                            <p className="text-lg">Your message has been sent successfully. We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <>
                            {submitError && (
                                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {submitError}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                        required 
                                    />
                                </div>
                                
                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                        required 
                                    />
                                </div>
                                
                                {/* Phone */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent"
                                        placeholder="(123) 456-7890"
                                        pattern="[\d\s\(\)\+\-]+"
                                        title="Please enter a valid phone number (numbers, spaces, parentheses, plus sign, and hyphens allowed)"
                                        required
                                    />
                                </div>
                                
                                {/* Property Address */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                                        Property Address (if applicable)
                                    </label>
                                    <AddressAutocomplete
                                        apiKey={config.google_places?.api_key}
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        onPlaceChanged={handlePlaceChanged}
                                        name="address"
                                        id="address"
                                        placeholder="Start typing your address..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent"
                                    />
                                </div>
                                
                                {/* Are you the property owner? */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="isOwner">
                                        Are you the property owner?
                                    </label>
                                    <select 
                                        id="isOwner"
                                        name="isOwner"
                                        value={formData.isOwner}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                    >
                                        <option value="">Please select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                
                                {/* Is the property listed? */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="isListed">
                                        Is the property currently listed on the market?
                                    </label>
                                    <select 
                                        id="isListed"
                                        name="isListed"
                                        value={formData.isListed}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                    >
                                        <option value="">Please select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                
                                {/* Best time to contact */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="bestTime">
                                        Best time to contact you?
                                    </label>
                                    <select 
                                        id="bestTime"
                                        name="bestTime"
                                        value={formData.bestTime}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                    >
                                        <option value="">Please select</option>
                                        <option value="morning">Morning (9am - 12pm)</option>
                                        <option value="afternoon">Afternoon (12pm - 5pm)</option>
                                        <option value="evening">Evening (5pm - 8pm)</option>
                                        <option value="anytime">Anytime</option>
                                    </select>
                                </div>
                                
                                {/* Preferred contact method */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="contactMethod">
                                        Preferred contact method?
                                    </label>
                                    <select 
                                        id="contactMethod"
                                        name="contactMethod"
                                        value={formData.contactMethod}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                    >
                                        <option value="">Please select</option>
                                        <option value="phone">Phone</option>
                                        <option value="email">Email</option>
                                        <option value="text">Text Message</option>
                                    </select>
                                </div>
                                
                                {/* How did you hear about us? */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="hearAbout">
                                        How did you hear about us?
                                    </label>
                                    <select 
                                        id="hearAbout"
                                        name="hearAbout"
                                        value={formData.hearAbout}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                    >
                                        <option value="">Please select</option>
                                        <option value="google">Google Search</option>
                                        <option value="friend">Friend or Family</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="letter">Direct Mail/Letter</option>
                                        <option value="sign">Yard Sign</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                
                                {/* Message */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea 
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                        placeholder="Please let us know how we can help you..."
                                        required
                                    ></textarea>
                                </div>
                                
                                {/* Terms and Conditions */}
                                <div className="md:col-span-2">
                                    <div className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            id="agreeToTerms"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleInputChange}
                                            className="h-5 w-5 text-[#03407F] border-gray-300 rounded focus:ring-[#03407F]" 
                                            required 
                                        />
                                        <label className="ml-2 text-gray-700" htmlFor="agreeToTerms">
                                            I agree to the <a href="#" className="text-[#03407F] hover:underline">privacy policy</a> and <a href="#" className="text-[#03407F] hover:underline">terms of service</a>.
                                        </label>
                                    </div>
                                </div>

                                {/* Honeypot fields - hidden from users */}
                                <div className="md:col-span-2">
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
                                </div>

                                {/* reCAPTCHA */}
                                {config.recaptcha?.enabled && (
                                    <div className="md:col-span-2">
                                        <RecaptchaV2
                                            siteKey={config.recaptcha.site_key}
                                            onVerify={handleRecaptchaVerify}
                                            onExpire={handleRecaptchaExpire}
                                        />
                                    </div>
                                )}
                            </div>
                            
                            <div className="text-center">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="bg-[#03407F] text-white py-3 px-8 font-bold text-lg rounded-md hover:bg-[#02356b] transition-colors duration-200 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                            </>
                    )}
                </div>
            </div>
        </section>
    );
}
