import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apipath = "http://13.234.66.55:8080/api/v1";
  const filepath = "http://13.234.66.55:8080/images/";

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('schoolToken');
    localStorage.removeItem('schoolName');
    localStorage.removeItem('schoolId');
    localStorage.removeItem('schoolEmail');
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminId');
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        logout();
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000); // Check every 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, apipath, login, logout, adminLogout, filepath }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
