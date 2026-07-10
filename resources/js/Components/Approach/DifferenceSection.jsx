import CashOfferButton from '@/Components/CashOfferButton';

export default function DifferenceSection() {
    return (
        <section className="py-8 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-left lg:text-center mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
                    <p className="text-xl text-gray-600 max-w-3xl lg:mx-auto">
                        Not all cash home buyers are the same. Here's why homeowners choose Fast Home Cash Offers over other alternatives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-left lg:text-center">Traditional Real Estate</h3>
                        
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold mb-1">Lengthy Timeline</h4>
                                    <p className="text-gray-600">Average time to sell: 5–6 months, depending on market conditions</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold mb-1">Hidden Costs</h4>
                                    <p className="text-gray-600">6% agent commissions, closing costs, repair costs, staging, and holding costs while waiting</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold mb-1">Repairs Required</h4>
                                    <p className="text-gray-600">Must fix issues before listing or expect price reductions after inspections</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold mb-1">Uncertainty</h4>
                                    <p className="text-gray-600">Deals often fall through due to financing issues, appraisal problems, or inspection findings</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Right Column */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-[#03407F]">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#03407F] mb-6 text-left lg:text-center">Fast Home Cash Offers</h3>
                        
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold mb-1">Quick Closing</h4>
                                    <p className="text-gray-600">Close ASAP or on your timeline—whichever works best for you.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold mb-1">No Extra Costs</h4>
                                    <p className="text-gray-600">Zero commissions, no closing costs, no hidden fees—what we offer is what you get</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold mb-1">Buy As-Is</h4>
                                    <p className="text-gray-600">No repairs needed—we buy your home exactly as it stands today, regardless of condition</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 className="font-semibold mb-1">Guaranteed Sale</h4>
                                    <p className="text-gray-600">No financing contingencies, no appraisal gaps, no buyer's remorse—our cash offers are solid</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* CTA Button */}
                <div className="text-center mt-10">
                    <CashOfferButton
                        text="Get Your Cash Offer"
                        variant="primary"
                        size="large"
                        className="rounded-md"
                    />
                </div>
            </div>
        </section>
    );
}