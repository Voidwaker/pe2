import { useState, useEffect } from 'react';

/**
 * Custom hook for managing authentication state.
 * Retrieves authentication data from localStorage and provides login/logout functions.
 * 
 * @returns {object} An object containing `authData`, `login`, and `logout` functions.
 */
export function useAuth() {
  const [authData, setAuthData] = useState(null);

  /**
   * Loads authentication data from localStorage when the component mounts.
   */
  useEffect(() => {
    const token = localStorage.getItem('Token');
    const profile = localStorage.getItem('Profile');
    if (token && profile) {
      setAuthData({
        token,
        profile: JSON.parse(profile),
      });
    }
  }, []);

  /**
   * Handles user login by updating state and storing data in localStorage.
   */
  const login = (userData) => {
    localStorage.setItem('Token', userData.token);
    localStorage.setItem('Profile', JSON.stringify(userData.profile));
    setAuthData(userData);
  };

  /**
   * Logs out the user by removing authentication data from localStorage.
   */
  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Profile');
    setAuthData(null);
  };

  return { authData, login, logout };
}