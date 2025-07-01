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
        const response = await axios.get('/projects');
      // Ensure projects is always an array
      const data = Array.isArray(response.data) ? response.data : (response.data.projects || []);
      setProjects(data);
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
      const response = await axios.get(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project details');
      throw error;
    }
  };

  const createProject = async (projectData) => {
    try {
      console.log(" this is called to create project ");
      const response = await axios.post('/projects/create', projectData);
      // Support both { project: ... } and direct object
      const createdProject = response.data.project || response.data;
      if (!createdProject._id) {
        throw new Error('Project creation failed: No project ID returned from backend.');
      }
      // Remove addTeamMember loop: backend should handle teamMembers on creation
      setProjects([...projects, createdProject]);
      toast.success('Project created successfully');
      return createdProject;
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
      throw error;
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      console.log("endered the project update request ")
      const response = await axios.patch(`/projects/${projectId}`, projectData);
      // Support both { project: ... } and direct object
    console.log("  the request is sent ")
      const updatedProject = response.data.project || response.data;
      setProjects(projects.map(project => 
        project._id === projectId ? updatedProject : project
      ));
      toast.success('Project updated successfully');
      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
      throw error;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`/projects/${projectId}`);
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
      console.log(" this is called to add memebers ")
      const response = await axios.post(`/projects/${projectId}/team`, { userId });
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
      const response = await axios.delete(`/projects/${projectId}/team/${userId}`);
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
      const response = await axios.patch(`/projects/${projectId}/status`, { status });
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

  // Fetch all users for team member selection
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/auth/all-users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      throw error;
    }
  };

  // Fetch projects for a specific user
  const fetchUserProjects = async (userId) => {
    try {
      const usertoken = localStorage.getItem("token");
      const response = await axios.get(`/projects/user/${userId}`, {
        headers: {
          Authorization: usertoken
        }
      });
      // Ensure response is an array and fallback to []
      const projectsArr = Array.isArray(response.data.projects)
        ? response.data.projects
        : (Array.isArray(response.data) ? response.data : []);
      return projectsArr;
    } catch (error) {
      console.error('Error fetching user projects:', error);
      toast.error('Failed to load user projects');
      return [];
    }
  };

  // Fetch projects created by a specific admin
  const fetchAdminProjects = async (adminId) => {
    try {
      const usertoken = localStorage.getItem("token");
      const response = await axios.get(`/projects/created-by/${adminId}`, {
        headers: {
          Authorization: usertoken
        }
      });
      // Ensure response is an array and fallback to []
      const projectsArr = Array.isArray(response.data.projects)
        ? response.data.projects
        : (Array.isArray(response.data) ? response.data : []);
      return projectsArr;
    } catch (error) {
      console.error('Error fetching admin projects:', error);
      toast.error('Failed to load admin projects');
      return [];
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
    updateProjectStatus,
    fetchUsers, // <-- add fetchUsers to context value
    fetchUserProjects, // <-- add fetchUserProjects to context value
    fetchAdminProjects // <-- add fetchAdminProjects to context value
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};