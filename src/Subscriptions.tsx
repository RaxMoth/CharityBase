import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "./stores/useAppStore";
import { Heart, Trash2, ArrowRight } from "lucide-react";

const Subscriptions: React.FC = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, getTotalMonthly } = useAppStore();

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Please add at least one charity to support");
            return;
        }
        navigate("/checkout");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Your Support List
                    </h1>
                    <p className="text-lg text-gray-700">
                        {cart.length === 0
                            ? "You haven't added any charities yet"
                            : `You're supporting ${cart.length} cause${cart.length !== 1 ? "s" : ""}`}
                    </p>
                </div>

                {cart.length > 0 ? (
                    <div className="space-y-4 mb-8">
                        {cart.map((item) => (
                            <div
                                key={item.charityId}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-amber-100 p-5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <img
                                        src={item.charity.logo}
                                        alt={item.charity.name}
                                        className="h-16 w-16 object-contain rounded-lg bg-emerald-50 p-2"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "https://via.placeholder.com/64?text=" +
                                                item.charity.name[0];
                                        }}
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900">
                                            {item.charity.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-1">
                                            {item.charity.category}
                                        </p>
                                        <p className="text-sm italic text-amber-800">
                                            "€1 = {item.charity.impact}"
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right mr-4">
                                    <p className="text-sm text-gray-600">
                                        Monthly
                                    </p>
                                    <p className="text-2xl font-bold text-emerald-600">
                                        €{item.charity.monthlyPrice}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        removeFromCart(item.charityId)
                                    }
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center mb-8">
                        <Heart
                            size={48}
                            className="text-gray-300 mx-auto mb-4 opacity-50"
                        />
                        <p className="text-lg text-gray-600 mb-6">
                            No charities added yet. Let's find causes you care
                            about!
                        </p>
                        <button
                            onClick={() => navigate("/charities")}
                            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
                        >
                            Browse Charities
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}

                {cart.length > 0 && (
                    <>
                        {/* Summary */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-amber-100">
                            <div className="mb-6">
                                <p className="text-gray-600 text-sm mb-2">
                                    Monthly Commitment
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-emerald-600">
                                        €{getTotalMonthly()}
                                    </span>
                                    <span className="text-gray-600">
                                        /month
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                                {cart.map((item) => (
                                    <div
                                        key={item.charityId}
                                        className="flex justify-between text-sm"
                                    >
                                        <span className="text-gray-600">
                                            {item.charity.name}
                                        </span>
                                        <span className="font-bold text-gray-900">
                                            €{item.charity.monthlyPrice}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded p-4 mb-6">
                                <p className="text-sm text-emerald-900">
                                    <span className="font-bold">
                                        💚 Your Impact:
                                    </span>{" "}
                                    You'll be supporting {cart.length}{" "}
                                    organization{cart.length !== 1 ? "s" : ""}{" "}
                                    every month, making real change happen on
                                    the ground.
                                </p>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors mb-3"
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={() => navigate("/charities")}
                                className="w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
                            >
                                Add More Charities
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Subscriptions;
