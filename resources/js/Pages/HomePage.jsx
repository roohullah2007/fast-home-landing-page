import { Head } from '@inertiajs/react';
import { HomePageSEO } from '@/Components/SEO';
import Navbar from '@/Components/Navbar';
import HeroSection from '@/Components/Homepage/HeroSection';
import FeaturesSection from '@/Components/Homepage/FeaturesSection';
import NoCommissionsSection from '@/Components/Homepage/NoCommissionsSection';
import SituationsSection from '@/Components/Homepage/SituationsSection';
import CallToActionSection from '@/Components/Homepage/CallToActionSection';
import FairOfferSection from '@/Components/Homepage/FairOfferSection';
import WhatWeOfferSection from '@/Components/Homepage/WhatWeOfferSection';
import StatsSection from '@/Components/Homepage/StatsSection';
import SellerFinancingSection from '@/Components/Homepage/SellerFinancingSection';
import ProcessSection from '@/Components/Homepage/ProcessSection';
import ReviewsSection from '@/Components/Homepage/ReviewsSection';
import Footer from '@/Components/Footer';
import { useEffect } from 'react';
import { initLinkPrefetching } from '@/utils/linkPrefetch';
import { initPerformanceMonitor } from '@/utils/performanceMonitor';

export default function HomePage({ auth = {}, laravelVersion, phpVersion, reviewsEmbedCode = '' }) {
    useEffect(() => {
        // Initialize performance monitoring
        initPerformanceMonitor();
        
        // Initialize link prefetching
        initLinkPrefetching();

        // Smooth scrolling for anchor links
        const handleSmoothScroll = (e) => {
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.addEventListener('click', handleSmoothScroll);
        return () => document.removeEventListener('click', handleSmoothScroll);
    }, []);

    return (
        <>
            <HomePageSEO />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <Navbar />

                {/* Hero Section */}
                <main className="mt-[80px] lg:mt-[102px]">
                    <HeroSection />

                    {/* Features Section */}
                    <FeaturesSection />

                    {/* No Commissions Section */}
                    <NoCommissionsSection />

                    {/* Situations Section */}
                    <SituationsSection />

                    {/* Call to Action Section */}
                    <CallToActionSection />

                    {/* Fair Offer Section */}
                    <FairOfferSection />

                    {/* What We Offer Section */}
                    <WhatWeOfferSection />

                    {/* Stats Section */}
                    <StatsSection />

                    {/* Seller Financing Section */}
                    <SellerFinancingSection />

                    {/* Reviews Section */}
                    <ReviewsSection embedCode={reviewsEmbedCode} />

                    {/* Process Section */}
                    <ProcessSection />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
