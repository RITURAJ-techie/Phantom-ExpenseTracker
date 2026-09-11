import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Receipt,
    PiggyBank,
    BarChart3,
    LogOut,
    Wallet,
    ChevronRight,
} from "lucide-react";

import { useAuth } from "../context/authcontext";


function Sidebar() {

    const { logout, user } = useAuth();


    const links = [
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
        <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">

            {/* ========================= */}
            {/* LOGO */}
            {/* ========================= */}

            <div className="flex h-16 items-center border-b border-slate-100 px-6">

                <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3"
                >

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                        <Wallet className="h-5 w-5 text-white" />
                    </div>

                    <div>
                        <p className="text-lg font-bold text-gray-900">
                            Phantom
                        </p>

                        <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                            Expense Tracker
                        </p>
                    </div>

                </NavLink>

            </div>


            {/* ========================= */}
            {/* USER PROFILE */}
            {/* ========================= */}

            <div className="px-4 pt-6">

                {user ? (

                    <div className="rounded-xl bg-slate-50 p-4">

                        <div className="flex items-center gap-3">

                            {/* Avatar */}

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">

                                {user.name
                                    ?.charAt(0)
                                    .toUpperCase()
                                }

                            </div>


                            {/* User information */}

                            <div className="min-w-0">

                                <p className="truncate text-sm font-semibold text-gray-900">
                                    {user.name}
                                </p>

                                <p className="truncate text-xs text-gray-500">
                                    {user.email}
                                </p>

                            </div>

                        </div>

                    </div>

                ) : (

                    <div className="rounded-xl bg-slate-50 p-4">

                        <p className="text-sm text-gray-500">
                            Loading user...
                        </p>

                    </div>

                )}

            </div>


            {/* ========================= */}
            {/* NAVIGATION */}
            {/* ========================= */}

            <nav className="flex-1 px-4 py-6">

                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Menu
                </p>


                <div className="space-y-1">

                    {links.map((link) => {

                        const Icon = link.icon;


                        return (

                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `group flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`
                                }
                            >

                                <div className="flex items-center gap-3">

                                    <Icon className="h-5 w-5" />

                                    <span>
                                        {link.name}
                                    </span>

                                </div>


                                <ChevronRight
                                    className="h-4 w-4 opacity-0 transition group-hover:opacity-100"
                                />

                            </NavLink>

                        );

                    })}

                </div>

            </nav>


            {/* ========================= */}
            {/* LOGOUT */}
            {/* ========================= */}

            <div className="border-t border-slate-100 p-4">

                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >

                    <LogOut className="h-5 w-5" />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );
}


export default Sidebar;