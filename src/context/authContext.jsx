import React, { createContext, useContext, useState, useEffect } from 'react';
import { logout as apiLogout } from '../api/auth'; 

const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * 
 * Provides authentication context, including login and logout functionalities.
 * 
 * @component
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components wrapped by the provider.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  /**
   * Loads authentication data from localStorage on component mount.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem('Token');
    const storedProfile = localStorage.getItem('Profile');
    if (storedToken && storedProfile) {
      setAuthData({ token: storedToken, profile: JSON.parse(storedProfile) });
    }
  }, []);

  /**
   * Handles user login by saving token and profile data in localStorage.
   * 
   * @param {object} userData - The user authentication data.
   * @param {string} userData.token - The authentication token.
   * @param {object} userData.profile - The user profile data.
   */
  const login = (userData) => {
    setAuthData(userData);
    localStorage.setItem('Token', userData.token);
    localStorage.setItem('Profile', JSON.stringify(userData.profile));
  };

  /**
   * Logs out the user by clearing authentication data from localStorage.
   */
  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Profile');
    setAuthData(null);
    apiLogout();
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context.
 * 
 * @throws {Error} Throws an error if used outside an AuthProvider.
 * @returns {object} The authentication context, including `authData`, `login`, and `logout` functions.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used within an AuthProvider.");
  }
  return context;
}
