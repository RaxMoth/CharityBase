import { create } from "zustand";

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    joinedDate: Date;
    bio?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Auth actions
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, name: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email: string, _password: string) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock user creation
            const mockUser: User = {
                id: `user_${Date.now()}`,
                email,
                name: email.split("@")[0],
                joinedDate: new Date(),
            };

            // Store in localStorage (in real app, this would be a secure session)
            localStorage.setItem("charitybase_user", JSON.stringify(mockUser));
            localStorage.setItem("charitybase_token", `token_${Date.now()}`);

            set({
                user: mockUser,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: "Login failed",
                isLoading: false,
            });
        }
    },

    signup: async (email: string, name: string, _password: string) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Check if user exists (in real app, this would be a backend check)
            const existingUser = localStorage.getItem("charitybase_user");
            if (existingUser) {
                throw new Error("Email already registered");
            }

            const newUser: User = {
                id: `user_${Date.now()}`,
                email,
                name,
                joinedDate: new Date(),
            };

            localStorage.setItem("charitybase_user", JSON.stringify(newUser));
            localStorage.setItem("charitybase_token", `token_${Date.now()}`);

            set({
                user: newUser,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Signup failed",
                isLoading: false,
            });
        }
    },

    logout: () => {
        localStorage.removeItem("charitybase_user");
        localStorage.removeItem("charitybase_token");
        set({
            user: null,
            isAuthenticated: false,
            error: null,
        });
    },

    checkAuth: () => {
        const storedUser = localStorage.getItem("charitybase_user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                user.joinedDate = new Date(user.joinedDate);
                set({
                    user,
                    isAuthenticated: true,
                });
            } catch (error) {
                localStorage.removeItem("charitybase_user");
                localStorage.removeItem("charitybase_token");
            }
        }
    },

    clearError: () => set({ error: null }),
}));
