import React from "react";
import { useSEOMeta } from "../utils/seo";
import { PAGE_META, SITE_CONFIG } from "../config/seo";

const Privacy: React.FC = () => {
    const meta = PAGE_META.privacy;

    useSEOMeta({
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        canonicalUrl: `${SITE_CONFIG.url}/privacy`,
    });
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-12">
                    Privacy Policy
                </h1>

                <div className="space-y-8 text-gray-700">
                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            1. Information We Collect
                        </h2>
                        <p className="mb-3">
                            When you create an account, we collect:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>Name and email address</li>
                            <li>Password (securely hashed)</li>
                            <li>Payment information (processed by Stripe)</li>
                            <li>Subscription preferences</li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            2. How We Use Your Information
                        </h2>
                        <p className="mb-3">We use your information to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>Process your donations</li>
                            <li>
                                Send subscription confirmations and receipts
                            </li>
                            <li>Provide customer support</li>
                            <li>Improve our platform</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            3. Data Security
                        </h2>
                        <p>
                            We take data security seriously. All transactions
                            are encrypted using industry-standard SSL/TLS.
                            Payment information is handled by Stripe, a
                            PCI-compliant payment processor. We never store
                            sensitive payment data on our servers.
                        </p>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            4. Third-Party Services
                        </h2>
                        <p className="mb-3">
                            We use the following third-party services:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>
                                <strong>Stripe:</strong> Payment processing
                            </li>
                            <li>
                                <strong>Analytics:</strong> To understand
                                platform usage (no personal data)
                            </li>
                            <li>
                                <strong>Email Service:</strong> For
                                transactional emails
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            5. Your Rights
                        </h2>
                        <p className="mb-3">You have the right to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate information</li>
                            <li>Delete your account and data</li>
                            <li>Opt-out of communications</li>
                            <li>Export your data</li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            6. Contact Us
                        </h2>
                        <p>
                            If you have questions about our privacy practices,
                            contact us at:
                        </p>
                        <p className="mt-3">
                            <strong>Email:</strong>{" "}
                            <a
                                href="mailto:privacy@charitybase.org"
                                className="text-emerald-700 hover:underline"
                            >
                                privacy@charitybase.org
                            </a>
                        </p>
                    </section>

                    <p className="text-sm text-gray-600 text-center mt-8">
                        Last updated: February 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
