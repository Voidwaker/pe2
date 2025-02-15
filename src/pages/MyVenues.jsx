import React, { useEffect, useState } from "react";
import { getUserVenues, deleteVenue } from "../api/venues"; 
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./../styles/MyVenues.css";

function MyVenues() {
  const { authData } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData?.profile?.name) {
      console.log("Username:", authData.profile.name);
      getUserVenues(authData.profile.name)
        .then((data) => setVenues(data))
        .catch((err) => setError("Failed to fetch venues"))
        .finally(() => setLoading(false));
    } else {
      console.error("No username found in authData:", authData);
    }
  }, [authData]);
  

  const handleDelete = async (venueId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
    if (!confirmDelete) return;

    try {
      await deleteVenue(venueId);
      setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== venueId));
      alert("Venue deleted successfully!");
    } catch (err) {
      alert("Failed to delete venue.");
    }
  };

  if (loading) return <div>Loading your venues...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Venues</h1>
      {venues.length === 0 ? (
        <p>You haven't created any venues yet.</p>
      ) : (
        <div className="venue-cards">
          {venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <img
                className="venue-image"
                src={venue.media[0]?.url || "https://via.placeholder.com/200"}
                alt={venue.media[0]?.alt || "Venue Image"}
              />
              <div className="venue-info">
                <h3>{venue.name}</h3>
                <p>{venue.description}</p>
                <button className="edit-btn" onClick={() => navigate(`/edit-venue/${venue.id}`)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(venue.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyVenues;
