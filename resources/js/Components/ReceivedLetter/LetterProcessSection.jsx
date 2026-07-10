export default function LetterProcessSection() {
    return (
        <section className="py-8 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">What Happens Next?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our process is designed to be simple, transparent, and hassle-free for homeowners who've received our letter.
                    </p>
                </div>
                
                <div className="relative">
                    {/* Process Timeline Line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#03407F]"></div>
                    
                    {/* Step 1 */}
                    <div className="relative mb-16">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="flex-1 md:text-right md:pr-12 mb-6 md:mb-0">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Step 1: Get in Touch</h3>
                                <p className="text-gray-600 max-w-md ml-auto">
                                    Respond to our letter by filling out the form on this page or calling us directly.
                                    We'll confirm your property details and schedule a time to discuss your situation.
                                </p>
                            </div>
                            
                            <div className="z-10 flex items-center justify-center w-16 h-16 bg-[#03407F] rounded-full text-white text-2xl font-bold mb-6 md:mb-0">1</div>
                            
                            <div className="flex-1 md:pl-12">
                                <img src="https://images.unsplash.com/photo-1590935217281-8f102120d683?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                                    alt="Contact" 
                                    className="rounded-lg shadow-lg w-full max-w-md"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="relative mb-16">
                        <div className="flex flex-col md:flex-row-reverse items-center">
                            <div className="flex-1 md:text-left md:pl-12 mb-6 md:mb-0">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Step 2: Receive Your Offer</h3>
                                <p className="text-gray-600 max-w-md">
                                    After gathering information about your property, we'll present you with a fair,
                                    no-obligation cash offer. We pride ourselves on transparency and will explain
                                    how we arrived at our offer amount.
                                </p>
                            </div>
                            
                            <div className="z-10 flex items-center justify-center w-16 h-16 bg-[#03407F] rounded-full text-white text-2xl font-bold mb-6 md:mb-0">2</div>
                            
                            <div className="flex-1 md:pr-12">
                                <img src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" 
                                    alt="Offer" 
                                    className="rounded-lg shadow-lg w-full max-w-md ml-auto"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="relative">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="flex-1 md:text-right md:pr-12 mb-6 md:mb-0">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Step 3: Close On Your Timeline</h3>
                                <p className="text-gray-600 max-w-md ml-auto">
                                    If you accept our offer, we'll close on your timeline. Whether you need a quick 
                                    closing in as little as 7 days or several months, we'll work with your schedule.
                                    No repairs, no cleaning, no showings required.
                                </p>
                            </div>
                            
                            <div className="z-10 flex items-center justify-center w-16 h-16 bg-[#03407F] rounded-full text-white text-2xl font-bold mb-6 md:mb-0">3</div>
                            
                            <div className="flex-1 md:pl-12">
                                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80" 
                                    alt="Closing" 
                                    className="rounded-lg shadow-lg w-full max-w-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
