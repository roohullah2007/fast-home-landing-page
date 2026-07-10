import { useState } from 'react';
import LeadCaptureForm from '@/Components/LeadCaptureForm';
import LazyImage from '@/Components/LazyImage';

export default function HeroSection() {
    const [showForm, setShowForm] = useState(false);

    // Optimized hero image URL
    const heroImageUrl = '/images/home-hero.webp';

    return (
        <section
            className="relative min-h-[450px] sm:min-h-[500px] lg:h-[630px] bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${heroImageUrl}')`,
                backgroundColor: '#1a1a1a'
            }}
            role="img"
            aria-label="Elegant family home with well-maintained exterior showcasing the type of properties we purchase for cash offers"
        >
            {/* Hero Content */}
            <div className="relative z-10 h-full py-8 sm:py-10 lg:py-0">
                <div className="container mx-auto px-4 sm:px-6 h-full max-w-[1336px]">
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-6 sm:gap-8 h-full lg:items-center">
                        {/* Lead Form - Shows FIRST on mobile, SECOND on desktop */}
                        <div id="cash-offer-form" className="flex lg:w-[448px] justify-center lg:justify-end w-full order-1 lg:order-2">
                            <LeadCaptureForm />
                        </div>

                        {/* Text Content - Shows SECOND on mobile, FIRST on desktop */}
                        <div className="lg:w-1/2 pt-4 sm:pt-6 lg:pt-0 order-2 lg:order-1">
                            <div className="text-white text-left">
                                <p className="text-sm sm:text-lg lg:text-xl font-normal uppercase tracking-wide mb-2 sm:mb-3 lg:mb-5">
                                    welcome to Fast home cash offers
                                </p>

                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight capitalize mb-3 sm:mb-4 lg:mb-5">
                                    Excellence in every deal,<br />
                                    Make your home selling<br />
                                    process easy and <span className="text-[#4A90E2]">quick!</span>
                                </h1>

                                {/* Bullet Points */}
                                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 lg:mb-8">
                                    <li className="flex items-start text-white text-sm sm:text-base lg:text-lg justify-start">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A90E2] mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>No obligation stress free home review</span>
                                    </li>
                                    <li className="flex items-start text-white text-sm sm:text-base lg:text-lg justify-start">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A90E2] mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Fast Cash Offer, No hidden fees</span>
                                    </li>
                                    <li className="flex items-start text-white text-sm sm:text-base lg:text-lg justify-start">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A90E2] mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Simple transaction with no complex procedures</span>
                                    </li>
                                    <li className="flex items-start text-white text-sm sm:text-base lg:text-lg justify-start">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A90E2] mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Comprehensive support until close</span>
                                    </li>
                                </ul>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4 lg:mt-6">
                                    {/* BBB Badge */}
                                    <div className="w-32 sm:w-40 lg:w-48 h-[60px] sm:h-[65px] lg:h-[70px]">
                                        <LazyImage
                                            src="/images/bbb-badge.webp"
                                            alt="BBB Accredited Business A+ Rating"
                                            className="w-full h-full object-contain"
                                            width={192}
                                            height={70}
                                            eager={true}
                                            sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                                        />
                                    </div>

                                    {/* Google Reviews Badge */}
                                    <a
                                        href="https://www.google.com/search?q=fast+home+cash+offers"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-white rounded-lg shadow-md px-3 py-2 hover:shadow-lg transition-shadow"
                                        aria-label="Read our reviews on Google"
                                    >
                                        <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                        <div className="flex flex-col leading-tight">
                                            <div className="flex items-center gap-1">
                                                <span className="text-base font-bold text-gray-900">4.7</span>
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600">68 Google Reviews</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
                    <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg z-[10000]"
                            aria-label="Close form"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <LeadCaptureForm />
                    </div>
                </div>
            )}
        </section>
    );
}