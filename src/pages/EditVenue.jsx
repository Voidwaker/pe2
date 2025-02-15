import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserVenues, updateVenue } from "../api/venues"; // Opprett updateVenue i API-filen
import "../styles/createVenue.css"; 

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

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venues = await getUserVenues(); // Henter brukerens venues
        const venueToEdit = venues.find((v) => v.id === id);
        if (!venueToEdit) {
          throw new Error("Venue not found");
        }
        setVenue(venueToEdit);
        setName(venueToEdit.name);
        setDescription(venueToEdit.description);
        setPrice(venueToEdit.price);
        setMaxGuests(venueToEdit.maxGuests);
        setImageUrl(venueToEdit.media[0]?.url || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await updateVenue(id, {
        name,
        description,
        price,
        maxGuests,
        media: [{ url: imageUrl }],
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
      <h2>Edit Venue</h2>
      <form onSubmit={handleUpdate} className="create-venue-form">
        <label>Venue Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Max Guests:</label>
        <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} required />

        <label>Image URL:</label>
        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVenue;
