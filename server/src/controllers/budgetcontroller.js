import Budget from "../models/budget.js";
import Transaction from "../models/transaction.js";
// CREATE BUDGET
export const createBudget = async (req, res) => {
    try {
        const { category, amount, month, year } = req.body;

        if (!category || !amount || !month || !year) {
            return res.status(400).json({
                message: "Category, amount, month and year are required",
            });
        }

        const budget = await Budget.create({
            userId: req.userId,
            category,
            amount,
            month,
            year,
        });

        res.status(201).json({
            message: "Budget created successfully",
            budget,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create budget",
            error: error.message,
        });
    }
};


// GET BUDGETS
export const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({
            userId: req.userId,
        }).sort({
            year: -1,
            month: -1,
        });

        const budgetsWithUsage = await Promise.all(
            budgets.map(async (budget) => {
                const startDate = new Date(
                    budget.year,
                    budget.month - 1,
                    1
                );

                const endDate = new Date(
                    budget.year,
                    budget.month,
                    1
                );

                const transactions = await Transaction.find({
                    userId: req.userId,
                    type: "expense",
                    category: budget.category,
                    date: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                });

                const spent = transactions.reduce(
                    (total, transaction) =>
                        total + transaction.amount,
                    0
                );

                const remaining = budget.amount - spent;

                const percentage =
                    budget.amount > 0
                        ? (spent / budget.amount) * 100
                        : 0;

                return {
                    ...budget.toObject(),
                    spent,
                    remaining,
                    percentage: Math.round(percentage),
                };
            })
        );

        res.status(200).json({
            budgets: budgetsWithUsage,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get budgets",
            error: error.message,
        });
    }
};


// UPDATE BUDGET
export const updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found",
            });
        }

        res.status(200).json({
            message: "Budget updated successfully",
            budget,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update budget",
            error: error.message,
        });
    }
};


// DELETE BUDGET
export const deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!budget) {
            return res.status(404).json({
                message: "Budget not found",
            });
        }

        res.status(200).json({
            message: "Budget deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete budget",
            error: error.message,
        });
    }
};