import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getVenueById, updateVenue } from "../api/venues";
import "../styles/createVenue.css";

/**
 * EditVenue Component
 * 
 * Allows a venue manager to edit a venue they manage.
 * Fetches the venue data, updates the fields, and submits changes via API.
 *
 * @component
 */
const EditVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches venue details from API when component mounts.
   */
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venueData = await getVenueById(id);
        if (!venueData) {
          throw new Error("Venue not found");
        }
        setVenue(venueData);
        setName(venueData.name);
        setDescription(venueData.description);
        setPrice(venueData.price);
        setMaxGuests(venueData.maxGuests);
        setImageUrl(venueData.media[0]?.url || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  /**
   * Handles venue update submission.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await updateVenue(id, {
        name,
        description,
        price: Number(price),
        maxGuests: Number(maxGuests),
        media: [{ url: imageUrl }],
        location: venue.location,
      });

      alert("Venue updated successfully!");
      navigate("/my-venues");
    } catch (err) {
      setError("Failed to update venue.");
    }
  };

  if (loading) return <div>Loading venue details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="create-venue-container">
      <Helmet>
        <title>Edit Venue | Holihub</title>
        <meta name="description" content={`Edit details for ${name} on Holihub.`} />
      </Helmet>

      <h2>Edit Venue</h2>
      <form onSubmit={handleUpdate} className="create-venue-form">
        <label>Venue Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Max Guests:</label>
        <input
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(Number(e.target.value))}
          required
        />

        <label>Image URL:</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVenue;
