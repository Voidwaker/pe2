import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/VenueDetails.css";

const API_URL = "https://v2.api.noroff.dev/holidaze/venues";

/**
 * VenueDetails Component
 *
 * Fetches and displays details for a specific venue, including its description,
 * pricing, amenities, rating, and location. Also allows users to make bookings.
 *
 * @component
 * @returns {JSX.Element} The rendered VenueDetails component.
 */
function VenueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [guests, setGuests] = useState(1);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("Profile");
    setIsUserLoggedIn(!!user);

    const fetchVenue = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}?_bookings=true`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setVenue(data.data);

        const bookedRanges = data.data.bookings?.flatMap((booking) => {
          let dates = [];
          let current = new Date(booking.dateFrom);
          let end = new Date(booking.dateTo);
          while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
          return dates;
        }) || [];

        setBookedDates(bookedRanges);
      } catch {
        setError("Error fetching venue details");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  const handleBooking = async () => {
    if (!selectedFrom || !selectedTo) {
      alert("Please select valid dates before booking.");
      return;
    }

    const userProfile = JSON.parse(localStorage.getItem("Profile"));
    if (!userProfile) {
      alert("You must be logged in to book a venue.");
      return;
    }

    const authToken = localStorage.getItem("Token")?.trim();
    const API_KEY = localStorage.getItem("ApiKey")?.trim();
    if (!authToken || !API_KEY) {
      alert("Authentication error. Please log out and log in again.");
      return;
    }

    const bookingData = {
      dateFrom: selectedFrom.toISOString(),
      dateTo: selectedTo.toISOString(),
      guests,
      venueId: id,
    };

    try {
      const response = await fetch(`${API_URL}/../bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        alert("⚠ Failed to make a booking. Please try again.");
        return;
      }

      alert("🎉 Booking successful! Redirecting to venue list...");
      navigate("/venues");
    } catch {
      alert("⚠ Failed to make a booking. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-4">Loading venue details...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  const formatLocation = (location) => {
    if (!location) return null;
    return [location.address, location.city, location.zip, location.country, location.continent]
      .filter(Boolean)
      .join(", ") || null;
  };

  return (
    <div className="container mt-5 mb-5">
      <Helmet>
        <title>{venue?.name ? `${venue.name} | Holihub` : "Venue Details | Holihub"}</title>
        <meta name="description" content={venue?.description || "Explore venue details and book your stay."} />
      </Helmet>

      {venue?.media?.length > 0 && (
        <img className="img-fluid rounded shadow-lg mb-4" src={venue.media[0].url} alt={venue.media[0].alt || "Venue Image"} />
      )}

      <h1 className="text-center">{venue?.name || "Loading venue..."}</h1>
      <p className="lead text-muted text-center">{venue?.description || "No description available"}</p>
      <p><strong>Price:</strong> ${venue?.price || "N/A"}</p>
      <p><strong>Max Guests:</strong> {venue?.maxGuests || "N/A"}</p>
      <p><strong>Rating:</strong> {venue?.rating || "N/A"}</p>

      {formatLocation(venue?.location) && (
        <p><strong>Location:</strong> {formatLocation(venue.location)}</p>
      )}

      <div className="venue-calendar">
        <h2>Availability Calendar</h2>
        <DatePicker selected={selectedFrom} onChange={setSelectedFrom} excludeDates={bookedDates} minDate={new Date()} dateFormat="yyyy-MM-dd" placeholderText="Select start date" className="form-control mb-2" />
        <DatePicker selected={selectedTo} onChange={setSelectedTo} excludeDates={bookedDates} minDate={selectedFrom || new Date()} dateFormat="yyyy-MM-dd" placeholderText="Select end date" className="form-control mb-2" />
        <label htmlFor="guests" className="form-label mt-2">Number of Guests:</label>
        <select id="guests" className="form-select" value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
          {Array.from({ length: venue?.maxGuests || 1 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
        </select>
      </div>

      <button onClick={handleBooking} className="btn btn-primary w-100 mt-3 mb-5">Book Venue</button>
    </div>
  );
}

export default VenueDetails;

