import React, { useEffect, useState } from "react";
import { getUserVenues } from "../api/venues"; 
import { useAuth } from "../hooks/useAuth";

function MyVenues() {
  const { authData } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authData?.profile?.name) {
      getUserVenues(authData.profile.name)
        .then((data) => setVenues(data))
        .catch((err) => setError("Failed to fetch venues"))
        .finally(() => setLoading(false));
    }
  }, [authData]);

  if (loading) return <div>Loading your venues...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Venues</h1>
      {venues.length === 0 ? (
        <p>You haven't created any venues yet.</p>
      ) : (
        <ul>
          {venues.map((venue) => (
            <li key={venue.id}>
              <h3>{venue.name}</h3>
              <p>{venue.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyVenues;
