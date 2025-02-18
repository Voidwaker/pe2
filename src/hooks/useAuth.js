import { useState, useEffect } from 'react';

/**
 * Custom hook for managing authentication state.
 * Retrieves authentication data from localStorage and provides a logout function.
 * 
 * @returns {object} An object containing `authData` and `logout` function.
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
   * Logs out the user by removing authentication data from localStorage.
   */
  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Profile');
    setAuthData(null);
  };

  return { authData, logout };
}
