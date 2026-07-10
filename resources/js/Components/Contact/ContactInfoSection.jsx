import { usePage } from '@inertiajs/react';

export default function ContactInfoSection() {
    const { siteSettings } = usePage().props;

    const contactInfo = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: "Phone",
            info: siteSettings.contactPhone,
            href: siteSettings.contactPhone ? `tel:${siteSettings.contactPhone.replace(/[^\d+]/g, '')}` : null,
            description: "Monday-Friday, 9am-6pm CST"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email",
            info: siteSettings.contactEmail,
            href: siteSettings.contactEmail ? `mailto:${siteSettings.contactEmail}` : null,
            description: "We'll respond within 24 hours"
        }
    ];

    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We're here to answer your questions and provide the information you need.
                        Reach out through any of these channels and our team will get back to you promptly.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="text-center p-8 bg-gray-50 rounded-lg shadow-md transition-transform hover:transform hover:scale-105">
                            <div className="w-16 h-16 mx-auto bg-[#03407F] rounded-full flex items-center justify-center mb-6 text-white">
                                {item.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                            {item.href ? (
                                <a href={item.href} className="text-[#03407F] font-semibold mb-2 inline-block hover:underline break-words">{item.info}</a>
                            ) : (
                                <p className="text-[#03407F] font-semibold mb-2">{item.info}</p>
                            )}
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
