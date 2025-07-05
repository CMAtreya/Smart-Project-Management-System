import axios from 'axios';

// Adjust the base URL if needed, or use VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || '';

export const fetchEvents = async (month, year) => {
  // Optionally filter by month/year if your backend supports it
  const res = await axios.get(`${API_URL}/calender`, {
    params: { month, year }
  });
  return res.data;
};

export const createEvent = async (eventData) => {
  const res = await axios.post(`${API_URL}/calender`, eventData);
  return res.data;
};
