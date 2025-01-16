import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem('Profile');
    if (profile) {
      setProfileData(JSON.parse(profile));
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <div>
      <h1>Profile</h1>
      {profileData ? (
        <>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Bio: {profileData.bio}</p>
          {}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
