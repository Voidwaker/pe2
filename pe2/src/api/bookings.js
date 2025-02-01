import { API_BASE, API_BOOKINGS_BY_PROFILE } from './../config/constants';

export async function fetchBookings() {
  const token = localStorage.getItem("Token");

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  const apiKey = localStorage.getItem("ApiKey");

  if (!apiKey) {
    console.error("No API key found in localStorage. Please create an API key.");
    return;
  }

  const profile = JSON.parse(localStorage.getItem("Profile"));
  const profileName = profile ? profile.name : null;

  if (!profileName) {
    throw new Error("No profile name found in localStorage.");
  }

  try {
    const response = await fetch(`${API_BASE}${API_BOOKINGS_BY_PROFILE(profileName)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching bookings:", errorData);
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    const bookingsData = await response.json();
    console.log("Bookings fetched successfully:", bookingsData);

    return bookingsData;
  } catch (error) {
    console.error("Error in fetchBookings:", error.message);
    throw error;
  }
}
