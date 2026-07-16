import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import {
    HeroSection,
    ValuesSection,
    ProcessStepsSection,
    // TestimonialsSection,
    DifferenceSection,
    CallToActionSection,
    FAQSection
} from '@/Components/Approach';
import { useEffect } from 'react';

export default function ApproachPage({ auth = {} }) {
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
            <Head title="Sell Your House Fast for Cash" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <Navbar />
                
                {/* Main Content */}
                <main className="mt-[100px] lg:mt-[118px]">
                    {/* Hero Section */}
                    <HeroSection />
                    
                    {/* Values Section */}
                    <ValuesSection />
                    
                    {/* Process Steps Section */}
                    <ProcessStepsSection />
                    
                    {/* Difference Section */}
                    <DifferenceSection />

                    {/* Testimonials Section - Removed, will add Trustindex embed code later */}
                    {/* <TestimonialsSection /> */}

                    {/* FAQ Section */}
                    <FAQSection />
                    
                    {/* Call to Action Section */}
                    <CallToActionSection />
                </main>
                
                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}