import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import taskService from '../../services/taskService';
import projectService from '../../services/projectService';
import { FiCalendar, FiUsers, FiFlag, FiClock, FiList, FiLink } from 'react-icons/fi';

export default function CreateTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    assignees: [],
    startDate: '',
    dueDate: '',
    estimatedHours: '',
    priority: 'medium',
    status: 'to-do',
    dependencies: []
  });
  
  const [assignee, setAssignee] = useState('');
  const [dependency, setDependency] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // For project dropdown
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  
  // Sample team members - in a real app, this would come from an API
  const teamMembers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Robert Johnson' },
    { id: 4, name: 'Emily Davis' }
  ];

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAllProjects();
        setProjects(data.projects || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddAssignee = () => {
    if (assignee.trim() !== '' && !formData.assignees.includes(assignee.trim())) {
      setFormData({
        ...formData,
        assignees: [...formData.assignees, assignee.trim()]
      });
      setAssignee('');
    }
  };

  const handleRemoveAssignee = (member) => {
    setFormData({
      ...formData,
      assignees: formData.assignees.filter((m) => m !== member)
    });
  };

  const handleAddDependency = () => {
    if (dependency.trim() !== '' && !formData.dependencies.includes(dependency.trim())) {
      setFormData({
        ...formData,
        dependencies: [...formData.dependencies, dependency.trim()]
      });
      setDependency('');
    }
  };

  const handleRemoveDependency = (dep) => {
    setFormData({
      ...formData,
      dependencies: formData.dependencies.filter((d) => d !== dep)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    
    try {
      // Send data to backend
      const response = await taskService.createTask(formData);
      console.log('Task created:', response);
      setSuccess('Task created successfully!');
      
      // Reset form or redirect after short delay
      setTimeout(() => {
        navigate('/admin/tasks');
      }, 2000);
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.message || 'Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Create New Task</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Task Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          ></textarea>
        </div>

        {/* Project Selection */}
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiList className="inline mr-1" /> Project
          </label>
          <select
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select a project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>

        {/* Assignee */}
        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiUsers className="inline mr-1" /> Assignee
          </label>
          <select
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Assign to</option>
            {teamMembers.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>

        {/* Task Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FiCalendar className="inline mr-1" /> Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FiCalendar className="inline mr-1" /> Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Estimated Hours */}
        <div>
          <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiClock className="inline mr-1" /> Estimated Hours
          </label>
          <input
            type="number"
            id="estimatedHours"
            name="estimatedHours"
            value={formData.estimatedHours}
            onChange={handleChange}
            min="0"
            step="0.5"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Task Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiFlag className="inline mr-1" /> Priority
          </label>
          <div className="flex space-x-4">
            {['low', 'medium', 'high', 'urgent'].map((priority) => (
              <label key={priority} className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={formData.priority === priority}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">{priority}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Task Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Dependencies */}
        <div>
          <label htmlFor="dependencies" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiLink className="inline mr-1" /> Dependencies (Task IDs, comma separated)
          </label>
          <input
            type="text"
            id="dependencies"
            name="dependencies"
            value={formData.dependencies}
            onChange={handleChange}
            placeholder="e.g. TASK-123, TASK-456"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Task..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
