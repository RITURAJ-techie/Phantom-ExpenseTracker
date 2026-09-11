import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

import api from "../services/api";

function Reports() {
    const [report, setReport] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        expenseByCategory: [],
        transactions: [],
    });

    const [loading, setLoading] = useState(true);

    // =========================
    // Fetch Report
    // =========================

    const fetchReport = async () => {
        try {
            setLoading(true);

            const response = await api.get("/reports");

            setReport(response.data);
        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    // =========================
    // Format Currency
    // =========================

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(amount || 0);
    };

    // =========================
    // Chart Data
    // =========================

    const summaryData = [
        {
            name: "Income",
            amount: report.totalIncome,
        },
        {
            name: "Expenses",
            amount: report.totalExpenses,
        },
    ];

    // =========================
    // Loading State
    // =========================

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-6 py-8">
                <div className="mx-auto max-w-7xl">

                    <div className="animate-pulse">
                        <div className="h-8 w-64 rounded bg-gray-200" />
                        <div className="mt-3 h-4 w-96 rounded bg-gray-200" />

                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            <div className="h-32 rounded-xl bg-white" />
                            <div className="h-32 rounded-xl bg-white" />
                            <div className="h-32 rounded-xl bg-white" />
                        </div>
                    </div>

                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="mx-auto max-w-7xl">

                {/* =========================
                    HEADER
                ========================== */}

                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        ANALYTICS
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-gray-900">
                        Financial Reports
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Analyze your income, expenses and spending patterns.
                    </p>
                </div>


                {/* =========================
                    SUMMARY CARDS
                ========================== */}

                <div className="mt-8 grid gap-6 md:grid-cols-3">

                    {/* Income */}

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <p className="text-sm font-medium text-gray-500">
                            Total Income
                        </p>

                        <p className="mt-3 text-3xl font-bold text-green-600">
                            {formatCurrency(report.totalIncome)}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Money received
                        </p>

                    </div>


                    {/* Expenses */}

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <p className="text-sm font-medium text-gray-500">
                            Total Expenses
                        </p>

                        <p className="mt-3 text-3xl font-bold text-red-600">
                            {formatCurrency(report.totalExpenses)}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Money spent
                        </p>

                    </div>


                    {/* Balance */}

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <p className="text-sm font-medium text-gray-500">
                            Current Balance
                        </p>

                        <p
                            className={`mt-3 text-3xl font-bold ${
                                report.balance >= 0
                                    ? "text-blue-600"
                                    : "text-red-600"
                            }`}
                        >
                            {formatCurrency(report.balance)}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Income minus expenses
                        </p>

                    </div>

                </div>


                {/* =========================
                    CHARTS
                ========================== */}

                <div className="mt-8 grid gap-6 lg:grid-cols-2">

                    {/* Expense By Category */}

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Expenses by Category
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                See where your money is being spent.
                            </p>
                        </div>

                        <div className="mt-6 h-80">

                            {report.expenseByCategory.length === 0 ? (

                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center">

                                        <p className="font-medium text-gray-700">
                                            No expense data
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Add some expenses to see the chart.
                                        </p>

                                    </div>
                                </div>

                            ) : (

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <PieChart>

                                        <Pie
                                            data={report.expenseByCategory}
                                            dataKey="amount"
                                            nameKey="category"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label
                                        >
                                            {report.expenseByCategory.map(
                                                (_, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                    />
                                                )
                                            )}
                                        </Pie>

                                        <Tooltip
                                            formatter={(value) =>
                                                formatCurrency(value)
                                            }
                                        />

                                        <Legend />

                                    </PieChart>
                                </ResponsiveContainer>

                            )}

                        </div>

                    </div>


                    {/* Income vs Expenses */}

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Income vs Expenses
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Compare your total money received and spent.
                            </p>
                        </div>

                        <div className="mt-6 h-80">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart data={summaryData}>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis dataKey="name" />

                                    <YAxis />

                                    <Tooltip
                                        formatter={(value) =>
                                            formatCurrency(value)
                                        }
                                    />

                                    <Bar
                                        dataKey="amount"
                                        radius={[
                                            6,
                                            6,
                                            0,
                                            0,
                                        ]}
                                    />

                                </BarChart>
                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>


                {/* =========================
                    TRANSACTION HISTORY
                ========================== */}

                <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Transaction History
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Review your recent financial activity.
                        </p>
                    </div>


                    <div className="mt-6">

                        {report.transactions.length === 0 ? (

                            <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center">

                                <p className="font-medium text-gray-700">
                                    No transactions available
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your transactions will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-3">

                                {report.transactions.map(
                                    (transaction) => (
                                        <div
                                            key={transaction._id}
                                            className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
                                        >

                                            {/* Transaction Details */}

                                            <div className="min-w-0">

                                                <p className="font-semibold text-gray-900">
                                                    {transaction.category}
                                                </p>

                                                <p className="mt-1 truncate text-sm text-gray-500">
                                                    {transaction.description ||
                                                        "No description"}
                                                </p>

                                                {transaction.date && (
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {new Date(
                                                            transaction.date
                                                        ).toLocaleDateString(
                                                            "en-IN"
                                                        )}
                                                    </p>
                                                )}

                                            </div>


                                            {/* Amount */}

                                            <p
                                                className={`ml-4 whitespace-nowrap font-bold ${
                                                    transaction.type ===
                                                    "income"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {transaction.type ===
                                                "income"
                                                    ? "+"
                                                    : "-"}
                                                {formatCurrency(
                                                    transaction.amount
                                                )}
                                            </p>

                                        </div>
                                    )
                                )}

                            </div>

                        )}

                    </div>

                </div>

            </div>
        </main>
    );
}

export default Reports;