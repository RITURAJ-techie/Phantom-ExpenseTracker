import { useEffect, useState } from "react";
import api from "../services/api";
import { expenseCategories } from "../utils/categories";

function Budgets() {
    const [budgets, setBudgets] = useState([]);

    const [formData, setFormData] = useState({
        category: "",
        amount: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });

    const [editingId, setEditingId] = useState(null);

    // =========================
    // Fetch Budgets
    // =========================

    const fetchBudgets = async () => {
        try {
            const response = await api.get("/budgets");

            setBudgets(response.data.budgets || []);
        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    // =========================
    // Handle Form Changes
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // =========================
    // Reset Form
    // =========================

    const resetForm = () => {
        setFormData({
            category: "",
            amount: "",
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        });

        setEditingId(null);
    };

    // =========================
    // Add / Update Budget
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                category: formData.category,
                amount: Number(formData.amount),
                month: Number(formData.month),
                year: Number(formData.year),
            };

            if (editingId) {
                await api.put(
                    `/budgets/${editingId}`,
                    data
                );
            } else {
                await api.post("/budgets", data);
            }

            resetForm();
            fetchBudgets();
        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
        }
    };

    // =========================
    // Edit Budget
    // =========================

    const handleEdit = (budget) => {
        setEditingId(budget._id);

        setFormData({
            category: budget.category,
            amount: budget.amount,
            month: budget.month,
            year: budget.year,
        });
    };

    // =========================
    // Delete Budget
    // =========================

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this budget?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/budgets/${id}`);

            fetchBudgets();
        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
        }
    };

    // =========================
    // Month Names
    // =========================

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="mx-auto max-w-5xl">

                {/* =========================
                    PAGE HEADING
                ========================== */}

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Budgets
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Set spending limits and keep your expenses under control.
                    </p>
                </div>


                {/* =========================
                    BUDGET FORM
                ========================== */}

                <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold text-gray-900">
                        {editingId
                            ? "Edit Budget"
                            : "Create Budget"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid gap-4 md:grid-cols-2"
                    >

                        {/* Category */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Expense Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            >
                                <option value="">
                                    Select category
                                </option>

                                {expenseCategories.map(
                                    (category) => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>


                        {/* Amount */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Budget Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                placeholder="Enter budget amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>


                        {/* Month */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Month
                            </label>

                            <select
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            >
                                {months.map(
                                    (month, index) => (
                                        <option
                                            key={month}
                                            value={index + 1}
                                        >
                                            {month}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>


                        {/* Year */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Year
                            </label>

                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                min="2020"
                                max="2100"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>


                        {/* Buttons */}

                        <div className="flex gap-3 md:col-span-2">

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                {editingId
                                    ? "Update Budget"
                                    : "Create Budget"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>
                </div>


                {/* =========================
                    BUDGET LIST
                ========================== */}

                <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold text-gray-900">
                        Your Budgets
                    </h2>

                    <div className="mt-5 space-y-4">

                        {budgets.length === 0 ? (

                            <p className="text-sm text-gray-500">
                                No budgets created yet.
                            </p>

                        ) : (

                            budgets.map((budget) => {

                                const percentage =
                                    budget.percentage || 0;

                                const spent =
                                    budget.spent || 0;

                                const remaining =
                                    budget.remaining ??
                                    budget.amount - spent;

                                return (
                                    <div
                                        key={budget._id}
                                        className="rounded-xl border p-5"
                                    >

                                        {/* Top Section */}

                                        <div className="flex items-start justify-between gap-4">

                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {budget.category}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {months[
                                                        budget.month - 1
                                                    ]}{" "}
                                                    {budget.year}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-900">
                                                    ₹{spent} / ₹
                                                    {budget.amount}
                                                </p>

                                                <p
                                                    className={`text-sm font-medium ${
                                                        remaining >= 0
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {remaining >= 0
                                                        ? `₹${remaining} remaining`
                                                        : `₹${Math.abs(
                                                              remaining
                                                          )} over budget`}
                                                </p>
                                            </div>

                                        </div>


                                        {/* Progress Bar */}

                                        <div className="mt-5">

                                            <div className="mb-2 flex justify-between text-xs text-gray-500">
                                                <span>
                                                    Spending Progress
                                                </span>

                                                <span>
                                                    {Math.round(
                                                        percentage
                                                    )}
                                                    %
                                                </span>
                                            </div>

                                            <div className="h-3 overflow-hidden rounded-full bg-gray-100">

                                                <div
                                                    className={`h-full rounded-full transition-all ${
                                                        percentage >=
                                                        100
                                                            ? "bg-red-500"
                                                            : percentage >=
                                                              80
                                                            ? "bg-yellow-500"
                                                            : "bg-blue-600"
                                                    }`}
                                                    style={{
                                                        width: `${Math.min(
                                                            percentage,
                                                            100
                                                        )}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>


                                        {/* Actions */}

                                        <div className="mt-5 flex gap-4">

                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        budget
                                                    )
                                                }
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        budget._id
                                                    )
                                                }
                                                className="text-sm font-medium text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                );
                            })
                        )}

                    </div>
                </div>

            </div>
        </main>
    );
}

export default Budgets;