import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "./stores";
import { Heart, ArrowRight, AlertCircle } from "lucide-react";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, error, clearError, isLoading } = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        clearError();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(formData.email, formData.password);

        // If login successful, navigate to dashboard
        if (!useAuthStore.getState().error) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-100 py-12 flex items-center justify-center">
            <div className="max-w-md w-full px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <Heart
                            size={32}
                            className="text-red-500"
                            fill="currentColor"
                        />
                        <span className="text-2xl font-bold text-gray-900">
                            CharityBase
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 text-center mb-8">
                        Sign in to manage your subscriptions
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle
                                size={20}
                                className="text-red-600 flex-shrink-0 mt-0.5"
                            />
                            <p className="text-red-800 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                            {!isLoading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="border-t border-gray-200 pt-6">
                        <p className="text-gray-600 text-center mb-4">
                            Don't have an account?
                        </p>
                        <Link
                            to="/signup"
                            className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors text-center block"
                        >
                            Create Account
                        </Link>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-6">
                        Demo: Use any email & password to test
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
