import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useState, useEffect } from 'react';
import {
    BlogHeroSection,
    BlogCategoriesSection,
    FeaturedPostSection,
    BlogPostsSection,
    NewsletterSection
} from '@/Components/Blog';

export default function BlogPage({ auth = {}, blogPosts = [], featuredPosts = [], canLogin = false, canRegister = false }) {
    const [activeCategory, setActiveCategory] = useState('all');
    
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
    
    // Function to handle URL hash changes for categories
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && ['all', 'selling-tips', 'market-insights', 'home-improvement', 'investment', 'success-stories'].includes(hash)) {
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
            <Head title="Blog - Fast Home Cash Offers" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Navigation */}
                <Navbar auth={auth} canLogin={canLogin} canRegister={canRegister} />
                
                {/* Main Content */}
                <main className="mt-[80px] lg:mt-[102px]">
                    <BlogHeroSection />
                    <BlogCategoriesSection 
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                    <FeaturedPostSection featuredPosts={featuredPosts} />
                    <BlogPostsSection activeCategory={activeCategory} blogPosts={blogPosts} />
                    <NewsletterSection />
                </main>
                
                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
