import { API_BASE } from '../config/constants';

export async function createVenue({ name, description, location, price, maxGuests, media }) {
  const token = localStorage.getItem("Token");
  const apiKey = localStorage.getItem("ApiKey");

  if (!token || !apiKey) {
    throw new Error("No token or API key found. Please log in first.");
  }

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
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(payload),
  });
  

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create venue");
  }

  return await response.json();
}
