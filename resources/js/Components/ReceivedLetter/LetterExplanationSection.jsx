export default function LetterExplanationSection() {
    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">What Does Our Letter Mean?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We've selected your property based on our market research as a potential acquisition.
                        Here's what our letter means for you:
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 rounded-lg p-8 shadow-md transition-transform hover:transform hover:scale-105">
                        <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Genuine Interest</h3>
                        <p className="text-gray-600">
                            Our letter indicates our real interest in purchasing your property. We only send letters to 
                            properties that match our investment criteria.
                        </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-8 shadow-md transition-transform hover:transform hover:scale-105">
                        <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Cash Offer</h3>
                        <p className="text-gray-600">
                            We're prepared to make a fair cash offer on your property, which means a faster 
                            closing with no financing contingencies or delays.
                        </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-8 shadow-md transition-transform hover:transform hover:scale-105">
                        <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">No Obligation</h3>
                        <p className="text-gray-600">
                            Responding to our letter comes with no obligation. We simply want to discuss the 
                            possibility of purchasing your property if it suits your needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
