import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import apiClient, { login as apiLogin, signup as apiSignup } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const TOKEN_KEY = 'auth_token';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const setTokenAndStorage = useCallback((newToken) => {
    if (newToken) {
      sessionStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
      setToken(null);
    }
  }, []);

  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setIsAuthenticated(true);
          setUser(decodedToken);
        } else {
          setTokenAndStorage(null);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setTokenAndStorage(null);
      }
    }
  }, [setTokenAndStorage]);

  const login = useCallback(async (email, password) => {
    try {
      const { token } = await apiLogin(email, password);
      setTokenAndStorage(token);
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);
      setUser(decodedToken);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [setTokenAndStorage]);

  const signup = useCallback(async (email, password) => {
    try {
      const { token } = await apiSignup(email, password);
      setTokenAndStorage(token);
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);
      setUser(decodedToken);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }, [setTokenAndStorage]);

  const logout = useCallback(() => {
    setTokenAndStorage(null);
    setIsAuthenticated(false);
    setUser(null);
  }, [setTokenAndStorage]);

  const authApiClient = useCallback(() => {
    return apiClient(token);
  }, [token]);

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    authApiClient
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
