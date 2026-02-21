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

export type UserRole = "admin" | "company_admin" | "employee";

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    joinedDate: Date;
    bio?: string;
    role: UserRole;
    companyId?: string;
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

// ============================================================================
// B2B COMPANY & EMPLOYEE TYPES
// ============================================================================

export type SubscriptionTier = "starter" | "professional" | "enterprise";

export interface Company {
    id: string;
    name: string;
    industry: string;
    employeeCount: number;
    adminId: string;
    subscriptionTier: SubscriptionTier;
    monthlyPrice: number;
    donationMatchingEnabled: boolean;
    matchingPercentage: number;
    stripeCustomerId?: string;
    stripeConnectAccountId?: string;
    logo?: string;
    website?: string;
    csrContact?: string;
    csrEmail?: string;
    createdAt: string;
    updatedAt: string;
    active: boolean;
}

export interface Employee {
    id: string;
    companyId: string;
    email: string;
    name: string;
    selectedCharities: string[];
    monthlyDonationAmount: number;
    charityAllocations: { [charityId: string]: number };
    payrollDeductionEnabled: boolean;
    joinedAt: string;
    lastDonationDate?: string;
    totalDonated: number;
}

export interface CompanyDonation {
    id: string;
    companyId: string;
    employeeId: string;
    charityId: string;
    amount: number;
    companyMatch?: number;
    donationDate: string;
    status: "pending" | "completed" | "failed";
    stripePaymentId?: string;
}

export interface EmployeeInvite {
    id: string;
    companyId: string;
    email: string;
    token: string;
    expiresAt: string;
    accepted: boolean;
    createdAt: string;
}

export interface CompanyMetrics {
    companyId: string;
    totalEmployeesEnrolled: number;
    totalDonationsThisMonth: number;
    totalCompanyMatchThisMonth: number;
    topCharities: string[];
    participationRate: number;
    lastUpdated: string;
}

export interface CSRReport {
    companyId: string;
    month: string;
    year: number;
    totalDonations: number;
    totalMatch: number;
    employeesParticipating: number;
    charitiesSupported: string[];
    impactMetrics: { [charityId: string]: ImpactMetrics };
    generatedAt: string;
}

export interface TaxReceipt {
    id: string;
    employeeId: string;
    donationId: string;
    year: number;
    totalAmount: number;
    charities: { id: string; amount: number }[];
    generatedAt: string;
}
