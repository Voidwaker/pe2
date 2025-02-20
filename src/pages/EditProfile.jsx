import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "https://v2.api.noroff.dev";

/**
 * EditProfile Component
 * 
 * Allows users to edit their profile information, including bio and avatar URL.
 * Fetches the user data from localStorage and updates it via the API.
 *
 * @component
 */
const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    avatarUrl: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("Profile"));
    if (storedProfile) {
      setFormData({
        name: storedProfile.name || "",
        email: storedProfile.email || "",
        bio: storedProfile.bio || "",
        avatarUrl: storedProfile.avatar?.url || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    const token = localStorage.getItem("Token");
    const apiKey = localStorage.getItem("ApiKey");

    if (!token || !apiKey) {
      setError("Authentication details missing.");
      return;
    }

    const updatedData = {
      bio: formData.bio,
      avatar: { url: formData.avatarUrl },
    };

    try {
      const response = await fetch(`${API_BASE}/holidaze/profiles/${formData.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || "Failed to update profile.");
      }

      localStorage.setItem("Profile", JSON.stringify(result.data));
      setSuccessMessage("Profile updated successfully!");

      setTimeout(() => navigate("/profile"), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container mt-5 flex-grow-1" style={{ maxWidth: "500px" }}>
        <Helmet>
          <title>Edit Profile | Holihub</title>
          <meta name="description" content="Edit your Holihub profile details including bio and avatar." />
        </Helmet>
  
        <h2 className="text-center mb-4">Edit Profile</h2>
  
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
  
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} readOnly />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} readOnly />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea 
              name="bio" 
              className="form-control" 
              rows="4" 
              value={formData.bio} 
              onChange={handleChange} 
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Avatar URL</label>
            <input 
              type="url" 
              name="avatarUrl" 
              className="form-control" 
              value={formData.avatarUrl} 
              onChange={handleChange} 
            />
          </div>
  
          {formData.avatarUrl && (
            <div className="text-center mb-3">
              <img 
                src={formData.avatarUrl} 
                alt="Profile Avatar" 
                className="img-thumbnail" 
                style={{ maxWidth: "100px", borderRadius: "50%" }} 
              />
            </div>
          )}
  
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-50">Save</button>
            <button type="button" className="btn btn-danger w-50" onClick={() => navigate("/profile")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};  

export default EditProfile;

