import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import CashOfferButton from '@/Components/CashOfferButton';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { siteSettings } = usePage().props;
    const phone = siteSettings?.contactPhone || '866-696-8613';
    const phoneDigits = phone.replace(/\D/g, '');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg w-full">
            <div className="w-full max-w-full overflow-hidden px-3 sm:px-6 lg:px-12 py-[19px]">
                <div className="flex items-center justify-between gap-2 sm:gap-10 w-full max-w-full sm:max-w-7xl sm:mx-auto">
                    {/* Logo */}
                    <div className="flex-shrink-0 min-w-0">
                        <Link href="/">
                            <img
                                src="/images/logo.webp"
                                alt="Fast Home Cash Offers"
                                width="200"
                                height="64"
                                className="h-14 sm:h-14 lg:h-16 w-auto object-contain max-w-[180px] sm:max-w-[200px] lg:max-w-none"
                                loading="eager"
                                fetchpriority="high"
                            />
                        </Link>
                    </div>

                    {/* Spacer keeps the logo left and the CTA right */}
                    <div className="hidden lg:flex flex-1"></div>

                    {/* Phone CTA + Get An Offer Button */}
                    <div className="hidden lg:flex items-center gap-6">
                        <a
                            href={`tel:${phoneDigits}`}
                            className="text-[#03407F] text-lg font-bold hover:text-[#02356b] transition-colors flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                                aria-hidden="true"
                            >
                                <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
                            </svg>
                            Call {phone}
                        </a>
                        <CashOfferButton text="Get Cash Offer" variant="primary" />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-[#03407F] text-2xl flex-shrink-0 p-2 -mr-2"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out w-full ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <nav className="pt-4 pb-2">
                        <ul className="flex flex-col space-y-3 text-center">
                            <li>
                                <a
                                    href={`tel:${phoneDigits}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-[#03407F] text-lg font-bold py-2 text-center"
                                >
                                    Call {phone}
                                </a>
                            </li>
                            <li className="pt-2 px-4">
                                <div onClick={() => setIsMenuOpen(false)} className="flex justify-center">
                                    <CashOfferButton
                                        text="Get Cash Offer"
                                        variant="primary"
                                        className="w-full max-w-xs mx-auto"
                                    />
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
