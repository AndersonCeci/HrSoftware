import axios from "axios";
import { getFromLocalStorage } from "../utils/utils";

const API_URL = import.meta.env.MAIN_API;

const Axios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage().token;
    if (token) {
      console.log(token);
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    console.error("API Error:", errorMessage);
    return Promise.reject(errorMessage);
  }
);

export default Axios;
