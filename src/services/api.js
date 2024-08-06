import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_BASE_URL;

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

const apiCall = async (method, endpoint, data = null, params = null) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export const login = (email, password) => apiCall('post', '/login', { email, password });

// Example of how to use the apiCall function for other endpoints
// export const getUserData = () => apiCall('get', '/user');
// export const updateUserProfile = (data) => apiCall('put', '/user/profile', data);

export default apiCall;
