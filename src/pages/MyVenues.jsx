import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getUserVenues, deleteVenue } from "../api/venues";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./../styles/myVenues.css";

/**
 * MyVenues Component
 * 
 * Displays a list of venues created by the logged-in user.
 * Allows venue managers to view, edit, delete, and see bookings for their venues.
 * 
 * @component
 * @returns {JSX.Element} The MyVenues page layout.
 */
function MyVenues() {
  const { authData } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedVenue, setExpandedVenue] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches venues created by the logged-in user.
   */
  useEffect(() => {
    if (!authData?.profile?.name) return;

    getUserVenues(authData.profile.name)
      .then((data) => setVenues(data))
      .catch(() => setError("Failed to fetch venues"))
      .finally(() => setLoading(false));
  }, [authData]);

  /**
   * Handles venue deletion with user confirmation.
   * @param {string} venueId - The ID of the venue to be deleted.
   */
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
      <Helmet>
        <title>My Venues | Manage Your Listings</title>
        <meta 
          name="description" 
          content="View and manage the venues you have created on Holihub. Edit, delete, or check bookings for your venues."
        />
      </Helmet>

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

                {venue.bookings && venue.bookings.length > 0 && (
                  <div className="bookings-dropdown">
                    <button
                      className="toggle-bookings-btn"
                      onClick={() => setExpandedVenue(expandedVenue === venue.id ? null : venue.id)}
                    >
                      {expandedVenue === venue.id ? "Hide Bookings" : "Show Bookings"}
                    </button>
                    {expandedVenue === venue.id && (
                      <ul className="bookings-list">
                        {venue.bookings.map((booking) => (
                          <li key={booking.id}>
                            {booking.customer.name} - {new Date(booking.dateFrom).toLocaleDateString()} to {" "}
                            {new Date(booking.dateTo).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyVenues;
