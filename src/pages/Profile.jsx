import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "../styles/profile.css";

const API_BASE = "https://v2.api.noroff.dev";

/**
 * Profile Component
 *
 * Displays the authenticated user's profile with avatar, bio, and a list of bookings.
 * Users can edit their profile and create venues.
 *
 * @component
 * @returns {JSX.Element} The Profile page layout.
 */
const Profile = () => {
  const [authData, setAuthData] = useState(null);
  const [bookedVenues, setBookedVenues] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Loads user authentication data from localStorage.
   */
  useEffect(() => {
    const storedProfile = localStorage.getItem("Profile");
    const storedToken = localStorage.getItem("Token");

    if (storedProfile && storedToken) {
      setAuthData({
        profile: JSON.parse(storedProfile),
        token: storedToken,
      });
    }
  }, []);

  /**
   * Fetches the user's booked venues from the API.
   */
  useEffect(() => {
    if (authData && authData.profile?.name) {
      const fetchUserBookings = async () => {
        try {
          const token = localStorage.getItem("Token");
          const apiKey = localStorage.getItem("ApiKey");

          if (!token || !apiKey) return;

          const response = await fetch(
            `${API_BASE}/holidaze/profiles/${authData.profile.name}/bookings?_venue=true`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": apiKey,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setBookedVenues(data.data || []);
        } catch (err) {
          setError("Failed to load bookings.");
        } finally {
          setLoadingBookings(false);
        }
      };

      fetchUserBookings();
    }
  }, [authData]);

  if (!authData) return <div className="text-center mt-5">Loading...</div>;
  if (loadingBookings) return <div className="text-center mt-5">Loading your bookings...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Profile | Holihub</title>
        <meta 
          name="description" 
          content="Manage your profile, view your bookings, and create new venues." 
        />
      </Helmet>

      <div className="text-center">
        <img
          src={authData.profile?.avatar?.url || "https://via.placeholder.com/150"}
          alt={authData.profile?.avatar?.alt || "Profile Avatar"}
          className="profile-image rounded-circle shadow-lg"
        />
        <h2 className="mt-3">{authData.profile?.name}</h2>
        <p className="text-muted">{authData.profile?.email}</p>
        {authData.profile?.bio && <p className="profile-bio">{authData.profile.bio}</p>}
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-primary" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        <button className="btn btn-outline-primary" onClick={() => navigate("/create-venue")}>Create Venue</button>
      </div>

      <div className="mt-5">
        <h2 className="text-center">Your Bookings</h2>
        {bookedVenues.length === 0 ? (
          <p className="text-center">You have no bookings yet.</p>
        ) : (
          <div className="row mt-4">
            {bookedVenues.map((booking) => {
              const venue = booking.venue || booking.venueData || booking;
              return (
                <div key={booking.id} className="col-md-4">
                  <div className="card shadow-sm mb-4">
                    <img
                      src={venue.media?.[0]?.url || "https://via.placeholder.com/150"}
                      alt={venue.media?.[0]?.alt || "Venue Image"}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{venue.name || "No Venue Name"}</h5>
                      <p className="card-text">
                        <strong>Location:</strong> {venue.location?.city || "N/A"}, {venue.location?.country || "N/A"}
                      </p>
                      <p className="card-text">
                        <strong>Check-in:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Check-out:</strong> {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Guests:</strong> {booking.guests}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

