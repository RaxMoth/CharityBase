import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubscriptionTier, Company } from "../types/index";

interface CompanyFormData {
    companyName: string;
    industry: string;
    employeeCount: number;
    adminName: string;
    adminEmail: string;
    adminPassword: string;
    confirmPassword: string;
    subscriptionTier: SubscriptionTier;
    termsAccepted: boolean;
}

const CompanySignup: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [formData, setFormData] = useState<CompanyFormData>({
        companyName: "",
        industry: "",
        employeeCount: 0,
        adminName: "",
        adminEmail: "",
        adminPassword: "",
        confirmPassword: "",
        subscriptionTier: "starter",
        termsAccepted: false,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
            [name === "employeeCount" ? name : ""]:
                name === "employeeCount" ? parseInt(value) : undefined,
        }));
    };

    const validateStep = (stepNum: number): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (stepNum === 1) {
            if (!formData.companyName.trim())
                newErrors.companyName = "Company name is required";
            if (!formData.industry) newErrors.industry = "Industry is required";
            if (formData.employeeCount < 1)
                newErrors.employeeCount = "Employee count must be at least 1";
        }

        if (stepNum === 2) {
            if (!formData.adminName.trim())
                newErrors.adminName = "Name is required";
            if (!formData.adminEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
                newErrors.adminEmail = "Valid email is required";
            if (formData.adminPassword.length < 8)
                newErrors.adminPassword =
                    "Password must be at least 8 characters";
            if (formData.adminPassword !== formData.confirmPassword)
                newErrors.confirmPassword = "Passwords do not match";
        }

        if (stepNum === 3) {
            if (!formData.termsAccepted)
                newErrors.termsAccepted = "You must accept the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep((step + 1) as 1 | 2 | 3);
        }
    };

    const handlePrevious = () => {
        setStep((step - 1) as 1 | 2 | 3);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep(step)) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Create company object
            const newCompany: Company = {
                id: `company_${Date.now()}`,
                name: formData.companyName,
                industry: formData.industry,
                employeeCount: formData.employeeCount,
                adminId: `admin_${Date.now()}`,
                subscriptionTier: formData.subscriptionTier,
                monthlyPrice: getPriceForTier(formData.subscriptionTier),
                donationMatchingEnabled: false,
                matchingPercentage: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                active: true,
            };

            // Store in localStorage (in real app, this would be backend)
            localStorage.setItem(
                "charitybase_company",
                JSON.stringify(newCompany),
            );
            localStorage.setItem(
                "charitybase_admin",
                JSON.stringify({
                    id: newCompany.adminId,
                    email: formData.adminEmail,
                    name: formData.adminName,
                    role: "company_admin",
                    companyId: newCompany.id,
                    joinedDate: new Date(),
                }),
            );

            // Redirect to checkout or admin dashboard
            navigate("/company/admin");
        } catch (error) {
            setErrors({
                submit: "Failed to create company. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getPriceForTier = (tier: SubscriptionTier): number => {
        const prices = {
            starter: 299,
            professional: 599,
            enterprise: 0,
        };
        return prices[tier];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Build Your Employee Giving Program
                </h1>
                <p className="text-gray-600 mb-8">
                    Step {step} of 3 -{" "}
                    {step === 1
                        ? "Company Information"
                        : step === 2
                          ? "Your Account"
                          : "Review & Confirm"}
                </p>

                {errors.submit && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        {errors.submit}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Company Info */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name *
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.companyName
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Enter your company name"
                                />
                                {errors.companyName && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.companyName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Industry *
                                </label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.industry
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <option value="">Select an industry</option>
                                    <option value="tech">Technology</option>
                                    <option value="finance">Finance</option>
                                    <option value="retail">Retail</option>
                                    <option value="manufacturing">
                                        Manufacturing
                                    </option>
                                    <option value="healthcare">
                                        Healthcare
                                    </option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.industry && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.industry}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Employees *
                                </label>
                                <input
                                    type="number"
                                    name="employeeCount"
                                    value={formData.employeeCount}
                                    onChange={handleInputChange}
                                    min="1"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.employeeCount
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="e.g., 50"
                                />
                                {errors.employeeCount && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.employeeCount}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Admin Account */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="adminName"
                                    value={formData.adminName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.adminName
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Enter your name"
                                />
                                {errors.adminName && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.adminName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="adminEmail"
                                    value={formData.adminEmail}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.adminEmail
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="you@company.com"
                                />
                                {errors.adminEmail && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.adminEmail}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    name="adminPassword"
                                    value={formData.adminPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.adminPassword
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Minimum 8 characters"
                                />
                                {errors.adminPassword && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.adminPassword}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password *
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.confirmPassword
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Confirm password"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Plan Selection & Review */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Select Your Plan *
                                </label>
                                <div className="space-y-3">
                                    {[
                                        {
                                            tier: "starter" as SubscriptionTier,
                                            name: "Starter",
                                            price: 299,
                                            employees: "Up to 50 employees",
                                        },
                                        {
                                            tier: "professional" as SubscriptionTier,
                                            name: "Professional",
                                            price: 599,
                                            employees: "Up to 200 employees",
                                        },
                                        {
                                            tier: "enterprise" as SubscriptionTier,
                                            name: "Enterprise",
                                            price: 0,
                                            employees: "200+ employees",
                                        },
                                    ].map((plan) => (
                                        <label
                                            key={plan.tier}
                                            className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50"
                                        >
                                            <input
                                                type="radio"
                                                name="subscriptionTier"
                                                value={plan.tier}
                                                checked={
                                                    formData.subscriptionTier ===
                                                    plan.tier
                                                }
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <div className="ml-4 flex-1">
                                                <p className="font-medium text-gray-900">
                                                    {plan.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {plan.employees}
                                                </p>
                                            </div>
                                            <p className="font-semibold text-gray-900">
                                                {plan.price === 0
                                                    ? "Custom"
                                                    : `€${plan.price}/mo`}
                                            </p>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-900 mb-2">
                                    Review Your Information
                                </h3>
                                <div className="space-y-2 text-sm text-gray-700">
                                    <p>
                                        <strong>Company:</strong>{" "}
                                        {formData.companyName}
                                    </p>
                                    <p>
                                        <strong>Industry:</strong>{" "}
                                        {formData.industry}
                                    </p>
                                    <p>
                                        <strong>Employees:</strong>{" "}
                                        {formData.employeeCount}
                                    </p>
                                    <p>
                                        <strong>Admin:</strong>{" "}
                                        {formData.adminEmail}
                                    </p>
                                </div>
                            </div>

                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleInputChange}
                                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                                />
                                <span className="ml-3 text-sm text-gray-700">
                                    I agree to the Terms of Service and Privacy
                                    Policy
                                </span>
                            </label>
                            {errors.termsAccepted && (
                                <p className="text-sm text-red-600">
                                    {errors.termsAccepted}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={step === 1}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Back
                        </button>

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                {isLoading
                                    ? "Creating..."
                                    : "Create Company Account"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySignup;
