import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Interceptor لمعالجة الأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
