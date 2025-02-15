import {
  API_BASE,
  API_VENUES,
  API_VENUE_BY_ID,
  API_PROFILE_VENUES
} from "../config/constants";

function getAuthHeaders() {
  const token = localStorage.getItem("Token");
  const apiKey = localStorage.getItem("ApiKey");

  if (!token || !apiKey) {
    throw new Error("No token or API key found. Please log in first.");
  }

  return {
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
    "Content-Type": "application/json",
  };
}

// Opprett ny venue
export async function createVenue({ name, description, location, price, maxGuests, media }) {
  try {
    const payload = {
      name,
      description,
      location: {
        address: location.address || null,
        city: location.city || null,
        country: location.country || null,
        zip: location.zip || null,
        continent: location.continent || null,
        lat: location.lat || 0,
        lng: location.lng || 0,
      },
      price: Number(price),
      maxGuests: Number(maxGuests),
      media,
    };

    const response = await fetch(`${API_BASE}${API_VENUES}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create venue");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
}

// Hent alle venues som en bruker eier
export async function getUserVenues(username) {
  if (!username) {
    console.error("❌ Error: Username is undefined. Make sure the user is logged in.");
    return []; // Returnerer en tom liste for å unngå feil
  }

  try {
    const response = await fetch(`${API_BASE}${API_PROFILE_VENUES(username)}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user's venues");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user venues:", error);
    throw error;
  }
}

// Hent en spesifikk venue etter ID
export async function getVenueById(venueId) {
  try {
    const response = await fetch(`${API_BASE}${API_VENUE_BY_ID(venueId)}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch venue details");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching venue details:", error);
    throw error;
  }
}

// Oppdater en venue
export async function updateVenue(venueId, updatedData) {
  try {
    const response = await fetch(`${API_BASE}${API_VENUE_BY_ID(venueId)}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update venue");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating venue:", error);
    throw error;
  }
}

// Slett en venue
export async function deleteVenue(venueId) {
  try {
    const response = await fetch(`${API_BASE}${API_VENUE_BY_ID(venueId)}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete venue");
    }

    return true;
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
}

