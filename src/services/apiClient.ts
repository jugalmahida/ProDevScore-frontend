// lib/api-client.ts
import AppConstants from "@/constants/appconstants";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: AppConstants.apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - logs requests for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
