import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchVenues } from '../services/venues';  
import './../styles/venueList.css';

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [error, setError] = useState(null);

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

  useEffect(() => {
    let sortedVenues = [...venues];

    if (sortOrder === 'a-z') {
      sortedVenues.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'z-a') {
      sortedVenues.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOrder === 'newest') {
      sortedVenues.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (sortOrder === 'oldest') {
      sortedVenues.sort((a, b) => new Date(a.created) - new Date(b.created));
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
