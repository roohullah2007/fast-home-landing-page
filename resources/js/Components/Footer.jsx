import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-white py-8 border-t border-gray-200">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-6 mb-8 pb-6 border-b border-gray-200">
                    <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                        Home
                    </Link>
                    <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                        Get Cash Offer
                    </Link>
                </div>
                
                {/* Top Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                    {/* Left side - Logo and Copyright */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-0">
                        <div className="flex items-center sm:mr-8">
                            <img
                                src="/images/logo.webp"
                                alt="Fast Home Cash Offers Logo"
                                className="h-10 sm:h-12 w-auto object-contain mr-2 sm:mr-3"
                                loading="lazy"
                                onError={(e) => {
                                    // Fallback to SVG icon if logo image fails
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                }}
                            />
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1e3a5f] rounded-lg items-center justify-center mr-2 sm:mr-3 hidden">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-[#1e3a5f]">Fast Home Cash Offers</h3>
                            </div>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                            Copyright © Fast Home Cash Offers
                        </p>
                    </div>
                    
                    {/* Right side - Google Rating */}
                    <div className="flex items-center justify-center lg:justify-end">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-2xl font-bold text-gray-900">4.7</span>
                        <div className="flex text-yellow-400 ml-2 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            ))}
                        </div>
                        <span className="text-gray-600 text-sm">68 reviews</span>
                    </div>
                </div>
                
                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left side - Website Design and Reviews */}
                    <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-4 md:space-y-0 md:space-x-8">
                        {/* Website Design */}
                        <div className="flex items-center text-sm text-gray-600">
                            <span>Website Design By </span>
                            <span className="bg-orange-500 text-white px-2 py-1 rounded ml-1 font-semibold">
                                Nooriik
                            </span>
                        </div>
                        
                        {/* Reviews */}
                        <div className="flex items-center space-x-6">
                            {/* Facebook Review */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center mb-1">
                                    <svg className="w-5 h-5 text-blue-600 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    <span className="font-bold text-blue-600 text-sm">facebook</span>
                                </div>
                                <div className="flex text-yellow-400 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-600">4.8</span>
                            </div>
                            
                            {/* Trust Pilot Review */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center mb-1">
                                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-1">
                                        <span className="text-white text-xs font-bold">T</span>
                                    </div>
                                    <span className="font-bold text-green-600 text-sm">Trustpilot</span>
                                </div>
                                <div className="flex text-yellow-400 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-600">5.0</span>
                            </div>
                            
                            {/* Google Review */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center mb-1">
                                    <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span className="font-bold text-gray-700 text-sm">Google</span>
                                </div>
                                <div className="flex text-yellow-400 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-600">4.8</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right side - Social Media Icons */}
                    <div className="flex justify-center lg:justify-end space-x-3">
                        <a href="https://facebook.com/fasthomecashoffers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1e3a5f] hover:bg-[#2a4a6b] rounded flex items-center justify-center transition-colors" aria-label="Follow us on Facebook">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="https://twitter.com/fasthomecash" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1e3a5f] hover:bg-[#2a4a6b] rounded flex items-center justify-center transition-colors" aria-label="Follow us on Twitter">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                        <a href="https://youtube.com/@fasthomecashoffers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1e3a5f] hover:bg-[#2a4a6b] rounded flex items-center justify-center transition-colors" aria-label="Subscribe to our YouTube channel">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                        <a href="https://linkedin.com/company/fasthomecashoffers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1e3a5f] hover:bg-[#2a4a6b] rounded flex items-center justify-center transition-colors" aria-label="Connect with us on LinkedIn">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        <a href="https://instagram.com/fasthomecashoffers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1e3a5f] hover:bg-[#2a4a6b] rounded flex items-center justify-center transition-colors" aria-label="Follow us on Instagram">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a href="https://www.google.com/search?q=fast+home+cash+offers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1e3a5f] hover:bg-[#2a4a6b] rounded flex items-center justify-center transition-colors" aria-label="Find us on Google">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}