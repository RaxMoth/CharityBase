import React from "react";
import { Heart, Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Heart
                                size={24}
                                className="text-red-500"
                                fill="currentColor"
                            />
                            <h3 className="text-xl font-bold">CharityBase</h3>
                        </div>
                        <p className="text-gray-400">
                            Making global impact accessible through monthly
                            subscriptions to verified charities.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Platform</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-white transition"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/charities"
                                    className="hover:text-white transition"
                                >
                                    Browse Charities
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/subscriptions"
                                    className="hover:text-white transition"
                                >
                                    Subscriptions
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Company</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li>
                                <a
                                    href="/about"
                                    className="hover:text-white transition"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/faq"
                                    className="hover:text-white transition"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/privacy"
                                    className="hover:text-white transition"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/terms"
                                    className="hover:text-white transition"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <div className="text-gray-400 space-y-3">
                            <div className="flex items-center gap-2">
                                <Mail size={18} />
                                <a
                                    href="mailto:support@charitybase.org"
                                    className="hover:text-white transition"
                                >
                                    support@charitybase.org
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span>Global Organization</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} CharityBase. All
                        rights reserved. | Making a difference, one subscription
                        at a time.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
