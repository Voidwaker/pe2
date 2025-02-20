import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const API_BASE = "https://v2.api.noroff.dev";

/**
 * Profile Component
 * 
 * Displays the authenticated user's profile, avatar, bio, and a list of bookings.
 * Users can edit their profile, create venues, and view past bookings.
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

  if (!authData) return <div>Loading...</div>;
  if (loadingBookings) return <div>Loading your bookings...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <Helmet>
        <title>Profile | Holihub</title>
        <meta 
          name="description" 
          content="Manage your profile, view your bookings, and create new venues." 
        />
      </Helmet>

      <div>
        <img
          src={authData.profile?.avatar?.url || "https://via.placeholder.com/150"}
          alt={authData.profile?.avatar?.alt || "Profile Avatar"}
          className="profile-image"
        />
      </div>

      <div className="profile-info">
        <div className="profile-details">
          <h2>{authData.profile?.name}</h2>
          <p>{authData.profile?.email}</p>
          {authData.profile?.bio && <p className="profile-bio">{authData.profile.bio}</p>}
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
          <button onClick={() => navigate("/create-venue")}>Create Venue</button>
        </div>
      </div>

      <div className="user-bookings-container">
        <div className="user-bookings">
          <h2 className="user-bookings-your-bookings-title">Your Bookings:</h2>
          {bookedVenues.length === 0 ? (
            <p>You have no bookings yet.</p>
          ) : (
            <div className="venue-cards">
              {bookedVenues.map((booking) => {
                const venue = booking.venue || booking.venueData || booking;
                return (
                  <div key={booking.id} className="venue-card">
                    <img
                      src={venue.media?.[0]?.url || "https://via.placeholder.com/150"}
                      alt={venue.media?.[0]?.alt || "Venue Image"}
                      className="venue-image"
                    />
                    <div className="venue-info">
                      <h3>{venue.name || "No Venue Name"}</h3>
                      <p>
                        <strong>Location:</strong> {venue.location?.city || "N/A"}, {venue.location?.country || "N/A"}
                      </p>
                      <p>
                        <strong>Check-in:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Check-out:</strong> {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Guests:</strong> {booking.guests}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
