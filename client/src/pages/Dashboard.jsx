import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Receipt,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    ArrowRight,
} from "lucide-react";

import api from "../services/api";


function Dashboard() {

    const navigate = useNavigate();


    // ==========================================
    // DASHBOARD SUMMARY
    // ==========================================

    const [summary, setSummary] = useState({
        balance: 0,
        totalIncome: 0,
        totalExpenses: 0,
        transactionCount: 0,
    });


    // ==========================================
    // RECENT TRANSACTIONS
    // ==========================================

    const [transactions, setTransactions] = useState([]);


    // ==========================================
    // LOADING STATE
    // ==========================================

    const [loading, setLoading] = useState(true);


    // ==========================================
    // FETCH DASHBOARD DATA
    // ==========================================

    const fetchDashboard = async () => {

        try {

            const response = await api.get("/dashboard");

            const dashboardData = response.data.data;


            // Set summary information

            setSummary({
                balance: dashboardData.balance,
                totalIncome: dashboardData.totalIncome,
                totalExpenses: dashboardData.totalExpenses,
                transactionCount: dashboardData.transactionCount,
            });


            // Set recent transactions

            setTransactions(
                dashboardData.recentTransactions || []
            );


        } catch (error) {

            console.error(
                "Dashboard error:",
                error.response?.data || error.message
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // FETCH WHEN PAGE LOADS
    // ==========================================

    useEffect(() => {

        fetchDashboard();

    }, []);


    // ==========================================
    // FORMAT CURRENCY
    // ==========================================

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount || 0);

    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    };


    return (

        <div className="min-h-screen bg-slate-50">


            {/* ==========================================
                TOP HEADER
            ========================================== */}

            <header className="border-b border-slate-200 bg-white">

                <div className="flex items-center justify-between px-6 py-5 lg:px-10">

                    <div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Dashboard
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Here's an overview of your finances.
                        </p>

                    </div>


                    <button
                        onClick={() => navigate("/transactions")}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >

                        <Plus className="h-4 w-4" />

                        Add Transaction

                    </button>

                </div>

            </header>


            {/* ==========================================
                MAIN CONTENT
            ========================================== */}

            <main className="px-6 py-8 lg:px-10">

                <div className="mx-auto max-w-7xl">


                    {/* ==========================================
                        WELCOME
                    ========================================== */}

                    <div className="mb-8">

                        <p className="text-sm font-medium text-blue-600">
                            Financial Overview
                        </p>

                        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                            Manage your money smarter.
                        </h2>

                    </div>


                    {/* ==========================================
                        SUMMARY CARDS
                    ========================================== */}

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


                        {/* ==========================================
                            BALANCE
                        ========================================== */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">

                                    <Wallet className="h-5 w-5 text-blue-600" />

                                </div>

                                <span className="text-xs font-medium text-slate-400">
                                    Current
                                </span>

                            </div>


                            <p className="mt-5 text-sm font-medium text-slate-500">
                                Total Balance
                            </p>


                            <p className="mt-1 text-2xl font-bold text-slate-900">

                                {formatCurrency(summary.balance)}

                            </p>

                        </div>


                        {/* ==========================================
                            INCOME
                        ========================================== */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">

                                    <TrendingUp className="h-5 w-5 text-emerald-600" />

                                </div>

                                <ArrowUpRight className="h-5 w-5 text-emerald-500" />

                            </div>


                            <p className="mt-5 text-sm font-medium text-slate-500">
                                Total Income
                            </p>


                            <p className="mt-1 text-2xl font-bold text-emerald-600">

                                {formatCurrency(summary.totalIncome)}

                            </p>

                        </div>


                        {/* ==========================================
                            EXPENSES
                        ========================================== */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">

                                    <TrendingDown className="h-5 w-5 text-red-600" />

                                </div>

                                <ArrowDownRight className="h-5 w-5 text-red-500" />

                            </div>


                            <p className="mt-5 text-sm font-medium text-slate-500">
                                Total Expenses
                            </p>


                            <p className="mt-1 text-2xl font-bold text-red-600">

                                {formatCurrency(summary.totalExpenses)}

                            </p>

                        </div>


                        {/* ==========================================
                            TRANSACTIONS
                        ========================================== */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">

                                    <Receipt className="h-5 w-5 text-violet-600" />

                                </div>

                                <span className="text-xs font-medium text-slate-400">
                                    Total
                                </span>

                            </div>


                            <p className="mt-5 text-sm font-medium text-slate-500">
                                Transactions
                            </p>


                            <p className="mt-1 text-2xl font-bold text-slate-900">

                                {summary.transactionCount}

                            </p>

                        </div>

                    </div>


                    {/* ==========================================
                        MAIN DASHBOARD GRID
                    ========================================== */}

                    <div className="mt-8 grid gap-6 lg:grid-cols-3">


                        {/* ==========================================
                            RECENT TRANSACTIONS
                        ========================================== */}

                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">


                            {/* Header */}

                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

                                <div>

                                    <h3 className="font-bold text-slate-900">
                                        Recent Transactions
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Your latest financial activity.
                                    </p>

                                </div>


                                <button
                                    onClick={() => navigate("/transactions")}
                                    className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                                >

                                    View all

                                    <ArrowRight className="h-4 w-4" />

                                </button>

                            </div>


                            {/* Transactions */}

                            <div className="divide-y divide-slate-100">


                                {/* Loading */}

                                {loading ? (

                                    <div className="px-6 py-10 text-center text-sm text-slate-500">

                                        Loading transactions...

                                    </div>


                                ) : transactions.length === 0 ? (


                                    /* Empty State */

                                    <div className="px-6 py-12 text-center">

                                        <Receipt className="mx-auto h-10 w-10 text-slate-300" />

                                        <p className="mt-3 font-medium text-slate-700">
                                            No transactions yet
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Start by adding your first transaction.
                                        </p>


                                        <button
                                            onClick={() => navigate("/transactions")}
                                            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                        >
                                            Add Transaction
                                        </button>

                                    </div>


                                ) : (


                                    /* Transaction List */

                                    transactions.map((transaction) => (

                                        <div
                                            key={transaction._id}
                                            className="flex items-center justify-between px-6 py-4"
                                        >


                                            {/* Left side */}

                                            <div className="flex items-center gap-4">


                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                                        transaction.type === "income"
                                                            ? "bg-emerald-50"
                                                            : "bg-red-50"
                                                    }`}
                                                >

                                                    {transaction.type === "income" ? (

                                                        <ArrowUpRight className="h-5 w-5 text-emerald-600" />

                                                    ) : (

                                                        <ArrowDownRight className="h-5 w-5 text-red-600" />

                                                    )}

                                                </div>


                                                <div>

                                                    <p className="font-semibold text-slate-900">
                                                        {transaction.category}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {transaction.description ||
                                                            "No description"}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* Right side */}

                                            <div className="text-right">

                                                <p
                                                    className={`font-bold ${
                                                        transaction.type === "income"
                                                            ? "text-emerald-600"
                                                            : "text-red-600"
                                                    }`}
                                                >

                                                    {transaction.type === "income"
                                                        ? "+"
                                                        : "-"}

                                                    {formatCurrency(
                                                        transaction.amount
                                                    )}

                                                </p>


                                                <p className="mt-1 text-xs text-slate-400">

                                                    {formatDate(
                                                        transaction.date
                                                    )}

                                                </p>

                                            </div>

                                        </div>

                                    ))

                                )}

                            </div>

                        </div>


                        {/* ==========================================
                            QUICK ACTIONS
                        ========================================== */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">


                            <h3 className="font-bold text-slate-900">
                                Quick Actions
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage your finances quickly.
                            </p>


                            <div className="mt-6 space-y-3">


                                {/* Transactions */}

                                <button
                                    onClick={() => navigate("/transactions")}
                                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">

                                            <Receipt className="h-5 w-5 text-blue-600" />

                                        </div>


                                        <div>

                                            <p className="text-sm font-semibold text-slate-900">
                                                Transactions
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Add or manage transactions
                                            </p>

                                        </div>

                                    </div>


                                    <ArrowRight className="h-4 w-4 text-slate-400" />

                                </button>


                                {/* Budgets */}

                                <button
                                    onClick={() => navigate("/budgets")}
                                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50">

                                            <Wallet className="h-5 w-5 text-violet-600" />

                                        </div>


                                        <div>

                                            <p className="text-sm font-semibold text-slate-900">
                                                Budgets
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Manage your spending limits
                                            </p>

                                        </div>

                                    </div>


                                    <ArrowRight className="h-4 w-4 text-slate-400" />

                                </button>


                                {/* Reports */}

                                <button
                                    onClick={() => navigate("/reports")}
                                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">

                                            <TrendingUp className="h-5 w-5 text-emerald-600" />

                                        </div>


                                        <div>

                                            <p className="text-sm font-semibold text-slate-900">
                                                Reports
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                Analyze your finances
                                            </p>

                                        </div>

                                    </div>


                                    <ArrowRight className="h-4 w-4 text-slate-400" />

                                </button>


                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );
}


export default Dashboard;