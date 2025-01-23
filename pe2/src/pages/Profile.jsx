import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  
  // Get user profile data from localStorage
  const profile = JSON.parse(localStorage.getItem('Profile'));
  const profileImage = profile?.avatar?.url || 'default-avatar-url.jpg'; // Set a default if not found
  const userName = profile?.name || 'User Name';  // Use a default name if not found
  
  // Add a fallback if the profile isn't available
  if (!profile) {
    navigate('/login'); // Redirect to login if no profile found
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <h2>{userName}</h2>
      </div>
      <div className="profile-details">
        <p><strong>Email:</strong> {profile?.email}</p>
        {/* You can add more profile details here */}
      </div>
      <div className="profile-actions">
        {/* Add buttons or links for editing profile or other actions */}
      </div>
    </div>
  );
};

export default Profile;
