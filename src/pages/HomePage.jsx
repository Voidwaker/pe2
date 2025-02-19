import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { fetchVenues } from "../services/venues";
import "../styles/homePage.css";

const HomePage = () => {
  const [featuredVenues, setFeaturedVenues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venues = await fetchVenues();
        const sortedVenues = venues
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5); 
        setFeaturedVenues(sortedVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homepage-container">
      <h1>Welcome to Holihub</h1>
      <Carousel images={featuredVenues.map(venue => ({ url: venue.media[0]?.url, alt: venue.name }))} />

      <section className="popular-destinations">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          {featuredVenues.map((venue) => (
            <div key={venue.id} className="destination-card">
              <img src={venue.media[0]?.url || "https://via.placeholder.com/150"} alt={venue.name} />
              <h3>{venue.name}</h3>
              <p>{venue.location.city}, {venue.location.country}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
