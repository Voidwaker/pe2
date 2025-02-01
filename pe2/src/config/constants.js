export const API_KEY = "4306f4b9-7186-498b-a4a7-c1c17566fbb6";
export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = `${API_AUTH}/register`;
export const API_LOGIN = `${API_AUTH}/login`; 
export const API_CREATE_API_KEY = `${API_AUTH}/create-api-key`;  
export const API_BOOKINGS = "/holidaze/bookings";
export const API_PROFILES = "/holidaze/profiles";
export const API_BOOKINGS_BY_PROFILE = (name) => `/holidaze/profiles/${name}/bookings`;
