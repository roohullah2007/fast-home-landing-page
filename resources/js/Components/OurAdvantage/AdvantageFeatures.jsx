import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AdvantageFeatures() {
    const [activeFeature, setActiveFeature] = useState('market-leaders');

    const features = [
        {
            id: 'market-leaders',
            label: 'Market Leaders',
            action: 'scroll',
            target: '#stats-section'
        },
        {
            id: 'proven-track',
            label: 'Proven Track Record',
            action: 'navigate',
            target: '/testimonials'
        },
        {
            id: 'expert-team',
            label: 'Expert Team',
            action: 'navigate',
            target: '/meet-the-team'
        },
        {
            id: 'customer-first',
            label: 'Customer First',
            action: 'navigate',
            target: '/contact'
        }
    ];

    const handleFeatureClick = (feature) => {
        setActiveFeature(feature.id);

        if (feature.action === 'scroll') {
            const element = document.querySelector(feature.target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <section className="py-8 lg:py-16 bg-[#BDDFF244]">
            <div className="w-full sm:container sm:mx-auto sm:max-w-7xl">
                {/* Feature Pills */}
                <div className="flex md:flex-wrap overflow-x-auto md:justify-center gap-4 mb-12 px-4 pb-2 scrollbar-hide">
                    {features.map((feature) => (
                        feature.action === 'scroll' ? (
                            <button
                                key={feature.id}
                                onClick={() => handleFeatureClick(feature)}
                                className={`rounded-full px-6 py-3 flex-shrink-0 transition-all duration-300 cursor-pointer ${
                                    activeFeature === feature.id
                                        ? 'bg-[#03407F] border-[#03407F] scale-105'
                                        : 'bg-white border border-gray-300 hover:border-[#03407F] hover:bg-gray-50'
                                }`}
                            >
                                <span className={`font-medium whitespace-nowrap ${
                                    activeFeature === feature.id ? 'text-white' : 'text-gray-700'
                                }`}>
                                    {feature.label}
                                </span>
                            </button>
                        ) : (
                            <Link
                                key={feature.id}
                                href={feature.target}
                                onClick={() => setActiveFeature(feature.id)}
                                className={`rounded-full px-6 py-3 flex-shrink-0 transition-all duration-300 cursor-pointer inline-block ${
                                    activeFeature === feature.id
                                        ? 'bg-[#03407F] border-[#03407F] scale-105'
                                        : 'bg-white border border-gray-300 hover:border-[#03407F] hover:bg-gray-50'
                                }`}
                            >
                                <span className={`font-medium whitespace-nowrap ${
                                    activeFeature === feature.id ? 'text-white' : 'text-gray-700'
                                }`}>
                                    {feature.label}
                                </span>
                            </Link>
                        )
                    ))}
                </div>

                {/* Top Features Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-4">
                    {/* Industry Experience */}
                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">10+ Years Experience</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Decades of experience in real estate transactions and market knowledge.
                            </p>
                        </div>
                    </div>

                    {/* Financial Stability */}
                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Financial Stability</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Strong financial backing ensures we can close any deal, any time.
                            </p>
                        </div>
                    </div>

                    {/* Local Market Experts */}
                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-[#03407F] rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Local Market Experts</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Deep understanding of local markets and property values in your area.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}