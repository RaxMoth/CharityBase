import React, { useState } from "react";
import { Search } from "lucide-react";
import { CharityCard } from "../components";
import { useSEOMeta } from "../utils/seo";
import { PAGE_META, SITE_CONFIG } from "../config/seo";

const CHARITIES = [
    {
        id: "1",
        name: "Global Food Initiative",
        description:
            "Providing nutritious meals to hungry children in developing nations",
        category: "Food Security",
        logo: "https://via.placeholder.com/80?text=GFI",
        monthlyPrice: 5,
        impact: "Feeds a child for one day",
        donors: 12543,
    },
    {
        id: "2",
        name: "Clean Water Foundation",
        description: "Building wells and water stations in remote communities",
        category: "Water & Sanitation",
        logo: "https://via.placeholder.com/80?text=CWF",
        monthlyPrice: 8,
        impact: "Provides clean water for 5 families",
        donors: 8945,
    },
    {
        id: "3",
        name: "Education for All",
        description:
            "Opening schools and supporting teachers in underserved areas",
        category: "Education",
        logo: "https://via.placeholder.com/80?text=EFA",
        monthlyPrice: 10,
        impact: "Educates a child for one month",
        donors: 15230,
    },
    {
        id: "4",
        name: "Medical Relief International",
        description:
            "Delivering healthcare and medicines to communities in need",
        category: "Healthcare",
        logo: "https://via.placeholder.com/80?text=MRI",
        monthlyPrice: 15,
        impact: "Provides medical care for 3 people",
        donors: 6789,
    },
    {
        id: "5",
        name: "Environmental Conservation",
        description:
            "Protecting forests, wildlife, and ecosystems for future generations",
        category: "Environment",
        logo: "https://via.placeholder.com/80?text=EC",
        monthlyPrice: 7,
        impact: "Plants 10 trees for reforestation",
        donors: 9876,
    },
    {
        id: "6",
        name: "Youth Empowerment Program",
        description:
            "Training youth with skills to transform their communities",
        category: "Community Development",
        logo: "https://via.placeholder.com/80?text=YEP",
        monthlyPrice: 12,
        impact: "Trains one youth for a better future",
        donors: 5432,
    },
];

const CharitiesPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );
    const meta = PAGE_META.charities;

    useSEOMeta({
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        canonicalUrl: `${SITE_CONFIG.url}/charities`,
    });

    const categories = Array.from(new Set(CHARITIES.map((c) => c.category)));

    const filteredCharities = CHARITIES.filter((charity) => {
        const matchesSearch =
            charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            charity.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesCategory =
            !selectedCategory || charity.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        Meet Our{" "}
                        <span className="text-emerald-600">
                            Trusted Partners
                        </span>
                    </h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Every charity here is doing real work. Choose the ones
                        that touch your heart, and support them monthly. Simple
                        as that.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search charities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap gap-2 justify-center">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-5 py-2 rounded-full font-medium transition-all ${
                            selectedCategory === null
                                ? "bg-emerald-600 text-white shadow-md"
                                : "bg-white text-gray-700 border-2 border-amber-200 hover:border-emerald-400"
                        }`}
                    >
                        All Causes
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 rounded-full font-medium transition-all ${
                                selectedCategory === category
                                    ? "bg-emerald-600 text-white shadow-md"
                                    : "bg-white text-gray-700 border-2 border-amber-200 hover:border-emerald-400"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Charities Grid */}
                {filteredCharities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {filteredCharities.map((charity) => (
                            <CharityCard key={charity.id} {...charity} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            Hmm, couldn't find any charities matching that. Try
                            a different search?
                        </p>
                    </div>
                )}

                {/* Bottom Message */}
                <div className="text-center mt-16 pt-12 border-t-2 border-amber-200">
                    <p className="text-gray-700 text-lg">
                        👉 Pick the causes you care about and add them to your
                        support list
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CharitiesPage;
