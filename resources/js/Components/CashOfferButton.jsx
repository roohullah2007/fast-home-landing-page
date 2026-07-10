import { Link, router } from '@inertiajs/react';
import { analytics } from '@/Components/AnalyticsProvider';

/**
 * Standardized Cash Offer Button Component
 * Uses consistent styling and linking across the entire application
 * All "Get Cash Offer" buttons now redirect to homepage form
 */
export default function CashOfferButton({
    text = "Get Cash Offer",
    variant = "primary",
    size = "default",
    className = "",
    onClick = null,
    href = "/#cash-offer-form"
}) {
    // Base styles that match the homepage navbar button
    const baseStyles = "font-bold transition-colors duration-200 text-center inline-block";

    // Size variations - All buttons are 60px height (py-4 + text-lg)
    const sizeStyles = {
        small: "px-4 py-4 text-lg",
        default: "px-6 py-4 text-lg",
        large: "px-8 py-4 text-lg"
    };

    // Variant styles
    const variantStyles = {
        primary: "bg-[#03407F] text-white hover:bg-[#02356b] rounded-sm capitalize",
        white: "bg-white text-[#03407F] hover:bg-gray-100 rounded-sm capitalize",
        secondary: "bg-[#1e3a5f] hover:bg-[#2a4a6b] text-white rounded-lg",
        outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1e3a5f] rounded-lg",
        blue: "bg-blue-500 hover:bg-blue-600 text-white rounded-lg",
        orange: "text-orange-500 font-semibold hover:text-orange-600"
    };

    // Combine all styles
    const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

    // Handle click events (for smooth scrolling to forms on same page)
    const handleClick = (e) => {
        e.preventDefault();

        // Track the cash offer button click
        analytics.trackCashOfferButton(text, window.location.pathname);

        // Custom onClick handler if provided
        if (onClick) {
            onClick(e);
            return;
        }

        // Check if we're on the homepage
        const isHomePage = window.location.pathname === '/';

        // If on homepage, scroll to form
        if (isHomePage) {
            const formElement = document.getElementById('cash-offer-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // If on another page, navigate to homepage then scroll to form
            router.visit('/', {
                onSuccess: () => {
                    // Use setTimeout to ensure DOM is ready after navigation
                    setTimeout(() => {
                        const formElement = document.getElementById('cash-offer-form');
                        if (formElement) {
                            formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 100);
                }
            });
        }
    };

    // For external links (phone numbers, etc.), render as regular anchor
    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) {
        return (
            <a
                href={href}
                className={buttonClasses}
            >
                {text}
            </a>
        );
    }

    // For all cash offer buttons, use button with click handler
    return (
        <button
            className={buttonClasses}
            onClick={handleClick}
        >
            {text}
        </button>
    );
}