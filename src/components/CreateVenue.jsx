import React, { useState } from 'react';
import { createVenue } from '../api/venues';

/**
 * Component for creating a new venue.
 *
 * @component
 * @returns {JSX.Element} The CreateVenue form.
 */
const CreateVenue = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [error, setError] = useState(null);

  /**
   * Handles form submission to create a new venue.
   *
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createVenue({ name, description, price, maxGuests });
      alert('Venue created successfully');
    } catch (err) {
      setError('Failed to create venue');
    }
  };

  return (
    <div className="create-venue-container">
      <h2>Create Venue</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Max Guests</label>
          <input
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Venue</button>
      </form>
    </div>
  );
};

export default CreateVenue;
