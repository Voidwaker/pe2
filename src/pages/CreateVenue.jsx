import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVenue } from "../api/venues";
import { Helmet } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";

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
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    rating: "",
    mediaUrl: "",
    mediaAlt: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
      await createVenue(venueData);
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
    <div className="container mt-5">
      <Helmet>
        <title>Create a Venue | Holihub</title>
      </Helmet>
      <h2 className="text-center mb-4">Create New Venue</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="mx-auto p-4 border rounded shadow-sm bg-light" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label className="form-label">Venue Name*</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description*</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="url" name="mediaUrl" className="form-control" value={formData.mediaUrl} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Image Alt Text</label>
          <input type="text" name="mediaAlt" className="form-control" value={formData.mediaAlt} onChange={handleChange} />
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Price per Night (USD)*</label>
            <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required min="1" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Maximum Guests*</label>
            <input type="number" name="maxGuests" className="form-control" value={formData.maxGuests} onChange={handleChange} required min="1" />
          </div>
        </div>
        <div className="mt-3">
          <label className="form-label">Rating (0-5)</label>
          <input type="number" name="rating" className="form-control" value={formData.rating} onChange={handleChange} min="0" max="5" />
        </div>
        <div className="mt-4 text-center">
          <h5>Features</h5>
          <div className="d-flex flex-column align-items-center gap-2">
    <div className="form-check d-flex align-items-center gap-2">
      <input type="checkbox" name="wifi" className="form-check-input bigger-checkbox" checked={formData.wifi} onChange={handleChange} />
      <label className="form-check-label fw-bold">WiFi</label>
    </div>
    <div className="form-check d-flex align-items-center gap-2">
      <input type="checkbox" name="parking" className="form-check-input bigger-checkbox" checked={formData.parking} onChange={handleChange} />
      <label className="form-check-label fw-bold">Parking</label>
    </div>
    <div className="form-check d-flex align-items-center gap-2">
      <input type="checkbox" name="breakfast" className="form-check-input bigger-checkbox" checked={formData.breakfast} onChange={handleChange} />
      <label className="form-check-label fw-bold">Breakfast</label>
    </div>
    <div className="form-check d-flex align-items-center gap-2">
      <input type="checkbox" name="pets" className="form-check-input bigger-checkbox" checked={formData.pets} onChange={handleChange} />
      <label className="form-check-label fw-bold">Pets Allowed</label>
    </div>
  </div>
</div>
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-primary w-45" disabled={loading}>
            {loading ? "Creating..." : "Create Venue"}
          </button>
          <button type="button" className="btn btn-danger w-45" onClick={() => navigate("/profile")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVenue;
