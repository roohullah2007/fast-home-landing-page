import { usePage } from '@inertiajs/react';

export default function CallNowSection() {
    const { siteSettings } = usePage().props;
    const phoneLink = siteSettings.contactPhone.replace(/\D/g, '');

    return (
        <section className="py-8 bg-[#03407F]">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        CALL NOW TO GET YOUR FREE CASH OFFER!
                    </h2>
                    
                    <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#03407F]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
                        </div>
                        
                        <a href={`tel:${phoneLink}`} className="text-3xl lg:text-4xl font-bold text-orange-500 hover:text-orange-400 transition-colors duration-200">
                            {siteSettings.contactPhone}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
