import { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function ThankYouPage({ type = 'general' }) {
    const { siteSettings } = usePage().props;
    const phoneLink = siteSettings.contactPhone.replace(/\D/g, '');

    // Fire Google Ads "Lead Form Submitted" conversion when a lead lands here.
    useEffect(() => {
        if (type === 'lead' && typeof window.gtag_report_conversion === 'function') {
            window.gtag_report_conversion();
        }
    }, [type]);

    const getContent = () => {
        switch (type) {
            case 'lead':
                return {
                    title: 'Thank You for Your Interest!',
                    message: 'We\'ve received your information and will contact you within 24 hours with a fair cash offer for your property.',
                    subtitle: 'What happens next?',
                    steps: [
                        'One of our team members will review your property details',
                        'We\'ll contact you within 24 hours to discuss your situation',
                        'We\'ll schedule a quick property visit if needed',
                        'You\'ll receive a fair, no-obligation cash offer'
                    ]
                };
            case 'contact':
                return {
                    title: 'Thank You for Contacting Us!',
                    message: 'We\'ve received your message and will get back to you as soon as possible.',
                    subtitle: 'What happens next?',
                    steps: [
                        'A team member will review your message',
                        'We\'ll respond within 24 hours during business days',
                        'We\'ll provide you with the information you requested'
                    ]
                };
            case 'career':
                return {
                    title: 'Thank You for Your Application!',
                    message: 'We\'ve received your job application and will review it carefully.',
                    subtitle: 'What happens next?',
                    steps: [
                        'Our HR team will review your application',
                        'If you\'re a good fit, we\'ll contact you within 1-2 weeks',
                        'We\'ll schedule an interview to discuss the opportunity',
                        'You\'ll hear back from us regardless of the outcome'
                    ]
                };
            default:
                return {
                    title: 'Thank You!',
                    message: 'We\'ve received your submission and will get back to you soon.',
                    subtitle: 'What happens next?',
                    steps: [
                        'A team member will review your submission',
                        'We\'ll contact you as soon as possible',
                        'We\'ll provide you with the assistance you need'
                    ]
                };
        }
    };

    const content = getContent();

    return (
        <>
            <Head title={content.title} />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="mt-[80px] lg:mt-[102px] py-8 lg:py-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {/* Success Icon */}
                        <div className="text-left md:text-center mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>

                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {content.title}
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                {content.message}
                            </p>
                        </div>
                        
                        {/* Next Steps */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left md:text-center">
                                {content.subtitle}
                            </h2>
                            
                            <div className="space-y-4">
                                {content.steps.map((step, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 bg-[#03407F] text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-700 mt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Contact Information */}
                        <div className="bg-[#03407F]/5 rounded-lg p-6 sm:p-8 mb-8">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-left md:text-center">
                                Need to reach us immediately?
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="text-left md:text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#03407F] rounded-full mb-3">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                                    <a href={`tel:${phoneLink}`} className="text-gray-600 hover:text-[#03407F]">{siteSettings.contactPhone}</a>
                                </div>

                                <div className="text-left md:text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#03407F] rounded-full mb-3">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                                    <a href={`mailto:${siteSettings.contactEmail}`} className="text-gray-600 hover:text-[#03407F]">{siteSettings.contactEmail}</a>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                            <Link
                                href="/"
                                className="bg-[#03407F] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#02356b] transition-colors text-left md:text-center"
                            >
                                Return to Home
                            </Link>

                            <a
                                href={`tel:${phoneLink}`}
                                className="bg-white text-[#03407F] border-2 border-[#03407F] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#03407F]/5 transition-colors text-left md:text-center"
                            >
                                Call {siteSettings.contactPhone}
                            </a>
                        </div>
                    </div>
                </main>
                
                <Footer />
            </div>
        </>
    );
}
