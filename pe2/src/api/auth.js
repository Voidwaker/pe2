export const API_BASE = "https://v2.api.noroff.dev"; // Fjern en ekstra skråstrek

export async function registerUser({ name, email, password, bio, avatar, banner }) {
  const payload = { name, email, password, bio, avatar, banner };

  const response = await fetch(`${API_BASE}/auth/register`, { // Sørg for at det ikke er dobbel skråstrek
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

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Login failed:", error);
    throw new Error(error.message || "Login failed");
  }

  return await response.json();
}
