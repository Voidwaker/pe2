import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchVenues } from '../services/venues';  
import './../styles/venueList.css';

/**
 * VenueList Component
 *
 * Fetches and displays a list of venues with search and sorting functionality.
 * Users can filter venues by name and sort them by different criteria.
 *
 * @component
 * @returns {JSX.Element} The rendered VenueList component.
 */
function VenueList() {
  const [venues, setVenues] = useState([]); // State to store all venues
  const [filteredVenues, setFilteredVenues] = useState([]); // State for filtered venues
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [sortOrder, setSortOrder] = useState('newest'); // Sorting state
  const [error, setError] = useState(null); // Error handling state

  /**
   * Fetch venues from API on component mount.
   */
  useEffect(() => {
    const getVenues = async () => {
      try {
        const data = await fetchVenues();
        setVenues(data);
        setFilteredVenues(data);
      } catch (error) {
        setError('Error fetching venues');
      }
    };
    getVenues();
  }, []);

  /**
   * Handles sorting and filtering venues based on search input and selected sort order.
   */
  useEffect(() => {
    let sortedVenues = [...venues];

    switch (sortOrder) {
      case 'a-z':
        sortedVenues.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        sortedVenues.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        sortedVenues.sort((a, b) => new Date(b.created) - new Date(a.created));
        break;
      case 'oldest':
        sortedVenues.sort((a, b) => new Date(a.created) - new Date(b.created));
        break;
      case 'price-low-high':
        sortedVenues.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sortedVenues.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredVenues(
      sortedVenues.filter((venue) =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, sortOrder, venues]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="venue-container">
      <div className="venue-controls">
        <input
          type="text"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      <div className="venue-cards">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
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
          ))
        ) : (
          <p>No venues match your search.</p>
        )}
      </div>
    </div>
  );
}

export default VenueList;
