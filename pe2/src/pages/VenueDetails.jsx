import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVenueById } from '../services/venues';  
import Calendar from 'react-calendar';  
import './../styles/VenueDetails.css'; 
import 'react-calendar/dist/Calendar.css';

const VenueDetails = () => {
  const { id } = useParams();  
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const getVenueDetails = async () => {
      try {
        const data = await fetchVenueById(id);
        setVenue(data);  
      } catch (error) {
        console.error("Error fetching venue details:", error);
      }
    };
  
    getVenueDetails();
  }, [id]);

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

  return (
    <div className="venue-details">
      <h1>{venue.name}</h1>
      <img src={venue.media[0]?.url} alt={venue.name} className="venue-image" />
      <p><strong>Description:</strong> {venue.description}</p>
      <p><strong>Price:</strong> ${venue.price}</p>
      <p><strong>Location:</strong> {venue.location.city}, {venue.location.country}</p>

      <Calendar
        tileClassName={({ date }) => {
          const dateString = date.toISOString().split('T')[0];

          if (availableDates.includes(dateString)) {
            return 'react-calendar__tile--available';  
          } else if (bookedDates.includes(dateString)) {
            return 'react-calendar__tile--booked';  
          }
          return '';  
        }}
      />

      <Link to="/venues" className="back-to-venues">Back to Venues</Link>
    </div>
  );
};

export default VenueDetails;
