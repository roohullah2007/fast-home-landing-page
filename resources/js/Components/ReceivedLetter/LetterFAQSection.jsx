import { useState } from 'react';

export default function LetterFAQSection() {
    const [openIndex, setOpenIndex] = useState(null);
    
    const faqs = [
        {
            question: "Why did I receive a letter from Fast Home Cash Offers?",
            answer: "We send letters to property owners whose homes meet our investment criteria. This could be based on the neighborhood, property type, or other factors that make your property a good fit for our portfolio."
        },
        {
            question: "Is this a legitimate offer to buy my house?",
            answer: "Yes, absolutely. We are a legitimate real estate investment company interested in purchasing properties. Our letter represents a genuine interest in buying your home, and we're prepared to make a fair cash offer."
        },
        {
            question: "Do I have to sell my house if I respond to the letter?",
            answer: "No, there is absolutely no obligation to sell when you respond. We simply want to open a conversation about the possibility of purchasing your property if it meets your needs to sell."
        },
        {
            question: "How much will you offer for my house?",
            answer: "Our offers are based on the current market value of your property, its condition, location, and other relevant factors. We aim to make competitive, fair cash offers that work for both parties."
        },
        {
            question: "How quickly can you close if I accept your offer?",
            answer: "We can close as quickly as 7 days in some cases, or on your timeline if you need more time. Since we buy with cash, we don't have to wait for bank financing approval, which significantly speeds up the process."
        },
        {
            question: "Do I need to make repairs before selling to you?",
            answer: "No, we buy properties 'as-is,' meaning you don't need to make any repairs or improvements. This is one of the major benefits of selling to us versus the traditional market."
        }
    ];
    
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    return (
        <section className="py-8 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-[900px]">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600">
                        Common questions from homeowners who have received our letters
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
