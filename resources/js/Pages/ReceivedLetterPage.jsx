import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useEffect } from 'react';
import {
    LetterHeroSection,
    LetterExplanationSection,
    LetterProcessSection,
    // LetterTestimonialsSection,
    LetterFAQSection,
    LetterCallToActionSection
} from '@/Components/ReceivedLetter';

export default function ReceivedLetterPage({ auth = {} }) {
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
            <Head title="Received a Letter? - Fast Home Cash Offers" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <Navbar />
                
                {/* Main Content */}
                <main className="mt-[80px] lg:mt-[102px]" id="top">
                    <LetterHeroSection />
                    <LetterExplanationSection />
                    <LetterProcessSection />
                    {/* Testimonials Section - Removed, will add Trustindex embed code later */}
                    {/* <LetterTestimonialsSection /> */}
                    <LetterFAQSection />
                    <LetterCallToActionSection />
                </main>
                
                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
