export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <img
            src="/images/logo.webp"
            alt="Fast Home Cash Offers"
            className={`object-contain ${className}`}
            {...props}
        />
    );
}
