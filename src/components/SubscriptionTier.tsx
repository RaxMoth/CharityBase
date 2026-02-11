import React from "react";
import { Check } from "lucide-react";

interface SubscriptionTierProps {
    name: string;
    price: number;
    description: string;
    features: string[];
    isPopular?: boolean;
    onSelect: () => void;
}

const SubscriptionTier: React.FC<SubscriptionTierProps> = ({
    name,
    price,
    description,
    features,
    isPopular = false,
    onSelect,
}) => {
    return (
        <div
            className={`rounded-lg border-2 transition-all ${
                isPopular
                    ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                    : "border-gray-200 bg-white hover:shadow-md"
            }`}
        >
            <div className="p-6">
                {isPopular && (
                    <div className="mb-4 inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Most Popular
                    </div>
                )}

                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{description}</p>

                <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                        ${price}
                    </span>
                    <span className="text-gray-600 ml-2">/month</span>
                </div>

                <button
                    onClick={onSelect}
                    className={`w-full py-3 rounded-lg font-bold transition-colors mb-6 ${
                        isPopular
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                >
                    Choose Plan
                </button>

                <div className="space-y-3">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <Check
                                size={20}
                                className="text-green-500 flex-shrink-0"
                            />
                            <span className="text-gray-700 text-sm">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionTier;
