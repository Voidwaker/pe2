export async function createApiKey() {
    const token = localStorage.getItem("Token");
  
    if (!token) {
      throw new Error("No access token found. Please log in first.");
    }
  
    try {
      console.log("Creating a new API key...");
  
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
        console.error("Error response from API:", errorData);
        throw new Error(errorData.message || "Failed to create API key");
      }
  
      const apiKeyData = await response.json();
      const apiKey = apiKeyData.data.key;
      localStorage.setItem("ApiKey", apiKey); 
      console.log("API Key created and stored successfully:", apiKey);
  
      return apiKey;
    } catch (error) {
      console.error("Error creating API key:", error.message);
      throw error;
    }
  }
  