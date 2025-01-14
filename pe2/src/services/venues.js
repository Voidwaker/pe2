import axios from 'axios';

const API_URL = 'https://v2.api.noroff.dev/holidaze/venues';

export const fetchVenues = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};