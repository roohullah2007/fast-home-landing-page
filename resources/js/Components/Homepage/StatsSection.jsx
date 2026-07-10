import { Link } from '@inertiajs/react';
import CashOfferButton from '@/Components/CashOfferButton';

export default function StatsSection() {
    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* 24/7 */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-left md:text-center">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
                            24/7
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            We Are Available All Around The Clock. Call Us Any Time.
                        </p>
                    </div>

                    {/* 100% */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-left md:text-center">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
                            100%
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            Commitment To Our Home Selling Process
                        </p>
                    </div>
                </div>
                
                {/* Bottom Text */}
                <div className="text-left md:text-center mb-8">
                    <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                        Our proven home research process ensures all offers are backed by market data and offers are followed through on.
                    </p>
                </div>
                
                {/* CTA Button */}
                <div className="text-left md:text-center">
                    <CashOfferButton
                        text="WE'VE GOT YOU COVERED"
                        variant="secondary"
                        size="large"
                        className="rounded-full"
                    />
                </div>
            </div>
        </section>
    );
}