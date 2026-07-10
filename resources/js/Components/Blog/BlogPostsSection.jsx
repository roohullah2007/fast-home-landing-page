import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function BlogPostsSection({ activeCategory, blogPosts = { data: [], links: [] } }) {
    // Handle both paginated and non-paginated data
    const posts = blogPosts.data || blogPosts || [];
    const paginationLinks = blogPosts.links || [];
    
    // Filter posts based on active category (if categories are implemented in the backend)
    const postsToShow = activeCategory === 'all' || !activeCategory
        ? posts
        : posts.filter(post => {
            // Map categories to match frontend expectations
            const categoryMap = {
                'selling-tips': 'Selling Tips',
                'market-insights': 'Market Insights',
                'home-improvement': 'Home Improvement',
                'investment': 'Real Estate Investment',
                'success-stories': 'Success Stories'
            };
            
            const postCategory = post.category?.toLowerCase().replace(/ /g, '-');
            return postCategory === activeCategory;
        });
    
    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    // Calculate read time (approximately 200 words per minute)
    const calculateReadTime = (content) => {
        if (!content) return '5 min read';
        const wordsPerMinute = 200;
        const wordCount = content.split(' ').length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} min read`;
    };
    
    // Handle pagination
    const handlePageChange = (url) => {
        if (url) {
            router.visit(url, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };
    
    // Generate category badge color
    const getCategoryColor = (category) => {
        const colors = {
            'selling tips': 'bg-blue-600',
            'market insights': 'bg-green-600',
            'home improvement': 'bg-purple-600',
            'real estate investment': 'bg-orange-600',
            'success stories': 'bg-pink-600',
            'real estate tips': 'bg-indigo-600',
            'cash sales': 'bg-red-600',
            'process guide': 'bg-yellow-600'
        };
        return colors[category?.toLowerCase()] || 'bg-[#03407F]';
    };
    
    if (postsToShow.length === 0) {
        return (
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6 max-w-[1200px]">
                    <div className="text-center py-12">
                        <h3 className="text-xl text-gray-600">No blog posts found.</h3>
                        <p className="text-gray-500 mt-2">Check back later for new content!</p>
                    </div>
                </div>
            </section>
        );
    }
    
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postsToShow.map(post => (
                        <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
                            <div className="relative h-[220px] overflow-hidden bg-gray-200">
                                {post.featured_image ? (
                                    <img 
                                        src={post.featured_image} 
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1073&q=80';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                                        <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                        </svg>
                                    </div>
                                )}
                                {post.category && (
                                    <div className="absolute top-4 left-4">
                                        <span className={`${getCategoryColor(post.category)} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                                            {post.category}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <span>{formatDate(post.published_at || post.created_at)}</span>
                                    <span className="mx-2">•</span>
                                    <span>{calculateReadTime(post.content)}</span>
                                    {post.views > 0 && (
                                        <>
                                            <span className="mx-2">•</span>
                                            <span>{post.views} views</span>
                                        </>
                                    )}
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                    {post.title}
                                </h3>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.excerpt || post.content?.substring(0, 150) + '...'}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {post.author_image ? (
                                            <img 
                                                src={post.author_image} 
                                                alt={post.author_name || 'Author'}
                                                className="w-8 h-8 rounded-full mr-2 object-cover"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full mr-2 bg-gray-300 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                                                </svg>
                                            </div>
                                        )}
                                        <span className="text-gray-700 text-sm">
                                            {post.author_name || 'Admin'}
                                        </span>
                                    </div>
                                    
                                    <Link 
                                        href={`/blog/${post.slug || post.id}`} 
                                        className="text-[#03407F] font-medium hover:underline inline-flex items-center"
                                    >
                                        Read More 
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Pagination */}
                {paginationLinks.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            {paginationLinks.map((link, index) => {
                                if (link.label.includes('Previous')) {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(link.url)}
                                            disabled={!link.url}
                                            className={`px-4 py-2 border rounded-md ${
                                                link.url
                                                    ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
                                                    : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                                            }`}
                                        >
                                            Previous
                                        </button>
                                    );
                                }
                                
                                if (link.label.includes('Next')) {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(link.url)}
                                            disabled={!link.url}
                                            className={`px-4 py-2 border rounded-md ${
                                                link.url
                                                    ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
                                                    : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                                            }`}
                                        >
                                            Next
                                        </button>
                                    );
                                }
                                
                                if (link.label === '...') {
                                    return (
                                        <span key={index} className="px-2 text-gray-500">
                                            ...
                                        </span>
                                    );
                                }
                                
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(link.url)}
                                        className={`px-4 py-2 border rounded-md ${
                                            link.active
                                                ? 'border-[#03407F] text-white bg-[#03407F]'
                                                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        {link.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </section>
    );
}