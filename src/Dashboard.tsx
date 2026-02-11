import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./stores";
import { useAppStore } from "./stores";
import { LogOut, Plus, Trash2, Heart } from "lucide-react";
import { useSEOMeta } from "./utils/seo";
import { PAGE_META, SITE_CONFIG } from "./config/seo";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { cart, removeFromCart, getTotalMonthly } = useAppStore();
    const meta = PAGE_META.dashboard;

    useSEOMeta({
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        canonicalUrl: `${SITE_CONFIG.url}/dashboard`,
    });

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-blue-50">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Your Dashboard
                            </h1>
                            <p className="text-lg text-gray-700">
                                Welcome back,{" "}
                                <span className="font-bold">{user.name}</span>!
                                👋
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-emerald-500">
                            <p className="text-gray-600 text-sm mb-2">
                                Monthly Commitment
                            </p>
                            <p className="text-4xl font-bold text-emerald-600">
                                €{getTotalMonthly()}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                                across {cart.length} charity(ies)
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-amber-500">
                            <p className="text-gray-600 text-sm mb-2">
                                Active Subscriptions
                            </p>
                            <p className="text-4xl font-bold text-amber-600">
                                {cart.length}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                                Charities you support
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-blue-500">
                            <p className="text-gray-600 text-sm mb-2">
                                Member Since
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                                {new Date(user.joinedDate).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        year: "numeric",
                                    },
                                )}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                                Thank you for your support!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Subscriptions Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Heart
                                    size={28}
                                    fill="currentColor"
                                    className="text-red-500"
                                />
                                Your Active Subscriptions
                            </h2>

                            {cart.length > 0 ? (
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div
                                            key={item.charityId}
                                            className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200 hover:border-emerald-300 transition-colors"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <img
                                                    src={item.charity.logo}
                                                    alt={item.charity.name}
                                                    className="h-16 w-16 object-contain rounded-lg bg-white p-2"
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            "https://via.placeholder.com/64?text=" +
                                                            item.charity
                                                                .name[0];
                                                    }}
                                                />
                                                <div>
                                                    <h3 className="font-bold text-gray-900">
                                                        {item.charity.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {item.charity.category}
                                                    </p>
                                                    <p className="text-xs italic text-emerald-700 mt-1">
                                                        {item.charity.impact}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right mr-4">
                                                <p className="text-2xl font-bold text-emerald-600">
                                                    €{item.charity.monthlyPrice}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    /month
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.charityId,
                                                    )
                                                }
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Heart
                                        size={48}
                                        className="text-gray-300 mx-auto mb-4 opacity-50"
                                    />
                                    <p className="text-gray-600 text-lg mb-6">
                                        You don't have any active subscriptions
                                        yet
                                    </p>
                                    <button
                                        onClick={() => navigate("/charities")}
                                        className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
                                    >
                                        <Plus size={20} />
                                        Add Charities
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        {cart.length > 0 && (
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate("/charities")}
                                    className="bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} />
                                    Add More Charities
                                </button>
                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors"
                                >
                                    Update Payment Method
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Profile
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">
                                        Name
                                    </p>
                                    <p className="font-bold text-gray-900">
                                        {user.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">
                                        Email
                                    </p>
                                    <p className="font-bold text-gray-900 break-all">
                                        {user.email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">
                                        Member Since
                                    </p>
                                    <p className="font-bold text-gray-900">
                                        {new Date(
                                            user.joinedDate,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-gray-100 text-gray-900 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                Edit Profile
                            </button>
                        </div>

                        {/* Support Card */}
                        <div className="bg-gradient-to-br from-emerald-100 to-amber-100 rounded-2xl p-6 border-2 border-emerald-300">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                💚 Need Help?
                            </h3>
                            <p className="text-sm text-gray-700 mb-4">
                                Have questions about your subscriptions or
                                charities?
                            </p>
                            <a
                                href="mailto:support@charitybase.org"
                                className="text-emerald-700 font-bold text-sm hover:underline"
                            >
                                support@charitybase.org
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
