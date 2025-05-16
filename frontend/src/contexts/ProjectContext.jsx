import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const ProjectContext = createContext(null);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/projects');
      setProjects(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const getProject = async (projectId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project details');
      throw error;
    }
  };

  const createProject = async (projectData) => {
    try {
      const response = await axios.post('/api/projects', projectData);
      setProjects([...projects, response.data]);
      toast.success('Project created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
      throw error;
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      const response = await axios.put(`/api/projects/${projectId}`, projectData);
      setProjects(projects.map(project => 
        project._id === projectId ? response.data : project
      ));
      toast.success('Project updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
      throw error;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      setProjects(projects.filter(project => project._id !== projectId));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      throw error;
    }
  };

  const addTeamMember = async (projectId, userId) => {
    try {
      const response = await axios.post(`/api/projects/${projectId}/team`, { userId });
      setProjects(projects.map(project => 
        project._id === projectId ? response.data : project
      ));
      toast.success('Team member added successfully');
      return response.data;
    } catch (error) {
      console.error('Error adding team member:', error);
      toast.error('Failed to add team member');
      throw error;
    }
  };

  const removeTeamMember = async (projectId, userId) => {
    try {
      const response = await axios.delete(`/api/projects/${projectId}/team/${userId}`);
      setProjects(projects.map(project => 
        project._id === projectId ? response.data : project
      ));
      toast.success('Team member removed successfully');
      return response.data;
    } catch (error) {
      console.error('Error removing team member:', error);
      toast.error('Failed to remove team member');
      throw error;
    }
  };

  const updateProjectStatus = async (projectId, status) => {
    try {
      const response = await axios.patch(`/api/projects/${projectId}/status`, { status });
      setProjects(projects.map(project => 
        project._id === projectId ? response.data : project
      ));
      toast.success('Project status updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating project status:', error);
      toast.error('Failed to update project status');
      throw error;
    }
  };

  const value = {
    projects,
    loading,
    error,
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    addTeamMember,
    removeTeamMember,
    updateProjectStatus
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};