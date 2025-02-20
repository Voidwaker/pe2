import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVenue } from '../api/venues';
import { Helmet } from 'react-helmet-async';
import './../styles/createVenue.css';

/**
 * CreateVenue Component
 * 
 * Allows venue managers to create a new venue by providing details such as name,
 * description, price, max guests, location, facilities, and images.
 *
 * @component
 * @returns {JSX.Element} The CreateVenue form.
 */
const CreateVenue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    maxGuests: '',
    rating: '',
    mediaUrl: '',
    mediaAlt: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    continent: '',
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Handles input changes and updates state.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e 
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /**
   * Handles form submission and sends data to API.
   * @param {React.FormEvent<HTMLFormElement>} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const token = localStorage.getItem("Token");
    const apiKey = localStorage.getItem("ApiKey");
    const storedProfile = JSON.parse(localStorage.getItem("Profile"));

    if (!token || !apiKey || !storedProfile) {
      setError("Authentication details missing.");
      setLoading(false);
      return;
    }

    const venueData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: formData.rating ? Number(formData.rating) : 0,
      media: formData.mediaUrl
        ? [{ url: formData.mediaUrl, alt: formData.mediaAlt || "Venue Image" }]
        : [],
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: {
        address: formData.address || null,
        city: formData.city || null,
        zip: formData.zip || null,
        country: formData.country || null,
        continent: formData.continent || null,
        lat: 0,
        lng: 0,
      },
      owner: { name: storedProfile.name },
    };

    try {
      const response = await createVenue(venueData);
      setSuccessMessage("Venue created successfully!");

      if (!storedProfile._count) {
        storedProfile._count = { venues: 0 }; 
      }
      storedProfile._count.venues += 1; 
      localStorage.setItem("Profile", JSON.stringify(storedProfile));

      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(err.message || "Failed to create venue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-venue-container">
      <Helmet>
        <title>Create a Venue | Holihub</title>
      </Helmet>

      <h2>Create New Venue</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="create-venue-form">
        <div className="form-group">
          <label>Venue Name*</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description*</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input type="url" name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Image Alt Text</label>
          <input type="text" name="mediaAlt" value={formData.mediaAlt} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Price per Night (USD)*</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required min="1" />
        </div>

        <div className="form-group">
          <label>Maximum Guests*</label>
          <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} required min="1" />
        </div>

        <div className="form-group">
          <label>Rating (0-5)</label>
          <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" />
        </div>

        <div className="amenities-section">
          <label><input type="checkbox" name="wifi" checked={formData.wifi} onChange={handleChange} /> WiFi</label>
          <label><input type="checkbox" name="parking" checked={formData.parking} onChange={handleChange} /> Parking</label>
          <label><input type="checkbox" name="breakfast" checked={formData.breakfast} onChange={handleChange} /> Breakfast</label>
          <label><input type="checkbox" name="pets" checked={formData.pets} onChange={handleChange} /> Pets Allowed</label>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Zip Code</label>
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Continent</label>
          <input type="text" name="continent" value={formData.continent} onChange={handleChange} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Venue..." : "Create Venue"}
        </button>
      </form>
    </div>
  );
};

export default CreateVenue;
