import React, { useState } from 'react';
import { FiCalendar, FiUsers, FiFlag, FiFileText, FiX, FiPlus } from 'react-icons/fi';
import projectService from "../../services/projectService";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'medium',
    teamMembers: [],
    tags: []
  });

  const [teamMember, setTeamMember] = useState('');
  const [tag, setTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Single handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTeamMember = () => {
    if (teamMember.trim() !== '' && !formData.teamMembers.includes(teamMember.trim())) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, teamMember.trim()]
      }));
      setTeamMember('');
    }
  };

  const handleRemoveTeamMember = (member) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m !== member)
    }));
  };

  const handleAddTag = () => {
    if (tag.trim() !== '' && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    
    try {
      // Send data to backend
      const response = await projectService.createProject(formData);
      console.log("Project created:", response);
      setSuccess("Project created successfully!");
      
      // Reset form or redirect after short delay
      setTimeout(() => {
        navigate("/admin/projects");
      }, 2000);
    } catch (err) {
      console.error("Error creating project:", err);
      setError(err.message || "Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Create New Project</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Title
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

        {/* Project Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          ></textarea>
        </div>

        {/* Project Dates */}
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
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FiCalendar className="inline mr-1" /> End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Project Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiFlag className="inline mr-1" /> Priority
          </label>
          <div className="flex space-x-4">
            {['low', 'medium', 'high'].map((priority) => (
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

        {/* Team Members */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiUsers className="inline mr-1" /> Team Members
          </label>
          <div className="flex">
            <input
              type="text"
              value={teamMember}
              onChange={(e) => setTeamMember(e.target.value)}
              placeholder="Add team member"
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddTeamMember}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FiPlus />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center">
                <span>{member}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTeamMember(member)}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 focus:outline-none"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <FiFileText className="inline mr-1" /> Tags
          </label>
          <div className="flex">
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add tag"
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FiPlus />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full flex items-center">
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
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
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Project..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
