export default function FAQHeroSection() {
    return (
        <section className="relative py-24 bg-[#03407F] text-white">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Find answers to common questions about selling your home to Fast Home Cash Offers.
                        If you don't see your question answered here, please don't hesitate to contact us.
                    </p>
                </div>
                
                {/* Search Bar */}
                <div className="mt-12 max-w-2xl mx-auto">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search for a question..." 
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
            
            {/* Wave Shape Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg className="w-full h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffffff" fillOpacity="1" d="M0,128L80,138.7C160,149,320,171,480,160C640,149,800,107,960,101.3C1120,96,1280,128,1360,144L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
            </div>
        </section>
    );
}
