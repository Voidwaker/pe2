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

  useEffect(() => {
    if (authData && authData.token) {
      const fetchUserBookings = async () => {
        try {
          const bookings = await fetchBookings();  
          setBookedVenues(bookings.data);  
        } catch (error) {
          setError('Failed to load bookings');
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
                  <h3>{booking.venue.name}</h3>
                  <p>
                    <strong>Location:</strong> {booking.venue.location.city}, {booking.venue.location.country}
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
                    src={booking.venue.media[0]?.url || "https://via.placeholder.com/150"}
                    alt={booking.venue.media[0]?.alt || "Venue Image"}
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

