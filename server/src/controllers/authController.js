import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        // 2. Check whether user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // 5. Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 6. Send response
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // 2. Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        
        // 3. Compare password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get user",
            error: error.message,
        });
    }
};