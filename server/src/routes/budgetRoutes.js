import express from "express";

import {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
} from "../controllers/budgetcontroller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBudget);

router.get("/", authMiddleware, getBudgets);

router.put("/:id", authMiddleware, updateBudget);

router.delete("/:id", authMiddleware, deleteBudget);

export default router;