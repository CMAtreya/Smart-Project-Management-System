import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../contexts/AuthContext';

 // ✅ Correct way to access login


import axios from 'axios'

const quotes = [
  "Efficiency is doing things right; effectiveness is doing the right things.",
  "Teamwork divides the task and multiplies the success.",
  "Quality means doing it right when no one is looking.",
  "Work smart. Get things done. No nonsense. Move fast.",
  "Great things in business are never done by one person."
];

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [errors, setErrors] = useState({});
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const navigate = useNavigate();   
const { login } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsAdminMode(!isAdminMode);
      setEmail("");
      setPassword("");
      setAdminSecretKey("");
      setErrors({});
      setIsFlipping(false);
    }, 300);
  };

 const handleSignupClick = () => {
    navigate('/signup');
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const audio = document.getElementById('welcome-audio');
  if (audio) {
    audio.currentTime = 60;
    audio.muted = false;
    audio.volume = 1.0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Audio started successfully');
          // Delay navigation to ensure audio starts
          setTimeout(async () => {
            const role = isAdminMode ? 'admin' : 'user';
            const loginData = { email, password, role };
            if (isAdminMode) {
              loginData.adminSecretKey = adminSecretKey;
            }
            try {
              const loggedInUser = await login(loginData);
              if (loggedInUser.role === 'admin') {
                navigate('/admin/dashboard');
              } else {
                navigate('/user/dashboard');
              }
            } catch (err) {
              const msg = err.response?.data?.message || "Login failed";
              setErrors({ api: msg });
            }
          }, 100); // 100ms delay
        })
        .catch((error) => {
          console.error('Audio play failed:', error);
        });
      return;
    }
  }

  // ...rest of your login logic (if playPromise is undefined)
  const role = isAdminMode ? 'admin' : 'user';
  const loginData = { email, password, role };
  if (isAdminMode) {
    loginData.adminSecretKey = adminSecretKey;
  }
  try {
    const loggedInUser = await login(loginData);
    if (loggedInUser.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  } catch (err) {
    const msg = err.response?.data?.message || "Login failed";
    setErrors({ api: msg });
  }
};


  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#161b22] rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-800 via-blue-900 to-purple-900 p-10 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-8">THE FUTURE OF WORK</h1>
          <div className="relative h-32 text-lg italic font-medium">
            {quotes.map((q, i) => (
              <p
                key={i}
                className={`absolute transition-opacity duration-1000 ${
                  i === quoteIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                "{q}"
              </p>
            ))}
          </div>
          <p className="mt-10 text-sm text-blue-300">
            Empowering productivity and collaboration for the modern workplace.
          </p>
        </div>

        {/* Right Side with Flip Animation */}
        <div className="md:w-1/2 p-8 text-white">
          <div className={`transition-opacity duration-300 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}>
            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#0d1117] rounded p-1 flex border border-gray-700">
                <button
                  type="button"
                  onClick={handleFlip}
                  className={`px-4 py-2 rounded font-semibold transition ${
                    !isAdminMode 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  User Login
                </button>
                <button
                  type="button"
                  onClick={handleFlip}
                  className={`px-4 py-2 rounded font-semibold transition ${
                    isAdminMode 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Admin Login
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center">
              {isAdminMode ? 'Admin Sign In' : 'Sign In'}
            </h1>

            {errors.api && (
              <div className={`mb-4 p-3 border rounded text-sm ${
                errors.api.includes('successful') 
                  ? 'bg-green-900/50 border-green-500 text-green-200'
                  : 'bg-red-900/50 border-red-500 text-red-200'
              }`}>
                {errors.api}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded px-4 py-2 bg-[#0d1117] border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:border-blue-500`}
                  placeholder="email@example.com"
                />
                {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded px-4 py-2 bg-[#0d1117] border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } focus:outline-none focus:border-blue-500`}
                  placeholder="********"
                />
                {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
              </div>

              {/* Admin Secret Key - Only shown in admin mode */}
              {isAdminMode && (
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Admin Secret Key</label>
                  <input
                    type="password"
                    value={adminSecretKey}
                    onChange={(e) => setAdminSecretKey(e.target.value)}
                    className={`w-full rounded px-4 py-2 bg-[#0d1117] border ${
                      errors.adminSecretKey ? "border-red-500" : "border-gray-700"
                    } focus:outline-none focus:border-blue-500`}
                    placeholder="Enter admin secret key"
                  />
                  {errors.adminSecretKey && (
                    <p className="text-red-500 mt-1 text-sm">{errors.adminSecretKey}</p>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 mt-6 rounded font-semibold transition"
              >
                Sign In as {isAdminMode ? 'Admin' : 'User'}
              </button>
            </form>

            </div><br/>
            Don't have an account?{" "}
               <button
      className="text-blue-400 hover:underline bg-transparent border-none cursor-pointer"
      onClick={handleSignupClick}
    >
      Sign Up
    </button>
          </div>
        </div>
      </div>
  
  );
}