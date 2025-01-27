// src/services/venues.js

const API_URL = 'https://v2.api.noroff.dev/holidaze/venues';

// Funksjon for å hente alle venues
export const fetchVenues = async () => {
  try {
    const response = await fetch(API_URL);
    
    // Sjekk om responsen er vellykket
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json(); // Konverter responsen til JSON
    return data.data; // Returner dataene
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error; // Kast feilen videre
  }
};

// Funksjon for å hente venue detaljer basert på id
export const fetchVenueById = async (id) => {
  if (!id) {
    throw new Error('Venue ID is required');
  }

  try {
    console.log(`Fetching venue with id: ${id}`);
    const response = await fetch(`${API_URL}/${id}`);
    
    // Sjekk om responsen er vellykket
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json(); // Konverter responsen til JSON
    return data.data; // Returner dataene
  } catch (error) {
    console.error('Error fetching venue details:', error);
    throw error; // Kast feilen videre
  }
};
