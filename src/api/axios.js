import axios from "axios";

const baseURL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5000/api"
        : "https://room-rental-backend-0a5u.onrender.com/api";

const API = axios.create({
    baseURL,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;