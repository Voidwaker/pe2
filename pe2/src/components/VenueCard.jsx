import React from 'react';
import { Link } from 'react-router-dom';

const VenueCard = ({ venue }) => {
  const { id, name, description, price, media, location } = venue;

  return (
    <div className="venue-card">
      <img src={media[0]?.url} alt={media[0]?.alt || name} className="venue-image" />
      <div className="venue-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Location:</strong> {location.city}, {location.country}</p>
        
        {}
        <Link to={`/venue/${id}`} className="view-more-btn">View More</Link>
      </div>
    </div>
  );
};

export default VenueCard;

