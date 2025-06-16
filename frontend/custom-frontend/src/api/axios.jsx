import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000"; // local flask q toh

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if it exists
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); 
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
