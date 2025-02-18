import React from 'react';
import { Link } from 'react-router-dom';

/**
 * VenueCard Component
 *
 * Displays a card with venue details, including image, name, description, price, location, 
 * and a link to view more details about the venue.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.venue - The venue object containing details.
 * @param {Array} props.venue.media - Array of media objects for the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {string} props.venue.description - A brief description of the venue.
 * @param {number} props.venue.price - The price per night of the venue.
 * @param {Object} props.venue.location - The location details of the venue.
 * @param {string} props.venue.location.city - The city where the venue is located.
 * @param {string} props.venue.location.country - The country where the venue is located.
 * @param {string} props.venue.id - The unique ID of the venue.
 * @returns {JSX.Element} The rendered VenueCard component.
 */
const VenueCard = ({ venue }) => {
  return (
    <div className="venue-card">
      <img 
        src={venue.media?.[0]?.url || 'https://via.placeholder.com/150'} 
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
  );
};

export default VenueCard;

