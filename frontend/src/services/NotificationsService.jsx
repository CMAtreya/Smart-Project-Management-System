// src/services/NotificationService.jsx
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/notifications';

const NotificationService = {
  getAll: async (userId, token) => {
    const res = await axios.get(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  getUnread: async (userId, token) => {
    const res = await axios.get(`${BASE_URL}/${userId}/unread`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  getCounts: async (userId, token) => {
    const res = await axios.get(`${BASE_URL}/${userId}/counts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  markAllRead: async (userId, token) => {
    const res = await axios.patch(`${BASE_URL}/${userId}/mark-all-read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  markSingleRead: async (notificationId, token) => {
    const res = await axios.patch(`${BASE_URL}/${notificationId}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};

export default NotificationService;
