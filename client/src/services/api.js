import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


/*
 * REQUEST INTERCEPTOR
 *
 * Before every API request:
 * 1. Get JWT from localStorage
 * 2. Attach it to Authorization header
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


/*
 * RESPONSE INTERCEPTOR
 *
 * If backend responds with 401:
 * 1. Remove invalid token
 * 2. Redirect user to login
 */
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            // Don't redirect if already on login/register
            const currentPath = window.location.pathname;

            if (
                currentPath !== "/login" &&
                currentPath !== "/register"
            ) {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default api;