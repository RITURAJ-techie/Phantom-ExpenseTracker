import {
    Wallet,
    PiggyBank,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
    const features = [
        {
            icon: Wallet,
            title: "Expense Tracking",
            description:
                "Record and organize your daily expenses so you always know where your money goes.",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            icon: PiggyBank,
            title: "Budget Planning",
            description:
                "Create monthly budgets for different categories and keep your spending under control.",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            icon: BarChart3,
            title: "Financial Reports",
            description:
                "Visualize your income and expenses with simple reports and easy-to-understand charts.",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
        },
    ];

    const benefits = [
        "Track income and expenses",
        "Create category-based budgets",
        "Understand your spending patterns",
        "View financial summaries",
    ];

    return (
        <main>

            {/* =========================
                HERO SECTION
            ========================== */}

            <section className="overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">

                <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">

                    <div className="grid items-center gap-16 lg:grid-cols-2">

                        {/* Hero Content */}

                        <div>

                            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                <span className="mr-2 h-2 w-2 rounded-full bg-blue-600" />
                                Simple. Smart. Financial.
                            </div>

                            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
                                Take Control of
                                <span className="text-blue-600">
                                    {" "}Your Finances
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                                Track your expenses, manage your budgets,
                                and understand your spending habits — all
                                in one simple place.
                            </p>

                            {/* Buttons */}

                            <div className="mt-8 flex flex-wrap gap-4">

                                <Link
                                    to="/register"
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                >
                                    Get Started

                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <a
                                    href="#features"
                                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Explore Features
                                </a>

                            </div>

                            {/* Small Trust Indicators */}

                            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    Easy to use
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    Budget friendly
                                </div>

                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                                    Your data matters
                                </div>

                            </div>

                        </div>


                        {/* Hero Dashboard Preview */}

                        <div className="relative">

                            <div className="absolute -inset-6 rounded-3xl bg-blue-100/50 blur-3xl" />

                            <div className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">

                                {/* Fake Dashboard Header */}

                                <div className="flex items-center justify-between border-b border-gray-100 pb-5">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Financial Overview
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-gray-900">
                                            This Month
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <Wallet className="h-5 w-5 text-white" />
                                    </div>

                                </div>


                                {/* Balance */}

                                <div className="mt-5 rounded-xl bg-gray-50 p-5">

                                    <p className="text-sm text-gray-500">
                                        Available Balance
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-gray-900">
                                        ₹42,580
                                    </p>

                                    <p className="mt-2 text-sm text-green-600">
                                        +12.5% from last month
                                    </p>

                                </div>


                                {/* Income / Expense */}

                                <div className="mt-5 grid grid-cols-2 gap-4">

                                    <div className="rounded-xl border border-gray-100 p-4">
                                        <p className="text-xs text-gray-500">
                                            Income
                                        </p>

                                        <p className="mt-2 font-bold text-green-600">
                                            ₹65,000
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 p-4">
                                        <p className="text-xs text-gray-500">
                                            Expenses
                                        </p>

                                        <p className="mt-2 font-bold text-red-600">
                                            ₹22,420
                                        </p>
                                    </div>

                                </div>


                                {/* Spending Bar */}

                                <div className="mt-5">

                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>
                                            Monthly spending
                                        </span>

                                        <span>
                                            65%
                                        </span>
                                    </div>

                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">

                                        <div
                                            className="h-full w-[65%] rounded-full bg-blue-600"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                FEATURES SECTION
            ========================== */}

            <section
                id="features"
                className="bg-white px-6 py-20 lg:py-24"
            >

                <div className="mx-auto max-w-7xl">

                    {/* Heading */}

                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Everything you need
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                            Manage Your Money With Confidence
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            Phantom gives you the essential tools to
                            understand your finances and build better
                            spending habits.
                        </p>

                    </div>


                    {/* Feature Cards */}

                    <div className="mt-12 grid gap-6 md:grid-cols-3">

                        {features.map((feature) => {

                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >

                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}
                                    >
                                        <Icon
                                            className={`h-6 w-6 ${feature.iconColor}`}
                                        />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold text-gray-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-gray-600">
                                        {feature.description}
                                    </p>

                                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600">
                                        Learn more

                                        <ArrowRight
                                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                        />
                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>


            {/* =========================
                ABOUT SECTION
            ========================== */}

            <section
                id="about"
                className="bg-gray-50 px-6 py-20 lg:py-24"
            >

                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

                    {/* Content */}

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Why Phantom?
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                            Everything about your money, in one place.
                        </h2>

                        <p className="mt-5 leading-7 text-gray-600">
                            Managing personal finances doesn't have to be
                            complicated. Phantom helps you keep track of
                            everyday spending, create realistic budgets,
                            and understand your financial habits.
                        </p>

                        <div className="mt-7 space-y-4">

                            {benefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />

                                    <span className="text-gray-700">
                                        {benefit}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>


                    {/* Simple Visual */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <BarChart3 className="h-6 w-6 text-blue-600" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Financial Insight
                                </p>

                                <p className="font-bold text-gray-900">
                                    Understand your spending
                                </p>
                            </div>

                        </div>

                        <div className="mt-8 space-y-5">

                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Food & Dining
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        ₹8,400
                                    </span>
                                </div>

                                <div className="mt-2 h-2 rounded-full bg-gray-100">
                                    <div className="h-full w-[70%] rounded-full bg-blue-500" />
                                </div>
                            </div>


                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Travel
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        ₹5,200
                                    </span>
                                </div>

                                <div className="mt-2 h-2 rounded-full bg-gray-100">
                                    <div className="h-full w-[45%] rounded-full bg-green-500" />
                                </div>
                            </div>


                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Shopping
                                    </span>

                                    <span className="font-semibold text-gray-900">
                                        ₹3,800
                                    </span>
                                </div>

                                <div className="mt-2 h-2 rounded-full bg-gray-100">
                                    <div className="h-full w-[32%] rounded-full bg-purple-500" />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                CTA SECTION
            ========================== */}

            <section className="bg-blue-600 px-6 py-20">

                <div className="mx-auto max-w-4xl text-center">

                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Ready to take control of your finances?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
                        Start tracking your expenses and building better
                        financial habits with Phantom.
                    </p>

                    <div className="mt-8">

                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
                        >
                            Get Started

                            <ArrowRight className="h-4 w-4" />
                        </Link>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;