import Transaction from "../models/Transaction.js";

export const getReport = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            userId: req.userId,
        }).sort({ date: -1 });

        let totalIncome = 0;
        let totalExpenses = 0;

        const categoryTotals = {};

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            }

            if (transaction.type === "expense") {
                totalExpenses += transaction.amount;

                if (!categoryTotals[transaction.category]) {
                    categoryTotals[transaction.category] = 0;
                }

                categoryTotals[transaction.category] +=
                    transaction.amount;
            }
        });

        const expenseByCategory = Object.entries(
            categoryTotals
        ).map(([category, amount]) => ({
            category,
            amount,
        }));

        res.status(200).json({
            totalIncome,
            totalExpenses,
            balance: totalIncome - totalExpenses,
            expenseByCategory,
            transactions,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to generate report",
            error: error.message,
        });
    }
};