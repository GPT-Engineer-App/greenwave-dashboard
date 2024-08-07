import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        console.error('Unauthorized access. Redirecting to login...');
      }
      return Promise.reject(error);
    }
  );

  return instance;
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

export default apiClient;

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

export const getSettings = async () => {
  try {
    const response = await apiClient().get('/api/settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const updateSettings = async (settings) => {
  try {
    const response = await apiClient().put('/api/settings', settings);
    return response.data;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

export default apiClient;
