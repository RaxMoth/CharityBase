import React, { useState } from "react";
import { Heart, Percent, TrendingUp } from "lucide-react";

interface Charity {
    id: string;
    name: string;
    logo: string;
    category: string;
    description: string;
}

interface SelectedCharity {
    id: string;
    allocation: number;
}

const EmployeePortal: React.FC = () => {
    const [activeTab, setActiveTab] = useState<
        "browse" | "allocate" | "impact"
    >("browse");
    const [monthlyAmount, setMonthlyAmount] = useState(50);
    const [selectedCharities, setSelectedCharities] = useState<
        SelectedCharity[]
    >([]);
    const [payrollEnabled, setPayrollEnabled] = useState(false);

    const charities: Charity[] = [
        {
            id: "1",
            name: "Food for All",
            logo: "🍱",
            category: "Food Security",
            description: "Fighting hunger in our community",
        },
        {
            id: "2",
            name: "Clean Water Initiative",
            logo: "💧",
            category: "Water & Sanitation",
            description: "Providing clean water access",
        },
        {
            id: "3",
            name: "Education Tomorrow",
            logo: "📚",
            category: "Education",
            description: "Quality education for all children",
        },
        {
            id: "4",
            name: "Health for Life",
            logo: "⚕️",
            category: "Healthcare",
            description: "Accessible healthcare for everyone",
        },
        {
            id: "5",
            name: "Earth Guardians",
            logo: "🌍",
            category: "Environment",
            description: "Protecting our planet",
        },
        {
            id: "6",
            name: "Hope Rising",
            logo: "🤝",
            category: "Poverty Alleviation",
            description: "Lifting people out of poverty",
        },
    ];

    const handleSelectCharity = (charityId: string) => {
        const exists = selectedCharities.find((c) => c.id === charityId);
        if (exists) {
            setSelectedCharities(
                selectedCharities.filter((c) => c.id !== charityId),
            );
        } else {
            setSelectedCharities([
                ...selectedCharities,
                { id: charityId, allocation: 0 },
            ]);
        }
    };

    const handleAllocationChange = (charityId: string, value: number) => {
        setSelectedCharities(
            selectedCharities.map((c) =>
                c.id === charityId ? { ...c, allocation: value } : c,
            ),
        );
    };

    const totalAllocation = selectedCharities.reduce(
        (sum, c) => sum + c.allocation,
        0,
    );

    const companyMatch = monthlyAmount * 0.5; // 50% matching
    const totalImpact = monthlyAmount + companyMatch;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Your Giving Portal
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Make a difference through your workplace
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                    {[
                        {
                            id: "browse",
                            label: "Browse Charities",
                            icon: Heart,
                        },
                        {
                            id: "allocate",
                            label: "Your Allocation",
                            icon: Percent,
                        },
                        {
                            id: "impact",
                            label: "Your Impact",
                            icon: TrendingUp,
                        },
                    ].map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id as any)}
                            className={`px-6 py-3 font-medium flex items-center gap-2 border-b-2 transition ${
                                activeTab === id
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Icon size={20} />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Browse Charities Tab */}
                {activeTab === "browse" && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-700 mb-4">
                                Select 1-5 charities you'd like to support
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {charities.map((charity) => (
                                    <button
                                        key={charity.id}
                                        onClick={() =>
                                            handleSelectCharity(charity.id)
                                        }
                                        className={`p-6 rounded-lg border-2 transition text-left ${
                                            selectedCharities.find(
                                                (c) => c.id === charity.id,
                                            )
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                    >
                                        <div className="text-4xl mb-2">
                                            {charity.logo}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {charity.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {charity.category}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {charity.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setActiveTab("allocate")}
                                disabled={selectedCharities.length === 0}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue to Allocation
                            </button>
                        </div>
                    </div>
                )}

                {/* Allocation Tab */}
                {activeTab === "allocate" && (
                    <div className="space-y-6">
                        {/* Monthly Amount */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Monthly Donation Amount
                            </h2>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-gray-900">
                                    €
                                </span>
                                <input
                                    type="number"
                                    value={monthlyAmount}
                                    onChange={(e) =>
                                        setMonthlyAmount(Number(e.target.value))
                                    }
                                    min="1"
                                    max="1000"
                                    className="text-4xl font-bold border-b-2 border-gray-300 focus:border-blue-500 outline-none w-48"
                                />
                                <span className="text-lg text-gray-600">
                                    /month
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-4">
                                This will be deducted from your payslip
                            </p>
                        </div>

                        {/* Allocation Sliders */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Allocate Your Donation
                            </h2>
                            <div className="space-y-6">
                                {selectedCharities.map((selected) => {
                                    const charity = charities.find(
                                        (c) => c.id === selected.id,
                                    )!;
                                    return (
                                        <div key={selected.id}>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="font-medium text-gray-900 flex items-center gap-2">
                                                    <span className="text-2xl">
                                                        {charity.logo}
                                                    </span>
                                                    {charity.name}
                                                </label>
                                                <span className="text-lg font-bold text-blue-600">
                                                    {selected.allocation}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={selected.allocation}
                                                onChange={(e) =>
                                                    handleAllocationChange(
                                                        selected.id,
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                            <p className="text-sm text-gray-600 mt-1">
                                                €
                                                {(
                                                    (monthlyAmount *
                                                        selected.allocation) /
                                                    100
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    Total allocated:{" "}
                                    <span className="font-bold">
                                        {totalAllocation}%
                                    </span>
                                </p>
                                {totalAllocation !== 100 && (
                                    <p className="text-sm text-orange-600 mt-1">
                                        ⚠️ Please allocate 100% of your donation
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Payroll Deduction */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={payrollEnabled}
                                    onChange={(e) =>
                                        setPayrollEnabled(e.target.checked)
                                    }
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <span className="ml-3 text-lg font-medium text-gray-900">
                                    Enable Payroll Deduction
                                </span>
                            </label>
                            <p className="text-sm text-gray-600 mt-2 ml-7">
                                Amount will be deducted from your monthly salary
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setActiveTab("impact")}
                                disabled={
                                    totalAllocation !== 100 || !payrollEnabled
                                }
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Review Impact
                            </button>
                        </div>
                    </div>
                )}

                {/* Impact Tab */}
                {activeTab === "impact" && (
                    <div className="space-y-6">
                        {/* Impact Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <p className="text-gray-600 text-sm mb-2">
                                    Your Monthly Donation
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    €{monthlyAmount}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg shadow text-white">
                                <p className="text-sm mb-2 opacity-90">
                                    Company Match (50%)
                                </p>
                                <p className="text-3xl font-bold">
                                    €{companyMatch.toFixed(2)}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-500 to-blue-500 p-6 rounded-lg shadow text-white">
                                <p className="text-sm mb-2 opacity-90">
                                    Total Monthly Impact
                                </p>
                                <p className="text-3xl font-bold">
                                    €{totalImpact.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Charity Breakdown */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Your Giving Breakdown
                            </h2>
                            <div className="space-y-4">
                                {selectedCharities.map((selected) => {
                                    const charity = charities.find(
                                        (c) => c.id === selected.id,
                                    )!;
                                    const amount =
                                        (monthlyAmount * selected.allocation) /
                                        100;
                                    const matched = amount * 0.5;

                                    return (
                                        <div
                                            key={selected.id}
                                            className="border-l-4 border-blue-500 pl-4 py-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900 flex items-center gap-2">
                                                    <span className="text-2xl">
                                                        {charity.logo}
                                                    </span>
                                                    {charity.name}
                                                </span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    €{amount.toFixed(2)} + €
                                                    {matched.toFixed(2)} match
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {selected.allocation}% of your
                                                donation
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Annual Impact */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg shadow">
                            <h2 className="text-2xl font-bold mb-2">
                                Your Annual Impact
                            </h2>
                            <p className="text-4xl font-bold">
                                €{(totalImpact * 12).toFixed(2)}
                            </p>
                            <p className="text-blue-100 mt-4">
                                That's a year of meaningful support for the
                                charities you care about!
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg font-medium">
                                Confirm & Activate
                            </button>
                            <button
                                onClick={() => setActiveTab("allocate")}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50"
                            >
                                Back to Allocation
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeePortal;
