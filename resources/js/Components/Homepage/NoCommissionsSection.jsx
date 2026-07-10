export default function NoCommissionsSection() {
    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Main Heading */}
                <div className="text-left mb-8">
                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold text-[#03407F] leading-tight mb-6">
                        NO COMMISSIONS, NO FEES, NO HASSLE<br />
                        JUST A FAIR CASH OFFER FOR YOUR HOUSE.
                    </h2>

                    <div className="max-w-4xl">
                        <p className="text-base sm:text-lg md:text-[20px] leading-relaxed" style={{ color: '#142A4A' }}>
                            At <span className="bg-[#03407F] text-white px-3 py-1 font-semibold">Fast Home Cash Offers</span> we want to make things easier for you. So, we will buy your house as-is, with a quick closing, and FAIR cash offer.
                        </p>
                    </div>
                </div>

                {/* Blue Banner */}
                <div className="bg-[#03407F] text-white text-center py-6 mb-8 md:mb-12">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide">
                        IT IS REALLY THIS EASY
                    </h3>
                </div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Step 1 - Fast Quote */}
                    <div className="text-left md:text-center h-[130px] md:h-auto">
                        <div className="w-24 h-24 bg-[#03407F] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
                        </div>
                        <h4 className="text-center text-base sm:text-lg md:text-xl font-bold text-[#03407F] mb-2">FAST QUOTE</h4>
                    </div>

                    {/* Step 2 - We Buy As-Is */}
                    <div className="text-left md:text-center h-[130px] md:h-auto">
                        <div className="w-24 h-24 bg-[#03407F] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                        </div>
                        <h4 className="text-center text-base sm:text-lg md:text-xl font-bold text-[#03407F] mb-2">WE BUY AS-IS</h4>
                    </div>

                    {/* Step 3 - Fair Cash Offer */}
                    <div className="text-left md:text-center h-[130px] md:h-auto">
                        <div className="w-24 h-24 bg-[#03407F] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                            </svg>
                        </div>
                        <h4 className="text-center text-base sm:text-lg md:text-xl font-bold text-[#03407F] mb-2">FAIR CASH OFFER</h4>
                    </div>

                    {/* Step 4 - Fast Closing */}
                    <div className="text-left md:text-center h-[130px] md:h-auto">
                        <div className="w-24 h-24 bg-[#03407F] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V0h-2v2H8V0H6v2H4.5C3.12 2 2 3.12 2 4.5v15C2 20.88 3.12 22 4.5 22h15c1.38 0 2.5-1.12 2.5-2.5v-15C22 3.12 20.88 2 19.5 2zM20 19.5c0 .28-.22.5-.5.5h-15c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v15z"/>
                            </svg>
                        </div>
                        <h4 className="text-center text-base sm:text-lg md:text-xl font-bold text-[#03407F] mb-2">FAST CLOSING</h4>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="text-left md:text-center max-w-5xl mx-auto">
                    <div className="h-1 bg-orange-500 w-24 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        We're not fans of all the hassle and hidden fees—and we're guessing you aren't either. That's why we keep things straightforward with a clear, honest offer right from the start.
                    </p>
                </div>
            </div>
        </section>
    );
}
