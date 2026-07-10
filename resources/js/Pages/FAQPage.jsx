import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useState, useEffect } from 'react';
import {
    FAQHeroSection,
    FAQCategoriesSection,
    FAQQuestionsSection,
    FAQContactSection
} from '@/Components/FAQ';

export default function FAQPage({ auth = {} }) {
    const [activeCategory, setActiveCategory] = useState(null);
    
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
    
    // Function to handle URL hash changes (for direct category links)
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && ['selling-process', 'pricing-offers', 'property-condition', 'timeline-closing', 'company-credentials', 'general-questions'].includes(hash)) {
                setActiveCategory(hash);
            }
        };
        
        // Check hash on initial load
        handleHashChange();
        
        // Add event listener for hash changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <>
            <Head title="Frequently Asked Questions - Fast Home Cash Offers" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <Navbar />
                
                {/* Main Content */}
                <main className="mt-[80px] lg:mt-[102px]">
                    <FAQHeroSection />
                    <FAQCategoriesSection 
                        activeCategory={activeCategory} 
                        setActiveCategory={setActiveCategory} 
                    />
                    <FAQQuestionsSection activeCategory={activeCategory} />
                    <FAQContactSection />
                </main>
                
                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
