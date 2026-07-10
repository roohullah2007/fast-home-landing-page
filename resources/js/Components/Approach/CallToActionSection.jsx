import { usePage } from '@inertiajs/react';
import CashOfferButton from '@/Components/CashOfferButton';

export default function CallToActionSection() {
    const { siteSettings } = usePage().props;
    const phoneLink = siteSettings.contactPhone.replace(/\D/g, '');

    return (
        <section className="py-8 lg:py-16 bg-[#03407F] text-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-left lg:text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Experience Our Simplified Approach?</h2>
                    <p className="text-xl max-w-2xl lg:mx-auto mb-10">
                        Get a fair cash offer for your home with no obligations. Our team is ready to help you move forward on your terms.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-start lg:justify-center gap-4">
                        <CashOfferButton
                            text="Get Your Cash Offer"
                            variant="white"
                            size="large"
                            className="rounded-md"
                        />
                        <a
                            href={`tel:${phoneLink}`}
                            className="border-2 border-white text-white px-8 py-3 font-bold text-lg hover:bg-white hover:text-[#03407F] transition-colors duration-200 rounded-md text-center"
                        >
                            Call Us: {siteSettings.contactPhone}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}