import LazyImage from '@/Components/LazyImage';

export default function FeaturesSection() {
    return (
        <section className="py-8 lg:py-16 bg-[#BDDFF244]">
            <div className="container mx-auto  px-4 max-w-7xl">
                {/* Top Features Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3  gap-6 mb-16">
                    {/* Fair Cash Offers */}
                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M2 6h20v12H2V6zm4 10h12v-2H6v2zm0-4h12v-2H6v2zm0-4h12V6H6v2z"/>
                                    <rect x="3" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <text x="12" y="13" textAnchor="middle" fontSize="8" fill="currentColor">$</text>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Fair Cash Offers</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Receive fair, transparent cash offers tailored to your property.
                            </p>
                        </div>
                    </div>

                    {/* Fast Closings */}
                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Fast Closings</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Trusted advice for optimized tax solutions.
                            </p>
                        </div>
                    </div>

                    {/* Steadfast Support */}
                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Steadfast Support</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Committed to building lasting relationships with integrity.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Streamlining The Transaction Process
                        </h2>
                        
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Fast Home Cash Offers is fully devoted to delivering outstanding service, leveraging
                                our vast industry expertise and understanding to guarantee client satisfaction.
                            </p>

                            <p>
                                Our approach involves presenting prompt, all-cash offers to sellers, facilitating a
                                fast and seamless transaction process. Our primary objective is to provide sellers
                                with the utmost value while equipping them with the cash they rightfully deserve at
                                closing. We take pride in our ability to swiftly close deals, enabling sellers to swiftly
                                access cash funds.
                            </p>
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="relative z-10">
                            <LazyImage
                                src="/images/feature-sec.webp" 
                                alt="Happy couple with keys" 
                                className="rounded-lg shadow-lg w-full h-80 object-cover"
                                width={640}
                                height={320}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            
                            {/* Company Logo Overlay */}
                            <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
                                <LazyImage
                                    src="/images/logo.webp" 
                                    alt="Fast Home Cash Offers" 
                                    className="h-8 w-auto"
                                    width={164}
                                    height={32}
                                    eager={true}
                                />
                            </div>
                        </div>

                        {/* Secondary Image */}
                        <div className="absolute -bottom-6 -right-6 z-20">
                            <LazyImage
                                src="/images/small-img.webp" 
                                alt="Business consultation" 
                                className="rounded-lg shadow-lg w-48 h-32 object-cover border-4 border-white"
                                width={192}
                                height={128}
                                sizes="192px"
                            />
                        </div>

                        {/* Background Decorative Element */}
                        <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#4A90E2] opacity-10 rounded-full"></div>
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#03407F] opacity-5 rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}