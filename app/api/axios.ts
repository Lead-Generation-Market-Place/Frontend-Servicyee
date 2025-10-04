import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://servicyee-backend.onrender.com/api/v1",
  timeout: 10000,
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        (config.headers as any).Authorization = `Bearer ${token}`;
      }

      if (config.data instanceof FormData) {
        (config.headers as any)["Content-Type"] = undefined;
      } else {
        (config.headers as any)["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message || error);
    return Promise.reject(error);
  }
);

export default apiClient;
