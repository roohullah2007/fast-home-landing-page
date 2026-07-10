import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function TestimonialsPage({ testimonials = [], googleReviews = [], googleRating = null, googleReviewsTotal = null }) {
    // Video testimonials come from the database (any active testimonial with a
    // video_url). Local .mp4 files render in a native player; anything else
    // (e.g. a YouTube link) renders in an embedded iframe.
    const videoTestimonials = (testimonials || []).filter((t) => t.video_url);

    const isFileVideo = (url) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

    const toEmbedUrl = (url) => {
        const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
        if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
        return url;
    };

    return (
        <>
            <Head title="Customer Testimonials | Fast Home Cash Offers" />
            
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                <main className="mt-[80px] lg:mt-[102px]">
                    {/* Hero Section */}
                    <section
                        className="relative bg-cover bg-center bg-no-repeat py-20"
                        style={{
                            backgroundImage: 'url(/images/testimonials-hero-bg.jpg), url(https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                        }}
                        role="img"
                        aria-label="Happy family celebrating in their home after successful house sale demonstrating customer satisfaction"
                    >
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center text-white">
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                    What Our Customers Say
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                                    Real stories from real homeowners who chose us for their cash home sale.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Real Google Reviews - TrustIndex */}
                    <section className="py-8 lg:py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center mb-12">
                                <div className="flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 mr-3" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Real Google Reviews
                                    </h2>
                                </div>
                                <p className="text-lg text-gray-600">
                                    See what real homeowners are saying about their experience with Fast Home Cash Offers
                                </p>
                            </div>

                            {/* Overall Google Business rating summary. Only shown once a
                                rating has been synced from the Google profile. The gold
                                star row uses a width-clipped overlay so fractional ratings
                                (e.g. 4.7 → 94% filled) render accurately. */}
                            {googleRating ? (
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-12">
                                    {/* Google "G" */}
                                    <svg className="w-9 h-9" viewBox="0 0 24 24" aria-label="Google">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span className="text-4xl font-bold text-gray-900 leading-none">
                                        {Number(googleRating).toFixed(1)}
                                    </span>
                                    {/* 5-star row with fractional fill via clipped overlay */}
                                    <div className="relative inline-block" aria-label={`${Number(googleRating).toFixed(1)} out of 5 stars`}>
                                        <div className="flex text-gray-300">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-7 h-7 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <div
                                            className="absolute inset-0 flex text-yellow-400 overflow-hidden"
                                            style={{ width: `${(Math.max(0, Math.min(5, Number(googleRating))) / 5) * 100}%` }}
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-7 h-7 flex-shrink-0 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    {googleReviewsTotal ? (
                                        <span className="text-lg text-gray-500">{googleReviewsTotal} reviews</span>
                                    ) : null}
                                </div>
                            ) : null}

                            {/* Real Google reviews pulled from the Google Places API and
                                managed in Admin → Google Reviews. */}
                            {googleReviews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {googleReviews.map((review) => (
                                        <GoogleReviewCard key={review.id} review={review} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <a
                                        href="https://www.google.com/search?q=fast+home+cash+offers"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-[#03407F] text-white font-semibold rounded-lg hover:bg-[#02356b] transition-colors"
                                    >
                                        View Our Google Reviews
                                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Video Testimonials */}
                    <section className="py-8 lg:py-16 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-left md:text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Video Testimonials
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Watch real homeowners share their experience selling to Fast Home Cash Offers
                                </p>
                            </div>

                            {/* Video Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {videoTestimonials.map((video) => (
                                    <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                        <div className="aspect-video bg-black">
                                            {isFileVideo(video.video_url) ? (
                                                <video
                                                    className="w-full h-full"
                                                    controls
                                                    playsInline
                                                    preload="metadata"
                                                >
                                                    <source src={video.video_url} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <iframe
                                                    className="w-full h-full"
                                                    src={toEmbedUrl(video.video_url)}
                                                    title={`Testimonial from ${video.name}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-1">{video.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                {video.location || 'A real homeowner shares their experience'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {videoTestimonials.length === 0 && (
                                <div className="text-center mt-8">
                                    <p className="text-gray-500 italic">More video testimonials will be added soon.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section
                        className="relative bg-cover bg-center bg-no-repeat py-20"
                        style={{
                            backgroundImage: 'url(/images/happy-customers-bg.jpg), url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                        }}
                        role="img"
                        aria-label="Beautiful residential neighborhood with modern homes representing our satisfied customer base"
                    >
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                        
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left md:text-center">
                            <div className="text-white">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Ready to Join Our Happy Customers?
                                </h2>
                                <p className="text-xl mb-8 max-w-3xl mx-auto">
                                    Get your fair cash offer today and experience the same great service our customers rave about.
                                </p>
                                <a
                                    href="/#get-offer"
                                    className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Get My Cash Offer
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

// A single Google review card. Each card owns its own expand/collapse state so
// long reviews can be clamped to a uniform height (keeping the grid row tidy)
// and expanded individually via a per-card "Show more / Show less" toggle.
function GoogleReviewCard({ review }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = review.text && review.text.length > 300;

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center mb-4">
                {review.author_photo_url ? (
                    <img
                        className="h-11 w-11 rounded-full mr-3"
                        src={review.author_photo_url}
                        alt={review.author_name}
                        loading="lazy"
                    />
                ) : (
                    <div className="h-11 w-11 rounded-full bg-[#03407F] flex items-center justify-center mr-3">
                        <span className="text-lg font-semibold text-white">
                            {review.author_name ? review.author_name.charAt(0).toUpperCase() : 'G'}
                        </span>
                    </div>
                )}
                <div className="min-w-0">
                    {review.author_url ? (
                        <a
                            href={review.author_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gray-900 hover:underline truncate block"
                        >
                            {review.author_name}
                        </a>
                    ) : (
                        <span className="font-semibold text-gray-900 truncate block">{review.author_name}</span>
                    )}
                    <span className="text-xs text-gray-500">{review.relative_time_description}</span>
                </div>
                {/* Google "G" */}
                <svg className="w-5 h-5 ml-auto flex-shrink-0" viewBox="0 0 24 24" aria-label="Google">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
            </div>
            <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'fill-current text-gray-300'}`}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            {review.text && (
                <p
                    className={`text-gray-700 text-sm leading-relaxed ${expanded ? 'line-clamp-none' : 'line-clamp-6'}`}
                    style={expanded ? undefined : { display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                    {review.text}
                </p>
            )}
            {isLong && (
                <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="mt-2 text-sm font-semibold text-[#03407F] hover:underline self-start"
                >
                    {expanded ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    );
}
