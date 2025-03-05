import axios from "axios";

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// Token management functions
export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include auth token dynamically
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login/", { email, password });
      if (response.data.token) {
        storeToken(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "An error occurred during login" };
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/register/", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "An error occurred during registration" };
    }
  },

  logout: () => {
    removeToken();
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// Challenge services
export const challengeService = {
  getAllChallenges: async () => {
    try {
      const response = await apiClient.get("/challenges/");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch challenges" };
    }
  },

  getChallengeById: async (id) => {
    try {
      const response = await apiClient.get(`/challenges/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch challenge" };
    }
  },

  submitSolution: async (challengeId, solution) => {
    try {
      const response = await apiClient.post(`/challenges/${challengeId}/submit/`, { solution });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to submit solution" };
    }
  },
};

// User progress services
export const progressService = {
  getUserProgress: async () => {
    try {
      const response = await apiClient.get("/progress/");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch user progress" };
    }
  },

  getLeaderboard: async () => {
    try {
      const response = await apiClient.get("/leaderboard/");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch leaderboard" };
    }
  },

  getUserProfile: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}/profile/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch user profile" };
    }
  },
};

export default {
  auth: authService,
  challenges: challengeService,
  progress: progressService,
};
