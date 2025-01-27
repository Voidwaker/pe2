import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVenueById } from '../services/venues';  
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';
import '../styles/venueDetails.css';

const VenueDetails = () => {
  const { id } = useParams();  
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!id) {
      setError("Venue ID is missing");
      return;
    }

    const getVenueDetails = async () => {
      try {
        const data = await fetchVenueById(id);
        setVenue(data);
      } catch (error) {
        setError('Error fetching venue details');
      }
    };

    getVenueDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>; 
  }

  if (!venue) {
    return <div>Loading...</div>;  
  }

  const bookedDates = venue.bookings && Array.isArray(venue.bookings) ? venue.bookings.map((booking) => {
    const startDate = new Date(booking.dateFrom).toISOString().split('T')[0];
    const endDate = new Date(booking.dateTo).toISOString().split('T')[0];
    
    let allBookedDates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      allBookedDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return allBookedDates;
  }).flat() : []; 

  const availableDates = venue.availableDates || []; 

  console.log('Booked Dates:', bookedDates);
  console.log('Available Dates:', availableDates);

  return (
    <div className="venue-details">
      <div className="venue-card">
        <img src={venue.media[0]?.url} alt={venue.name} className="venue-image" />
        <div className="venue-info">
          <h3>{venue.name}</h3>
          <p>{venue.description}</p>
          <p><strong>Price:</strong> ${venue.price}</p>
          <p><strong>Location:</strong> {venue.location.city}, {venue.location.country}</p>

          <div className="venue-features">
            <h4>Features</h4>
            <ul>
              <li>WiFi: {venue.meta?.wifi ? 'Yes' : 'No'}</li>
              <li>Parking: {venue.meta?.parking ? 'Yes' : 'No'}</li>
              <li>Breakfast: {venue.meta?.breakfast ? 'Yes' : 'No'}</li>
              <li>Pets Allowed: {venue.meta?.pets ? 'Yes' : 'No'}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="venue-calendar">
        <h4>Availability Calendar</h4>
        <Calendar
          tileClassName={({ date }) => {
            const dateString = date.toISOString().split('T')[0];
            console.log('Date being checked:', dateString);

            if (availableDates.includes(dateString)) {
              return 'react-calendar__tile--available';  
            } else if (bookedDates.includes(dateString)) {
              return 'react-calendar__tile--booked';  
            }
            return '';  
          }}
        />
      </div>

      <Link to="/venues" className="back-to-venues">Back to Venues</Link>
    </div>
  );
};

export default VenueDetails;