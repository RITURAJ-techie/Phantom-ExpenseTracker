import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    Wallet,
    Menu,
    X,
    LayoutDashboard,
    Receipt,
    PiggyBank,
    BarChart3,
    LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeMobileMenu();
    };

    const publicLinks = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Features",
            path: "/#features",
        },
        {
            name: "About",
            path: "/#about",
        },
    ];

    const dashboardLinks = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Transactions",
            path: "/transactions",
            icon: Receipt,
        },
        {
            name: "Budgets",
            path: "/budgets",
            icon: PiggyBank,
        },
        {
            name: "Reports",
            path: "/reports",
            icon: BarChart3,
        },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

            {/* =========================
                DESKTOP / MAIN NAVBAR
            ========================== */}

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                        <Wallet className="h-5 w-5 text-white" />
                    </div>

                    <div>
                        <span className="text-xl font-bold text-gray-900">
                            Phantom
                        </span>

                        <p className="hidden text-[10px] font-medium uppercase tracking-wider text-gray-400 sm:block">
                            Expense Tracker
                        </p>
                    </div>
                </Link>


                {/* Desktop Navigation */}

                <div className="hidden items-center gap-7 md:flex">

                    {!isAuthenticated ? (

                        <>
                            {publicLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <Link
                                to="/login"
                                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Get Started
                            </Link>
                        </>

                    ) : (

                        <>
                            {dashboardLinks.map((link) => {
                                const Icon = link.icon;

                                return (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-1.5 text-sm font-medium transition ${
                                                isActive
                                                    ? "text-blue-600"
                                                    : "text-gray-600 hover:text-blue-600"
                                            }`
                                        }
                                    >
                                        <Icon className="h-4 w-4" />

                                        {link.name}
                                    </NavLink>
                                );
                            })}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-red-600"
                            >
                                <LogOut className="h-4 w-4" />

                                Logout
                            </button>
                        </>

                    )}

                </div>


                {/* Mobile Menu Button */}

                <button
                    onClick={() =>
                        setMobileMenuOpen(!mobileMenuOpen)
                    }
                    className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 md:hidden"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>

            </div>


            {/* =========================
                MOBILE MENU
            ========================== */}

            {mobileMenuOpen && (
                <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">

                    <div className="space-y-1">

                        {!isAuthenticated ? (

                            <>
                                <Link
                                    to="/"
                                    onClick={closeMobileMenu}
                                    className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Home
                                </Link>

                                <a
                                    href="/#features"
                                    onClick={closeMobileMenu}
                                    className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Features
                                </a>

                                <a
                                    href="/#about"
                                    onClick={closeMobileMenu}
                                    className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    About
                                </a>

                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={closeMobileMenu}
                                    className="mt-2 block rounded-lg bg-blue-600 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Get Started
                                </Link>
                            </>

                        ) : (

                            <>
                                {dashboardLinks.map((link) => {
                                    const Icon = link.icon;

                                    return (
                                        <NavLink
                                            key={link.path}
                                            to={link.path}
                                            onClick={closeMobileMenu}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                                                    isActive
                                                        ? "bg-blue-50 text-blue-600"
                                                        : "text-gray-700 hover:bg-gray-50"
                                                }`
                                            }
                                        >
                                            <Icon className="h-5 w-5" />

                                            {link.name}
                                        </NavLink>
                                    );
                                })}

                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="h-5 w-5" />

                                    Logout
                                </button>
                            </>

                        )}

                    </div>

                </div>
            )}

        </nav>
    );
}

export default Navbar;