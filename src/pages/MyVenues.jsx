import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getUserVenues, deleteVenue } from "../api/venues";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/myVenues.css";

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

  useEffect(() => {
    if (!authData?.profile?.name) return;

    getUserVenues(authData.profile.name)
      .then((data) => setVenues(data))
      .catch(() => setError("Failed to fetch venues"))
      .finally(() => setLoading(false));
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

  if (loading) return <div className="text-center mt-5">Loading your venues...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "1300px", paddingBottom: "80px" }}>
      <Helmet>
        <title>My Venues | Manage Your Listings</title>
        <meta 
          name="description" 
          content="View and manage the venues you have created on Holihub. Edit, delete, or check bookings for your venues."
        />
      </Helmet>

      <h1 className="text-center mb-5">My Venues</h1>

      {venues.length === 0 ? (
        <p className="text-center">You haven't created any venues yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center gap-4">
          {venues.map((venue) => (
            <div key={venue.id} className="col d-flex justify-content-center" style={{ minWidth: "370px" }}>
              <div className="card shadow-sm" style={{ minWidth: "370px", maxWidth: "430px" }}>
                <img
                  className="card-img-top img-fluid"
                  src={venue.media[0]?.url || "https://via.placeholder.com/200"}
                  alt={venue.media[0]?.alt || "Venue Image"}
                  style={{ height: "230px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title">{venue.name}</h5>
                  <p className="card-text">{venue.description}</p>
                  <div className="mt-auto d-flex flex-column gap-2">
                    <button className="btn btn-primary w-100" onClick={() => navigate(`/edit-venue/${venue.id}`)}>
                      Edit
                    </button>
                    <button className="btn btn-danger w-100" onClick={() => handleDelete(venue.id)}>
                      Delete
                    </button>
                  </div>
                  {venue.bookings && venue.bookings.length > 0 && (
                    <div className="mt-3">
                      <button
                        className="btn btn-outline-secondary btn-sm w-100"
                        onClick={() => setExpandedVenue(expandedVenue === venue.id ? null : venue.id)}
                      >
                        {expandedVenue === venue.id ? "Hide Bookings" : "Show Bookings"}
                      </button>
                      {expandedVenue === venue.id && (
                        <ul className="list-group list-group-flush mt-2">
                          {venue.bookings.map((booking) => (
                            <li key={booking.id} className="list-group-item">
                              {booking.customer.name} - {new Date(booking.dateFrom).toLocaleDateString()} to {new Date(booking.dateTo).toLocaleDateString()}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyVenues;
