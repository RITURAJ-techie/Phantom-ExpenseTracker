import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white">

            {/* Main Footer */}

            <div className="mx-auto max-w-7xl px-6 py-12">

                <div className="grid gap-10 md:grid-cols-4">

                    {/* Brand */}

                    <div className="md:col-span-2">

                        <Link
                            to="/"
                            className="flex w-fit items-center gap-3"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                                <Wallet className="h-5 w-5 text-white" />
                            </div>

                            <span className="text-xl font-bold text-gray-900">
                                Phantom
                            </span>
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
                            A simple personal finance tracker that helps you
                            manage expenses, create budgets, and understand
                            your spending habits.
                        </p>

                    </div>


                    {/* Product */}

                    <div>

                        <h3 className="text-sm font-semibold text-gray-900">
                            Product
                        </h3>

                        <ul className="mt-4 space-y-3">

                            <li>
                                <Link
                                    to="/"
                                    className="text-sm text-gray-500 transition hover:text-blue-600"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <a
                                    href="/#features"
                                    className="text-sm text-gray-500 transition hover:text-blue-600"
                                >
                                    Features
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/#about"
                                    className="text-sm text-gray-500 transition hover:text-blue-600"
                                >
                                    About
                                </a>
                            </li>

                        </ul>

                    </div>


                    {/* Account */}

                    <div>

                        <h3 className="text-sm font-semibold text-gray-900">
                            Account
                        </h3>

                        <ul className="mt-4 space-y-3">

                            <li>
                                <Link
                                    to="/login"
                                    className="text-sm text-gray-500 transition hover:text-blue-600"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/register"
                                    className="text-sm text-gray-500 transition hover:text-blue-600"
                                >
                                    Create Account
                                </Link>
                            </li>

                        </ul>

                    </div>

                </div>


                {/* Bottom */}

                <div className="mt-10 border-t border-gray-100 pt-6">

                    <p className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Phantom. All rights reserved.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;