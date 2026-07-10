import CashOfferButton from '@/Components/CashOfferButton';
import LazyImage from '@/Components/LazyImage';

export default function FairOfferSection() {
    return (
        <section className="py-8 lg:py-16 bg-gray-100">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Image */}
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            <LazyImage
                                src="/images/Fair-offer.webp" 
                                alt="Two people discussing paperwork" 
                                className="w-full max-w-[550px] h-[400px] lg:h-[553px] rounded-lg shadow-lg object-cover"
                                width={550}
                                height={553}
                                sizes="(max-width: 1024px) 100vw, 550px"
                            />
                        </div>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Fair Offer. Simple Process. Fast Close.
                        </h2>
                        
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            It's our mission to offer a fair price for the land with a straightforward, 
                            stress-free process from start to finish.
                        </p>
                        
                        {/* Checklist */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-gray-700 text-lg">Sign a state-approved contract.</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-gray-700 text-lg">Work with an independent, third-party title company.</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-gray-700 text-lg">Have confidence that your sale will close, fast.</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-gray-700 text-lg">Receive a fair offer.</span>
                            </div>
                        </div>
                        
                        {/* CTA Button */}
                        <CashOfferButton 
                            text="Get Your Cash Offer" 
                            variant="secondary" 
                            size="large"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}