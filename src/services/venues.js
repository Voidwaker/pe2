const API_URL = 'https://v2.api.noroff.dev/holidaze/venues';

export const fetchVenues = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json(); 
    return data.data; 
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error; 
  }
};

export const fetchVenueById = async (id) => {
  if (!id) {
    throw new Error('Venue ID is required');
  }

  try {
    console.log(`Fetching venue with id: ${id}`);
    const response = await fetch(`${API_URL}/${id}`);
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json(); 
    return data.data; 
  } catch (error) {
    console.error('Error fetching venue details:', error);
    throw error; 
  }
};
