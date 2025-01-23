import React from "react";
import { useAuth } from "../hooks/useAuth"; 
import './../styles/profile.css';  

const Profile = () => {
  const { authData } = useAuth(); 

  if (!authData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="profile-container">
      {}
      <div>
        <img
          src={authData.profile?.avatar?.url || "default-avatar-url"} 
          alt={authData.profile?.avatar?.alt || "Profile Avatar"}
          className="profile-image"
        />
      </div>

      {}
      <div className="profile-info">
        <div className="profile-details">
          <h2>{authData.profile?.name}</h2>
          <p>{authData.profile?.email}</p>
        </div>

        {}
        <div className="profile-actions">
          <button>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

