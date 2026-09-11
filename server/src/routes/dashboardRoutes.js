import express from "express";

import { getDashboard } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


// GET dashboard data
// Protected route — user must be logged in
router.get("/", authMiddleware, getDashboard);


export default router;