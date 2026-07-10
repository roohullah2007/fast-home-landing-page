import CashOfferButton from '@/Components/CashOfferButton';

export default function WhatWeOfferSection() {
    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Section - Full Width */}
                <div className="mb-8">
                    <div className="mb-6">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            WHAT WE OFFER
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        Integrity.<br />
                        Transparency.<br />
                        Efficiency.
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
                        We offer a complete range of solutions to make selling your property simple and stress-free. From
                        fair cash offers and quick closings to zero out-of-pocket expenses, our goal is to deliver exceptional
                        value and convenience every step of the way.
                    </p>

                    <div className="inline-flex items-center space-x-2">
                        <CashOfferButton
                            text="Get Cash Offer"
                            variant="secondary"
                        />
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Service Cards - Full Width */}
                    <div className="lg:col-span-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Fair Cash Offers */}
                            <div className="bg-[#1e3a5f] text-white p-8 rounded-lg">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Fair Cash Offers</h3>
                                <p className="text-white text-opacity-90 leading-relaxed">
                                    Receive fair, transparent cash offers tailored to your property.
                                </p>
                            </div>
                            
                            {/* Fast Closings */}
                            <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                                <div className="w-16 h-16 bg-[#1e3a5f] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">Fast Closings</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Fast, seamless closings tailored to match your preferred timeline.
                                </p>
                            </div>
                            
                            {/* Easy Solutions */}
                            <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                                <div className="w-16 h-16 bg-[#1e3a5f] bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">Easy Solutions</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Avoid long drawn-out home selling experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}