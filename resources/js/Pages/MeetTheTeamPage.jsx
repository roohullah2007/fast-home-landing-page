import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function MeetTheTeamPage({ teamMembers = [] }) {
    return (
        <>
            <Head title="Meet Our Team | Fast Home Cash Offers" />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="mt-[80px] lg:mt-[102px]">
                    {/* Hero Section */}
                    <section
                        className="relative bg-cover bg-center bg-no-repeat py-20"
                        style={{
                            backgroundImage: 'url(/images/team-hero-bg.jpg), url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                        }}
                        role="img"
                        aria-label="Professional team members collaborating in modern office environment"
                    >
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center text-white">
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                    Meet Our Team
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                                    Our experienced professionals are dedicated to helping you achieve your real estate goals with integrity and expertise.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Mission Statement Section */}
                    <section className="py-8 lg:py-12 bg-white border-b border-gray-200">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#03407F] mb-4">
                                Our Mission
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                                To provide the best streamlined experience when selling and buying a home.
                            </p>
                        </div>
                    </section>

                    {/* Team Members Section */}
                    {teamMembers.length > 0 && (
                        <section className="py-8 lg:py-16 bg-white">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                {/* First Row - Featured Members (2 columns) */}
                                {teamMembers.slice(0, 2).length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 max-w-2xl mx-auto">
                                        {teamMembers.slice(0, 2).map((member) => (
                                            <div
                                                key={member.id}
                                                className="bg-white rounded-lg overflow-hidden transition-all duration-300"
                                                style={{
                                                    boxShadow: '0 4px 6px -1px rgba(2, 53, 107, 0.3), 0 2px 4px -1px rgba(2, 53, 107, 0.2)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(2, 53, 107, 0.5), 0 4px 6px -2px rgba(2, 53, 107, 0.3)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(2, 53, 107, 0.3), 0 2px 4px -1px rgba(2, 53, 107, 0.2)';
                                                }}
                                            >
                                                {/* Image Container */}
                                                <div className="aspect-square overflow-hidden bg-gray-100">
                                                    {member.image_url ? (
                                                        <img
                                                            src={member.image_url}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 text-left md:text-center border-t border-gray-100">
                                                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {member.position}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Remaining Team Members (4 columns) */}
                                {teamMembers.slice(2).length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {teamMembers.slice(2).map((member) => (
                                        <div
                                            key={member.id}
                                            className="bg-white rounded-lg overflow-hidden transition-all duration-300"
                                            style={{
                                                boxShadow: '0 4px 6px -1px rgba(2, 53, 107, 0.3), 0 2px 4px -1px rgba(2, 53, 107, 0.2)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(2, 53, 107, 0.5), 0 4px 6px -2px rgba(2, 53, 107, 0.3)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(2, 53, 107, 0.3), 0 2px 4px -1px rgba(2, 53, 107, 0.2)';
                                            }}
                                        >
                                            {/* Image Container */}
                                            <div className="aspect-square overflow-hidden bg-gray-100">
                                                {member.image_url ? (
                                                    <img
                                                        src={member.image_url}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                        <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 text-left md:text-center border-t border-gray-100">
                                                <h3 className="text-lg font-medium text-gray-800 mb-1">
                                                    {member.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {member.position}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Company Values Section */}
                    <section className="py-8 lg:py-16 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Our Values
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                    These core principles guide everything we do and shape our company culture.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="text-left md:text-center">
                                    <div className="w-16 h-16 bg-[#03407F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
                                    <p className="text-gray-600">We conduct business with honesty, transparency, and ethical practices in every transaction.</p>
                                </div>

                                <div className="text-left md:text-center">
                                    <div className="w-16 h-16 bg-[#03407F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                                    <p className="text-gray-600">We strive for excellence in everything we do, delivering exceptional results for our clients.</p>
                                </div>

                                <div className="text-left md:text-center">
                                    <div className="w-16 h-16 bg-[#03407F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Teamwork</h3>
                                    <p className="text-gray-600">We believe in collaboration and support each other to achieve common goals.</p>
                                </div>

                                <div className="text-left md:text-center">
                                    <div className="w-16 h-16 bg-[#03407F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Compassion</h3>
                                    <p className="text-gray-600">We understand that selling a home can be emotional and treat every client with empathy.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Join Our Team CTA */}
                    <section
                        className="relative bg-cover bg-center bg-no-repeat py-20"
                        style={{
                            backgroundImage: 'url(/images/join-team-bg.jpg), url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                        }}
                        role="img"
                        aria-label="Professional team collaboration meeting representing career opportunities at our company"
                    >
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left md:text-center">
                            <div className="text-white">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Ready to Join Our Team?
                                </h2>
                                <p className="text-xl mb-8 max-w-3xl mx-auto">
                                    We are always looking for talented individuals who share our values and passion for excellence.
                                </p>
                                <a
                                    href="/careers"
                                    className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    View Open Positions
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
                
                <Footer />
            </div>
        </>
    );
}
