import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://backengine-nqhbcnzf.fly.dev/api';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const apiClient = (token = null) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Send credentials with every request
  });

  if (token) {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access. Redirecting to login...');
        // The actual redirect will be handled in the AuthContext
      }
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
        console.error('Request that caused the error:', error.config);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      console.error('Error stack:', error.stack);
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
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid email or password');
    } else if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred during login');
    }
  }
};

export const signup = async (email, password) => {
  try {
    const response = await apiClient().post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unexpected error occurred during signup');
    }
  }
};

export const getObjectCounts = async () => {
  try {
    const response = await apiClient().get('/api/counts');
    return response.data;
  } catch (error) {
    console.error('Error fetching object counts:', error);
    throw error;
  }
};

export const getDailyStats = async () => {
  try {
    const response = await apiClient().get('/api/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    throw error;
  }
};

export const getDetailedStats = async () => {
  try {
    const response = await apiClient().get('/api/stats/detailed');
    return response.data;
  } catch (error) {
    console.error('Error fetching detailed stats:', error);
    throw error;
  }
};

export const getRecentAlerts = async () => {
  try {
    const response = await apiClient().get('/api/alerts');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent alerts:', error);
    throw error;
  }
};

export default apiClient;
