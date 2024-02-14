import axios from "axios";
export const baseURL = "http://localhost:4042";
const axiosInstance = axios.create({
  baseURL: baseURL,
});
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
