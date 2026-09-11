import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

import connectDB from "./config/db.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/reports", reportRoutes);



app.get("/", (req, res) => {
    res.json({
        message: "Phantom API is running"
    });
});

connectDB();

app.listen(PORT, () => {
    console.log(`Phantom server running on port ${PORT}`);
});