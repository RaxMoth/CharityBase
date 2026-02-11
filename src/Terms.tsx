import React from "react";
import { useSEOMeta } from "./utils/seo";
import { PAGE_META, SITE_CONFIG } from "./config/seo";

const Terms: React.FC = () => {
    const meta = PAGE_META.terms;

    useSEOMeta({
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        canonicalUrl: `${SITE_CONFIG.url}/terms`,
    });
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-12">
                    Terms of Service
                </h1>

                <div className="space-y-8 text-gray-700">
                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing and using CharityBase, you accept and
                            agree to be bound by the terms and provision of this
                            agreement. If you do not agree to abide by the
                            above, please do not use this service.
                        </p>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            2. Use License
                        </h2>
                        <p className="mb-3">
                            Permission is granted to temporarily download one
                            copy of the materials (information or software) on
                            CharityBase for personal, non-commercial transitory
                            viewing only. This is the grant of a license, not a
                            transfer of title.
                        </p>
                        <p>You may not:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for commercial purposes</li>
                            <li>
                                Attempt to decompile or reverse engineer any
                                software
                            </li>
                            <li>
                                Remove any copyright or proprietary notations
                            </li>
                            <li>Use the platform for unauthorized purposes</li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            3. Subscription Terms
                        </h2>
                        <p className="mb-3">
                            CharityBase subscriptions are recurring monthly
                            payments:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>
                                Subscriptions will automatically renew each
                                month on your billing date
                            </li>
                            <li>You can cancel anytime from your dashboard</li>
                            <li>
                                Cancellations take effect at the end of your
                                billing period
                            </li>
                            <li>
                                We are a marketplace; we don't set charity
                                prices, they do
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            4. Payment Processing
                        </h2>
                        <p className="mb-3">
                            Payments are processed by Stripe, a third-party
                            payment processor. By using our service, you agree
                            to Stripe's terms and conditions.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
                            <li>Ensure payment information is accurate</li>
                            <li>
                                You are responsible for any chargebacks or
                                disputes
                            </li>
                            <li>
                                CharityBase is not responsible for payment
                                failures
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            5. Charitable Donations
                        </h2>
                        <p className="mb-3">
                            Important points about donations:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>
                                Donations are final and cannot be refunded once
                                processed
                            </li>
                            <li>
                                CharityBase takes no fees; 100% goes to
                                charities (minus payment processor fees)
                            </li>
                            <li>
                                You are responsible for understanding the impact
                                of your donation
                            </li>
                            <li>
                                Consult a tax professional regarding tax
                                deductibility
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            6. Disclaimer
                        </h2>
                        <p>
                            CharityBase is provided on an "as is" basis. We make
                            no warranties, expressed or implied, and hereby
                            disclaim and negate all other warranties including,
                            without limitation, implied warranties or conditions
                            of merchantability, fitness for a particular
                            purpose, or non-infringement of intellectual
                            property or other violation of rights.
                        </p>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            7. Limitation of Liability
                        </h2>
                        <p>
                            In no event shall CharityBase, its suppliers, or
                            other related parties be liable for any damages
                            (including, without limitation, damages for loss of
                            data or profit or due to business interruption)
                            arising out of the use or inability to use the
                            materials on CharityBase's website
                        </p>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            8. Revisions
                        </h2>
                        <p>
                            CharityBase may revise these terms of service for
                            our website at any time without notice. By using
                            this website you are agreeing to be bound by the
                            then current version of these terms of service.
                        </p>
                    </section>

                    <section className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            9. Contact Information
                        </h2>
                        <p>
                            For questions about these Terms of Service, please
                            contact us at:
                        </p>
                        <p className="mt-3">
                            <strong>Email:</strong>{" "}
                            <a
                                href="mailto:legal@charitybase.org"
                                className="text-emerald-700 hover:underline"
                            >
                                legal@charitybase.org
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

export default Terms;
