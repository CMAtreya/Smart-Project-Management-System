import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiUser, FiBell, FiMenu, FiSun, FiMoon } from "react-icons/fi";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineClipboardCheck,
  HiOutlineChat,
  HiOutlineDocumentReport
} from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";
import NotificationDropdown from './NotificationDropdown';
// Add this at the top with your other imports
import { useNotifications } from '../contexts/NotificationsContext'; // ✅ corrected hook name
import qurelLogo from "../assets/qurel.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Always use dark mode
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Determine which navigation links to show based on the current path
  const isAdminPath = location.pathname.includes('/admin');
  
  const adminNavLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <HiOutlineHome className="w-5 h-5" /> },
    { name: "Projects", path: "/admin/projects", icon: <HiOutlineDocumentReport className="w-5 h-5" /> },
    { name: "Calendar", path: "/admin/calendar", icon: <HiOutlineCalendar className="w-5 h-5" /> },
    { name: "Analytics", path: "/admin/analytics", icon: <HiOutlineChartBar className="w-5 h-5" /> },
    { name: "Chat", path: "/admin/chat", icon: <HiOutlineChat className="w-5 h-5" /> }
  ];
  
  const userNavLinks = [
    { name: "Dashboard", path: "/user/dashboard", icon: <HiOutlineHome className="w-5 h-5" /> },
    { name: "Projects", path: "/user/projects", icon: <HiOutlineDocumentReport className="w-5 h-5" /> },
    { name: "Calendar", path: "/user/calendar", icon: <HiOutlineCalendar className="w-5 h-5" /> },
    { name: "Analytics", path: "/user/charts", icon: <HiOutlineChartBar className="w-5 h-5" /> },
    { name: "Chat", path: "/user/chat", icon: <HiOutlineChat className="w-5 h-5" /> }
  ];
  
  const navLinks = isAdminPath ? adminNavLinks : userNavLinks;

  const { notifications, unreadCount, markAllAsRead } = useNotifications();


  // Always apply dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
    // Apply dark styles to body
    document.body.classList.add("bg-gray-900");
    document.body.classList.add("text-white");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!searchRef.current?.contains(e.target)) setIsSearchOpen(false);
      if (!notificationsRef.current?.contains(e.target)) setIsNotificationsOpen(false);
      if (!profileRef.current?.contains(e.target)) setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-blue-600 shadow-lg" : "bg-blue-500"
      } apple-font border-b border-blue-700`}
    >
      <div className="apple-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.img
            src={qurelLogo}
            alt="QUREL Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-12 w-auto mr-4 rounded-xl shadow-lg bg-white/10 p-1"
          />
          {/* Optionally keep SmartPM text or remove for standalone logo */}
          {/* <span className="text-2xl font-semibold text-white">SmartPM</span> */}

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`group flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 text-white hover:text-blue-100 ${
                  location.pathname === link.path ? "font-bold border-b-2 border-white" : ""
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-white hover:bg-blue-700 transition-colors duration-200"
              >
                <FiSearch className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-apple-lg shadow-apple"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      className="apple-input w-full p-3"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

         {/* Notifications */}
<div ref={notificationsRef} className="relative">
  <button
    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
    className="p-2 rounded-full text-white hover:bg-blue-700 transition-colors duration-200"
  >
    <div className="relative">
      <FiBell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  </button>

  <AnimatePresence>
    {isNotificationsOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg overflow-hidden z-50"
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-500 hover:underline"
            >
              Mark all as read
            </button>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div key={n._id} className={`p-4 ${!n.isRead ? "bg-blue-50" : ""}`}>
                <div className="flex items-start space-x-3">
                  {n.type === "task_created" && (
                    <HiOutlineClipboardCheck className="w-5 h-5 text-blue-500" />
                  )}
                  {n.type === "project_created" && (
                    <HiOutlineCalendar className="w-5 h-5 text-blue-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium capitalize">
                      {n.type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-sm text-gray-700">{n.message}</p>
                    <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>


            {/* Profile */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-full text-white hover:bg-blue-700 transition-colors duration-200"
              >
                <FiUser className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-apple-lg shadow-apple"
                  >
                    <div className="p-4 border-b border-apple-100">
                      <p className="text-sm font-medium text-apple-950">{user?.name || "User"}</p>
                      <p className="text-xs text-apple-500">{user?.email || "user@example.com"}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to={isAdminPath ? "/admin/profile" : "/user/profile"}
                        className="block px-4 py-2 text-sm text-apple-700 hover:bg-apple-50 rounded"
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-apple-red-600 hover:bg-apple-red-50 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle Removed */}
          </div>
        </div>
      </div>
    </header>
  ); 
};

export default Navbar;
