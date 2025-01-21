import { useEffect, useState } from 'react';
import { fetchVenues } from '../services/venues';
import VenueCard from './VenueCard';
import './../styles/venueList.css';  

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const data = await fetchVenues();
        if (Array.isArray(data)) {
          setVenues(data);
        } else {
          setError('Data is not an array');
        }
      } catch (error) {
        setError('Error fetching venues');
      } finally {
        setLoading(false);
      }
    };

    getVenues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Venues</h1>
      <div className="venue-cards">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default VenueList;
