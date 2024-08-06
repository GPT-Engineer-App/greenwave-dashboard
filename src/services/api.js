import axios from 'axios';

const API_URL = 'https://backengine-nqhbcnzf.fly.dev/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => api.post('/login', { email, password });

// Add more API calls here as needed

export default api;
