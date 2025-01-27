// src/pages/VenueDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVenueById } from '../services/venues'; // Importer den nye funksjonen for å hente venue
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './../styles/VenueDetails.css';

function VenueDetails() {
  const { id } = useParams(); // Få id fra URL-en
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await fetchVenueById(id); // Bruk den importerte funksjonen
        setVenue(data);
        
        const bookings = data.bookings || [];
        const bookedRanges = bookings.map((booking) => ({
          from: booking.dateFrom,
          to: booking.dateTo,
        }));
        setBookedDates(bookedRanges);
      } catch (error) {
        console.error('Error fetching venue details:', error);
        setError('Error fetching venue details');
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) {
    return <div>Loading venue details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];

      const isBooked = bookedDates.some((range) => {
        return dateString >= range.from && dateString <= range.to;
      });

      return isBooked ? 'react-calendar__tile--booked' : null;
    }
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];

      const isBooked = bookedDates.some((range) => {
        return dateString >= range.from && dateString <= range.to;
      });

      return isBooked || dateString < today;
    }
    return false;
  };

  return (
    <div className="venue-details-container">
      <img
        className="venue-hero"
        src={venue.media[0]?.url || 'https://via.placeholder.com/150'}
        alt={venue.media[0]?.alt || 'Venue Image'}
      />
      <h1 className="venue-title">{venue.name}</h1>
      <p className="venue-description">{venue.description}</p>

      <div className="venue-details-grid">
        <p className="venue-detail">Price: ${venue.price}</p>
        <p className="venue-detail">Max Guests: {venue.maxGuests}</p>
        <p className="venue-detail">Rating: {venue.rating}</p>
      </div>

      <div className="venue-features">
        <h3>Features</h3>
        <ul>
          <li>WiFi: {venue.meta?.wifi ? 'Yes' : 'No'}</li>
          <li>Parking: {venue.meta?.parking ? 'Yes' : 'No'}</li>
          <li>Breakfast: {venue.meta?.breakfast ? 'Yes' : 'No'}</li>
          <li>Pets Allowed: {venue.meta?.pets ? 'Yes' : 'No'}</li>
        </ul>
      </div>

      <div className="venue-location">
        <strong>Location:</strong> {venue.location?.address}, {venue.location?.city}, {venue.location?.country}
      </div>

      <div className="venue-calendar">
        <h2>Availability Calendar</h2>
        <p>All booked dates are shown in red and cannot be selected. Dates before today are also disabled.</p>
        <Calendar 
          tileClassName={tileClassName}
          tileDisabled={tileDisabled}
        />
      </div>
    </div>
  );
}

export default VenueDetails;
