import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Set this in .env.local
  withCredentials: true,
});

export default axiosInstance;
