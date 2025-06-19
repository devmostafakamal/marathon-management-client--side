// src/hooks/axiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://marathon-management-server-eta.vercel.app", // your backend API base URL
});

// Add a request interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosSecure;
