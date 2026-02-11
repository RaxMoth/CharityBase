/**
 * Core TypeScript Type Definitions for CharityBase
 * Central location for all application interfaces and types
 */

// ============================================================================
// CHARITY TYPES
// ============================================================================

export interface ImpactMetrics {
    [key: string]: number;
}

export interface Charity {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    category:
        | "Food Security"
        | "Water & Sanitation"
        | "Education"
        | "Healthcare"
        | "Environment"
        | "Poverty Alleviation";
    logo: string;
    monthlyPrice: number;
    impact: string;
    donors: number;
    verified: boolean;
    registeredYear: number;
    countriesActive: string[];
    website: string;
    impactMetrics: ImpactMetrics;
    stripePriceId: string;
    stripe_account_id: string;
}

export interface CartItem {
    charityId: string;
    charity: Charity;
}

// ============================================================================
// USER & AUTHENTICATION TYPES
// ============================================================================

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    joinedDate: Date;
    bio?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupFormData {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

// ============================================================================
// APP STORE TYPES
// ============================================================================

export interface AppStoreState {
    cart: CartItem[];
    theme: "light" | "dark";
    isLoading: boolean;

    // Actions
    addToCart: (charity: Charity) => void;
    removeFromCart: (charityId: string) => void;
    getTotalMonthly: () => number;
    getCartCount: () => number;
    clearCart: () => void;
    setTheme: (theme: "light" | "dark") => void;
}

// ============================================================================
// AUTH STORE TYPES
// ============================================================================

export interface AuthStoreState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, name: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
    clearError: () => void;
}

// ============================================================================
// PAYMENT & CHECKOUT TYPES
// ============================================================================

export interface PaymentMethod {
    id: string;
    type: "card" | "paypal" | "bank_transfer";
    lastFour?: string;
    expiryDate?: string;
    default: boolean;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    totalAmount: number;
    status: "pending" | "completed" | "failed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
    paymentIntentId?: string;
}

// ============================================================================
// SEO TYPES
// ============================================================================

export interface MetaTags {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
}

export interface StructuredData {
    "@context": string;
    "@type": string;
    [key: string]: any;
}

// ============================================================================
// DONATION & IMPACT TYPES
// ============================================================================

export interface DonationRecord {
    id: string;
    charityId: string;
    amount: number;
    date: Date;
    status: "completed" | "pending" | "failed";
}

export interface ImpactReport {
    charityId: string;
    metric: string;
    value: number;
    updatedAt: Date;
}
