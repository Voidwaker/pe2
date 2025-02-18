import {
  API_BASE,
  API_VENUES,
  API_VENUE_BY_ID,
  API_PROFILE_VENUES
} from "../config/constants";

/**
 * Retrieves authentication headers for API requests.
 *
 * @returns {Object} Headers containing Authorization and API Key.
 * @throws {Error} If token or API key is missing.
 */
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

/**
 * Fetches a list of venues with optional search and sorting.
 *
 * @param {Object} [options] - Search and sorting options.
 * @param {string} [options.search] - Search query.
 * @param {string} [options.sort="created"] - Sorting criteria.
 * @param {string} [options.sortOrder="desc"] - Sorting order.
 * @returns {Promise<Array>} List of venues.
 * @throws {Error} If the request fails.
 */
export async function fetchVenues({ search = "", sort = "created", sortOrder = "desc" } = {}) {
  try {
    const url = new URL(`${API_BASE}${API_VENUES}`);

    if (search) url.searchParams.append("q", search);
    if (sort) url.searchParams.append("sort", sort);
    if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch venues");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Creates a new venue.
 *
 * @param {Object} venueData - Venue details.
 * @param {string} venueData.name - Name of the venue.
 * @param {string} venueData.description - Description of the venue.
 * @param {Object} venueData.location - Location details.
 * @param {number} venueData.price - Price per night.
 * @param {number} venueData.maxGuests - Maximum number of guests.
 * @param {Array} venueData.media - Media URLs.
 * @returns {Promise<Object>} Created venue data.
 * @throws {Error} If the request fails.
 */
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
    throw error;
  }
}

/**
 * Retrieves venues created by a specific user.
 *
 * @param {string} username - The username of the venue owner.
 * @returns {Promise<Array>} List of venues.
 * @throws {Error} If the request fails or username is missing.
 */
export async function getUserVenues(username) {
  if (!username) {
    return [];
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
    throw error;
  }
}

/**
 * Retrieves a venue by its ID.
 *
 * @param {string} venueId - The ID of the venue.
 * @returns {Promise<Object>} Venue details.
 * @throws {Error} If the request fails.
 */
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
    throw error;
  }
}

/**
 * Updates an existing venue.
 *
 * @param {string} venueId - The ID of the venue to update.
 * @param {Object} updatedData - Updated venue details.
 * @returns {Promise<Object>} Updated venue data.
 * @throws {Error} If the request fails.
 */
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
    throw error;
  }
}

/**
 * Deletes a venue by its ID.
 *
 * @param {string} venueId - The ID of the venue to delete.
 * @returns {Promise<boolean>} True if deletion was successful.
 * @throws {Error} If the request fails.
 */
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
    throw error;
  }
}
