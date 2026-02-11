import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useAppStore } from "../../stores/useAppStore";
import { useAuthStore } from "../../stores/useAuthStore";

const Header: React.FC = () => {
    const { getCartCount } = useAppStore();
    const { isAuthenticated } = useAuthStore();
    const cartCount = getCartCount();

    return (
        <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition"
                    >
                        <Heart
                            size={32}
                            fill="currentColor"
                            className="text-red-300"
                        />
                        <span>CharityBase</span>
                    </Link>

                    <nav className="flex gap-8 items-center">
                        <Link
                            to="/"
                            className="hover:text-emerald-100 transition font-medium text-sm"
                        >
                            Home
                        </Link>
                        <Link
                            to="/charities"
                            className="hover:text-emerald-100 transition font-medium text-sm"
                        >
                            Browse Charities
                        </Link>
                        <Link
                            to="/subscriptions"
                            className="hover:text-emerald-100 transition font-medium flex items-center gap-2"
                        >
                            <ShoppingBag size={20} />
                            <span className="text-sm">Cart</span>
                            {cartCount > 0 && (
                                <span className="bg-red-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 transition px-4 py-2 rounded-lg font-medium text-sm"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:text-emerald-100 transition font-medium text-sm"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-white bg-opacity-20 hover:bg-opacity-30 transition px-4 py-2 rounded-lg font-medium text-sm"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
