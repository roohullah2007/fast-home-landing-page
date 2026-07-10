import { Link } from '@inertiajs/react';

export default function FAQSection() {
    return (
        <section className="py-8 lg:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-left lg:text-center mb-14">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600 max-w-3xl lg:mx-auto">
                        Get answers to common questions about our approach to buying homes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* FAQ Item 1 */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">How fast can you really close?</h3>
                        <p className="text-gray-600">
                            We can close in as little as 7 days if needed, or we can work with your timeline. Unlike traditional sales that take months, our cash offer process eliminates financing delays and allows for much faster closings.
                        </p>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Will your offer be fair?</h3>
                        <p className="text-gray-600">
                            Yes. We determine our offer based on the current market value, condition of your home, and necessary repairs. While our offers account for our investment costs, they're designed to be fair and competitive for your area.
                        </p>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Do I need to make repairs before selling?</h3>
                        <p className="text-gray-600">
                            Absolutely not! We buy houses in as-is condition, regardless of age, damage, or needed repairs. You don't need to clean, fix, or update anything before we purchase your home.
                        </p>
                    </div>

                    {/* FAQ Item 4 */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Are there any fees or commissions?</h3>
                        <p className="text-gray-600">
                            No. Unlike working with a real estate agent, there are no commissions or fees when selling to us. We cover all closing costs, and the offer we make is the amount you receive.
                        </p>
                    </div>

                    {/* FAQ Item 5 */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">What types of properties do you buy?</h3>
                        <p className="text-gray-600">
                            We purchase all types of residential properties including single-family homes, condos, townhouses, duplexes, multi-family units, and even some commercial properties, regardless of their condition.
                        </p>
                    </div>

                    {/* FAQ Item 6 */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Is your offer really obligation-free?</h3>
                        <p className="text-gray-600">
                            Completely. We provide a no-obligation cash offer, which means you can take time to consider it without any pressure. If you decide it's not right for you, there's no cost and no commitment.
                        </p>
                    </div>
                </div>
                
                {/* More Questions */}
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-700 mb-6">
                        Have more questions about our approach? We're happy to help!
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-[#03407F] text-white px-8 py-3 font-bold text-lg capitalize hover:bg-[#02356b] transition-colors duration-200 rounded-md"
                    >
                        Get Your Cash Offer
                    </Link>
                </div>
            </div>
        </section>
    );
}