import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // =========================
    // FETCH LOGGED-IN USER
    // =========================

    const fetchUser = async () => {

        try {

            const response = await api.get("/auth/me");

            setUser(response.data.user);

        } catch (error) {

            console.error(
                "Failed to fetch user:",
                error.response?.data || error.message
            );

            // If token is invalid, remove it
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // RESTORE USER ON REFRESH
    // =========================

    useEffect(() => {

        const storedToken = localStorage.getItem("token");

        if (storedToken) {

            fetchUser();

        } else {

            setLoading(false);

        }

    }, []);


    // =========================
    // LOGIN
    // =========================

    const login = async (newToken) => {

        localStorage.setItem("token", newToken);

        setToken(newToken);

        try {

            const response = await api.get("/auth/me");

            setUser(response.data.user);

        } catch (error) {

            console.error(
                "Failed to fetch logged-in user:",
                error.response?.data || error.message
            );

            setUser(null);

        }

    };


    // =========================
    // LOGOUT
    // =========================

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

    };


    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};