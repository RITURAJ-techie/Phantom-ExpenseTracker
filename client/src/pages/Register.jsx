import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User, Wallet } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/authcontext";

function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const name = formData.name.trim();
        const email = formData.email.trim();
        const password = formData.password;
        const confirmPassword = formData.confirmPassword;

        // Validation
        if (!name) {
            setError("Please enter your full name.");
            return;
        }

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        if (!password) {
            setError("Please enter a password.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            const token = response.data.token;

            if (!token) {
                throw new Error(
                    "Registration succeeded but no authentication token was returned."
                );
            }

            // Save token and update authentication state
            login(token);

            // Redirect to dashboard
            navigate("/dashboard", { replace: true });

        } catch (error) {
            console.error("REGISTER ERROR:", error);

            const message =
                error.response?.data?.message ||
                error.message ||
                "Unable to create your account. Please try again.";

            setError(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-73px)] bg-slate-50">

            <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center justify-center px-6 py-12">

                <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">

                    {/* LEFT PANEL */}

                    <div className="hidden bg-blue-600 p-10 text-white md:flex md:flex-col md:justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                                    <Wallet className="h-6 w-6" />
                                </div>

                                <span className="text-2xl font-bold">
                                    Phantom
                                </span>

                            </div>

                            <div className="mt-20">

                                <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                                    Get Started
                                </p>

                                <h1 className="mt-4 text-4xl font-bold leading-tight">
                                    Build better financial habits.
                                </h1>

                                <p className="mt-5 text-lg leading-8 text-blue-100">
                                    Track your spending, create budgets and
                                    understand where your money goes.
                                </p>

                            </div>

                        </div>

                        <p className="text-sm text-blue-100">
                            Simple. Smart. Financial.
                        </p>

                    </div>


                    {/* RIGHT PANEL */}

                    <div className="p-8 sm:p-12">

                        <div className="mx-auto max-w-md">

                            <h2 className="text-3xl font-bold text-slate-900">
                                Create your account
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Start managing your finances with Phantom.
                            </p>


                            {/* ERROR */}

                            {error && (
                                <div
                                    role="alert"
                                    className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                                >
                                    {error}
                                </div>
                            )}


                            {/* FORM */}

                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-5"
                            >

                                {/* NAME */}

                                <div>

                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Full Name
                                    </label>

                                    <div className="relative">

                                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                            disabled={loading}
                                            className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
                                        />

                                    </div>

                                </div>


                                {/* EMAIL */}

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Email address
                                    </label>

                                    <div className="relative">

                                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            disabled={loading}
                                            className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
                                        />

                                    </div>

                                </div>


                                {/* PASSWORD */}

                                <div>

                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">

                                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            disabled={loading}
                                            className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
                                        />

                                    </div>

                                </div>


                                {/* CONFIRM PASSWORD */}

                                <div>

                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Confirm Password
                                    </label>

                                    <div className="relative">

                                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            disabled={loading}
                                            className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50"
                                        />

                                    </div>

                                </div>


                                {/* BUTTON */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Create Account"}
                                </button>

                            </form>


                            {/* LOGIN */}

                            <p className="mt-8 text-center text-sm text-slate-500">

                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Register;