/**
 * Creates a new API key for authentication.
 *
 * @returns {Promise<string>} The generated API key.
 * @throws {Error} If the user is not authenticated or an error occurs during the API request.
 */
export async function createApiKey() {
  const token = localStorage.getItem("Token");

  if (!token) {
    throw new Error("No access token found. Please log in first.");
  }

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/create-api-key", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Holidaze API Key" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create API key");
    }

    const apiKeyData = await response.json();
    const apiKey = apiKeyData.data.key;

    if (apiKey) {
      localStorage.setItem("ApiKey", apiKey);
    } else {
      throw new Error("API key is missing in the response!");
    }

    return apiKey;
  } catch (error) {
    throw error;
  }
}

