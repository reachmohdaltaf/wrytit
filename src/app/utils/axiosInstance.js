import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Set this in .env.local
  withCredentials: true,
});
export default axiosInstance;
