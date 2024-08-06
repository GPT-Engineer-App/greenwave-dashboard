import axios from 'axios';

const API_BASE_URL = 'https://backengine-nqhbcnzf.fly.dev/api';

const apiClient = (token = null) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
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
  try {
    const response = await apiClient().post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (email, password) => {
  try {
    const response = await apiClient().post('/auth/signup', { email, password });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export default apiClient;
