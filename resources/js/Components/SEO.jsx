import { Head, usePage } from '@inertiajs/react';

export default function SEO({
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
    noIndex = false,
    structuredData = null,
    additionalMeta = []
}) {
    const { siteSettings } = usePage().props;
    const baseTitle = "Fast Home Cash Offers";
    const fullTitle = title ? `${title} - ${baseTitle}` : baseTitle;
    const defaultDescription = "Get a fair cash offer for your house in 24 hours. We buy houses in any condition - no repairs needed, no commissions, fast closing.";
    const finalDescription = description || defaultDescription;
    const finalOgImage = ogImage || '/images/default-og-image.jpg';
    const currentUrl = canonicalUrl || window.location.href;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            
            {/* Robots */}
            {noIndex && <meta name="robots" content="noindex,nofollow" />}
            
            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />
            
            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={title || baseTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalOgImage} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={baseTitle} />
            
            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || baseTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalOgImage} />
            <meta name="twitter:site" content="@fasthomecash" />
            
            {/* Additional meta tags */}
            {additionalMeta.map((meta, index) => (
                <meta key={index} {...meta} />
            ))}
            
            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
            
            {/* Favicon */}
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            
            {/* Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            
            {/* Theme Color */}
            <meta name="theme-color" content="#1e3a5f" />
        </Head>
    );
}

// Blog Post specific SEO component
export function BlogPostSEO({ blogPost, relatedPosts = [] }) {
    const title = blogPost.meta_title || blogPost.title;
    const description = blogPost.meta_description || blogPost.excerpt;
    const keywords = blogPost.tags ? (Array.isArray(blogPost.tags) ? blogPost.tags.join(', ') : blogPost.tags) : '';
    const ogImage = blogPost.featured_image || '/images/default-blog-image.jpg';
    const canonicalUrl = blogPost.canonical_url || `/blog/${blogPost.slug}`;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogPost.title,
        "description": description,
        "image": ogImage,
        "author": {
            "@type": "Person",
            "name": blogPost.author_name || "Fast Home Cash Offers Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Fast Home Cash Offers",
            "logo": {
                "@type": "ImageObject",
                "url": "/images/logo.png"
            }
        },
        "datePublished": blogPost.published_at,
        "dateModified": blogPost.updated_at,
        "url": canonicalUrl,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        }
    };

    const additionalMeta = [
        { property: "article:author", content: blogPost.author_name || "Fast Home Cash Offers Team" },
        { property: "article:published_time", content: blogPost.published_at },
        { property: "article:modified_time", content: blogPost.updated_at },
        { property: "article:section", content: blogPost.category || "Blog" }
    ];

    // Add article tags
    if (blogPost.tags && Array.isArray(blogPost.tags)) {
        blogPost.tags.forEach(tag => {
            additionalMeta.push({ property: "article:tag", content: tag });
        });
    }

    return (
        <SEO
            title={title}
            description={description}
            keywords={keywords}
            ogImage={ogImage}
            canonicalUrl={canonicalUrl}
            structuredData={structuredData}
            additionalMeta={additionalMeta}
        />
    );
}

// Home Page SEO component
export function HomePageSEO() {
    const { siteSettings } = usePage().props;

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Fast Home Cash Offers",
        "url": window.location.origin,
        "logo": {
            "@type": "ImageObject",
            "url": window.location.origin + "/images/logo.png",
            "width": "164",
            "height": "32"
        },
        "description": "Professional cash home buyers helping homeowners sell their properties quickly and fairly.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Main Street",
            "addressLocality": "Your City",
            "addressRegion": "Your State",
            "postalCode": "12345",
            "addressCountry": "US"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": `+1-${siteSettings.contactPhone.replace(/\D/g, '')}`,
            "contactType": "customer service",
            "areaServed": "US",
            "availableLanguage": "English"
        },
        "sameAs": [
            "https://www.facebook.com/fasthomecashoffers",
            "https://www.twitter.com/fasthomecash",
            "https://www.linkedin.com/company/fasthomecashoffers",
            "https://www.instagram.com/fasthomecashoffers",
            "https://www.youtube.com/@fasthomecashoffers"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "68"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Cash Home Buying Services",
        "provider": {
            "@type": "Organization",
            "name": "Fast Home Cash Offers"
        },
        "areaServed": {
            "@type": "Country",
            "name": "United States"
        },
        "description": "We buy houses for cash in any condition. Fast closing, fair offers, no repairs needed.",
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
        }]
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [organizationSchema, serviceSchema, breadcrumbSchema]
    };

    return (
        <SEO
            title="Sell Your House Fast for Cash - Fair Offers in 24 Hours"
            description="Need to sell your house fast? Get a fair cash offer in 24 hours. No repairs, no commissions, no hassles. We buy houses in any condition across the USA. A+ BBB Rating."
            keywords="sell house fast, cash home buyers, we buy houses, fast home sale, sell house as is, sell house without repairs, stop foreclosure, inherited property, cash for houses, quick house sale"
            structuredData={structuredData}
        />
    );
}
