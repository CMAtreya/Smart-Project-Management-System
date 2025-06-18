import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

// Create context
const AuthContext = createContext(null);

// Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Axios default config
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;

  // Inject token into headers
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle 401 responses globally
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    checkAuth();
  }, []);

  // Check login status
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('/auth/me');
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN
  const login = async ({ email, password, role }) => {
    try {
      const res = await axios.post('/auth/login', { email, password, role });
      const { token, user } = res.data;
      console.log("Login API response:", res.data);

      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);

      toast.success('Login successful!');
      return user;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      toast.error(msg);
      throw err;
    }
  };

  // ✅ REGISTER
  const register = async (userData) => {
    try {
      const res = await axios.post('/auth/register', userData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);

      toast.success('Registration successful!');
      return user;
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg);
      throw err;
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
    
    // Redirect to landing page
    window.location.href = '/';
  };

  // ✅ UPDATE PROFILE
  const updateProfile = async (userData) => {
    try {
      const res = await axios.put('/api/auth/profile', userData);
      setUser(res.data);
      toast.success('Profile updated!');
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed';
      toast.error(msg);
      throw err;
    }
  };

  // Provide context value
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
