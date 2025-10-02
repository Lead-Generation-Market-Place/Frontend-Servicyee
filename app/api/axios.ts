


import axios from "axios";

 const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1",
  withCredentials: false,
  timeout: 10000,
});

export default apiClient;