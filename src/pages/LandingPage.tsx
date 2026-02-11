import { useNavigate } from "react-router-dom";
import { Heart, Gift, Users, Zap } from "lucide-react";
import { useSEOMeta } from "../utils/seo";
import {
    PAGE_META,
    generateOrganizationSchema,
    SITE_CONFIG,
} from "../config/seo";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const meta = PAGE_META.home;

    useSEOMeta({
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        canonicalUrl: SITE_CONFIG.url,
        structuredData: generateOrganizationSchema(),
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-500 via-emerald-100 to-white">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 pt-20 pb-32 text-center">
                <div className="mb-6 inline-block">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
                        <Heart
                            size={20}
                            className="text-red-500"
                            fill="currentColor"
                        />
                        <span className="text-gray-700 font-medium text-sm">
                            Simple monthly support for causes you love
                        </span>
                    </div>
                </div>

                <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                    Support Real
                    <br />
                    <span className="text-yellow-100">
                        Charities, Real Change
                    </span>
                </h1>

                <p className="text-xl text-emerald-50 max-w-2xl mx-auto mb-8">
                    Pick the charities you care about and support them monthly
                    at their exact cost. That's it. No confusion. No waste. Just
                    real impact.
                </p>

                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => navigate("/charities")}
                        className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Find Charities
                    </button>
                    <button
                        onClick={() => navigate("/charities")}
                        className="bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 transition-colors"
                    >
                        Start Supporting
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                    How It Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-emerald-500">
                        <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Gift size={32} className="text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Browse & Choose
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Find charities that resonate with your values and
                            add them to your list
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-emerald-500">
                        <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart
                                size={32}
                                className="text-emerald-600"
                                fill="currentColor"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Pick Your Amount
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Each charity costs what it costs. No tiers, no
                            games, no BS
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-emerald-500">
                        <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap size={32} className="text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Set & Forget
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Your monthly subscription runs automatically, you
                            control everything
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-emerald-500">
                        <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users size={32} className="text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            See the Impact
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Track what happens with your money. Real results,
                            real stories
                        </p>
                    </div>
                </div>
            </div>

            {/* Why It's Different */}
            <div className="bg-emerald-100 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                        Why CharityBase is Different
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                ✨ Honest Pricing
                            </h3>
                            <p className="text-gray-700">
                                You see exactly what each charity costs. No
                                hidden fees, no markup. If it costs €5, you pay
                                €5.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                💚 You Choose Everything
                            </h3>
                            <p className="text-gray-700">
                                Pick which charities matter to you. Support one
                                or ten. Pause or cancel anytime. Complete
                                control.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                🌍 Trusted Partners
                            </h3>
                            <p className="text-gray-700">
                                We only feature verified charities doing real
                                work. Every euro reaches people who need it.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                📊 Transparent Impact
                            </h3>
                            <p className="text-gray-700">
                                See what your donation does. Who it helps. How
                                much it matters. No guessing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Make a Real Difference?
                    </h2>
                    <p className="text-xl text-emerald-100 mb-8">
                        Start supporting charities that matter to you, one month
                        at a time
                    </p>
                    <button
                        onClick={() => navigate("/charities")}
                        className="bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors inline-block shadow-lg"
                    >
                        Explore Charities Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
