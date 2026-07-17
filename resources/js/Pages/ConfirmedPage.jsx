import { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function ConfirmedPage() {
    const { siteSettings } = usePage().props;
    const phone = siteSettings?.contactPhone || '866-696-8613';
    const phoneLink = phone.replace(/\D/g, '');

    // Fire Google Ads "Lead Form Submitted" conversion for qualified leads.
    useEffect(() => {
        if (typeof window.gtag_report_conversion === 'function') {
            window.gtag_report_conversion();
        }
    }, []);

    return (
        <>
            <Head title="Confirmed - Fast Home Cash Offers" />

            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />

                <main className="mt-[80px] lg:mt-[102px] flex-1 flex items-center justify-center py-12 lg:py-20">
                    <div className="container mx-auto px-4 max-w-2xl text-center">
                        {/* Success Icon */}
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-bold text-[#03407F] mb-6">
                            Confirmed!
                        </h1>

                        <p className="text-xl sm:text-2xl text-gray-700 mb-10">
                            A member of our team will be in contact within 24-48 hours!
                        </p>

                        {/* Call CTA */}
                        <a
                            href={`tel:${phoneLink}`}
                            className="inline-flex items-center gap-2 bg-[#03407F] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#02356b] transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            Call {phone}
                        </a>

                        <div className="mt-8">
                            <Link href="/" className="text-[#03407F] font-semibold hover:underline">
                                Go back to home
                            </Link>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
