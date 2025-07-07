// src/contexts/NotificationContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import NotificationService from "../services/NotificationsService";
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

  const fetchNotifications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const [fetched, counts] = await Promise.all([
        NotificationService.getAll(user._id, token),
        NotificationService.getCounts(user._id, token),
      ]);
      setNotifications(fetched);
      setUnreadCount(counts.unread);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem('token');
      await NotificationService.markAllRead(user._id, token);
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
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

  // Automatically refresh notifications every 10 seconds
  useEffect(() => {
    if (user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000); // 10 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

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
