import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/VenueDetails.css";

const API_URL = "https://v2.api.noroff.dev/holidaze/venues";

function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [guests, setGuests] = useState(1);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userProfile");
    setIsUserLoggedIn(!!user);

    const fetchVenue = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}?_bookings=true`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setVenue(data.data);

        const bookings = data.data.bookings || [];
        const bookedRanges = bookings.flatMap((booking) => {
          let dates = [];
          let current = new Date(booking.dateFrom);
          let end = new Date(booking.dateTo);

          while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
          return dates;
        });
        setBookedDates(bookedRanges);
      } catch (error) {
        console.error("Error fetching venue details:", error);
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

    let authToken = localStorage.getItem("Token")?.replace(/^"+|"+$/g, "").trim();
    let API_KEY = localStorage.getItem("ApiKey")?.replace(/^"+|"+$/g, "").trim();
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
      const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
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

      alert("🎉 Booking successful!");
      setBookedDates([...bookedDates, selectedFrom, selectedTo]);
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      alert("⚠ Failed to make a booking. Please try again.");
    }
  };

  if (loading) return <div>Loading venue details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="venue-details-container">
      {venue?.media?.length > 0 ? (
        <img className="venue-hero" src={venue.media[0].url} alt={venue.media[0].alt || "Venue Image"} />
      ) : (
        <p>Loading image...</p>
      )}

      <h1 className="venue-title">{venue?.name || "Loading venue..."}</h1>
      <p className="venue-description">{venue?.description || "No description available"}</p>
      <p className="venue-detail">Price: ${venue?.price || "N/A"}</p>
      <p className="venue-detail">Max Guests: {venue?.maxGuests || "N/A"}</p>
      <p className="venue-detail">Rating: {venue?.rating || "N/A"}</p>

      <div className="venue-features">
        <h3>Features</h3>
        <ul>
          <li>WiFi: {venue?.meta?.wifi ? "Yes" : "No"}</li>
          <li>Parking: {venue?.meta?.parking ? "Yes" : "No"}</li>
          <li>Breakfast: {venue?.meta?.breakfast ? "Yes" : "No"}</li>
          <li>Pets Allowed: {venue?.meta?.pets ? "Yes" : "No"}</li>
        </ul>
      </div>

      <div className="venue-calendar">
        <h2>Availability Calendar</h2>
        <label htmlFor="fromDate">From:</label>
        <DatePicker
          id="fromDate"
          selected={selectedFrom}
          onChange={(date) => setSelectedFrom(date)}
          excludeDates={bookedDates}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select start date"
        />

        <label htmlFor="toDate">To:</label>
        <DatePicker
          id="toDate"
          selected={selectedTo}
          onChange={(date) => setSelectedTo(date)}
          excludeDates={bookedDates}
          minDate={selectedFrom || new Date()}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select end date"
        />

        <div>
          <label htmlFor="guests">Number of Guests:</label>
          <select id="guests" value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
            {Array.from({ length: venue?.maxGuests || 1 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <button onClick={handleBooking} className="booking-button">Book Venue</button>
      </div>
    </div>
  );
}

export default VenueDetails;