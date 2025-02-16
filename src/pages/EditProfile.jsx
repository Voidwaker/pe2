import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/constants";
import { useAuth } from "../hooks/useAuth";
import "./../styles/editProfile.css";

/**
 * EditProfile Component - Allows users to update their profile information.
 *
 * @component
 * @returns {JSX.Element} The EditProfile component
 */
const EditProfile = () => {
  const { authData, setAuthData } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (authData?.profile) {
      setFormData({
        name: authData.profile.name || "",
        email: authData.profile.email || "",
        avatarUrl: authData.profile.avatar?.url || "",
        avatarAlt: authData.profile.avatar?.alt || "",
        bannerUrl: authData.profile.banner?.url || "",
        bannerAlt: authData.profile.banner?.alt || "",
      });
    }
  }, [authData]);

  /**
   * Handles input changes in the form.
   *
   * @param {Event} event - The input change event.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Submits the updated profile data to the API.
   *
   * @async
   * @function handleSubmit
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE}/holidaze/profiles/${authData.profile.name}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("Token")}`,
          "X-Noroff-API-Key": localStorage.getItem("ApiKey"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          avatar: { url: formData.avatarUrl, alt: formData.avatarAlt },
          banner: { url: formData.bannerUrl, alt: formData.bannerAlt },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setAuthData((prev) => ({
        ...prev,
        profile: updatedProfile.data,
      }));

      localStorage.setItem("Profile", JSON.stringify(updatedProfile.data));
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Could not update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Avatar URL</label>
        <input type="url" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} />

        <label>Avatar Alt Text</label>
        <input type="text" name="avatarAlt" value={formData.avatarAlt} onChange={handleChange} />

        <label>Banner URL</label>
        <input type="url" name="bannerUrl" value={formData.bannerUrl} onChange={handleChange} />

        <label>Banner Alt Text</label>
        <input type="text" name="bannerAlt" value={formData.bannerAlt} onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <button onClick={() => navigate("/profile")} className="cancel-button">
        Cancel
      </button>
    </div>
  );
};

export default EditProfile;
