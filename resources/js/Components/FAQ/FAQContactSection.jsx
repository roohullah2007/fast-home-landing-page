import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { getUtmParams } from '../../utils/utm';
import { formatPhoneNumber } from '../../utils/phone';

export default function FAQContactSection() {
    const { siteSettings } = usePage().props;

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        question: '',
        agreeToTerms: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const nextValue = type === 'checkbox'
            ? checked
            : (name === 'phone' ? formatPhoneNumber(value) : value);
        setFormData({
            ...formData,
            [name]: nextValue
        });
        if (submitError) setSubmitError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            // Reuse the contact endpoint (maps the question to the message field).
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.question,
                    hearAbout: 'other',
                    agreeToTerms: formData.agreeToTerms,
                    utm: getUtmParams(),
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    question: '',
                    agreeToTerms: false
                });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setSubmitError(result.message || 'An error occurred while submitting your question.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitError('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <section id="contact-form" className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Still Have Questions?</h2>
                        <p className="text-gray-600 mb-8">
                            If you couldn't find the answer to your question in our FAQ, please don't hesitate 
                            to reach out. Our team is ready to assist you with any questions about selling your 
                            home to Fast Home Cash Offers.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#03407F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                                    <p className="text-gray-600">{siteSettings.contactPhone}</p>
                                    <p className="text-gray-500 text-sm mt-1">Monday-Friday, 9am-6pm CST</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#03407F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                                    <p className="text-gray-600">{siteSettings.contactEmail}</p>
                                    <p className="text-gray-500 text-sm mt-1">We'll respond within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#03407F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Office</h3>
                                    <p className="text-gray-600">{siteSettings.officeAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Ask Your Question</h3>

                        {submitted && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                Your question has been submitted! We'll get back to you shortly.
                            </div>
                        )}

                        {submitError && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                {submitError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                    required 
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                        required 
                                    />
                                </div>
                                
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent"
                                        placeholder="(123) 456-7890"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="question">
                                    Your Question <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    id="question"
                                    name="question"
                                    value={formData.question}
                                    onChange={handleInputChange}
                                    rows="5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03407F] focus:border-transparent" 
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="mb-6">
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
                            
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#03407F] text-white py-3 px-6 font-bold rounded-md hover:bg-[#02356b] transition-colors duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Question'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
