


import axios from "axios";

 const apiClient = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://servicyee-backend.onrender.com/api/v1",

  withCredentials: false,
  timeout: 10000,
});
export default apiClient;