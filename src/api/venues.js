import { API_BASE } from "../config/constants";

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

export async function createVenue({ name, description, location, price, maxGuests, media }) {
  try {
    const payload = {
      name,
      description,
      location: {
        address: location.address,
        city: location.city,
        country: location.country,
        zip: location.zip,
        continent: location.continent,
        lat: location.lat,
        lng: location.lng,
      },
      price: Number(price),
      maxGuests: Number(maxGuests),
      media,
    };

    const response = await fetch(`${API_BASE}/holidaze/venues`, {
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

export async function getUserVenues(username) {
  try {
    const response = await fetch(`${API_BASE}/holidaze/profiles/${username}/venues`, {
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

export async function deleteVenue(venueId) {
  try {
    const response = await fetch(`${API_BASE}/holidaze/venues/${venueId}`, {
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
