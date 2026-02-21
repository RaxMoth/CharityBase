import React, { useState } from "react";
import {
    Users,
    TrendingUp,
    DollarSign,
    Settings,
    Mail,
    Download,
} from "lucide-react";

interface CompanyMetrics {
    totalEmployees: number;
    enrolledEmployees: number;
    totalDonationsMonth: number;
    totalMatchMonth: number;
}

interface Employee {
    id: string;
    name: string;
    email: string;
    monthlyDonation: number;
    status: "active" | "pending" | "invited";
}

const CompanyAdmin: React.FC = () => {
    // const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<
        "overview" | "employees" | "settings" | "reports"
    >("overview");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [_employees, _setEmployees] = useState<Employee[]>([
        {
            id: "1",
            name: "John Doe",
            email: "john@company.com",
            monthlyDonation: 50,
            status: "active",
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@company.com",
            monthlyDonation: 100,
            status: "active",
        },
    ]);

    const [metrics] = useState<CompanyMetrics>({
        totalEmployees: 150,
        enrolledEmployees: 45,
        totalDonationsMonth: 4500,
        totalMatchMonth: 2250,
    });

    const [settings, setSettings] = useState({
        matchingEnabled: true,
        matchingPercentage: 50,
        customLogo: false,
    });

    const handleInviteEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        if (inviteEmail) {
            // In real app, this would send an email
            alert(`Invite sent to ${inviteEmail}`);
            setInviteEmail("");
            setShowInviteModal(false);
        }
    };

    const handleSettingsChange = (key: keyof typeof settings, value: any) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Company Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage your employee giving program
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                    {[
                        { id: "overview", label: "Overview", icon: TrendingUp },
                        { id: "employees", label: "Employees", icon: Users },
                        { id: "reports", label: "Reports", icon: Download },
                        { id: "settings", label: "Settings", icon: Settings },
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

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            Total Employees
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {metrics.totalEmployees}
                                        </p>
                                    </div>
                                    <Users
                                        size={40}
                                        className="text-blue-600 opacity-30"
                                    />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            Enrolled
                                        </p>
                                        <p className="text-3xl font-bold text-green-600">
                                            {metrics.enrolledEmployees}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {(
                                                (metrics.enrolledEmployees /
                                                    metrics.totalEmployees) *
                                                100
                                            ).toFixed(0)}
                                            %
                                        </p>
                                    </div>
                                    <TrendingUp
                                        size={40}
                                        className="text-green-600 opacity-30"
                                    />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            Donations (MTD)
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            €
                                            {metrics.totalDonationsMonth.toLocaleString()}
                                        </p>
                                    </div>
                                    <DollarSign
                                        size={40}
                                        className="text-orange-600 opacity-30"
                                    />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            Company Match (MTD)
                                        </p>
                                        <p className="text-3xl font-bold text-purple-600">
                                            €
                                            {metrics.totalMatchMonth.toLocaleString()}
                                        </p>
                                    </div>
                                    <DollarSign
                                        size={40}
                                        className="text-purple-600 opacity-30"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Quick Actions
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setShowInviteModal(true)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <Mail size={20} />
                                    Invite Employees
                                </button>
                                <button
                                    onClick={() => setActiveTab("employees")}
                                    className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                                >
                                    <Users size={20} />
                                    Manage Team
                                </button>
                                <button
                                    onClick={() => setActiveTab("reports")}
                                    className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                                >
                                    <Download size={20} />
                                    Download Report
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Employees Tab */}
                {activeTab === "employees" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Team Members
                            </h2>
                            <button
                                onClick={() => setShowInviteModal(true)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                + Invite Employee
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Monthly Donation
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {_employees.map((employee: Employee) => (
                                        <tr
                                            key={employee.id}
                                            className="border-t border-gray-200 hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-3 text-sm text-gray-900">
                                                {employee.name}
                                            </td>
                                            <td className="px-6 py-3 text-sm text-gray-600">
                                                {employee.email}
                                            </td>
                                            <td className="px-6 py-3 text-sm text-gray-900">
                                                €{employee.monthlyDonation}
                                            </td>
                                            <td className="px-6 py-3 text-sm">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        employee.status ===
                                                        "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : employee.status ===
                                                                "pending"
                                                              ? "bg-yellow-100 text-yellow-800"
                                                              : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {employee.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Reports Tab */}
                {activeTab === "reports" && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Reports & Impact
                        </h2>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                CSR Report
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Generate a comprehensive ESG/CSR report for your
                                company
                            </p>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Download PDF Report
                            </button>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Company Settings
                        </h2>
                        <div className="bg-white p-6 rounded-lg shadow space-y-6">
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={settings.matchingEnabled}
                                        onChange={(e) =>
                                            handleSettingsChange(
                                                "matchingEnabled",
                                                e.target.checked,
                                            )
                                        }
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <span className="ml-3 text-lg font-medium text-gray-900">
                                        Enable Donation Matching
                                    </span>
                                </label>
                                <p className="mt-2 text-sm text-gray-600 ml-7">
                                    Company will match employee donations by a
                                    percentage
                                </p>
                            </div>

                            {settings.matchingEnabled && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">
                                        Matching Percentage (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={settings.matchingPercentage}
                                        onChange={(e) =>
                                            handleSettingsChange(
                                                "matchingPercentage",
                                                parseInt(e.target.value),
                                            )
                                        }
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="mt-2 text-sm text-gray-600">
                                        Example: If set to 50%, a €100 employee
                                        donation becomes €150
                                    </p>
                                </div>
                            )}

                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Save Settings
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Invite Employee
                        </h2>
                        <form
                            onSubmit={handleInviteEmployee}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Employee Email
                                </label>
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) =>
                                        setInviteEmail(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="employee@email.com"
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowInviteModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Send Invite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyAdmin;
