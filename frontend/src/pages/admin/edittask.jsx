import React, { useState, useEffect } from 'react';
import { FiCalendar, FiUsers, FiFlag, FiClock, FiList, FiLink } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

export default function EditTask() {
  const { taskId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    assignee: '',
    startDate: '',
    dueDate: '',
    estimatedHours: '',
    priority: 'medium',
    status: 'to-do',
    dependencies: ''
  });

  // Sample project data - in a real app, this would come from an API
  const projects = [
    { id: 1, name: 'Website Redesign' },
    { id: 2, name: 'Mobile App Development' },
    { id: 3, name: 'Marketing Campaign' }
  ];

  // Sample team members - in a real app, this would come from an API
  const teamMembers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Robert Johnson' },
    { id: 4, name: 'Emily Davis' }
  ];

  // Fetch task data
  useEffect(() => {
    // In a real application, you would fetch the task data from your API
    // For this example, we'll simulate loading with setTimeout
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API call
      const taskData = {
        id: taskId,
        title: 'Implement User Authentication',
        description: 'Create login, registration, and password reset functionality with JWT authentication.',
        project: 2, // Mobile App Development
        assignee: 3, // Robert Johnson
        startDate: '2023-07-10',
        dueDate: '2023-07-25',
        estimatedHours: '24',
        priority: 'high',
        status: 'in-progress',
        dependencies: 'TASK-123, TASK-124'
      };

      setFormData(taskData);
      setIsLoading(false);
    }, 1000);
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend API
    console.log('Task data updated:', formData);
    // Show success message or redirect
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Edit Task</h1>
      
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
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}
