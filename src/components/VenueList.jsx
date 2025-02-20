import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchVenues } from '../services/venues';
import { Helmet } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
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
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Explore Venues - Holihub</title>
      </Helmet>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <div className="col-md-4 mb-4" key={venue.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={venue.media[0]?.url || 'https://via.placeholder.com/150'}
                  alt={venue.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{venue.name}</h5>
                  <p className="card-text">{venue.description}</p>
                  <p className="card-text"><strong>Price:</strong> ${venue.price}</p>
                  <p className="card-text"><strong>Location:</strong> {venue.location.city}, {venue.location.country}</p>
                  <Link to={`/venue/${venue.id}`} className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No venues match your search.</p>
        )}
      </div>
    </div>
  );
}

export default VenueList;
