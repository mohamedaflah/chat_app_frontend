import axios from "axios";
export const baseURL = "https://chat-app-9efa.onrender.com";
const axiosInstance = axios.create({
  baseURL: baseURL,
});
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
