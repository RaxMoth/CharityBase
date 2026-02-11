import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSEOMeta } from "../utils/seo";
import { PAGE_META, SITE_CONFIG } from "../config/seo";

interface FAQItem {
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        question: "How does CharityBase work?",
        answer: "CharityBase is a platform connecting donors directly to verified charities. You browse our verified charities, choose those you want to support, and set up a monthly subscription. Each month, your donation goes directly to the charities you selected.",
    },
    {
        question: "How much does CharityBase charge?",
        answer: "CharityBase takes zero fees. We are a non-profit intermediary. 100% of your monthly contribution goes directly to the charities you support. The only fees deducted are payment processor fees (typically 1-2% by Stripe).",
    },
    {
        question: "Can I change my subscriptions?",
        answer: "Yes! From your dashboard, you can add new charities to your subscription at any time or remove charities. Changes take effect immediately.",
    },
    {
        question: "How do I cancel my subscription?",
        answer: "You can cancel anytime from your dashboard. Click 'Remove' next to any charity to stop supporting it, or remove all to cancel your entire subscription. Cancellations take effect at the end of your current billing period.",
    },
    {
        question: "Are my donations tax-deductible?",
        answer: "This depends on your country and local tax laws. We recommend consulting with a tax professional. In some countries, donations to verified charities through our platform may be tax-deductible.",
    },
    {
        question: "How do I know the charities are legitimate?",
        answer: "All charities on CharityBase are thoroughly verified. We check registration, transparency reports, and financial audits. Each charity profile displays verification status and key information about their operations.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe payment processor. Your payment information is encrypted and never stored on our servers.",
    },
    {
        question: "How do I update my payment method?",
        answer: "From your dashboard, click 'Update Payment Method' and follow the secure Stripe interface to add or change your payment information.",
    },
    {
        question: "Can I see the impact of my donations?",
        answer: "Yes! Your dashboard shows detailed impact metrics for each charity. We work with our partner charities to provide real-time updates on how your donations are making a difference.",
    },
    {
        question: "Is my personal information secure?",
        answer: "Yes. We use industry-standard SSL encryption to protect your data. Your payment information is processed by Stripe and never stored on our servers. Read our Privacy Policy for full details.",
    },
    {
        question: "Can I give a donation as a gift?",
        answer: "Currently, CharityBase is set up for personal subscriptions. Gift donations are coming soon! Contact us at support@charitybase.org to request this feature.",
    },
    {
        question: "I have questions about a specific charity.",
        answer: "Each charity profile includes their website. You can contact them directly through their website, or email us at support@charitybase.org and we'll help connect you.",
    },
];

const FAQItemComponent: React.FC<{
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-50 transition-colors"
            >
                <h3 className="text-lg font-semibold text-gray-900 text-left">
                    {item.question}
                </h3>
                <ChevronDown
                    size={24}
                    className={`text-emerald-600 transition-transform ${
                        isOpen ? "transform rotate-180" : ""
                    } flex-shrink-0 ml-4`}
                />
            </button>
            {isOpen && (
                <div className="px-6 py-4 bg-emerald-50 border-t border-emerald-100">
                    <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                    </p>
                </div>
            )}
        </div>
    );
};

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const meta = PAGE_META.faq;

    useSEOMeta({
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        canonicalUrl: `${SITE_CONFIG.url}/faq`,
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-blue-50">
            <div className="max-w-3xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600">
                        Everything you need to know about CharityBase
                    </p>
                </div>

                <div className="mb-8">
                    {faqItems.map((item, index) => (
                        <FAQItemComponent
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onToggle={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                        />
                    ))}
                </div>

                <div className="bg-gradient-to-r from-emerald-100 to-amber-100 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Didn't find your answer?
                    </h2>
                    <p className="text-gray-700 mb-6">
                        We're here to help. Reach out to our support team
                        anytime.
                    </p>
                    <a
                        href="mailto:support@charitybase.org"
                        className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
