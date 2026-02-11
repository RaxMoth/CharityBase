/**
 * SEO Utilities for CharityBase
 * Helper functions for managing meta tags and SEO
 */

import { Helmet } from "react-helmet-async";
import { MetaTags, StructuredData } from "../types";
import { SITE_CONFIG } from "../config/seo";

// ============================================================================
// META TAG UTILITIES
// ============================================================================

/**
 * Generate complete meta tag object with defaults
 */
export const generateMetaTags = (custom: MetaTags): MetaTags => {
    return {
        ogImage: SITE_CONFIG.ogImage,
        ogType: "website",
        ...custom,
    };
};

/**
 * Canonical URL helper
 */
export const getCanonicalUrl = (path: string): string => {
    return `${SITE_CONFIG.url}${path}`;
};

// ============================================================================
// REACT HELMET WRAPPER
// ============================================================================

/**
 * Reusable SEO Head component using React Helmet
 */
interface SEOHeadProps {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
    canonicalUrl?: string;
    structuredData?: StructuredData;
}

export const useSEOMeta = (props: SEOHeadProps) => {
    const {
        title,
        description,
        keywords = [],
        ogImage = SITE_CONFIG.ogImage,
        ogType = "website",
        twitterCard = "summary_large_image",
        canonicalUrl,
        structuredData,
    } = props;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(", ")} />
            )}

            {/* Open Graph Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content={SITE_CONFIG.name} />
            <meta property="og:url" content={canonicalUrl || window.location.href} />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

// ============================================================================
// PAGE-SPECIFIC SEO FUNCTIONS
// ============================================================================

/**
 * Generate meta description from content (max 160 chars)
 */
export const truncateDescription = (text: string, maxLength: number = 160): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
};

/**
 * Generate keywords array from text content
 */
export const extractKeywords = (text: string, limit: number = 5): string[] => {
    const words = text
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 3);

    // Simple frequency-based extraction (in production, use NLP library)
    const wordFreq = new Map<string, number>();
    words.forEach((word) => {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    });

    return Array.from(wordFreq.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([word]) => word);
};

// ============================================================================
// ANALYTICS & TRACKING
// ============================================================================

/**
 * Log page view for analytics
 */
export const logPageView = (pageName: string, path: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "page_view", {
            page_title: pageName,
            page_location: getCanonicalUrl(path),
        });
    }
};

/**
 * Log custom event for analytics
 */
export const logEvent = (eventName: string, eventData: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", eventName, eventData);
    }
};

// ============================================================================
// RICH SNIPPETS & SCHEMA.ORG
// ============================================================================

/**
 * Format breadcrumb for rich snippets
 */
export const formatBreadcrumbPath = (
    path: string
): Array<{ name: string; url: string }> => {
    const segments = path
        .split("/")
        .filter((s) => s.length > 0);

    const breadcrumbs = [{ name: "Home", url: "/" }];

    let currentPath = "";
    segments.forEach((segment) => {
        currentPath += `/${segment}`;
        breadcrumbs.push({
            name: segment.charAt(0).toUpperCase() + segment.slice(1),
            url: currentPath,
        });
    });

    return breadcrumbs;
};

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================

/**
 * Lazy load images for better performance
 */
export const lazyLoadImages = () => {
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove("lazy");
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll("img.lazy").forEach((img) => imageObserver.observe(img));
    }
};
