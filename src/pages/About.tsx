import React from "react";
import { Heart } from "lucide-react";
import { useSEOMeta } from "../utils/seo";
import { PAGE_META, SITE_CONFIG } from "../config/seo";

const About: React.FC = () => {
    const meta = PAGE_META.about;

    useSEOMeta({
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        canonicalUrl: `${SITE_CONFIG.url}/about`,
    });
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Heart
                            size={40}
                            fill="currentColor"
                            className="text-red-500"
                        />
                        <h1 className="text-4xl font-bold text-gray-900">
                            About CharityBase
                        </h1>
                    </div>
                    <p className="text-xl text-gray-700">
                        Connecting hearts with causes that matter
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Mission */}
                    <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-emerald-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            CharityBase is a marketplace that connects
                            compassionate individuals with verified charities
                            doing real, measurable work around the world. We
                            believe that charitable giving should be simple,
                            transparent, and impactful.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            We're the middleman that removes complexity, not
                            cost. Every euro you donate goes directly to
                            charities—there's no hidden markup or corporate
                            overhead eating into your impact.
                        </p>
                    </section>

                    {/* What We Do */}
                    <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-amber-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            What We Do
                        </h2>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-600 font-bold flex-shrink-0">
                                    ✓
                                </span>
                                <span>
                                    <strong>Vet Charities:</strong> We carefully
                                    verify every organization on our platform
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-600 font-bold flex-shrink-0">
                                    ✓
                                </span>
                                <span>
                                    <strong>Enable Monthly Support:</strong> Set
                                    up subscriptions at the exact cost of each
                                    charity
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-600 font-bold flex-shrink-0">
                                    ✓
                                </span>
                                <span>
                                    <strong>Track Impact:</strong> See exactly
                                    what your donations accomplish
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-600 font-bold flex-shrink-0">
                                    ✓
                                </span>
                                <span>
                                    <strong>Ensure Transparency:</strong> Real
                                    data, real results, no corporate BS
                                </span>
                            </li>
                        </ul>
                    </section>

                    {/* Why We're Different */}
                    <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Why We're Different
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">
                                    Honest Pricing
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    You see exactly what each charity costs. No
                                    fees, no markup, no games.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">
                                    Your Charity, Your Cost
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    Support exactly which organizations you care
                                    about at their actual price.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">
                                    Verified Partners
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    Every charity is vetted. We only list
                                    organizations with proven impact.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">
                                    Real Results
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    Track what happens with your money. Know the
                                    impact you're making.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-gradient-to-r from-emerald-100 to-amber-100 rounded-2xl p-8 border-2 border-emerald-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-gray-800 mb-4">
                            Have questions? We'd love to hear from you.
                        </p>
                        <div className="space-y-2 text-gray-800">
                            <p>
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:hello@charitybase.org"
                                    className="text-emerald-700 hover:underline"
                                >
                                    hello@charitybase.org
                                </a>
                            </p>
                            <p>
                                <strong>Support:</strong>{" "}
                                <a
                                    href="mailto:support@charitybase.org"
                                    className="text-emerald-700 hover:underline"
                                >
                                    support@charitybase.org
                                </a>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
