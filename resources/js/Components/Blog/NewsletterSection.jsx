import { useState } from 'react';
import { getUtmParams } from '../../utils/utm';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ email, utm: getUtmParams() }),
            });
        } catch (error) {
            console.error('Newsletter subscription error:', error);
        } finally {
            // Always show success — subscription is best-effort and forwarded to Zapier.
            setSubmitted(true);
            setEmail('');
            setIsSubmitting(false);

            // Reset after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        }
    };
    
    return (
        <section className="py-8 lg:py-16 bg-[#03407F]">
            <div className="container mx-auto px-6 max-w-[900px]">
                <div className="text-center text-white mb-8">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Newsletter</h2>
                    <p className="text-lg opacity-90">
                        Subscribe to our newsletter to receive the latest real estate tips, market insights, 
                        and exclusive content delivered directly to your inbox.
                    </p>
                </div>
                
                <div className="max-w-xl mx-auto">
                    {submitted ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center">
                            <p className="font-medium">Thank you for subscribing! Check your email to confirm your subscription.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-4 bg-[#4A90E2] text-white font-bold rounded-lg hover:bg-[#3A80D2] transition-colors duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    )}
                    
                    <p className="text-white text-sm mt-4 text-center opacity-80">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
}
