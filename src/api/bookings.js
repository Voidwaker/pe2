import { API_BASE, API_BOOKINGS_BY_PROFILE } from './../config/constants';

/**
 * Fetches the bookings for the currently authenticated user.
 *
 * @returns {Promise<Object>} The fetched bookings data.
 * @throws {Error} If the user is not authenticated or an error occurs while fetching data.
 */
export async function fetchBookings() {
  const token = localStorage.getItem("Token");
  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  const apiKey = localStorage.getItem("ApiKey");
  if (!apiKey) {
    throw new Error("No API key found in localStorage.");
  }

  const profileString = localStorage.getItem("Profile");
  if (!profileString) {
    throw new Error("No profile found in localStorage.");
  }

  const profile = JSON.parse(profileString);
  const profileName = profile && profile.name ? profile.name : null;
  if (!profileName) {
    throw new Error("No profile name found in localStorage.");
  }

  try {
    const url = `${API_BASE}${API_BOOKINGS_BY_PROFILE(profileName)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}


