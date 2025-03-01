import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://wrytit.vercel.app/api", // Set this in .env.local
  withCredentials: true,
});
export default axiosInstance;
