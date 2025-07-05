import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMessages = async (room) => {
  const res = await axios.get(`${API_URL}/messages/${room}`);
  return res.data;
};

export const saveMessages = async (room, messages) => {
  const res = await axios.post(`${API_URL}/messages`, { room, messages });
  return res.data;
};
