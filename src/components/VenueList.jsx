import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchVenues } from '../services/venues';  
import './../styles/venueList.css';  


function VenueList() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const data = await fetchVenues();
        setVenues(data);
      } catch (error) {
        setError('Error fetching venues');
      }
    };

    getVenues();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="venue-cards">
      {venues.map((venue) => (
        <div className="venue-card" key={venue.id}>
          <img
            src={venue.media[0]?.url || 'https://via.placeholder.com/150'}
            alt={venue.name}
            className="venue-image"
          />
          <div className="venue-info">
            <h3>{venue.name}</h3>
            <p>{venue.description}</p>
            <p><strong>Price:</strong> ${venue.price}</p>
            <p><strong>Location:</strong> {venue.location.city}, {venue.location.country}</p>
            <Link to={`/venue/${venue.id}`} className="view-more-btn">View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VenueList;
