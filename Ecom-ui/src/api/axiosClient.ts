import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://localhost:7148/api",
  baseURL: "http://backend:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
