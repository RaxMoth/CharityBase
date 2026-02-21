import { create } from "zustand";

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

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Auth actions
    login: (email: string, password: string, role?: UserRole) => Promise<void>;
    signup: (
        email: string,
        name: string,
        password: string,
        role?: UserRole,
    ) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
    clearError: () => void;

    // RBAC helpers
    hasRole: (role: UserRole) => boolean;
    hasRoles: (roles: UserRole[]) => boolean;
    canAccess: (requiredRole: UserRole) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (
        email: string,
        _password: string,
        role: UserRole = "employee",
    ) => {
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
                role,
                companyId:
                    role === "employee" ? `company_${Date.now()}` : undefined,
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

    signup: async (
        email: string,
        name: string,
        _password: string,
        role: UserRole = "employee",
    ) => {
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
                role,
                companyId:
                    role === "employee" ? `company_${Date.now()}` : undefined,
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

    // RBAC Helper Methods
    hasRole: (role: UserRole) => {
        const { user } = get();
        return user?.role === role;
    },

    hasRoles: (roles: UserRole[]) => {
        const { user } = get();
        return user ? roles.includes(user.role) : false;
    },

    canAccess: (requiredRole: UserRole) => {
        const { user } = get();
        if (!user) return false;

        // Role hierarchy: admin > company_admin > employee
        const roleHierarchy: { [key in UserRole]: number } = {
            admin: 3,
            company_admin: 2,
            employee: 1,
        };

        return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
    },
}));
