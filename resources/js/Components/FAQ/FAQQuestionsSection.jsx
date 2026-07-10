import { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FAQQuestionsSection({ activeCategory }) {
    const { siteSettings } = usePage().props;
    const phoneLink = siteSettings.contactPhone.replace(/\D/g, '');

    const [openQuestion, setOpenQuestion] = useState(null);
    
    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };
    
    // FAQ data organized by category
    const faqData = {
        'selling-process': [
            {
                id: 'sp-1',
                question: 'How does selling my home to Fast Home Cash Offers work?',
                answer: 'The process is simple: (1) Contact us via phone or our website form, (2) We\'ll schedule a time to view your property, (3) We\'ll present you with a fair, no-obligation cash offer, (4) If you accept, we\'ll close on your timeline, often in as little as 7 days. There are no fees, commissions, or repairs needed.'
            },
            {
                id: 'sp-2',
                question: 'Do I need a real estate agent to sell to you?',
                answer: 'No, you don\'t need a real estate agent to sell to us. We buy directly from homeowners, which eliminates the need for an agent and saves you from paying commission fees. We handle all the paperwork and guide you through the entire process.'
            },
            {
                id: 'sp-3',
                question: 'Will you buy my home if I\'m behind on payments or facing foreclosure?',
                answer: 'Yes, we specialize in helping homeowners in difficult situations, including those behind on mortgage payments or facing foreclosure. We can often close quickly enough to stop the foreclosure process, allowing you to walk away with cash instead of damaging your credit with a foreclosure.'
            },
            {
                id: 'sp-4',
                question: 'Can I sell my house if it has tenants?',
                answer: 'Yes, we can purchase properties with tenants in place. We have experience dealing with tenant-occupied properties and can work with various scenarios, whether the tenants wish to stay or are planning to move out.'
            },
            {
                id: 'sp-5',
                question: 'Can you buy my house if I\'ve already listed it with a realtor?',
                answer: 'It depends on your listing agreement. If you have an exclusive right-to-sell agreement, you may still owe your agent a commission even if we buy your house directly. We\'re happy to review your situation and discuss options, which may include working with your agent.'
            }
        ],
        'pricing-offers': [
            {
                id: 'po-1',
                question: 'How do you determine the offer amount for my house?',
                answer: 'We consider several factors when determining our offer: the current market value of your property in its present condition, the cost of any necessary repairs or updates, the time it will take to complete those improvements, and our holding costs. We aim to make fair offers that work for both parties while reflecting the as-is value minus the costs and risks we take on.'
            },
            {
                id: 'po-2',
                question: 'Will your offer be lower than market value?',
                answer: 'Our offers reflect the as-is value of your home minus the costs we incur. While our offer may be lower than what you might get on the open market after making repairs, staging the home, and waiting months for a qualified buyer, we provide convenience, certainty, and speed. There are no commissions, fees, or repair costs to factor in, and you can close on your timeline.'
            },
            {
                id: 'po-3',
                question: 'Are there any fees or commissions to work with you?',
                answer: 'No, there are absolutely no fees or commissions when selling to us. Traditional home sales typically include 5-6% in agent commissions plus 2-3% in closing costs. When you sell to us, we cover all closing costs, and there are no commissions, which can save you thousands of dollars.'
            },
            {
                id: 'po-4',
                question: 'Can I negotiate your offer?',
                answer: 'We aim to provide our best offer upfront based on our thorough analysis. However, we understand that you may have specific considerations or information about your property that we didn\'t account for. We\'re always open to discussion and will consider additional information that might affect our valuation.'
            },
            {
                id: 'po-5',
                question: 'Do you pay cash for every house?',
                answer: 'Yes, we are cash buyers. This means we don\'t rely on traditional bank financing, which enables us to close quickly and reliably without financing contingencies or appraisal issues that can delay or derail conventional sales.'
            }
        ],
        'property-condition': [
            {
                id: 'pc-1',
                question: 'Will you buy my house in as-is condition?',
                answer: 'Yes, we buy houses in any condition, from pristine to severely damaged. You won\'t need to make any repairs, cleaning, or improvements before selling to us. This is particularly helpful for homeowners with properties that need significant work or wouldn\'t qualify for traditional financing.'
            },
            {
                id: 'pc-2',
                question: 'What if my house needs major repairs?',
                answer: 'We specialize in buying homes that need repairs, whether minor cosmetic updates or major structural issues. You don\'t need to fix anything before selling to us. We\'ll handle all necessary repairs after purchase, saving you the time, money, and stress of managing renovation projects.'
            },
            {
                id: 'pc-3',
                question: 'Do I need to clean or remove unwanted items before selling?',
                answer: 'No, you don\'t need to clean or remove unwanted items. Take what you want and leave the rest. We\'ll handle the cleaning and disposal of any unwanted items at no cost to you. This is especially helpful for estates, inherited properties, or when downsizing.'
            },
            {
                id: 'pc-4',
                question: 'Can you buy my house if it has code violations or title issues?',
                answer: 'Yes, we can purchase properties with code violations, unpermitted work, or certain title issues. Our experience and resources allow us to resolve these problems after purchase. While complex issues may affect our offer price, they rarely prevent us from buying.'
            },
            {
                id: 'pc-5',
                question: 'Will you buy my house if it\'s been damaged by fire, flood, or other disasters?',
                answer: 'Yes, we purchase homes with significant damage, including fire, flood, mold, or other disaster damage. These situations are challenging to handle through traditional sales, but we have the expertise and resources to take on these properties.'
            }
        ],
        'timeline-closing': [
            {
                id: 'tc-1',
                question: 'How quickly can you close on my house?',
                answer: 'We can typically close in as little as 7 days if needed, though the exact timeline depends on your situation and preferences. As cash buyers, we don\'t have to wait for bank approvals, appraisals, or inspections that slow down traditional sales. We can also accommodate longer timeframes if you need more time to relocate.'
            },
            {
                id: 'tc-2',
                question: 'What if I need more time before moving out?',
                answer: 'We\'re flexible and can work with your timeline. If you need more time after closing, we can arrange a rent-back agreement allowing you to stay in the home for a specified period. We can also schedule a delayed closing to give you time to find a new place or make other arrangements.'
            },
            {
                id: 'tc-3',
                question: 'What documents do I need to sell my house to you?',
                answer: 'Typically, you\'ll need your photo ID, the property deed, your most recent mortgage statement (if applicable), any relevant homeowners association documents, and documentation of any judgments or liens against the property. We\'ll help you identify exactly what\'s needed for your specific situation.'
            },
            {
                id: 'tc-4',
                question: 'How does the closing process work?',
                answer: 'We work with reputable title companies to handle the closing. They\'ll conduct a title search, prepare the necessary documents, and schedule the closing. At closing, you\'ll sign the paperwork, and we\'ll provide payment via cashier\'s check or wire transfer. The whole process is straightforward and typically takes less than an hour.'
            },
            {
                id: 'tc-5',
                question: 'Do I have to attend the closing in person?',
                answer: 'Not necessarily. While in-person closings are common, we can arrange for mobile notaries to bring the paperwork to you, or in some cases, handle the closing via mail. We strive to make the process as convenient as possible for your situation.'
            }
        ],
        'company-credentials': [
            {
                id: 'cc-1',
                question: 'Is Fast Home Cash Offers a legitimate company?',
                answer: 'Yes, Fast Home Cash Offers is a legitimate, established real estate investment company with years of experience buying properties. We\'re proud members of the Better Business Bureau and have many satisfied customers. We encourage you to check our references, read our reviews, and verify our business credentials.'
            },
            {
                id: 'cc-2',
                question: 'How long have you been in business?',
                answer: 'Fast Home Cash Offers has been purchasing properties since 2010. Over the years, we\'ve helped hundreds of homeowners sell their properties quickly and hassle-free, building a reputation for fair deals and professional service.'
            },
            {
                id: 'cc-3',
                question: 'Are you actual home buyers or just middlemen?',
                answer: 'We are direct buyers with our own funding sources. Unlike some companies that simply contract properties and then try to assign them to other buyers, we buy directly with our own resources. This enables us to make firm commitments and close quickly without contingencies.'
            },
            {
                id: 'cc-4',
                question: 'What areas do you buy homes in?',
                answer: 'We purchase properties throughout Texas, focusing primarily on major metropolitan areas including Dallas-Fort Worth, Houston, San Antonio, and Austin, as well as their surrounding suburbs and smaller cities within the state.'
            },
            {
                id: 'cc-5',
                question: 'Can I see testimonials from other sellers you\'ve worked with?',
                answer: 'Absolutely! We have testimonials on our website from many satisfied sellers. We\'re also happy to provide references you can contact directly to hear about their experiences working with us. Customer satisfaction is our priority, and we\'re proud of our track record.'
            }
        ],
        'general-questions': [
            {
                id: 'gq-1',
                question: 'Is selling to a cash buyer better than listing with a realtor?',
                answer: 'It depends on your situation and priorities. Selling to a cash buyer like us offers speed, convenience, certainty, and no additional costs. Traditional listings may potentially yield a higher sale price but involve more time, uncertainty, showing the home, making repairs, paying commissions, and dealing with buyer financing issues. We\'re best for those who value speed, certainty, and convenience over maximizing sale price.'
            },
            {
                id: 'gq-2',
                question: 'What types of properties do you buy?',
                answer: 'We purchase a wide variety of residential properties including single-family homes, multi-family properties (duplexes, triplexes, etc.), condos, townhouses, and even some commercial properties. We buy properties in any condition, including those needing repairs or with complicated situations.'
            },
            {
                id: 'gq-3',
                question: 'Do you buy properties with back taxes or liens?',
                answer: 'Yes, we regularly purchase properties with back taxes, liens, judgments, or other title issues. These amounts will typically be paid from the proceeds at closing, but we can work with these situations and still provide you with cash at closing in many cases.'
            },
            {
                id: 'gq-4',
                question: 'What if I\'m going through a divorce or probate situation?',
                answer: 'We have experience with divorce and probate situations. We can work with attorneys, courts, and multiple stakeholders to ensure a smooth transaction. Our cash offers and flexible closing timelines can be particularly helpful in these situations where a quick, certain sale is often beneficial.'
            },
            {
                id: 'gq-5',
                question: 'Is there any obligation if I get an offer from you?',
                answer: 'There is absolutely no obligation when you receive an offer from us. Our offers are completely free, and you\'re under no pressure or commitment to accept. We encourage you to consider all your options and make the decision that\'s best for your situation.'
            }
        ]
    };
    
    // Get the questions for the active category, or show all if none selected
    const questionsToShow = activeCategory 
        ? faqData[activeCategory] 
        : Object.values(faqData).flat();
    
    return (
        <section className="py-8 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-6 max-w-[900px]">
                {!activeCategory && (
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
                )}
                
                <div className="space-y-4">
                    {questionsToShow.map((faq) => (
                        <div 
                            key={faq.id} 
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                        >
                            <button 
                                className="w-full px-8 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50"
                                onClick={() => toggleQuestion(faq.id)}
                                aria-expanded={openQuestion === faq.id}
                            >
                                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                                <span className="ml-6 transform transition-transform duration-300">
                                    {openQuestion === faq.id ? (
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-[#03407F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    )}
                                </span>
                            </button>
                            
                            {openQuestion === faq.id && (
                                <div className="px-8 py-5 bg-white border-t border-gray-100">
                                    <p className="text-gray-700">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Didn't find your answer section */}
                <div className="mt-16 bg-white p-8 rounded-lg shadow-md text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Don't See Your Question?</h3>
                    <p className="text-gray-600 mb-6">
                        We're here to help! Contact us directly and we'll be happy to answer any questions you have.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href={`tel:${phoneLink}`}
                            className="px-6 py-3 bg-[#03407F] text-white font-semibold rounded-md hover:bg-[#02356b] transition-colors duration-200"
                        >
                            Call Us: {siteSettings.contactPhone}
                        </a>
                        <a 
                            href="#contact-form" 
                            className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors duration-200"
                        >
                            Send a Message
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
