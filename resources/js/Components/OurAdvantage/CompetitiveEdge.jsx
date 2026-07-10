export default function CompetitiveEdge() {
    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="w-full sm:container sm:mx-auto sm:max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                    {/* Left Content */}
                    <div>
                        <div className="mb-6">
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                OUR COMPETITIVE EDGE
                            </span>
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            What Sets Us Apart From The Competition
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-[#03407F] rounded-full flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">No Financing Contingencies</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Unlike traditional buyers, we don't rely on bank approvals or financing. 
                                        Our cash offers eliminate the risk of deals falling through.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-[#03407F] rounded-full flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Buy As-Is Condition</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        No need for repairs, staging, or improvements. We buy properties 
                                        in any condition, saving you time and money.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-[#03407F] rounded-full flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Flexible Closing Timeline</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Whether you need to close in 7 days or 7 months, we adapt to 
                                        your schedule and circumstances.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="relative z-10">
                            <img 
                                src="https://doctor-home.com/wp-content/uploads/2025/03/image-6327-scaled.webp" 
                                alt="Professional team consultation" 
                                className="rounded-lg shadow-lg w-full h-96 object-cover"
                            />
                            
                            {/* Stats Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white bg-opacity-95 rounded-lg p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#03407F]">500+</div>
                                        <div className="text-sm text-gray-600">Homes Purchased</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decorative Elements */}
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#4A90E2] opacity-10 rounded-full"></div>
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#03407F] opacity-5 rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}