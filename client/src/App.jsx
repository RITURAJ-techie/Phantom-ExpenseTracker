import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/dashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/budgets";
import Reports from "./pages/reports";

import ProtectedRoute from "./components/protectedRoute";

import { trackPageView } from "./analytics";


function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        trackPageView(location.pathname);
    }, [location.pathname]);

    return null;
}


function App() {
    return (
        <>
            <AnalyticsTracker />

            <Routes>

                {/* PUBLIC */}

                <Route
                    path="/"
                    element={
                        <PublicLayout>
                            <Home />
                        </PublicLayout>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <PublicLayout>
                            <Login />
                        </PublicLayout>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicLayout>
                            <Register />
                        </PublicLayout>
                    }
                />


                {/* PROTECTED */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Transactions />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/budgets"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Budgets />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Reports />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
}

export default App;