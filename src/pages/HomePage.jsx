import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Carousel from "../components/Carousel";
import { fetchVenues } from "../services/venues";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/homePage.css";

/**
 * HomePage Component
 * 
 * The main landing page of Holihub. Displays a featured carousel with highly-rated venues
 * and a section showcasing popular destinations.
 *
 * @component
 * @returns {JSX.Element} The homepage layout.
 */
const HomePage = () => {
  const [featuredVenues, setFeaturedVenues] = useState([]);

  /**
   * Fetches venue data and selects the top 5 highest-rated venues for display.
   */
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
    <div className="container py-5">
      <Helmet>
        <title>Welcome to Holihub | Your Travel Hub</title>
        <meta 
          name="description" 
          content="Discover top-rated holiday venues, explore popular destinations, and book your next adventure with Holihub."
        />
      </Helmet>

      <h1 className="text-center mb-4">Welcome to Holihub</h1>
      <div className="mb-5 carousel-wrapper">
        <Carousel images={featuredVenues.map(venue => ({ url: venue.media[0]?.url, alt: venue.name }))} />
      </div>
      <section className="popular-destinations">
        <h2 className="text-center mb-4">Popular Destinations</h2>
        <div className="row g-4">
          {featuredVenues.map((venue) => (
            <div key={venue.id} className="col-md-4 d-flex justify-content-center">
              <div className="card shadow-sm text-center" style={{ width: "18rem" }}>
                <img className="card-img-top" src={venue.media[0]?.url || "https://via.placeholder.com/150"} alt={venue.name} />
                <div className="card-body">
                  <h5 className="card-title">{venue.name}</h5>
                  <p className="card-text">{venue.location.city}, {venue.location.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

