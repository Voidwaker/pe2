import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getUserVenues, deleteVenue } from "../api/venues";
import "../styles/myVenues.css";

const MyVenues = () => {
  const { authData } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authData || !authData.profile || !authData.profile.name) {
      setError("You must be logged in to view your venues.");
      setLoading(false);
      return;
    }

    const fetchVenues = async () => {
      try {
        const data = await getUserVenues(authData.profile.name);
        setVenues(data);
      } catch (err) {
        setError("Failed to fetch venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [authData]);

  const handleDelete = async (venueId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
    if (!confirmDelete) return;

    try {
      await deleteVenue(venueId);
      setVenues(venues.filter((venue) => venue.id !== venueId));
    } catch (err) {
      setError("Failed to delete venue.");
    }
  };

  if (loading) return <p>Loading your venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-venues-container">
      <h1>My Venues</h1>
      {venues.length === 0 ? (
        <p>You have not created any venues yet.</p>
      ) : (
        <div className="venues-list">
          {venues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <img src={venue.media[0]?.url || "https://via.placeholder.com/150"} alt={venue.name} />
              <div className="venue-info">
                <h3>{venue.name}</h3>
                <p>{venue.description}</p>
                <p><strong>Price:</strong> ${venue.price}</p>
                <p><strong>Location:</strong> {venue.location.city}, {venue.location.country}</p>
                <Link to={`/venue/${venue.id}`} className="view-more-btn">View Details</Link>
                <Link to={`/edit-venue/${venue.id}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(venue.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVenues;
