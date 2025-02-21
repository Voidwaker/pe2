import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getVenueById, updateVenue } from "../api/venues";
import "bootstrap/dist/css/bootstrap.min.css";

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

  if (loading) return <div className="text-center mt-5">Loading venue details...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <Helmet>
        <title>Edit Venue | Holihub</title>
        <meta name="description" content={`Edit details for ${name} on Holihub.`} />
      </Helmet>

      <h2 className="text-center mb-4">Edit Venue</h2>
      
      <form onSubmit={handleUpdate} className="p-4 border rounded shadow bg-white">
        <div className="mb-3">
          <label className="form-label">Venue Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Price ($):</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Max Guests:</label>
          <input
            type="number"
            className="form-control"
            value={maxGuests}
            onChange={(e) => setMaxGuests(Number(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL:</label>
          <input
            type="url"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVenue;
