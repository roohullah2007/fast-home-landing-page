import { Link } from '@inertiajs/react';
import CashOfferButton from '@/Components/CashOfferButton';

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            location: "Austin, TX",
            rating: 5,
            text: "Fast Home Cash Offers made selling my inherited property so easy. They handled everything and closed in just 10 days. I couldn't be happier with their professional service.",
            avatar: "SJ"
        },
        {
            name: "Michael Chen",
            location: "Denver, CO", 
            rating: 5,
            text: "After months of trying to sell traditionally, I called Fast Home Cash Offers. They gave me a fair offer and closed within a week. No repairs, no hassles!",
            avatar: "MC"
        },
        {
            name: "Lisa Rodriguez",
            location: "Phoenix, AZ",
            rating: 5,
            text: "The team was incredibly transparent throughout the entire process. They explained everything clearly and delivered exactly what they promised. Highly recommended!",
            avatar: "LR"
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <svg 
                key={i} 
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 24 24"
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
        ));
    };

    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="w-full sm:container sm:mx-auto sm:max-w-7xl">
                <div className="text-center mb-12 px-4">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        CLIENT TESTIMONIALS
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                        What Our Clients Say About Us
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Don't just take our word for it. Here's what homeowners across the country 
                        have to say about their experience with Fast Home Cash Offers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                            {/* Stars */}
                            <div className="flex items-center mb-4">
                                {renderStars(testimonial.rating)}
                            </div>
                            
                            {/* Testimonial Text */}
                            <p className="text-gray-700 leading-relaxed mb-6 italic">
                                "{testimonial.text}"
                            </p>
                            
                            {/* Client Info */}
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-[#03407F] rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12 px-4">
                    <p className="text-lg text-gray-600 mb-6">
                        Ready to join our satisfied customers?
                    </p>
                    <CashOfferButton
                        text="Get Your Cash Offer Today"
                        variant="primary"
                        size="large"
                    />
                </div>
            </div>
        </section>
    );
}