import { useState, useEffect } from 'react';

export function useAuth() {
  const [authData, setAuthData] = useState(null);

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

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Profile');
    setAuthData(null);
  };

  return { authData, logout };
}
