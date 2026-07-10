import { usePage } from '@inertiajs/react';
import CashOfferButton from '@/Components/CashOfferButton';

export default function ContactCTASection() {
    const { siteSettings } = usePage().props;
    const phoneLink = siteSettings.contactPhone.replace(/\D/g, '');

    return (
        <section className="py-8 lg:py-16 bg-[#03407F] text-white">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold mb-4">Need to Sell Your Home Fast?</h2>
                        <p className="text-xl text-white/90 mb-6">
                            We buy houses in any condition. No repairs, no fees, no hassle.
                            Get a fair cash offer today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <CashOfferButton
                                text="Get Cash Offer"
                                variant="primary"
                                size="large"
                                className="!bg-white !text-[#03407F] hover:!bg-gray-100 rounded-md text-center"
                            />
                            <a
                                href={`tel:${phoneLink}`}
                                className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-md hover:bg-white hover:text-[#03407F] transition-colors duration-200 text-center"
                            >
                                Call {siteSettings.contactPhone}
                            </a>
                        </div>
                    </div>
                    
                    <div className="w-full max-w-md">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Response</h3>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-gray-700">Same-day response</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-gray-700">Free, no-obligation offer</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-gray-700">Close on your timeline</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-gray-700">No repairs needed</p>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-gray-700">No fees or commissions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
