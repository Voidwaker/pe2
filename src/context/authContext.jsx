import React, { createContext, useContext, useState, useEffect } from 'react';
import { logout as apiLogout } from '../api/auth'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('Token');
    const storedProfile = localStorage.getItem('Profile');
    if (storedToken && storedProfile) {
      setAuthData({ token: storedToken, profile: JSON.parse(storedProfile) });
    }
  }, []);

  const login = (userData) => {
    setAuthData(userData);
    localStorage.setItem('Token', userData.token);
    localStorage.setItem('Profile', JSON.stringify(userData.profile));
  };

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Profile');
    setAuthData(null);
    apiLogout();
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
