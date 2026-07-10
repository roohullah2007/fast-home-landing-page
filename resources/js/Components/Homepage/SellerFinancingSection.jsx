import { Link } from '@inertiajs/react';
import LazyImage from '@/Components/LazyImage';

export default function SellerFinancingSection() {
    return (
        <section className="py-8 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left side - Image */}
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                        <LazyImage
                                src="/images/sellor.webp" 
                                alt="Two people discussing paperwork" 
                                className="w-full max-w-[550px] h-[400px] lg:h-[553px] rounded-lg shadow-lg object-cover"
                                width={550}
                                height={553}
                                sizes="(max-width: 1024px) 100vw, 550px"
                            />
                        </div>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="order-1 lg:order-2">
                        <p className="text-lg text-gray-600 mb-4">
                            Unlike the other house buying companies
                        </p>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-6 leading-tight">
                            WE OFFER MORE THAN JUST A CASH OFFER
                        </h2>

                        <div className="mb-6">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                At Fast Home Cash Offers, we understand that every homeowner's situation is unique. That's why we provide multiple selling options designed around your goals—whether you need speed, flexibility, or a higher net return.
                            </p>

                            <p className="text-lg text-gray-700 leading-relaxed mt-4">
                                Our team works with you to find the perfect balance of price, convenience, and certainty so you can move forward with confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}