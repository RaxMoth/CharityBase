import React from "react";
import { Heart, Users } from "lucide-react";
import { useAppStore, Charity } from "../stores/useAppStore";

interface CharityCardProps extends Charity {}

const CharityCard: React.FC<CharityCardProps> = ({
    id,
    name,
    description,
    category,
    logo,
    monthlyPrice,
    impact,
    donors,
}) => {
    const { cart, addToCart, removeFromCart } = useAppStore();
    const isInCart = cart.some((item) => item.charityId === id);

    const handleToggle = () => {
        if (isInCart) {
            removeFromCart(id);
        } else {
            addToCart({
                id,
                name,
                description,
                category,
                logo,
                monthlyPrice,
                impact,
                donors,
            });
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-amber-100 hover:border-amber-300">
            {/* Header Image */}
            <div className="h-32 bg-gradient-to-br from-emerald-200 via-emerald-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="20" cy="30" r="15" fill="currentColor" />
                        <circle cx="80" cy="70" r="20" fill="currentColor" />
                    </svg>
                </div>
                <img
                    src={logo}
                    alt={name}
                    className="h-20 w-20 object-contain relative z-10"
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://via.placeholder.com/80?text=" + name[0];
                    }}
                />
            </div>

            <div className="p-5">
                <div className="mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{name}</h3>
                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                        {category}
                    </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Impact Statement */}
                <div className="bg-amber-50 rounded-lg p-3 mb-4 border-l-4 border-amber-400">
                    <p className="text-sm text-gray-700">
                        <span className="font-bold text-amber-900">€1 =</span>{" "}
                        <span className="text-amber-800 italic">{impact}</span>
                    </p>
                </div>

                {/* Donor Count */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                    <Users size={14} />
                    <span>
                        <span className="font-bold text-gray-700">
                            {donors.toLocaleString()}
                        </span>{" "}
                        people helping
                    </span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-gray-600">Monthly</p>
                        <p className="text-3xl font-bold text-emerald-600">
                            €{monthlyPrice}
                        </p>
                    </div>
                    <button
                        onClick={handleToggle}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 text-sm ${
                            isInCart
                                ? "bg-red-500 text-white hover:bg-red-600 shadow-md"
                                : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg"
                        }`}
                    >
                        <Heart
                            size={18}
                            fill={isInCart ? "currentColor" : "none"}
                        />
                        {isInCart ? "Remove" : "Support"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharityCard;
