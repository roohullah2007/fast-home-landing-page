import { useState } from 'react';

export default function TestimonialsSection() {
    const [showAll, setShowAll] = useState(false);

    const allTestimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "Phoenix, AZ",
            quote: "After struggling to sell my property for months, Fast Home Cash Offers made the entire process simple and stress-free. They gave me a fair offer and closed in just 10 days!",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 2,
            name: "Robert Garcia",
            location: "Dallas, TX",
            quote: "I inherited a property that needed extensive repairs. Instead of investing thousands to fix it up, I called Fast Home Cash Offers. Their approach was professional and the offer exceeded my expectations.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 3,
            name: "Michelle Thompson",
            location: "Atlanta, GA",
            quote: "When I needed to relocate quickly for work, Fast Home Cash Offers came through with a quick sale. Their team was responsive, honest, and made the process seamless.",
            avatar: "https://randomuser.me/api/portraits/women/63.jpg"
        },
        {
            id: 4,
            name: "David Martinez",
            location: "Houston, TX",
            quote: "Selling my home was easier than I ever imagined. The team at Fast Home Cash Offers handled everything professionally and I got a fair price without any hassle.",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            id: 5,
            name: "Jennifer Lee",
            location: "Austin, TX",
            quote: "I was facing foreclosure and didn't know what to do. Fast Home Cash Offers stepped in and saved my credit. They closed in 8 days and I walked away with cash in hand.",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        {
            id: 6,
            name: "Michael Brown",
            location: "San Antonio, TX",
            quote: "After my divorce, I needed to sell quickly. Fast Home Cash Offers gave me a fair offer and worked around my schedule. The whole process was transparent and stress-free.",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg"
        }
    ];

    const testimonials = showAll ? allTestimonials : allTestimonials.slice(0, 3);

    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-left lg:text-center mb-14">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                    <p className="text-xl text-gray-600 max-w-3xl lg:mx-auto">
                        Don't just take our word for it. Here's what homeowners have experienced working with Fast Home Cash Offers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center mb-6">
                                <img 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name} 
                                    className="w-16 h-16 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                                    <p className="text-gray-600">{testimonial.location}</p>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                {/* 5 Stars */}
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            
                            <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                        </div>
                    ))}
                </div>
                
                {/* CTA Button */}
                <div className="text-center mt-10">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-[#03407F] text-white px-8 py-3 font-bold text-lg capitalize hover:bg-[#02356b] transition-colors duration-200 rounded-md"
                    >
                        {showAll ? 'Show Less' : 'Read More Success Stories'}
                    </button>
                </div>
            </div>
        </section>
    );
}