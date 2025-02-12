import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getUserVenues, deleteVenue } from "../api/venues";
import { useNavigate } from "react-router-dom";
import "../styles/myVenues.css"; 

const MyVenues = () => {
  const { authData } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      if (!authData || !authData.profile) return;
      try {
        const userVenues = await getUserVenues(authData.profile.name);
        setVenues(userVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError("Failed to load venues.");
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, [authData]);

  const handleDelete = async (venueId) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      await deleteVenue(venueId);
      setVenues(venues.filter(venue => venue.id !== venueId));
    } catch (error) {
      console.error("Failed to delete venue:", error);
      alert("Error deleting venue. Please try again.");
    }
  };

  if (!authData) return <p>Loading...</p>;
  if (loading) return <p>Loading your venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-venues-container">
      <h2>My Venues</h2>
      {venues.length === 0 ? (
        <p>You have not created any venues yet.</p>
      ) : (
        <div className="venue-list">
          {venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <img src={venue.media[0]?.url || "https://via.placeholder.com/150"} alt={venue.name} />
              <h3>{venue.name}</h3>
              <p>{venue.description}</p>
              <p>Price: ${venue.price}</p>
              <p>Guests: {venue.maxGuests}</p>
              <div className="venue-actions">
                <button onClick={() => navigate(`/edit-venue/${venue.id}`)}>Edit</button>
                <button onClick={() => handleDelete(venue.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVenues;
