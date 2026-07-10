import LeadCaptureForm from '@/Components/LeadCaptureForm';

export default function LetterHeroSection() {
    return (
        <section
            className="relative min-h-[604px] py-16 lg:py-24 bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/home-hero.webp')`
            }}
            role="img"
            aria-label="Property and house keys representing our cash offer for your home"
        >            
            {/* Hero Content */}
            <div className="relative z-10 h-full">
                <div className="container mx-auto px-6 h-full max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 w-full h-full items-center">
                        {/* Left Content */}
                        <div className="min-w-0">
                            <div className="text-white">
                                <p className="text-xl font-normal uppercase tracking-wide mb-5">
                                    Received a letter from us?
                                </p>
                                
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight capitalize mb-5">
                                    We're interested in<br />
                                    purchasing your property<br />
                                    <span className="text-[#4A90E2]">Get in touch today!</span>
                                </h1>
                                
                                <p className="text-lg mb-8">
                                    If you've received a letter from Fast Home Cash Offers, it means we're
                                    genuinely interested in buying your property. Fill out the form to learn
                                    about our fair cash offer.
                                </p>
                                
                                {/* BBB Badge */}
                                <div className="w-48 h-[70px] mt-8">
                                    <img
                                        src="/images/bbb-badge.png"
                                        alt="BBB Business Logo"
                                        className="w-full h-full object-contain"
                                    />
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
            </div>
        </section>
    );
}
