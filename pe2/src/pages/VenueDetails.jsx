import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVenueById } from '../services/venues';  
import Calendar from 'react-calendar';  
import './../styles/VenueDetails.css';  

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

  const availableDates = venue.availableDates || [];
  const bookedDates = venue.bookedDates || []; 

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
            return 'available';  
          } else if (bookedDates.includes(dateString)) {
            return 'booked';  
          }
          return '';  
        }}
      />
      
      <Link to="/venues" className="back-to-venues">Back to Venues</Link>
    </div>
  );
};

export default VenueDetails;
