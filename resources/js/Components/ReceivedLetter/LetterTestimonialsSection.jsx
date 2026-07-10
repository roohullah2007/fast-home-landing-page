export default function LetterTestimonialsSection() {
    const testimonials = [
        {
            id: 1,
            name: "Michael Johnson",
            location: "Dallas, TX",
            testimonial: "I received a letter from Fast Home Cash Offers when I was struggling with my inherited property. Their offer was fair, and the process was so smooth. Within 2 weeks of responding to their letter, I had cash in my account!",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 2,
            name: "Sarah Williams",
            location: "Houston, TX",
            testimonial: "After getting their letter, I was skeptical at first. But after talking with their team, I felt comfortable with the process. They offered me a fair price for my rental property that needed repairs, and closed quickly without any hassles.",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 3,
            name: "Robert Garcia",
            location: "San Antonio, TX",
            testimonial: "I had been wanting to sell my property for years but dreaded the traditional real estate process. Their letter came at the perfect time, and their offer exceeded my expectations. I'm so glad I responded!",
            image: "https://randomuser.me/api/portraits/men/56.jpg"
        }
    ];

    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories From Letter Recipients</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Hear from homeowners who responded to our letters and successfully sold their properties.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="bg-gray-50 rounded-lg p-8 shadow-md">
                            <div className="flex items-center mb-6">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name} 
                                    className="w-16 h-16 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800">{testimonial.name}</h4>
                                    <p className="text-gray-600">{testimonial.location}</p>
                                </div>
                            </div>
                            
                            <svg className="w-12 h-12 text-[#03407F] opacity-20 mb-4" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 8c-2.2 0-4 1.8-4 4v10h10V12h-4c0-1.1 0.9-2 2-2h2V8h-6zm12 0c-2.2 0-4 1.8-4 4v10h10V12h-4c0-1.1 0.9-2 2-2h2V8h-6z"/>
                            </svg>
                            
                            <p className="text-gray-700 mb-6">
                                {testimonial.testimonial}
                            </p>
                            
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
