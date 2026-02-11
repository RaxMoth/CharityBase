import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "./stores";
import { Heart, ArrowRight, AlertCircle, Check } from "lucide-react";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const { signup, error, clearError, isLoading } = useAuthStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [validations, setValidations] = useState({
        passwordMatch: false,
        passwordStrong: false,
        emailValid: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        clearError();

        // Real-time validation
        if (name === "password") {
            setValidations((prev) => ({
                ...prev,
                passwordStrong: value.length >= 8,
                passwordMatch: value === formData.confirmPassword,
            }));
        } else if (name === "confirmPassword") {
            setValidations((prev) => ({
                ...prev,
                passwordMatch: value === formData.password,
            }));
        } else if (name === "email") {
            setValidations((prev) => ({
                ...prev,
                emailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validations.passwordMatch || !validations.passwordStrong) {
            return;
        }

        await signup(formData.email, formData.name, formData.password);

        if (!useAuthStore.getState().error) {
            navigate("/dashboard");
        }
    };

    const isFormValid =
        validations.passwordMatch &&
        validations.passwordStrong &&
        validations.emailValid &&
        formData.name.length > 0;

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
                        Join Us
                    </h1>
                    <p className="text-gray-600 text-center mb-8">
                        Start supporting causes that matter to you
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
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Email Address
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                    className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                                {validations.emailValid && (
                                    <Check
                                        size={20}
                                        className="text-green-600 flex-shrink-0"
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Password
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="At least 8 characters"
                                    className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                                {validations.passwordStrong && (
                                    <Check
                                        size={20}
                                        className="text-green-600 flex-shrink-0"
                                    />
                                )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                {validations.passwordStrong
                                    ? "✓ Strong password"
                                    : "At least 8 characters required"}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Confirm Password
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Confirm your password"
                                    className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                                {validations.passwordMatch && (
                                    <Check
                                        size={20}
                                        className="text-green-600 flex-shrink-0"
                                    />
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                        >
                            {isLoading
                                ? "Creating Account..."
                                : "Create Account"}
                            {!isLoading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="border-t border-gray-200 pt-6">
                        <p className="text-gray-600 text-center mb-4">
                            Already have an account?
                        </p>
                        <Link
                            to="/login"
                            className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors text-center block"
                        >
                            Sign In
                        </Link>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-6">
                        By signing up, you agree to our Terms of Service and
                        Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
