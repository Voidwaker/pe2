import React from 'react';

const VenueCard = ({ venue }) => {
    const { name, description, price, media, location } = venue;
  
    return (
      <div className="venue-card">
        <img src={media[0]?.url} alt={media[0]?.alt || name} className="venue-image" />
        <div className="venue-info">
          <h3>{name}</h3>
          <p>{description}</p>
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>Location:</strong> {location.city}, {location.country}</p>
        </div>
      </div>
    );
  };
  
  export default VenueCard;
  
