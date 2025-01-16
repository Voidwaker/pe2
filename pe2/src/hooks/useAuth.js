import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('Token');
    const storedProfile = localStorage.getItem('Profile');
    if (storedToken && storedProfile) {
      setAuthData({ token: storedToken, profile: JSON.parse(storedProfile) });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Profile');
    setAuthData(null);
  };

  return { authData, logout };
};
