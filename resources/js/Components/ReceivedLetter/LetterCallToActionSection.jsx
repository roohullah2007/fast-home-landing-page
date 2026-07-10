import { usePage } from '@inertiajs/react';

export default function LetterCallToActionSection() {
    const { siteSettings } = usePage().props;
    const phoneLink = siteSettings.contactPhone.replace(/\D/g, '');

    return (
        <section className="py-20 bg-[#03407F] text-white">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Respond to Our Letter?</h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        We're prepared to make you a fair, no-obligation cash offer on your property.
                        Contact us today to get started.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a 
                            href="#top" 
                            className="px-8 py-4 bg-white text-[#03407F] font-bold text-lg rounded-md hover:bg-gray-100 transition-colors duration-200 inline-block"
                        >
                            Get Your Cash Offer
                        </a>
                        
                        <a
                            href={`tel:${phoneLink}`}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-md hover:bg-white hover:text-[#03407F] transition-colors duration-200 inline-block"
                        >
                            Call Us: {siteSettings.contactPhone}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
