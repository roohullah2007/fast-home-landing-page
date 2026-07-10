import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function TeamMemberPage({ teamMember }) {
    if (!teamMember) {
        return (
            <>
                <Head title="Team Member Not Found | Fast Home Cash Offers" />
                
                <div className="min-h-screen bg-gray-50">
                    <Navbar />

                    <main className="mt-[80px] lg:mt-[102px]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                            <div className="text-left md:text-center">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">Team Member Not Found</h1>
                                <p className="text-lg text-gray-600 mb-8">
                                    The team member you're looking for could not be found.
                                </p>
                                <a
                                    href="/meet-the-team"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Team
                                </a>
                            </div>
                        </div>
                    </main>
                    
                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={`${teamMember.name} | Fast Home Cash Offers`} />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="mt-[80px] lg:mt-[102px]">
                    {/* Hero Section */}
                    <section className="relative bg-cover bg-center bg-no-repeat py-20" style={{
                        backgroundImage: 'url(/images/team-hero-bg.jpg), url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                    }}>
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center text-white">
                                <div className="mb-6">
                                    <a
                                        href="/meet-the-team"
                                        className="inline-flex items-center text-white hover:text-blue-200 transition-colors mb-4"
                                    >
                                        <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Team
                                    </a>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    {teamMember.name}
                                </h1>
                                <p className="text-xl md:text-2xl mb-8">
                                    {teamMember.position}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Team Member Details Section */}
                    <section className="py-8 lg:py-16 bg-white">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="lg:grid lg:grid-cols-1 lg:gap-12">
                                {/* Profile Image and Basic Info */}
                                <div className="mb-12">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                                        <div className="flex-shrink-0 mb-8 lg:mb-0">
                                            <div className="w-64 h-64 mx-auto lg:mx-0">
                                                <img
                                                    src={teamMember.image_url || '/images/default-avatar.jpg'}
                                                    alt={teamMember.name}
                                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                                    onError={(e) => {
                                                        e.target.src = '/images/default-avatar.jpg';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="text-left md:text-center lg:text-left">
                                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{teamMember.name}</h2>
                                                <p className="text-xl text-blue-600 font-medium mb-6">{teamMember.position}</p>
                                                
                                                {/* Contact Information */}
                                                <div className="space-y-3 mb-8">
                                                    {teamMember.email && (
                                                        <div className="flex items-center justify-center lg:justify-start">
                                                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                            </svg>
                                                            <a
                                                                href={`mailto:${teamMember.email}`}
                                                                className="text-gray-600 hover:text-blue-600 transition-colors"
                                                            >
                                                                {teamMember.email}
                                                            </a>
                                                        </div>
                                                    )}
                                                    
                                                    {teamMember.phone && (
                                                        <div className="flex items-center justify-center lg:justify-start">
                                                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            <a
                                                                href={`tel:${teamMember.phone}`}
                                                                className="text-gray-600 hover:text-blue-600 transition-colors"
                                                            >
                                                                {teamMember.phone}
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Social Links */}
                                                <div className="flex justify-center lg:justify-start space-x-4">
                                                    {teamMember.email && (
                                                        <a
                                                            href={`mailto:${teamMember.email}`}
                                                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                            title="Email"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    
                                                    {teamMember.phone && (
                                                        <a
                                                            href={`tel:${teamMember.phone}`}
                                                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                            title="Phone"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    
                                                    {teamMember.linkedin_url && (
                                                        <a
                                                            href={teamMember.linkedin_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                            title="LinkedIn"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Biography Section */}
                                {teamMember.bio && (
                                    <div className="mb-12">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">About {teamMember.name.split(' ')[0]}</h3>
                                        <div className="prose prose-lg max-w-none">
                                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{teamMember.bio}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Contact CTA Section */}
                    <section className="py-8 lg:py-16 bg-gray-50">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left md:text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Ready to Work with {teamMember.name.split(' ')[0]}?
                            </h3>
                            <p className="text-lg text-gray-600 mb-8">
                                Get in touch to discuss your real estate needs and see how we can help you achieve your goals.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {teamMember.email && (
                                    <a
                                        href={`mailto:${teamMember.email}`}
                                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        Send Email
                                    </a>
                                )}
                                
                                {teamMember.phone && (
                                    <a
                                        href={`tel:${teamMember.phone}`}
                                        className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Call Now
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
                
                <Footer />
            </div>
        </>
    );
}