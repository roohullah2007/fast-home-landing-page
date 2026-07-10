export default function BlogHeroSection() {
    return (
        <section className="py-24 bg-[#03407F] text-white">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Our Blog</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Stay informed with the latest insights, tips, and news about real estate, 
                        home selling, and the housing market from Fast Home Cash Offers.
                    </p>
                </div>
                
                {/* Search Bar */}
                <div className="mt-12 max-w-2xl mx-auto">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search for articles..." 
                            className="w-full px-6 py-4 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                        />
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#03407F]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
