const API_URL = 'https://v2.api.noroff.dev/holidaze/venues';

/**
 * Fetches all venues from the API.
 *
 * @async
 * @function fetchVenues
 * @returns {Promise<Array>} A promise that resolves to an array of venue objects.
 * @throws {Error} Throws an error if fetching venues fails.
 */
export const fetchVenues = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(`Error fetching venues: ${error.message}`);
  }
};

/**
 * Fetches a specific venue by ID.
 *
 * @async
 * @function fetchVenueById
 * @param {string} id - The ID of the venue to fetch.
 * @returns {Promise<Object>} A promise that resolves to the venue object.
 * @throws {Error} Throws an error if fetching the venue fails or if the ID is missing.
 */
export const fetchVenueById = async (id) => {
  if (!id) {
    throw new Error('Venue ID is required');
  }

  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(`Error fetching venue details: ${error.message}`);
  }
};
