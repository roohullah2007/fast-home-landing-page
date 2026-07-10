import CashOfferButton from '@/Components/CashOfferButton';

export default function OurAdvantageHero() {
    return (
        <section
            className="relative h-[450px] sm:h-[500px] lg:h-[604px] bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/home-hero.webp')`
            }}
            role="img"
            aria-label="Beautiful residential house exterior with professional landscaping showcasing our competitive advantage in real estate"
        >
            {/* Hero Content */}
            <div className="relative z-10 h-full">
                <div className="container mx-auto px-4 sm:px-6 h-full max-w-[1336px]">
                    <div className="flex justify-start items-center h-full">
                        {/* Left-Aligned Content */}
                        <div className="text-left text-white max-w-4xl">
                            <p className="text-base sm:text-lg lg:text-xl font-normal uppercase tracking-wide mb-3 sm:mb-4 lg:mb-5">
                                Discover Our Unique Edge
                            </p>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight capitalize mb-4 sm:mb-6 lg:mb-8">
                                Why We're Your Best Choice for <br />
                                <span className="text-[#4A90E2]">Fast Cash Offers</span>
                            </h1>

                            <p className="text-sm sm:text-base lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-3xl">
                                Our competitive advantages set us apart in the real estate market.
                                Experience unmatched service, transparent processes, and results that speak for themselves.
                            </p>

                            {/* CTA Button */}
                            <CashOfferButton
                                text="Get Your Cash Offer"
                                variant="primary"
                                size="large"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}