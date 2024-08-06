import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
        setUser(decodedToken);
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://backengine-nqhbcnzf.fly.dev/api/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
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
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
