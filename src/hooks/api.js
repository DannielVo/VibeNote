import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: apiUrl + "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
