import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";


// ==========================================
// GET DASHBOARD DATA
// ==========================================

export const getDashboard = async (req, res) => {
    try {

        // ID of the currently logged-in user
        // authMiddleware stores it in req.userId
        const userId = req.userId;


        // ==========================================
        // GET USER TRANSACTIONS
        // ==========================================

        const transactions = await Transaction.find({
            userId: userId,
        }).sort({
            date: -1,
        });


        // ==========================================
        // CALCULATE TOTAL INCOME
        // ==========================================

        const totalIncome = transactions
            .filter(
                (transaction) => transaction.type === "income"
            )
            .reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );


        // ==========================================
        // CALCULATE TOTAL EXPENSES
        // ==========================================

        const totalExpenses = transactions
            .filter(
                (transaction) => transaction.type === "expense"
            )
            .reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );


        // ==========================================
        // CALCULATE BALANCE
        // ==========================================

        const balance = totalIncome - totalExpenses;


        // ==========================================
        // GET USER BUDGETS
        // ==========================================

        const budgets = await Budget.find({
            userId: userId,
        });


        // ==========================================
        // CALCULATE TOTAL BUDGET
        // ==========================================

        const totalBudget = budgets.reduce(
            (total, budget) =>
                total + budget.amount,
            0
        );


        // ==========================================
        // TRANSACTION COUNT
        // ==========================================

        const transactionCount = transactions.length;


        // ==========================================
        // RECENT TRANSACTIONS
        // ==========================================

        const recentTransactions =
            transactions.slice(0, 5);


        // ==========================================
        // SEND RESPONSE
        // ==========================================

        res.status(200).json({

            success: true,

            data: {

                balance,

                totalIncome,

                totalExpenses,

                totalBudget,

                transactionCount,

                recentTransactions,

            },

        });

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Failed to fetch dashboard data",

        });

    }
};