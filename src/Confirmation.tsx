import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Heart, ArrowRight } from "lucide-react";
import { useAppStore } from "./stores/useAppStore";

const Confirmation: React.FC = () => {
    const navigate = useNavigate();
    const { cart } = useAppStore();

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-emerald-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-emerald-200">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-200 rounded-full blur-lg opacity-50 animate-pulse"></div>
                            <CheckCircle
                                size={80}
                                className="text-emerald-600 relative"
                                fill="currentColor"
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
                        You're All Set! 💚
                    </h1>
                    <p className="text-xl text-gray-700 text-center mb-8">
                        Your monthly support is now active
                    </p>

                    {/* Confirmation Details */}
                    <div className="bg-emerald-50 rounded-xl border-2 border-emerald-200 p-6 mb-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            Monthly Support Active
                        </h2>
                        <div className="space-y-3">
                            {cart.map((item) => (
                                <div
                                    key={item.charityId}
                                    className="flex items-center justify-between py-2 border-b border-emerald-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.charity.logo}
                                            alt={item.charity.name}
                                            className="h-10 w-10 object-contain rounded"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "https://via.placeholder.com/40?text=" +
                                                    item.charity.name[0];
                                            }}
                                        />
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">
                                                {item.charity.name}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {item.charity.category}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-emerald-600">
                                        €{item.charity.monthlyPrice}/mo
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What Happens Next */}
                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            What Happens Next
                        </h2>
                        <div className="space-y-3 text-left">
                            <div className="flex items-start gap-3">
                                <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                                    1
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">
                                        You'll get a confirmation email
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Check your inbox for details and
                                        receipts
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                                    2
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">
                                        Your money reaches the charities
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        On the 1st of each month, your support
                                        is transferred
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                                    3
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">
                                        See the impact in real-time
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Track how your donations are changing
                                        lives
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Impact Message */}
                    <div className="bg-gradient-to-r from-amber-100 to-emerald-100 rounded-xl p-6 mb-8 border-2 border-amber-300">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Heart
                                size={24}
                                className="text-red-500"
                                fill="currentColor"
                            />
                            <p className="text-lg font-bold text-gray-900">
                                Thank You for Caring
                            </p>
                            <Heart
                                size={24}
                                className="text-red-500"
                                fill="currentColor"
                            />
                        </div>
                        <p className="text-gray-800 text-center text-sm">
                            You're now supporting {cart.length} incredible
                            organization
                            {cart.length !== 1 ? "s" : ""} making real change
                            happen. Every month, your support reaches people and
                            projects that need it most.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                        >
                            Explore More
                            <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={() => navigate("/charities")}
                            className="w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
                        >
                            Add More Charities
                        </button>
                    </div>

                    {/* Footer Message */}
                    <p className="mt-8 text-sm text-gray-600 text-center">
                        Questions? Reach out to us at{" "}
                        <span className="text-emerald-600 font-bold">
                            support@charitybase.org
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
