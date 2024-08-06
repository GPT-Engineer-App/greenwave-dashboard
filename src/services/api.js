import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const apiClient = (token = null) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Private-Network': 'true',
    },
    withCredentials: true,
  });

  if (token) {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        // Handle CORB issues
        console.error('CORB error:', error);
        // You might want to implement a retry mechanism or error handling here
      }
      return Promise.reject(error);
    }
  );

  return {
    get: (url, config = {}) => instance.get(url, config),
    post: (url, data, config = {}) => instance.post(url, data, config),
    put: (url, data, config = {}) => instance.put(url, data, config),
    delete: (url, config = {}) => instance.delete(url, config),
  };
};

export const login = async (email, password) => {
  const response = await apiClient().post('/login', { email, password });
  return response.data;
};

export const signup = async (email, password) => {
  const response = await apiClient().post('/signup', { email, password });
  return response.data;
};

export default apiClient;
