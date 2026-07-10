import { Head } from '@inertiajs/react';

export default function SEOHead({
    title = 'Fast Home Cash Offers - Sell Your House Fast for Cash',
    description = 'Get a fair cash offer for your house in just 24 hours. We buy houses as-is, no repairs needed, fast closing. Trusted home buyers serving nationwide.',
    keywords = 'sell house fast, cash home buyers, we buy houses, sell house as-is, fast home cash offers, quick house sale, sell house without repairs',
    ogImage = '/images/logo.webp',
    url = '',
    type = 'website'
}) {
    const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const siteName = 'Fast Home Cash Offers';

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Fast Home Cash Offers" />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Canonical URL */}
            {fullUrl && <link rel="canonical" href={fullUrl} />}
        </Head>
    );
}
