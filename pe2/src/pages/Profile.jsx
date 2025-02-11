// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBookings } from "../api/bookings";  
import './../styles/profile.css';

const Profile = () => {
  const [authData, setAuthData] = useState(null); 
  const [bookedVenues, setBookedVenues] = useState([]); 
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  // Hent profil- og token-data fra localStorage
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

  // Hent bookings når authData er tilgjengelig
  useEffect(() => {
    if (authData && authData.token) {
      const fetchUserBookings = async () => {
        try {
          const bookingsResponse = await fetchBookings();
          console.log("Bookings fetched successfully:", bookingsResponse);
          
          // Sjekk om responsen er et array direkte eller et objekt med en 'data'-nøkkel
          const fetchedBookings = Array.isArray(bookingsResponse)
            ? bookingsResponse
            : bookingsResponse.data;
          
          console.log("Fetched bookings array:", fetchedBookings);
          
          // Filtrer bort elementer som ikke har en definert venue
          const validBookings = (fetchedBookings || []).filter(
            (booking) => booking && booking.venue
          );
          console.log("Valid bookings:", validBookings);
          
          setBookedVenues(validBookings);
        } catch (err) {
          console.error("Error fetching bookings:", err.message);
          setError("Failed to load bookings");
        } finally {
          setLoadingBookings(false);
        }
      };

      fetchUserBookings();
    }
  }, [authData]);

  if (!authData) {
    return <div>Loading...</div>;  
  }

  if (loadingBookings) {
    return <div>Loading your bookings...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div className="profile-container">
      <div>
        <img
          src={authData.profile?.avatar?.url || "default-avatar-url"}
          alt={authData.profile?.avatar?.alt || "Profile Avatar"}
          className="profile-image"
        />
      </div>

      <div className="profile-info">
        <div className="profile-details">
          <h2>{authData.profile?.name}</h2>
          <p>{authData.profile?.email}</p>
        </div>

        <div className="profile-actions">
          <button>Edit Profile</button>
          <button onClick={() => navigate('/create-venue')}>Create Venue</button>
        </div>
      </div>

      <div className="user-bookings-container">
        <div className="user-bookings">
          <h2 className="user-bookings-your-bookings-title">Your Bookings:</h2>
          {bookedVenues.length === 0 ? (
            <p>You have no bookings yet.</p>
          ) : (
            <ul className="booking-list">
              {bookedVenues.map((booking) => (
                <li key={booking.id} className="booking-item">
                  <h3>{booking.venue?.name || "No Venue Name"}</h3>
                  <p>
                    <strong>Location:</strong> {booking.venue?.location?.city || "N/A"}, {booking.venue?.location?.country || "N/A"}
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
                  <img
                    src={booking.venue?.media && booking.venue.media[0] ? booking.venue.media[0].url : "https://via.placeholder.com/150"}
                    alt={booking.venue?.media && booking.venue.media[0] ? booking.venue.media[0].alt : "Venue Image"}
                    className="booking-image"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

