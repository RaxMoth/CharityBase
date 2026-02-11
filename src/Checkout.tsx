import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "./stores/useAppStore";
import { Heart } from "lucide-react";

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { cart, getTotalMonthly, clearCart } = useAppStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        cardNumber: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            clearCart();
            setIsProcessing(false);
            navigate("/confirmation");
        }, 2000);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 py-12 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-700 mb-4">
                        Your support list is empty
                    </p>
                    <button
                        onClick={() => navigate("/charities")}
                        className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                    >
                        Back to Charities
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Let's Make it Official
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Complete your monthly support with a simple
                                payment
                            </p>

                            <form onSubmit={handleCheckout}>
                                {/* Personal Information */}
                                <div className="mb-8">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                                        Your Details
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Payment Method */}
                                <div className="mb-8">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                                        Payment
                                    </h2>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="Card Number (4242 4242 4242 4242)"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        maxLength={19}
                                        required
                                        className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Information */}
                                <div className="mb-8 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                                    <p className="text-sm text-emerald-900">
                                        <span className="font-bold">
                                            💚 Secure & Simple:
                                        </span>{" "}
                                        Your monthly subscriptions start right
                                        after payment. You can manage or cancel
                                        anytime.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isProcessing
                                        ? "Processing..."
                                        : `Pay €${getTotalMonthly()} to Start`}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border border-amber-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Your Support List
                            </h2>

                            <div className="space-y-4 mb-6 pb-6 border-b-2 border-amber-200">
                                {cart.map((item) => (
                                    <div key={item.charityId}>
                                        <div className="flex items-center gap-2 mb-2">
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
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-900 text-sm">
                                                    {item.charity.name}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {item.charity.category}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-emerald-600 font-bold ml-12 mb-2">
                                            €{item.charity.monthlyPrice}/month
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">
                                        {cart.length} charity(ies)
                                    </span>
                                    <span className="font-bold text-gray-900">
                                        €{getTotalMonthly()}
                                    </span>
                                </div>
                                <div className="border-t pt-3 flex justify-between">
                                    <span className="font-bold text-gray-900">
                                        Monthly Total
                                    </span>
                                    <span className="text-2xl font-bold text-emerald-600">
                                        €{getTotalMonthly()}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-amber-900 font-bold mb-2">
                                    <Heart
                                        size={18}
                                        fill="currentColor"
                                        className="text-red-500"
                                    />
                                    Making a Difference
                                </div>
                                <p className="text-xs text-amber-900">
                                    Every month, real money reaches real people
                                    doing real work.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
