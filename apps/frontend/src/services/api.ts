import axios, { AxiosError  } from 'axios';
import type{InternalAxiosRequestConfig,AxiosResponse} from 'axios'


const apiUrl = (import.meta.env.VITE_BACKEND_URL||'http://localhost:5000')+'/api';
const api = axios.create({
  baseURL:  apiUrl, //
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials:true
});

// Request interceptor with correct typing
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('Starting Request:', config.url);
    return config;
  }
);

// Response interceptor with correct typing
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response:', response);
    return response;
  },
  (error: AxiosError) => {
    console.log('Response Error:', {
      url: error.config?.url,
      message: error.message,
      response: error.response?.data
    });
    return Promise.reject(error);
  }
);


export default api;