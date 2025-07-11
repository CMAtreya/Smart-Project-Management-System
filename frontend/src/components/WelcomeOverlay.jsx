import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  "Success is not the key to happiness. Happiness is the key to success.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Opportunities don't happen, you create them.",
  "Don't watch the clock; do what it does. Keep going.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Stay positive, work hard, make it happen."
];

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 1 } }
};

const quoteVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: -40, transition: { duration: 1 } }
};

// Use the public folder for the music file
const MUSIC_URL = '/welcome.mp3';

const WelcomeOverlay = ({ show, onFinish, userName }) => {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, [show]);

  // Subtle fade out when overlay ends
  useEffect(() => {
    const audio = document.getElementById('welcome-audio');
    let fadeInterval;
    if (!show && audio && !audio.paused && audio.volume > 0) {
      let fadeDuration = 1500; // ms
      let fadeSteps = 30;
      let step = audio.volume / fadeSteps;
      let currentStep = 0;
      fadeInterval = setInterval(() => {
        if (audio.volume - step > 0 && currentStep < fadeSteps) {
          audio.volume = Math.max(0, audio.volume - step);
          currentStep++;
        } else {
          audio.volume = 0;
          audio.pause();
          audio.currentTime = 0;
          clearInterval(fadeInterval);
        }
      }, fadeDuration / fadeSteps);
    } else if (!show && audio) {
      // If already paused or volume is 0, just reset
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1.0;
    }
    return () => clearInterval(fadeInterval);
  }, [show]);

  useEffect(() => {
    const audio = document.getElementById('welcome-audio');
    if (audio) {
      audio.currentTime = 21; // Start from 1 minute
      audio.play();
      audio.muted = false;
      audio.volume = 1.0;
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 dark:from-[#1e1e1e] dark:via-[#232946] dark:to-[#121212] text-white"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="bg-white/10 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-10 max-w-lg w-full flex flex-col items-center border border-indigo-400/30 backdrop-blur-xl"
            variants={quoteVariants}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-center">
              Welcome{userName ? `, ${userName}` : ''}!
            </h1>
            <p className="text-lg md:text-xl text-center text-gray-200 font-medium mb-6 animate-pulse">
              {quote}
            </p>
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-xs text-gray-300 mt-2">Preparing your dashboard...</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay; 