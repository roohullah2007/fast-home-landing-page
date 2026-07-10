import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function CareersPage() {

    return (
        <>
            <Head title="Careers - Join Our Team | Fast Home Cash Offers" />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                <main className="mt-[80px] lg:mt-[102px]">
                    {/* Hero Section */}
                    <section
                        className="relative bg-cover bg-center bg-no-repeat py-20"
                        style={{
                            backgroundImage: 'url(/images/careers-hero-bg.jpg), url(https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                        }}
                        role="img"
                        aria-label="Professional team collaborating in modern office environment representing career opportunities"
                    >
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center text-white">
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                    Join Our Team
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                                    Build a rewarding career in real estate investment with us. We are looking for passionate individuals to join our growing team.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Why Work With Us Section */}
                    <section className="py-8 lg:py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Why Work With Us?
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                    We offer a dynamic work environment with competitive benefits and growth opportunities.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-left md:text-center p-6">
                                    <div className="w-16 h-16 bg-[#03407F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast-Paced Growth</h3>
                                    <p className="text-gray-600">Join a rapidly expanding company with endless opportunities for advancement.</p>
                                </div>

                                <div className="text-left md:text-center p-6">
                                    <div className="w-16 h-16 bg-[#03407F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Benefits</h3>
                                    <p className="text-gray-600">Comprehensive benefits package including health insurance, retirement plans, and more.</p>
                                </div>

                                <div className="text-left md:text-center p-6">
                                    <div className="w-16 h-16 bg-[#03407F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Environment</h3>
                                    <p className="text-gray-600">Work with a supportive team that values collaboration and innovation.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Open Positions Section */}
                    <section className="py-8 lg:py-16 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Open Positions
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Explore our current job openings and find your perfect fit.
                                </p>
                            </div>

                            {/* Single Indeed Card */}
                            <div className="max-w-3xl mx-auto">
                                <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-[#03407F]">
                                    <div className="mb-6">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">All Available Positions</h3>
                                        <p className="text-sm text-gray-600 flex items-center mb-4">
                                            <svg className="w-5 h-5 mr-2 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="font-medium">Location:</span>
                                            <span className="ml-2">Remote</span>
                                        </p>
                                    </div>

                                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                        We're always looking for driven, talented people to join our growing team. Click below to view our active openings and apply directly through our official Indeed page.
                                    </p>

                                    <a
                                        href="https://www.indeed.com/cmp/Fast-Home-Cash-Offers"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center bg-[#03407F] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#02356b] transition-colors"
                                    >
                                        View Jobs on Indeed
                                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Team Videos Section - hidden until we have real video testimonials */}
                    {false && (
                    <section className="py-8 lg:py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Hear From Our Team
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Listen to our team members share their experiences working at Fast Home Cash Offers.
                                </p>
                            </div>

                            {/* Video Grid - Placeholder for now */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Video 1 */}
                                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                    <div className="aspect-video bg-gray-300 flex items-center justify-center">
                                        <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-1">Team Member Name</h3>
                                        <p className="text-sm text-gray-600">Position Title</p>
                                    </div>
                                </div>

                                {/* Video 2 */}
                                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                    <div className="aspect-video bg-gray-300 flex items-center justify-center">
                                        <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-1">Team Member Name</h3>
                                        <p className="text-sm text-gray-600">Position Title</p>
                                    </div>
                                </div>

                                {/* Video 3 */}
                                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                    <div className="aspect-video bg-gray-300 flex items-center justify-center">
                                        <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-1">Team Member Name</h3>
                                        <p className="text-sm text-gray-600">Position Title</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <p className="text-gray-600 italic">Video content will be added here soon.</p>
                            </div>
                        </div>
                    </section>
                    )}

                    {/* Call to Action */}
                    <section
                        className="relative bg-cover bg-center bg-no-repeat py-20"
                        style={{
                            backgroundImage: 'url(/images/careers-cta-bg.jpg), url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                        }}
                        role="img"
                        aria-label="Business meeting with diverse team members discussing growth and career development opportunities"
                    >
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                        
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left md:text-center">
                            <div className="text-white">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Ready to Start Your Career With Us?
                                </h2>
                                <p className="text-xl mb-8 max-w-3xl mx-auto">
                                    Take the first step towards a rewarding career in real estate investment. Join our team of professionals today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="https://www.indeed.com/cmp/Fast-Home-Cash-Offers"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-8 py-4 bg-[#03407F] text-white font-bold text-lg rounded-lg hover:bg-[#02356b] transition-colors"
                                    >
                                        View Open Positions
                                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                    <a
                                        href="/meet-the-team"
                                        className="inline-flex items-center px-8 py-4 bg-white text-[#03407F] font-bold text-lg rounded-lg hover:bg-gray-50 transition-colors border-2 border-white"
                                    >
                                        Meet Our Team
                                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
