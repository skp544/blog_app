import axios from "axios";
import { handleApiError } from "../lib/helper.js";

const API_BASE_URL = "http://localhost:3000";

const createAxiosInstance = (basePath) => {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}${basePath}`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor (Handles authentication)
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(handleApiError(error)),
  );

  return instance;
};

// Create instances for different API groups
export const userApi = createAxiosInstance("/api/user");
export const authApi = createAxiosInstance("/api/auth");
export const postApi = createAxiosInstance("/api/post");
export const commentApi = createAxiosInstance("/api/comment");
