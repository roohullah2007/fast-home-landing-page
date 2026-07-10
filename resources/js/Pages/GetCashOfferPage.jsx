import { Head, usePage } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import LeadCaptureForm from '@/Components/LeadCaptureForm';
import CashOfferButton from '@/Components/CashOfferButton';
import { useEffect } from 'react';

export default function GetCashOfferPage({ auth = {} }) {
    const { siteSettings } = usePage().props;
    const phoneLink = siteSettings.contactPhone.replace(/\D/g, '');
    useEffect(() => {
        // Smooth scrolling for anchor links
        const handleSmoothScroll = (e) => {
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.addEventListener('click', handleSmoothScroll);
        return () => document.removeEventListener('click', handleSmoothScroll);
    }, []);

    return (
        <>
            <SEO
                title="Get Your Cash Offer Today"
                description="Get a fair cash offer for your house in 24 hours. Fill out our simple form and receive a no-obligation offer. We buy houses in any condition."
                keywords="cash offer, sell house fast, get cash offer, house buyers, we buy houses"
            />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <Navbar />
                
                {/* Hero Section with Form */}
                <main className="mt-[80px] lg:mt-[102px]">
                    <section
                        className="relative py-8 lg:py-24 bg-cover bg-center overflow-hidden"
                        style={{
                            backgroundImage: `linear-gradient(135deg, rgba(3, 64, 127, 0.75), rgba(30, 58, 95, 0.8)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80')`
                        }}
                        role="img"
                        aria-label="Professional modern house with For Sale sign representing fast cash offers for homeowners ready to sell"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30l15-15v30zM15 30l15-15v30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                backgroundSize: '60px 60px'
                            }}></div>
                        </div>
                        
                        {/* Additional overlay for better readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
                        
                        <div className="container mx-auto px-4 max-w-7xl relative z-10">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Left Content */}
                                <div className="text-white">
                                    <div className="mb-6">
                                        <span className="inline-block bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
                                            Fast & Fair Cash Offers
                                        </span>
                                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                                            Get Your <span className="text-blue-400">Cash Offer</span> in 24 Hours
                                        </h1>
                                        <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
                                            No repairs needed. No commissions. No hassles. 
                                            Just a fair cash offer for your house, as-is.
                                        </p>
                                    </div>
                                    
                                    {/* Key Benefits */}
                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-blue-100 font-medium">24-Hour Response</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-blue-100 font-medium">No Repairs Needed</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-blue-100 font-medium">No Commissions</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-blue-100 font-medium">Fast Closing</span>
                                        </div>
                                    </div>
                                    
                                    {/* Trust Indicators */}
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                            </svg>
                                            <span className="text-blue-100 font-medium">4.8/5 Rating</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-blue-100 font-medium">BBB Accredited</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span className="text-blue-100 font-medium">100% Secure</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Content - Lead Form */}
                                <div className="flex justify-center lg:justify-end">
                                    <div className="w-full max-w-md">
                                        <LeadCaptureForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* How It Works Section */}
                    <section className="py-8 lg:py-16 bg-white">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="text-left md:text-center mb-12">
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    How It Works
                                </h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    Our simple 3-step process makes selling your house fast and easy
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-8">
                                {/* Step 1 */}
                                <div className="text-left md:text-center">
                                    <div className="relative mb-6">
                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl font-bold text-white">1</span>
                                        </div>
                                        <div className="absolute top-8 left-1/2 transform translate-x-8 hidden md:block">
                                            <svg className="w-24 h-8 text-blue-200" fill="currentColor" viewBox="0 0 100 20">
                                                <path d="M0 10 L90 10 L85 5 M90 10 L85 15" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Fill Out Form</h3>
                                    <p className="text-gray-600">
                                        Tell us about your property with our simple 3-step form. 
                                        It takes less than 2 minutes to complete.
                                    </p>
                                </div>
                                
                                {/* Step 2 */}
                                <div className="text-left md:text-center">
                                    <div className="relative mb-6">
                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl font-bold text-white">2</span>
                                        </div>
                                        <div className="absolute top-8 left-1/2 transform translate-x-8 hidden md:block">
                                            <svg className="w-24 h-8 text-blue-200" fill="currentColor" viewBox="0 0 100 20">
                                                <path d="M0 10 L90 10 L85 5 M90 10 L85 15" stroke="currentColor" strokeWidth="2" fill="none"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Offer</h3>
                                    <p className="text-gray-600">
                                        We'll analyze your property and present you with a fair, 
                                        no-obligation cash offer within 24 hours.
                                    </p>
                                </div>
                                
                                {/* Step 3 */}
                                <div className="text-left md:text-center">
                                    <div className="mb-6">
                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl font-bold text-white">3</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Close Fast</h3>
                                    <p className="text-gray-600">
                                        Accept our offer and close on your timeline. 
                                        We can close in as little as 7-14 days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Why Choose Us Section */}
                    <section className="py-8 lg:py-16 bg-gray-50">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="text-left md:text-center mb-12">
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    Why Choose Fast Home Cash Offers?
                                </h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    We're not just cash buyers - we're your trusted partners in making your home sale simple and stress-free
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Benefit 1 */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="w-12 h-12 bg-[#03407F]/10 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Fair Market Offers</h3>
                                    <p className="text-gray-600">
                                        We provide competitive cash offers based on current market conditions and your property's value.
                                    </p>
                                </div>

                                {/* Benefit 2 */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="w-12 h-12 bg-[#03407F]/10 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                                    <p className="text-gray-600">
                                        From initial contact to closing, we can complete your sale in as little as 7 days.
                                    </p>
                                </div>

                                {/* Benefit 3 */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="w-12 h-12 bg-[#03407F]/10 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">No Hidden Fees</h3>
                                    <p className="text-gray-600">
                                        What we offer is what you get. No commissions, no closing costs, no surprise deductions.
                                    </p>
                                </div>

                                {/* Benefit 4 */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="w-12 h-12 bg-[#03407F]/10 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Any Condition</h3>
                                    <p className="text-gray-600">
                                        We buy houses in any condition - from move-in ready to major repairs needed.
                                    </p>
                                </div>

                                {/* Benefit 5 */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="w-12 h-12 bg-[#03407F]/10 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Local Experts</h3>
                                    <p className="text-gray-600">
                                        We're local real estate professionals who understand your market and neighborhood.
                                    </p>
                                </div>

                                {/* Benefit 6 */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="w-12 h-12 bg-[#03407F]/10 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Guaranteed Close</h3>
                                    <p className="text-gray-600">
                                        No financing contingencies mean your sale is guaranteed to close on time, every time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Final CTA Section */}
                    <section className="py-8 lg:py-16 bg-[#1e3a5f]">
                        <div className="container mx-auto px-4 max-w-4xl text-left md:text-center">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                Ready to Get Your Cash Offer?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8">
                                Join thousands of homeowners who have sold their houses quickly and easily with us.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <CashOfferButton 
                                    text="Get My Cash Offer" 
                                    variant="blue" 
                                    size="large"
                                    href="#get-offer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
                                    }}
                                />
                                
                                <CashOfferButton
                                    text={`Call ${siteSettings.contactPhone}`}
                                    variant="outline"
                                    size="large"
                                    href={`tel:${phoneLink}`}
                                />
                            </div>
                            
                            <p className="text-blue-200 text-sm mt-6">
                                No obligation • No pressure • 100% confidential
                            </p>
                        </div>
                    </section>
                </main>
                
                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
