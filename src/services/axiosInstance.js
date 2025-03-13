import axios from "axios";

// Base URL from environment variables
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Add a response interceptor to handle 403 errors
axiosInstance.interceptors.response.use(
  (response) => response, // Return successful responses
  (error) => {
    // 403 redirect to login
    if (error.response && error.response.status === 403) {
      window.location.href = "/";
    }

    // 500 redirect to server error
    // if (error.response && error.response.status === 500) {
    //   window.location.href = "/server-error";
    // }

    // Reject the promise with the error for other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
