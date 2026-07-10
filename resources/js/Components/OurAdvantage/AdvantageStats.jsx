import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import CashOfferButton from '@/Components/CashOfferButton';

export default function AdvantageStats() {
    const { siteSettings } = usePage().props;
    const phoneLink = siteSettings?.contactPhone?.replace(/\D/g, '') || '';
    const stats = [
        {
            number: "500+",
            label: "Homes Purchased",
            description: "Successfully closed deals across multiple states"
        },
        {
            number: "98%",
            label: "Client Satisfaction",
            description: "Consistently rated excellent by our customers"
        },
        {
            number: "$50M+",
            label: "Total Transactions",
            description: "In real estate investments and purchases"
        }
    ];

    return (
        <section id="stats-section" className="py-8 lg:py-16 bg-[#03407F]">
            <div className="w-full sm:container sm:mx-auto sm:max-w-7xl">
                <div className="text-center mb-12 px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Our Track Record Speaks for Itself
                    </h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        These numbers represent real results and satisfied homeowners who chose 
                        Fast Home Cash Offers for their property sales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                                {stat.number}
                            </div>
                            <div className="text-xl font-semibold text-blue-100 mb-2">
                                {stat.label}
                            </div>
                            <p className="text-blue-200 leading-relaxed">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12 pt-8 border-t border-blue-400 px-4">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Ready to Experience Our Advantage?
                    </h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Join the hundreds of homeowners who have discovered the Fast Home Cash Offers difference. 
                        Get your no-obligation cash offer today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <CashOfferButton
                            text="Get Your Cash Offer"
                            variant="white"
                            size="large"
                        />
                        <a
                            href={`tel:${phoneLink}`}
                            className="border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white hover:text-[#03407F] transition-colors duration-200 rounded-sm text-center"
                        >
                            Call Us Today
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}