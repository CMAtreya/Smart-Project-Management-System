import React, { useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationsContext';


const NotificationDropdown = () => {
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    fetchNotifications,
  } = useNotifications();

  useEffect(() => {
    fetchNotifications(); // Initial fetch
    const interval = setInterval(fetchNotifications, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={markAllAsRead}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        🔔 Notifications
        {unreadCount > 0 && (
          <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="py-2 max-h-64 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="px-4 py-2 text-gray-500 text-sm">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`px-4 py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 ${
                  n.isRead ? 'bg-white text-gray-700' : 'bg-blue-50 text-blue-900 font-semibold'
                }`}
              >
                <p className="text-sm">{n.message}</p>
                {n.link && (
                  <a
                    href={n.link}
                    className="text-blue-600 hover:underline text-xs mt-1 block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;