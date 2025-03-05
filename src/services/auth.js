// services/auth.js
export const storeToken = (token) => {
  localStorage.setItem("authToken", token); // Stores token persistently
  // sessionStorage.setItem("authToken", token); // Uncomment if you prefer session-based storage
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};
