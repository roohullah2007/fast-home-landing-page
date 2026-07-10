import CashOfferButton from '@/Components/CashOfferButton';

export default function WhyChooseUs() {
    return (
        <section className="py-8 lg:py-16 bg-gray-100">
            <div className="w-full sm:container sm:mx-auto sm:max-w-7xl">
                <div className="text-center mb-12 px-4">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        WHY CHOOSE US
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
                        The Fast Home Cash Advantage
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We've built our reputation on delivering exceptional results through 
                        innovative solutions and unwavering commitment to our clients.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {/* Transparent Process */}
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">Transparent Process</h3>
                        <p className="text-gray-600 leading-relaxed">
                            No hidden fees or surprise costs. Every step of our process is clear and straightforward.
                        </p>
                    </div>

                    {/* Instant Offers */}
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">Instant Offers</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Get a fair cash offer within 24 hours. No waiting weeks for appraisals or negotiations.
                        </p>
                    </div>

                    {/* Professional Service */}
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">Expert Team</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Licensed professionals with years of experience in real estate and investment.
                        </p>
                    </div>

                    {/* Local Knowledge */}
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">Local Market Knowledge</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Deep understanding of local market conditions ensures fair and competitive offers.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-12">
                    <CashOfferButton
                        text="Get Your Cash Offer"
                        variant="primary"
                        size="large"
                    />
                </div>
            </div>
        </section>
    );
}