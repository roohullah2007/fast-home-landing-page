import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import OurAdvantageHero from '@/Components/OurAdvantage/OurAdvantageHero';
import AdvantageFeatures from '@/Components/OurAdvantage/AdvantageFeatures';
import CompetitiveEdge from '@/Components/OurAdvantage/CompetitiveEdge';
import WhyChooseUs from '@/Components/OurAdvantage/WhyChooseUs';
// import TestimonialsSection from '@/Components/OurAdvantage/TestimonialsSection';
import AdvantageStats from '@/Components/OurAdvantage/AdvantageStats';
import Footer from '@/Components/Footer';
import { useEffect } from 'react';

export default function OurAdvantage({ auth = {} }) {
    useEffect(() => {
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
            <Head title="Our Advantage - Fast Home Cash Offers" />
            
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <Navbar />
                
                {/* Main Content */}
                <main className="mt-[80px] lg:mt-[102px]">
                    <OurAdvantageHero />
                    <AdvantageFeatures />
                    <CompetitiveEdge />
                    <WhyChooseUs />
                    {/* Testimonials Section - Removed, will add Trustindex embed code later */}
                    {/* <TestimonialsSection /> */}
                    <AdvantageStats />
                </main>
                
                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}