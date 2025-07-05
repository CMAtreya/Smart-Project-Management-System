import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTeamMembers = async (projectId) => {
  const res = await axios.get(`${API_URL}/messages/team/${projectId}`);
  return res.data;
};
