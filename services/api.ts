import axios from "axios";
import { API_URL } from "../constants/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ⬅️ GẮN TOKEN TỰ ĐỘNG
api.interceptors.request.use(async (config) => {
  const token = globalThis.authToken; // lấy từ context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
