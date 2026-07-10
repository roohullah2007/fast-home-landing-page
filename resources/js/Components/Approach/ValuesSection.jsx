export default function ValuesSection() {
    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        At Fast Home Cash Offers, our values guide everything we do. They're the foundation of our business and the promise we make to every homeowner.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Value 1 */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] text-white rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">Trust & Integrity</h3>
                        <p className="text-gray-600">
                            We build relationships based on honesty and transparency. Our word is our bond, and we always follow through on our commitments.
                        </p>
                    </div>

                    {/* Value 2 */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] text-white rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">Speed & Efficiency</h3>
                        <p className="text-gray-600">
                            We understand that time matters. Our streamlined process allows us to move quickly without sacrificing quality or attention to detail.
                        </p>
                    </div>

                    {/* Value 3 */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] text-white rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">Customer-Centric</h3>
                        <p className="text-gray-600">
                            Every homeowner's situation is unique. We listen carefully and tailor our approach to meet your specific needs and goals.
                        </p>
                    </div>

                    {/* Value 4 */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] text-white rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">Fair Value</h3>
                        <p className="text-gray-600">
                            We believe in offering fair, competitive prices that reflect the true value of your property while considering your unique circumstances.
                        </p>
                    </div>

                    {/* Value 5 */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] text-white rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">Security & Peace of Mind</h3>
                        <p className="text-gray-600">
                            We handle all the complex details so you can focus on your next chapter with confidence, knowing the sale is in reliable hands.
                        </p>
                    </div>

                    {/* Value 6 */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="w-16 h-16 bg-[#03407F] text-white rounded-full flex items-center justify-center mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">Compassion</h3>
                        <p className="text-gray-600">
                            We recognize that selling a home can be emotional. We approach each relationship with empathy, respect, and genuine care.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}