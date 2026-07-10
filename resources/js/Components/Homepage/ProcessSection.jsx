import CashOfferButton from '@/Components/CashOfferButton';

export default function ProcessSection() {
    return (
        <section className="py-8 lg:py-16 bg-gray-100">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Feature Pills */}
                <div
                    className="overflow-x-auto mb-8 sm:mb-10 md:mb-12 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    <div className="flex gap-2 sm:gap-3 md:gap-4 justify-start md:justify-center min-w-max md:min-w-0">
                        <div className="bg-white border border-gray-300 rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 flex-shrink-0">
                            <span className="text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap">Quickest Closing</span>
                        </div>
                        <div className="bg-white border border-gray-300 rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 flex-shrink-0">
                            <span className="text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap">No Hidden Fees</span>
                        </div>
                        <div className="bg-white border border-gray-300 rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 flex-shrink-0">
                            <span className="text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap">Fair Cash Offer</span>
                        </div>
                        <div className="bg-white border border-gray-300 rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 flex-shrink-0">
                            <span className="text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap">24/7 Call Line</span>
                        </div>
                    </div>
                </div>

                {/* Main Heading */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="mb-2 md:mb-3">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                            <span className="block md:inline text-gray-900">Our Process</span>
                            <span className="hidden md:inline-flex items-center mx-2 align-middle">
                                <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v2H4V6zm0 4h16v8H4v-8z"/>
                                    <rect x="6" y="12" width="12" height="2"/>
                                    <rect x="6" y="15" width="8" height="1"/>
                                </svg>
                            </span>
                            <span className="block md:inline text-[#03407F]">Makes Selling</span>
                            <span className="hidden md:inline-flex items-center mx-2 align-middle">
                                <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </svg>
                            </span>
                        </h2>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                        Homes <span className="text-[#03407F]">Easy</span> And <span className="text-green-500">Fast</span>
                    </h3>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <CashOfferButton text="Get Cash Offer" variant="primary" />
                </div>
            </div>
        </section>
    );
}