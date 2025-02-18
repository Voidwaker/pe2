export const API_BASE = "https://v2.api.noroff.dev";
import { createApiKey } from './create-api-key';

/**
 * Registers a new user.
 *
 * @param {Object} userData - The user data.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @param {string} [userData.bio] - The user's bio.
 * @param {string} [userData.avatar] - The user's avatar URL.
 * @param {string} [userData.banner] - The user's banner URL.
 * @param {boolean} [userData.venueManager] - Whether the user is a venue manager.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} If registration fails.
 */
export async function registerUser({ name, email, password, bio, avatar, banner, venueManager }) {
  const payload = {
    name,
    email,
    password,
    bio: bio || "No bio available",
    venueManager: venueManager || false,
  };

  if (avatar) {
    payload.avatar = { url: avatar, alt: "User avatar" };
  }
  if (banner) {
    payload.banner = { url: banner, alt: "User banner" };
  }

  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return await response.json();
}

/**
 * Logs in a user.
 *
 * @param {Object} credentials - The user credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The login response including accessToken, profile, apiKey, and venueManager status.
 * @throws {Error} If login fails.
 */
export async function loginUser({ email, password }) {
  const payload = {
    email,
    password,
  };

  const response = await fetch(`${API_BASE}/auth/login?_holidaze=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();

  if (data && data.data) {
    const { accessToken, bio = "No bio available", venueManager, ...profile } = data.data;

    localStorage.setItem('Token', accessToken);
    localStorage.setItem('Profile', JSON.stringify(profile)); 
    localStorage.setItem('VenueManager', venueManager);

    const apiKey = await createApiKey(); 
    localStorage.setItem('ApiKey', apiKey);

    return { accessToken, profile, apiKey, venueManager }; 
  } else {
    throw new Error('Unexpected response format');
  }
}

/**
 * Logs out the current user by clearing authentication data from localStorage.
 */
export function logout() {
  localStorage.removeItem('Token');
  localStorage.removeItem('Profile');
  localStorage.removeItem('ApiKey'); 
}
