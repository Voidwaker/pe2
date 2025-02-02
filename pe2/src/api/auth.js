export const API_BASE = "https://v2.api.noroff.dev";
import { createApiKey } from './create-api-key';

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
    console.error("Registration failed:", error);
    throw new Error(error.message || "Registration failed");
  }

  return await response.json();
}

export async function loginUser({ email, password }) {
  const payload = {
    email,
    password,
  };

  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Login failed:", error);
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();

  if (data && data.data) {
    const { accessToken, bio = "No bio available", ...profile } = data.data;

    localStorage.setItem('Token', accessToken);
    localStorage.setItem('Profile', JSON.stringify(profile)); 

    const apiKey = await createApiKey(); 
    localStorage.setItem('ApiKey', apiKey);

    console.log('Logged in successfully');
    return { accessToken, profile, apiKey }; 
  } else {
    console.error('Unexpected response format:', data);
    throw new Error('Unexpected response format');
  }
}

export function logout() {
  localStorage.removeItem('Token');
  localStorage.removeItem('Profile');
  localStorage.removeItem('ApiKey'); 

  console.log('Logged out successfully');
}