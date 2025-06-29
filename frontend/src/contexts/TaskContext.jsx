import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const TaskContext = createContext(null);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Wrap fetchTasks in useCallback
  const fetchTasks = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`/tasks?${queryParams}`);
      setTasks(response.data.tasks);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const getTask = async (taskId) => {
    try {
      const response = await axios.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      toast.error('Failed to load task details');
      throw error;
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await axios.post('/tasks/create', taskData);
      setTasks([...tasks, response.data.task]);

      console.log('Task created:', response.data.task);
      toast.success('Task created successfully');
      return response.data.task;
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
      throw error;
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      const response = await axios.patch(`/tasks/${taskId}`, taskData);
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data.task : task
      ));
      toast.success('Task updated successfully');
      return response.data.task;
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully');
      return { success: true, message: 'Task deleted successfully' };
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
      throw error;
    }
  };

  const assignTask = async (taskId, userId) => {
    try {
      const response = await axios.post(`/tasks/${taskId}/assign`, { userId });
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
      toast.success('Task assigned successfully');
      return response.data;
    } catch (error) {
      console.error('Error assigning task:', error);
      toast.error('Failed to assign task');
      throw error;
    }
  };

  const unassignTask = async (taskId, userId) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}/assign/${userId}`);
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
      toast.success('Task unassigned successfully');
      return response.data;
    } catch (error) {
      console.error('Error unassigning task:', error);
      toast.error('Failed to unassign task');
      throw error;
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.patch(`/tasks/${taskId}/status`, { status });
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
      toast.success('Task status updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status');
      throw error;
    }
  };

  const addComment = async (taskId, comment) => {
    try {
      const response = await axios.post(`/tasks/${taskId}/comments`, { content: comment });
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
      toast.success('Comment added successfully');
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      throw error;
    }
  };

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    assignTask,
    unassignTask,
    updateTaskStatus,
    addComment
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};