export default function SituationsSection() {
    return (
        <section className="py-8 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="text-left md:text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        CAN YOU RELATE TO <span className="text-[#03407F]">THESE SITUATIONS?</span>
                    </h2>
                    
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            If this sounds like you, we're here to help. We've assisted hundreds of homeowners in similar situations across the country. 
                            No matter where you're located, we can buy your house in just a few days—no realtors involved. Selling a home can feel 
                            overwhelming, but we'll guide you through every step of the process to make it as smooth and stress-free as possible.
                        </p>
                    </div>
                </div>

                {/* Situations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Inherited Property */}
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                    <path d="M17 7l-1.5-1.5L17 4l1.5 1.5L17 7zm-3.5 6.5L12 12l1.5 1.5L12 15l1.5-1.5z" opacity="0.7"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#03407F] mb-3">Inherited Property</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Did you inherit a home but want to sell it as fast as possible and a timely process and fees?
                            </p>
                        </div>
                    </div>

                    {/* Medical Bills */}
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-4v-4H6v-2h4V7h4v4h4v2h-4v4z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#03407F] mb-3">Medical Bills</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Do you have medical bills that keep piling up and need cash in your hand?
                            </p>
                        </div>
                    </div>

                    {/* Stop Foreclosure */}
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2.09c-.33-.05-.66-.09-1-.09H9c-.34 0-.67.04-1 .09V19H5z"/>
                                    <circle cx="16.5" cy="12" r="1.5"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#03407F] mb-3">Stop Foreclosure</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Do you need to sell your house fast to avoid foreclosure but need someone to guide you through the process?
                            </p>
                        </div>
                    </div>

                    {/* Renovations and Repairs */}
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#03407F] mb-3">Renovations and Repairs</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Are you stressed out about how many repairs your home needs and just want it gone? Skip that hassles and sell today!
                            </p>
                        </div>
                    </div>

                    {/* Divorce */}
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 6h-2l-1.27-1.27c-.34-.34-.8-.73-1.73-.73H8c-.93 0-1.39.39-1.73.73L5 6H3c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#03407F] mb-3">Divorce</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Are you going through a divorce and need to sell your home, but do not want it to take months?
                            </p>
                        </div>
                    </div>

                    {/* Unaffordable Mortgage */}
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                    <path d="M13 10h-2V8c0-.55.45-1 1-1s1 .45 1 1c.55 0 1-.45 1-1 0-1.1-.9-2-2-2s-2 .9-2 2v2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#03407F] mb-3">Unaffordable Mortgage</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Or maybe your mortgage is more than your house is worth and can't afford to pay those realtor's commissions?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
