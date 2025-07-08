// src/contexts/NotificationContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import NotificationService from "../services/NotificationsService";
import axios from 'axios'; // Needed if you're directly using axios in fetchNotifications
import { useAuth } from './AuthContext';

const NotificationsContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

export const NotificationsProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Properly fetch notifications + counts
  const fetchNotifications = async () => {
    if (!user || !user._id) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const [fetched, counts] = await Promise.all([
        NotificationService.getAll(user._id, token),
        NotificationService.getCounts(user._id, token),
      ]);
      setNotifications(fetched || []);
      setUnreadCount(counts?.unread || 0);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    if (!user || !user._id) return;
    try {
      const token = localStorage.getItem('token');
      await NotificationService.markAllRead(user._id, token);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const markSingleAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await NotificationService.markSingleRead(notificationId, token);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error('Failed to mark single notification as read:', error);
    }
  };

  // ✅ Auto-fetch every 100 seconds
  useEffect(() => {
    if (!user || !user._id) return;

    fetchNotifications(); // Initial call

    const interval = setInterval(() => {
      fetchNotifications();
    }, 100000); // 100 seconds

    return () => clearInterval(interval); // Clean up
  }, [user?._id]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAllAsRead,
        markSingleAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
