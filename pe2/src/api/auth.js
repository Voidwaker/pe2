export const API_BASE = "https://v2.api.noroff.dev/";

export async function registerUser({ name, email, password, bio, avatar, banner, venueManager }) {
  const payload = {
    name,
    email,
    password,
  };

  if (bio) {
    payload.bio = bio;
  }
  if (venueManager) {
    payload.venueManager = venueManager;
  }
  if (avatar) {
    payload.avatar = { url: avatar, alt: "User avatar" };
  }
  if (banner) {
    payload.banner = { url: banner, alt: "User banner" };
  }

  console.log("Payload being sent:", payload); 

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
  const payload = { email, password };

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

  const userData = await response.json();
  return userData.data; 
}
