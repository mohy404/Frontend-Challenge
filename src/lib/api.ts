import axios, { AxiosError, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

interface ApiErrorResponse {
  message: string;
  [key: string]: unknown;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const session = await getSession();
    
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorMessage = error.response?.data 
      ? (error.response.data as ApiErrorResponse).message 
      : error.message;
      
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;