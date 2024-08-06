import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const apiClient = (token = null) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (token) {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

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

export default apiClient;
