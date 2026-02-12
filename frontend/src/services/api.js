import axios from "axios";

const API = axios.create({
  baseURL: "https://rental-platform-ot5c.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers = req.headers || {};
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;