import axios from 'axios';

const BASE_URL = 'http://localhost:5000/notifications';

// ✅ Utility to get token from localStorage
const getToken = () => localStorage.getItem('token');

const NotificationService = {
  getAll: async (userId) => {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  getUnread: async (userId) => {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/${userId}/unread`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  getCounts: async (userId) => {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/${userId}/counts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  markAllRead: async (userId) => {
    const token = getToken();
    const res = await axios.patch(`${BASE_URL}/${userId}/mark-all-read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  markSingleRead: async (notificationId) => {
    const token = getToken();
    const res = await axios.patch(`${BASE_URL}/${notificationId}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

export default NotificationService;
