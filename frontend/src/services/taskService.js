import axios from 'axios';

// Base URL from environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Task service functions
const taskService = {
  // Get all tasks with optional filters
  getAllTasks: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/tasks${queryParams ? `?${queryParams}` : ''}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch tasks' };
    }
  },

  // Get tasks by project ID
  getTasksByProject: async (projectId) => {
    try {
      const response = await api.get(`/tasks?project=${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch project tasks' };
    }
  },

  // Get task by ID
  getTaskById: async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch task' };
    }
  },

  // Create new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create task' };
    }
  },

  // Update task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update task' };
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete task' };
    }
  },

  // Add comment to task
  addComment: async (taskId, commentData) => {
    try {
      const response = await api.post(`/tasks/${taskId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add comment' };
    }
  }
};

export default taskService;