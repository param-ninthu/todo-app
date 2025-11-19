import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.error || error.message || "Something went wrong";

    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: message,
    });

    return Promise.reject({
      message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default axiosInstance;
