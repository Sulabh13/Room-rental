import axios from "axios";

/* BASE URL */

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://room-rental-backend-0a5u.onrender.com/api";

/* AXIOS INSTANCE */

const API = axios.create({
  baseURL,
});

/* REQUEST INTERCEPTOR */

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },

  (error) => {
    return Promise.reject(error);
  },
);

/* RESPONSE INTERCEPTOR */

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    /* TOKEN EXPIRED */

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        /* NO REFRESH TOKEN */

        if (!refreshToken) {
          localStorage.clear();

          window.location.href = "/login";

          return Promise.reject(error);
        }

        /* GET NEW ACCESS TOKEN */

        const res = await axios.post(
          `${baseURL}/auth/refresh-token`,

          {
            refreshToken,
          },
        );

        const newAccessToken = res.data.accessToken;

        /* SAVE NEW TOKEN */

        localStorage.setItem("token", newAccessToken);

        /* UPDATE HEADER */

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        /* RETRY REQUEST */

        return API(originalRequest);
      } catch (refreshError) {
        console.log("Refresh Token Failed", refreshError);

        /* LOGOUT */

        localStorage.clear();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
