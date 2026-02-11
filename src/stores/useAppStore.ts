import { create } from "zustand";

export interface Charity {
    id: string;
    name: string;
    description: string;
    category: string;
    logo: string;
    monthlyPrice: number; // Price to subscribe to this charity
    impact: string; // What €1 does
    donors: number;
    story?: string; // Emotional story about the charity
}

export interface CartItem {
    charityId: string;
    charity: Charity;
}

interface AppState {
    // Cart State
    cart: CartItem[];

    // UI State
    theme: "light" | "dark";
    isLoading: boolean;

    // Cart Actions
    addToCart: (charity: Charity) => void;
    removeFromCart: (charityId: string) => void;
    clearCart: () => void;
    getTotalMonthly: () => number;
    getCartCount: () => number;

    // UI Actions
    toggleTheme: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    // Initial state
    cart: [],
    theme: "light",
    isLoading: false,

    // Cart Actions
    addToCart: (charity) =>
        set((state) => {
            // Check if charity already in cart
            if (state.cart.some((item) => item.charityId === charity.id)) {
                return state;
            }
            return {
                cart: [...state.cart, { charityId: charity.id, charity }],
            };
        }),
    removeFromCart: (charityId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.charityId !== charityId),
        })),
    clearCart: () => set({ cart: [] }),
    getTotalMonthly: () => {
        const state = get();
        return state.cart.reduce(
            (sum, item) => sum + item.charity.monthlyPrice,
            0,
        );
    },
    getCartCount: () => get().cart.length,

    // UI Actions
    toggleTheme: () =>
        set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
        })),
    setLoading: (loading) => set({ isLoading: loading }),
}));
