import { Link } from '@inertiajs/react';
import CashOfferButton from '@/Components/CashOfferButton';

export default function ProcessStepsSection() {
    return (
        <section className="py-8 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-8 md:mb-14">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Our Approach to Buying Your Home</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        We've simplified the home selling process to save you time, reduce stress, and provide certainty in your sale.
                    </p>
                </div>

                <div className="relative">
                    {/* Process timeline connector */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#03407F] transform -translate-x-1/2"></div>
                    
                    {/* Step 1 */}
                    <div className="md:flex items-center mb-8 md:mb-20">
                        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-10 text-center md:text-right">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Initial Contact</h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                Reach out to us through our website form, phone call, or email. We'll respond promptly to understand your situation and property details.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative flex md:justify-start justify-center mb-4 md:mb-0 order-first md:order-none">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#03407F] text-white rounded-full flex items-center justify-center z-10">
                                <span className="font-bold text-sm sm:text-base">1</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="md:flex items-center mb-8 md:mb-20 flex-col md:flex-row-reverse">
                        <div className="md:w-1/2 mb-4 md:mb-0 md:pl-10 text-center md:text-left">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Property Evaluation</h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                We conduct a thorough market analysis and may schedule a quick, no-obligation visit to your property to assess its condition and value.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative flex md:justify-end justify-center mb-4 md:mb-0 order-first md:order-none">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#03407F] text-white rounded-full flex items-center justify-center z-10">
                                <span className="font-bold text-sm sm:text-base">2</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="md:flex items-center mb-8 md:mb-20">
                        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-10 text-center md:text-right">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Fair Cash Offer</h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                Within 24-48 hours, we present you with a fair, no-obligation cash offer based on our evaluation and your property's condition.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative flex md:justify-start justify-center mb-4 md:mb-0 order-first md:order-none">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#03407F] text-white rounded-full flex items-center justify-center z-10">
                                <span className="font-bold text-sm sm:text-base">3</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Step 4 */}
                    <div className="md:flex items-center mb-8 md:mb-20 flex-col md:flex-row-reverse">
                        <div className="md:w-1/2 mb-4 md:mb-0 md:pl-10 text-center md:text-left">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Acceptance & Contract</h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                If you accept our offer, we prepare a simple purchase agreement. Our team explains every detail to ensure complete transparency.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative flex md:justify-end justify-center mb-4 md:mb-0 order-first md:order-none">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#03407F] text-white rounded-full flex items-center justify-center z-10">
                                <span className="font-bold text-sm sm:text-base">4</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Step 5 */}
                    <div className="md:flex items-center">
                        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-10 text-center md:text-right">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Closing & Payment</h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                We close on your timeline—as quickly as possible or whenever works best for you. You receive your cash payment, and we handle all the paperwork.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative flex md:justify-start justify-center mb-4 md:mb-0 order-first md:order-none">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#03407F] text-white rounded-full flex items-center justify-center z-10">
                                <span className="font-bold text-sm sm:text-base">5</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* CTA Button */}
                <div className="text-center mt-8 md:mt-16">
                    <CashOfferButton
                        text="Get Your Cash Offer Today"
                        variant="primary"
                        size="large"
                        className="rounded-md"
                    />
                </div>
            </div>
        </section>
    );
}