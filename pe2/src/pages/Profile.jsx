import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importer navigate
import { fetchBookings } from "../api/bookings";  
import './../styles/profile.css';

const Profile = () => {
  const [authData, setAuthData] = useState(null); 
  const [bookedVenues, setBookedVenues] = useState([]); 
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Bruk navigate hook

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
          <button onClick={() => navigate('/create-venue')}>Create Venue</button> {/* Legg til knapp */}
        </div>
      </div>

      <div className="bookings">
        <h3>Your Booked Venues</h3>
        <div className="bookings-list">
          {bookedVenues && bookedVenues.length > 0 ? (
            bookedVenues.map((venue) => (
              <div key={venue.id} className="booking-item">
                <h4>{venue.name}</h4>
                <p>{venue.dateFrom} - {venue.dateTo}</p>
              </div>
            ))
          ) : (
            <p>No bookings found</p>  
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
