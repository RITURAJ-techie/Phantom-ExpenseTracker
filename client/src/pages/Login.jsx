import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Wallet } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // Remove previous error when user starts correcting the form
        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // Client-side validation
        const email = formData.email.trim();
        const password = formData.password;

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const token = response.data.token;

            if (!token) {
                throw new Error("Login succeeded but no authentication token was returned.");
            }

            // Store token and update authentication state
            login(token);

            // Redirect to dashboard
            navigate("/dashboard", { replace: true });

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            const message =
                error.response?.data?.message ||
                error.message ||
                "Unable to login. Please try again.";

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
                                    Welcome Back
                                </p>

                                <h1 className="mt-4 text-4xl font-bold leading-tight">
                                    Take control of your money.
                                </h1>

                                <p className="mt-5 text-lg leading-8 text-blue-100">
                                    Track expenses, manage budgets and
                                    understand your financial habits
                                    from one simple dashboard.
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
                                Welcome back
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Login to access your financial dashboard.
                            </p>


                            {/* ERROR MESSAGE */}

                            {error && (
                                <div
                                    role="alert"
                                    className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                                >
                                    {error}
                                </div>
                            )}


                            {/* LOGIN FORM */}

                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-5"
                            >

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
                                            className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500"
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
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                            disabled={loading}
                                            className="w-full rounded-xl border border-slate-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-500"
                                        />

                                    </div>

                                </div>


                                {/* LOGIN BUTTON */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>

                            </form>


                            {/* REGISTER */}

                            <p className="mt-8 text-center text-sm text-slate-500">

                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Create an account
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Login;