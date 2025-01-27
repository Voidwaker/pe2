import React from 'react';
import { Link } from 'react-router-dom';

const VenueCard = ({ venue }) => {
  return (
    <div className="venue-card">
      <img src={venue.media[0]?.url || 'https://via.placeholder.com/150'} alt={venue.name} className="venue-image" />
      <div className="venue-info">
        <h3>{venue.name}</h3>
        <p>{venue.description}</p>
        <p><strong>Price:</strong> ${venue.price}</p>
        <p><strong>Location:</strong> {venue.location.city}, {venue.location.country}</p>
        <Link to={`/venue/${venue.id}`} className="view-more-btn">View Details</Link>
      </div>
    </div>
  );
};

export default VenueCard;

