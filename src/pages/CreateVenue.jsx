import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVenue } from '../api/venues';
import './../styles/createVenue.css'; 

const CreateVenue = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !description || !price || !maxGuests || !location || !imageUrl) {
      setError("All fields are required");
      return;
    }

    const venueData = {
      name,
      description,
      price,
      maxGuests,
      location,
      imageUrl,
    };

    try {
      await createVenue(venueData);

      navigate('/profile'); 

    } catch (err) {
      setError('Failed to create venue. Please try again.');
    }
  };

  return (
    <div className="create-venue-container">
      <h2>Create New Venue</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="create-venue-form">
        <div className="form-group">
          <label htmlFor="name">Venue Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxGuests">Max Guests</label>
          <input
            type="number"
            id="maxGuests"
            className="form-control"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Venue</button>
      </form>
    </div>
  );
};

export default CreateVenue;
