import { useState, useEffect } from 'react';
import LeadCaptureForm from '@/Components/LeadCaptureForm';
import LazyImage from '@/Components/LazyImage';

export default function HeroSection() {
    const [backgroundLoaded, setBackgroundLoaded] = useState(false);

    useEffect(() => {
        // Preload hero background
        const img = new Image();
        img.src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'; // Using similar house property image
        img.onload = () => setBackgroundLoaded(true);
    }, []);

    return (
        <section
            className="relative min-h-[450px] sm:min-h-[500px] lg:min-h-[604px] bg-cover bg-center overflow-hidden transition-opacity duration-500"
            style={{
                backgroundImage: backgroundLoaded
                    ? `linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.55) 35%, rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0.15) 100%), url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
                    : 'linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.55) 35%, rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0.15) 100%)',
                backgroundColor: '#1a1a1a',
                opacity: backgroundLoaded ? 1 : 0.9
            }}
            role="img"
            aria-label="Modern residential property with spacious front yard representing our transparent and integrity-driven approach to home buying"
        >
            {/* Hero Content */}
            <div className="relative z-10 h-full py-8 sm:py-10 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 h-full max-w-[1336px]">
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-6 sm:gap-8 h-full lg:items-center">
                        {/* Lead Form - Shows FIRST on mobile, SECOND on desktop */}
                        <div id="cash-offer-form" className="flex lg:w-[448px] justify-center lg:justify-end w-full order-1 lg:order-2 scroll-mt-[120px]">
                            <LeadCaptureForm />
                        </div>

                        {/* Text Content - Shows SECOND on mobile, FIRST on desktop */}
                        <div className="lg:w-1/2 pt-4 sm:pt-6 lg:pt-0 order-2 lg:order-1">
                            <div className="text-white text-left lg:text-left max-w-[620px]">
                                <p className="text-sm sm:text-base font-semibold uppercase tracking-wider mb-3">
                                    NEED TO SELL YOUR HOUSE FAST AND AS-IS?
                                </p>

                                <h1
                                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-4 text-left"
                                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
                                >
                                    We Buy Houses in Any Condition!
                                </h1>

                                <p className="text-lg sm:text-xl font-medium mb-6">
                                    Submit the form to receive your offer!
                                </p>

                                <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-4">
                                    Fast Home Cash Offers will only purchase houses:
                                </h2>

                                <ul className="space-y-2.5 text-base sm:text-lg font-medium">
                                    <li className="flex items-start gap-2.5">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4A90E2] flex-shrink-0"></span>
                                        <span>Directly from the home owner!</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4A90E2] flex-shrink-0"></span>
                                        <span>Houses that are not listed on the market.</span>
                                    </li>
                                </ul>

                                {/* BBB Badge */}
                                <div className="w-32 sm:w-40 lg:w-48 h-[60px] sm:h-[65px] lg:h-[70px] mt-6 lg:mt-8">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}