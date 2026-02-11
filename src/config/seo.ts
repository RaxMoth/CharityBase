/**
 * SEO Configuration for CharityBase
 * Centralized metadata, Open Graph tags, and SEO constants
 */

import { MetaTags, StructuredData } from "../types";

// ============================================================================
// SITE CONFIGURATION
// ============================================================================

export const SITE_CONFIG = {
    name: "CharityBase",
    url: "https://charitybase.org",
    description:
        "Support verified charities with monthly subscriptions. Direct impact, transparent pricing, real change.",
    logo: "https://charitybase.org/logo.png",
    ogImage: "https://charitybase.org/og-image.png",
    socialLinks: {
        twitter: "https://twitter.com/charitybase",
        facebook: "https://facebook.com/charitybase",
        instagram: "https://instagram.com/charitybase",
    },
};

// ============================================================================
// PAGE META TAGS
// ============================================================================

export const PAGE_META: Record<string, MetaTags> = {
    home: {
        title: "CharityBase | Support Verified Charities Monthly",
        description:
            "Join thousands supporting real charities through monthly subscriptions. Transparent pricing, verified organizations, real impact.",
        keywords: [
            "charity subscriptions",
            "monthly donations",
            "verified charities",
            "social impact",
            "nonprofit marketplace",
        ],
        ogType: "website",
    },
    charities: {
        title: "Browse Charities | CharityBase - Verified Organizations",
        description:
            "Discover verified charities across food security, education, healthcare, water access, and environmental conservation.",
        keywords: [
            "browse charities",
            "verified nonprofits",
            "donate to charity",
            "charitable organizations",
        ],
        ogType: "website",
    },
    dashboard: {
        title: "Your Dashboard | CharityBase - Manage Your Impact",
        description:
            "View your active subscriptions, track your monthly commitment, and manage your donations to verified charities.",
        keywords: [
            "dashboard",
            "my donations",
            "subscriptions",
            "impact tracking",
        ],
        ogType: "website",
    },
    about: {
        title: "About CharityBase | Our Mission & Values",
        description:
            "Learn about CharityBase mission to connect donors with verified charities. We are the transparent middleman making global impact accessible.",
        keywords: [
            "about us",
            "charity mission",
            "nonprofit marketplace",
            "social impact",
        ],
        ogType: "website",
    },
    privacy: {
        title: "Privacy Policy | CharityBase",
        description:
            "Learn how CharityBase protects your data and respects your privacy. GDPR-compliant data handling and transparent policies.",
        keywords: ["privacy policy", "data protection", "GDPR"],
        ogType: "website",
    },
    terms: {
        title: "Terms of Service | CharityBase",
        description:
            "Read our terms of service describing how to use CharityBase and your rights as a donor.",
        keywords: ["terms of service", "legal", "user agreement"],
        ogType: "website",
    },
    faq: {
        title: "FAQ | CharityBase - Frequently Asked Questions",
        description:
            "Common questions about CharityBase, monthly subscriptions, charity verification, and donations.",
        keywords: ["faq", "help", "support", "questions"],
        ogType: "website",
    },
    login: {
        title: "Login | CharityBase - Manage Your Donations",
        description:
            "Sign in to manage your subscriptions and track your impact.",
        keywords: ["login", "sign in", "account"],
        ogType: "website",
    },
    signup: {
        title: "Join CharityBase | Start Supporting Charities Today",
        description:
            "Create a new account to start making a difference through monthly charitable subscriptions.",
        keywords: ["signup", "register", "create account", "join us"],
        ogType: "website",
    },
};

// ============================================================================
// STRUCTURED DATA (JSON-LD)
// ============================================================================

export const generateOrganizationSchema = (): StructuredData => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CharityBase",
    url: SITE_CONFIG.url,
    logo: SITE_CONFIG.logo,
    description: SITE_CONFIG.description,
    sameAs: [
        SITE_CONFIG.socialLinks.twitter,
        SITE_CONFIG.socialLinks.facebook,
        SITE_CONFIG.socialLinks.instagram,
    ],
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: "support@charitybase.org",
    },
});

export const generateCharitySchema = (charity: {
    id: string;
    name: string;
    description: string;
    monthlyPrice: number;
    donors: number;
    website: string;
    logo: string;
}): StructuredData => ({
    "@context": "https://schema.org",
    "@type": "NGO",
    name: charity.name,
    url: charity.website,
    logo: charity.logo,
    description: charity.description,
    memberOf: {
        "@type": "Organization",
        name: "CharityBase",
        url: SITE_CONFIG.url,
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.8,
        ratingCount: charity.donors,
    },
    offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        price: charity.monthlyPrice,
    },
});

export const generateBreadcrumbSchema = (
    items: Array<{ name: string; url: string }>,
): StructuredData => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_CONFIG.url}${item.url}`,
    })),
});

// ============================================================================
// SITEMAP CONFIGURATION
// ============================================================================

export const SITEMAP_URLS = [
    { loc: "/", changefreq: "weekly", priority: 1.0 },
    { loc: "/charities", changefreq: "daily", priority: 0.9 },
    { loc: "/about", changefreq: "monthly", priority: 0.7 },
    { loc: "/privacy", changefreq: "monthly", priority: 0.6 },
    { loc: "/terms", changefreq: "monthly", priority: 0.6 },
    { loc: "/faq", changefreq: "weekly", priority: 0.7 },
];

// ============================================================================
// ROBOTS.TXT CONFIGURATION
// ============================================================================

export const ROBOTS_TXT = `
User-agent: *
Allow: /
Allow: /charities
Allow: /about
Allow: /faq
Allow: /privacy
Allow: /terms

Disallow: /dashboard
Disallow: /checkout
Disallow: /admin

Sitemap: ${SITE_CONFIG.url}/sitemap.xml
`;
