import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchBookings } from "../api/bookings"; // Importer funksjonen
import './../styles/profile.css';

const Profile = () => {
  const { authData } = useAuth();  // Henter brukerens autentiseringsdata
  const [bookedVenues, setBookedVenues] = useState([]);  // Sørg for at bookedVenues starter som en tom array
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState(null);

  // Hent bookinger når authData er tilgjengelig
  useEffect(() => {
    if (authData) {
      const fetchUserBookings = async () => {
        try {
          const bookings = await fetchBookings();  // Bruk fetchBookings for å hente bookinger
          setBookedVenues(bookings.data);  // Sett de hentede bookingene (vennligst merk at vi må bruke bookings.data hvis API'et returnerer data i denne strukturen)
        } catch (error) {
          setError('Failed to load bookings');
        } finally {
          setLoadingBookings(false);  // Ferdig med å laste inn
        }
      };

      fetchUserBookings();
    }
  }, [authData]);  // Når authData endres, hentes bookings på nytt

  if (!authData) {
    return <div>Loading...</div>;  // Hvis authData ikke er tilgjengelig, vis loading
  }

  if (loadingBookings) {
    return <div>Loading your bookings...</div>;  // Vist når bookingene lastes
  }

  if (error) {
    return <div>{error}</div>;  // Hvis det er en feil med henting av bookinger
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
            <p>No bookings found</p>  // Vist hvis ingen bookinger er funnet
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
