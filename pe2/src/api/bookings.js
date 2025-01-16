export async function fetchBookings() {
    const token = localStorage.getItem("Token");
  
    if (!token) {
      throw new Error("No access token found. Please log in first.");
    }
  
    const apiKey = localStorage.getItem("ApiKey");
  
    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/bookings", {
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
  