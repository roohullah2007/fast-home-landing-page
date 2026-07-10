import { useState } from 'react';

export default function ContactFAQSection() {
    const [openIndex, setOpenIndex] = useState(null);
    
    const faqs = [
        {
            question: "How quickly will you respond to my inquiry?",
            answer: "We typically respond to all inquiries within 24 hours on business days. If you contact us over the weekend, you can expect to hear from us on the following Monday."
        },
        {
            question: "What information should I include in my message?",
            answer: "To help us provide the most helpful response, please include your property address (if applicable), details about your situation, and your preferred contact method. The more information you provide, the better we can assist you."
        },
        {
            question: "Do I need to schedule an appointment to visit your office?",
            answer: "While walk-ins are welcome during business hours, we recommend scheduling an appointment to ensure we can dedicate our full attention to your needs. Appointments can be made by phone or through our contact form."
        },
        {
            question: "Can I get an offer for my house without an in-person visit?",
            answer: "Yes, we can provide a preliminary offer based on the information you provide about your property. However, to give you the most accurate offer, we typically conduct a brief, no-obligation visit to the property."
        },
        {
            question: "What happens after I submit a contact form?",
            answer: "After you submit a contact form, one of our property specialists will review your information and reach out to you via your preferred contact method. They'll answer your questions and guide you through the next steps based on your specific situation."
        }
    ];
    
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    return (
        <section className="py-8 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-[900px]">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Have questions about contacting us? Find answers to common questions below.
                    </p>
                </div>
                
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-lg shadow overflow-hidden"
                        >
                            <button 
                                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-xl font-semibold text-gray-800">{faq.question}</span>
                                <span className="ml-6">
                                    {openIndex === index ? (
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    )}
                                </span>
                            </button>
                            
                            {openIndex === index && (
                                <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                                    <p className="text-gray-700">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
