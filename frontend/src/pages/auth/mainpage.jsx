import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import qurelLogo from "../../../public/qurel.png";

import { FaTasks, FaChartBar, FaCalendarAlt, FaBell, FaHeartbeat, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import '../../index.css';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Dark Mode Toggle Component
const DarkModeToggle = () => {
  const [dark, setDark] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-6 right-6 px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-lg transition"
    >
      {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

// Hero Section Component
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="text-center px-4 py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-800 text-white">
      <img
        src={qurelLogo}
        alt="QUREL Logo"
        className="mx-auto mb-6 h-36 w-70 rounded-2xl shadow-xl bg-white/10 p-2"
      />
      <h1 className="text-4xl font-bold mb-4">
        <Typewriter
          options={{
            strings: ['THE FUTURE OF WORK'],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      <p className="text-lg mb-6">Enhance team collaboration with smart task tracker</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/signin')} // 👈 Navigate on click
        className="bg-white text-blue-700 font-bold px-6 py-3 rounded-full shadow-xl hover:bg-blue-100 transition"
      >
        Getting Started
      </motion.button>
    </section>
  );
};


// Features Component
const features = [
  {
    icon: <FaTasks className="text-blue-500 text-3xl" />,
    title: 'Smart Tasking',
    desc: 'Assign and Track tasks easily',
  },
  {
    icon: <FaChartBar className="text-blue-500 text-3xl" />,
    title: 'Gantt Chart',
    desc: 'Visualize Project Streamlines',
  },
  {
    icon: <FaCalendarAlt className="text-blue-500 text-3xl" />,
    title: 'Calendar Sync',
    desc: 'Integrate with your schedule',
  },
  {
    icon: <FaHeartbeat className="text-yellow-500 text-3xl" />,
    title: 'Stress Monitor',
    desc: 'Track stress levels & deadlines',
  },
  {
    icon: <FaBell className="text-blue-500 text-3xl" />,
    title: 'Smart Reminders',
    desc: 'AI-based reminders for tasks',
  },
];

const Features = () => (
  <section className="py-16 px-6 bg-gradient-to-b from-blue-100 to-white dark:from-[#1e1e1e] dark:to-[#121212] transition-all">
    <h2 className="text-3xl font-bold text-center mb-10">FEATURES</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {features.map((feat, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05 }}
          className="bg-white/30 dark:bg-gray-800/60 backdrop-blur-xl p-6 rounded-xl shadow-2xl text-center transition-all duration-300 hover:shadow-blue-200 dark:hover:shadow-blue-900"
        >
          <div className="flex items-center justify-center mb-4 h-16">
            {feat.icon}
          </div>
          <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{feat.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 px-6 py-10 mt-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Logo / About */}
      <div>
        <motion.img
          src={qurelLogo}
          alt="QUREL Logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-2 h-10 w-10 rounded-xl shadow-md bg-white/10 p-1"
        />
        <h2 className="text-2xl font-bold text-white">SmartTask</h2>
        <p className="mt-4 text-sm">
          A smarter way to manage tasks, collaborate, and stay productive. Built for teams that aim for greatness.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a href="/" className="hover:text-white">Home</a></li>
          <li><a href="/features" className="hover:text-white">Features</a></li>
          <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
          <li><a href="/contact" className="hover:text-white">Contact</a></li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-lg font-semibold text-white">Resources</h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a href="/faq" className="hover:text-white">FAQ</a></li>
          <li><a href="/docs" className="hover:text-white">Documentation</a></li>
          <li><a href="/support" className="hover:text-white">Support</a></li>
          <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
        </ul>
      </div>

      {/* Contact & Socials */}
      <div>
        <h3 className="text-lg font-semibold text-white">Connect with us</h3>
        <div className="flex space-x-4 mt-4 text-xl">
          <a href="mailto:support@smarttask.com" className="hover:text-white"><FaEnvelope /></a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaGithub /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaLinkedin /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaTwitter /></a>
        </div>
      </div>
    </div>

    <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} SmartTask. All rights reserved.
    </div>
  </footer>
);

// Main App Component
const Mainpage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="font-poppins transition-all">
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-[#121212] dark:to-[#1e1e1e] text-gray-800 dark:text-white">
          <DarkModeToggle />
          <HeroSection />
          <Features />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Mainpage;