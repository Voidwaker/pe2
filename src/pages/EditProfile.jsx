import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/editProfile.css";

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

  /**
   * Loads user profile data from localStorage on component mount.
   */
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

  /**
   * Handles input changes and updates the form data state.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission, updating user bio and avatar URL via API.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
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
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} readOnly />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} readOnly />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Avatar URL</label>
          <input type="url" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} />
        </div>

        {formData.avatarUrl && (
          <img src={formData.avatarUrl} alt="Profile Avatar" className="avatar-preview" />
        )}

        <div className="button-group">
          <button type="submit">Save Changes</button>
          <button type="button" className="cancel-button" onClick={() => navigate("/profile")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

