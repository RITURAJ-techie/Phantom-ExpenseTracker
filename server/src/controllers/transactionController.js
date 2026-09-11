import Transaction from "../models/transaction.js";

// CREATE
export const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        if (!type || !amount || !category) {
            return res.status(400).json({
                message: "Type, amount and category are required",
            });
        }

        const transaction = await Transaction.create({
            userId: req.userId,
            type,
            amount,
            category,
            description,
            date,
        });

        res.status(201).json({
            message: "Transaction created successfully",
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create transaction",
            error: error.message,
        });
    }
};

// GET ALL
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            userId: req.userId,
        }).sort({ date: -1 });

        res.status(200).json({
            transactions,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get transactions",
            error: error.message,
        });
    }
};

// UPDATE
export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndUpdate(
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

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        res.status(200).json({
            message: "Transaction updated successfully",
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update transaction",
            error: error.message,
        });
    }
};

// DELETE
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        res.status(200).json({
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete transaction",
            error: error.message,
        });
    }
};