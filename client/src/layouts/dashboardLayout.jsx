import { useState } from "react";
import {
    Menu,
    X,
    Wallet,
    LayoutDashboard,
    Receipt,
    PiggyBank,
    BarChart3,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/sidebar";

function DashboardLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 lg:flex">

            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <div className="min-w-0 flex-1">

                {/* Mobile Header */}
                <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:hidden">

                    {/* Logo */}
                    <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                            <Wallet className="h-5 w-5 text-white" />
                        </div>

                        <span className="text-lg font-bold text-gray-900">
                            Phantom
                        </span>

                    </div>


                    {/* Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>

                </div>


                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="border-b border-slate-200 bg-white px-5 py-4 lg:hidden">

                        <div className="space-y-2">

                            {/* Dashboard */}
                            <NavLink
                                to="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                            >
                                <LayoutDashboard className="h-5 w-5" />
                                Dashboard
                            </NavLink>


                            {/* Transactions */}
                            <NavLink
                                to="/transactions"
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                            >
                                <Receipt className="h-5 w-5" />
                                Transactions
                            </NavLink>


                            {/* Budgets */}
                            <NavLink
                                to="/budgets"
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                            >
                                <PiggyBank className="h-5 w-5" />
                                Budgets
                            </NavLink>


                            {/* Reports */}
                            <NavLink
                                to="/reports"
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                            >
                                <BarChart3 className="h-5 w-5" />
                                Reports
                            </NavLink>

                        </div>

                    </div>
                )}


                {/* Page Content */}
                <main>
                    {children}
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;