import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import api from "../services/api";

import {
    expenseCategories,
    incomeCategories,
} from "../utils/categories";


function Transactions() {

    const [transactions, setTransactions] = useState([]);

    const [editingId, setEditingId] = useState(null);

    // Search + filters
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");


    const [formData, setFormData] = useState({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: "",
    });


    // =========================
    // FETCH TRANSACTIONS
    // =========================

    const fetchTransactions = async () => {

        try {

            const response = await api.get("/transactions");

            setTransactions(response.data.transactions);

        } catch (error) {

            console.error(
                error.response?.data || error.message
            );

        }

    };


    useEffect(() => {

        fetchTransactions();

    }, []);


    // =========================
    // FORM CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;


        // Reset category when type changes
        if (name === "type") {

            setFormData({
                ...formData,
                type: value,
                category: "",
            });

            return;
        }


        setFormData({
            ...formData,
            [name]: value,
        });

    };


    // =========================
    // RESET FORM
    // =========================

    const resetForm = () => {

        setFormData({
            type: "expense",
            amount: "",
            category: "",
            description: "",
            date: "",
        });

        setEditingId(null);

    };


    // =========================
    // ADD / UPDATE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            if (editingId) {

                await api.put(
                    `/transactions/${editingId}`,
                    formData
                );

            } else {

                await api.post(
                    "/transactions",
                    formData
                );

            }


            resetForm();

            fetchTransactions();

        } catch (error) {

            console.error(
                error.response?.data || error.message
            );

        }

    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (transaction) => {

        setEditingId(transaction._id);

        setFormData({

            type: transaction.type,

            amount: transaction.amount,

            category: transaction.category,

            description: transaction.description || "",

            date: transaction.date
                ? transaction.date.split("T")[0]
                : "",

        });

    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );


        if (!confirmed) {
            return;
        }


        try {

            await api.delete(
                `/transactions/${id}`
            );

            fetchTransactions();

        } catch (error) {

            console.error(
                error.response?.data || error.message
            );

        }

    };


    // =========================
    // FILTER TRANSACTIONS
    // =========================

    const filteredTransactions = transactions.filter(
        (transaction) => {

            const searchText = search
                .toLowerCase()
                .trim();


            const matchesSearch =
                transaction.category
                    ?.toLowerCase()
                    .includes(searchText) ||

                transaction.description
                    ?.toLowerCase()
                    .includes(searchText);


            const matchesType =
                typeFilter === "all" ||
                transaction.type === typeFilter;


            const matchesCategory =
                categoryFilter === "all" ||
                transaction.category === categoryFilter;


            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );

        }
    );


    // =========================
    // CLEAR FILTERS
    // =========================

    const clearFilters = () => {

        setSearch("");

        setTypeFilter("all");

        setCategoryFilter("all");

    };


    const hasFilters =
        search !== "" ||
        typeFilter !== "all" ||
        categoryFilter !== "all";


    return (

        <main className="min-h-screen bg-gray-50 px-6 py-8">

            <div className="mx-auto max-w-5xl">


                {/* =========================
                    PAGE HEADING
                ========================== */}

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Transactions
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Manage your income and expenses.
                    </p>

                </div>


                {/* =========================
                    ADD / EDIT FORM
                ========================== */}

                <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold text-gray-900">

                        {editingId
                            ? "Edit Transaction"
                            : "Add Transaction"}

                    </h2>


                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid gap-4 md:grid-cols-2"
                    >


                        {/* TYPE */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Type
                            </label>

                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            >

                                <option value="expense">
                                    Expense
                                </option>

                                <option value="income">
                                    Income
                                </option>

                            </select>

                        </div>


                        {/* AMOUNT */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                placeholder="Enter amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* CATEGORY */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Category
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


                                {(formData.type === "expense"
                                    ? expenseCategories
                                    : incomeCategories
                                ).map((category) => (

                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* DATE */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <input
                                type="text"
                                name="description"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* BUTTONS */}

                        <div className="flex gap-3 md:col-span-2">

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >

                                {editingId
                                    ? "Update Transaction"
                                    : "Add Transaction"}

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
                    SEARCH + FILTERS
                ========================== */}

                <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

                    <div className="flex flex-col gap-4 md:flex-row">

                        {/* SEARCH */}

                        <div className="relative flex-1">

                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                placeholder="Search category or description..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
                            />

                        </div>


                        {/* TYPE FILTER */}

                        <select
                            value={typeFilter}
                            onChange={(e) =>
                                setTypeFilter(e.target.value)
                            }
                            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        >

                            <option value="all">
                                All Types
                            </option>

                            <option value="expense">
                                Expense
                            </option>

                            <option value="income">
                                Income
                            </option>

                        </select>


                        {/* CATEGORY FILTER */}

                        <select
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(e.target.value)
                            }
                            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        >

                            <option value="all">
                                All Categories
                            </option>

                            {[
                                ...new Set([
                                    ...expenseCategories,
                                    ...incomeCategories,
                                ]),
                            ].map((category) => (

                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* CLEAR FILTERS */}

                    {hasFilters && (

                        <button
                            onClick={clearFilters}
                            className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                        >

                            <X className="h-4 w-4" />

                            Clear filters

                        </button>

                    )}

                </div>


                {/* =========================
                    TRANSACTION LIST
                ========================== */}

                <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">

                        <h2 className="text-xl font-bold text-gray-900">
                            Your Transactions
                        </h2>

                        <span className="text-sm text-gray-500">
                            {filteredTransactions.length} result
                            {filteredTransactions.length !== 1
                                ? "s"
                                : ""}
                        </span>

                    </div>


                    <div className="mt-4 space-y-3">

                        {filteredTransactions.length === 0 ? (

                            <div className="py-8 text-center">

                                <p className="text-sm text-gray-500">
                                    {hasFilters
                                        ? "No transactions match your filters."
                                        : "No transactions yet."}
                                </p>

                            </div>

                        ) : (

                            filteredTransactions.map(
                                (transaction) => (

                                    <div
                                        key={transaction._id}
                                        className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >

                                        {/* INFORMATION */}

                                        <div>

                                            <p className="font-semibold text-gray-900">
                                                {transaction.category}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {transaction.description ||
                                                    "No description"}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {transaction.date
                                                    ? new Date(
                                                          transaction.date
                                                      ).toLocaleDateString()
                                                    : ""}
                                            </p>

                                        </div>


                                        {/* AMOUNT + ACTIONS */}

                                        <div className="flex items-center gap-4">

                                            <p
                                                className={`font-bold ${
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

                                                ₹{transaction.amount}

                                            </p>


                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        transaction
                                                    )
                                                }
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        transaction._id
                                                    )
                                                }
                                                className="text-sm font-medium text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>

            </div>

        </main>

    );
}


export default Transactions;