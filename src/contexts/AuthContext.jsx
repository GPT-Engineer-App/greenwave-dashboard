import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const TOKEN_KEY = 'auth_token';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const setToken = useCallback((token) => {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  const getToken = useCallback(() => {
    return sessionStorage.getItem(TOKEN_KEY);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
        setUser(decodedToken);
      } else {
        setToken(null);
      }
    }
  }, [getToken, setToken]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://backengine-nqhbcnzf.fly.dev/api/login', { email, password });
      const { token } = response.data;
      setToken(token);
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);
      setUser(decodedToken);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
