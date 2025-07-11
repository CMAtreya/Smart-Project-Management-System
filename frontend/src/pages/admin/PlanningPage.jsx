import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPlus, FaLink, FaFigma, FaTrash, FaEdit, FaArrowLeft, FaClipboard, FaCheck, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

const PlanningPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [figmaLinks, setFigmaLinks] = useState([]);
  const [newFigmaLink, setNewFigmaLink] = useState('');
  const [linkName, setLinkName] = useState('');
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  // Simulate loading
  useEffect(() => {
    // In a real app, you would fetch the figma links from your backend
    setTimeout(() => {
      setLoading(false);
      // Mock data for demonstration
      setFigmaLinks([
        { id: 1, name: 'Homepage Wireframe', url: 'https://www.figma.com/file/example1', date: '2023-06-15', createdBy: 'John Doe' },
        { id: 2, name: 'User Dashboard', url: 'https://www.figma.com/file/example2', date: '2023-06-20', createdBy: 'Jane Smith' },
        { id: 3, name: 'Admin Panel Design', url: 'https://www.figma.com/file/example3', date: '2023-06-25', createdBy: 'Admin User' },
      ]);
      
      // Mock project details
      setProjectDetails({
        id: 1,
        title: 'Smart Project Management System',
        description: 'A comprehensive project management system with task tracking, team collaboration, and analytics.',
        startDate: '2023-06-01',
        endDate: '2023-08-30',
        status: 'In Progress',
        priority: 'High'
      });
      
      // Mock project tasks
      setProjectTasks([
        { id: 1, title: 'Design UI wireframes', status: 'Completed', assignedTo: 'John Doe' },
        { id: 2, title: 'Create user dashboard', status: 'In Progress', assignedTo: 'Jane Smith' },
        { id: 3, title: 'Implement authentication', status: 'Not Started', assignedTo: 'Alex Johnson' },
      ]);

      // Mock team members
      setTeamMembers([
        { id: 1, name: 'John Doe', role: 'UI Designer', avatar: 'JD' },
        { id: 2, name: 'Jane Smith', role: 'Frontend Developer', avatar: 'JS' },
        { id: 3, name: 'Alex Johnson', role: 'Backend Developer', avatar: 'AJ' },
      ]);
    }, 1000);
  }, [user]);

  const handleOpenFigma = () => {
    window.open('https://www.figma.com/file/new', '_blank');
  };

  const handleAddLink = () => {
    if (newFigmaLink && linkName) {
      const newLink = {
        id: figmaLinks.length + 1,
        name: linkName,
        url: newFigmaLink,
        date: new Date().toISOString().split('T')[0],
        createdBy: user?.name || 'Admin User'
      };
      setFigmaLinks([...figmaLinks, newLink]);
      setNewFigmaLink('');
      setLinkName('');
      setIsAddingLink(false);
    }
  };

  const handleEditLink = (link) => {
    setEditingLink(link);
    setNewFigmaLink(link.url);
    setLinkName(link.name);
    setIsAddingLink(true);
  };

  const handleUpdateLink = () => {
    if (editingLink && newFigmaLink && linkName) {
      const updatedLinks = figmaLinks.map(link => 
        link.id === editingLink.id 
          ? { ...link, name: linkName, url: newFigmaLink } 
          : link
      );
      setFigmaLinks(updatedLinks);
      setNewFigmaLink('');
      setLinkName('');
      setIsAddingLink(false);
      setEditingLink(null);
    }
  };

  const handleDeleteLink = (id) => {
    setFigmaLinks(figmaLinks.filter(link => link.id !== id));
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button 
          onClick={() => navigate('/admin/project-architecture')} 
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Project Architecture
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Project details and team members */}
          <div className="w-full md:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Project Details</h2>
              {projectDetails && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{projectDetails.title}</h3>
                  <p className="text-gray-300">{projectDetails.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Start Date:</span>
                      <p>{projectDetails.startDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">End Date:</span>
                      <p>{projectDetails.endDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <p className="text-blue-400">{projectDetails.status}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Priority:</span>
                      <p className="text-yellow-400">{projectDetails.priority}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Team Members</h2>
              <div className="space-y-4">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center p-3 bg-gray-700 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white font-medium">{member.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Tasks Overview</h2>
              <div className="space-y-4">
                {projectTasks.map(task => (
                  <div key={task.id} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-400">Assigned to: {task.assignedTo}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${task.status === 'Completed' ? 'bg-green-900/50 text-green-400' : task.status === 'In Progress' ? 'bg-blue-900/50 text-blue-400' : 'bg-gray-600 text-gray-300'}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - Figma links */}
          <div className="w-full md:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-400">Planning & Design</h2>
                <button 
                  onClick={handleOpenFigma} 
                  className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <FaFigma className="mr-2" /> New Figma File
                </button>
              </div>

              <p className="text-gray-300 mb-6">
                Create and manage design files for your project. Instruct team members to copy the link after working on a Figma file and save it here for easy access by the entire team.
              </p>

              {/* Add new link form */}
              <div className={`bg-gray-700/50 rounded-lg p-4 mb-6 ${isAddingLink ? 'block' : 'hidden'}`}>
                <h3 className="text-lg font-semibold mb-3">{editingLink ? 'Edit Figma Link' : 'Add New Figma Link'}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Link Name</label>
                    <input 
                      type="text" 
                      value={linkName}
                      onChange={(e) => setLinkName(e.target.value)}
                      placeholder="e.g., Homepage Design"
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Figma URL</label>
                    <input 
                      type="text" 
                      value={newFigmaLink}
                      onChange={(e) => setNewFigmaLink(e.target.value)}
                      placeholder="https://www.figma.com/file/..."
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={editingLink ? handleUpdateLink : handleAddLink} 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                      disabled={!newFigmaLink || !linkName}
                    >
                      {editingLink ? 'Update' : 'Save'}
                    </button>
                    <button 
                      onClick={() => {
                        setIsAddingLink(false);
                        setNewFigmaLink('');
                        setLinkName('');
                        setEditingLink(null);
                      }} 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {/* Add link button */}
              {!isAddingLink && (
                <button 
                  onClick={() => setIsAddingLink(true)} 
                  className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-6 transition-colors"
                >
                  <FaPlus className="mr-2" /> Add Figma Link
                </button>
              )}

              {/* Figma links list */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Design Files</h3>
                {figmaLinks.length === 0 ? (
                  <p className="text-gray-400 italic">No Figma links saved yet. Add your first design file!</p>
                ) : (
                  figmaLinks.map(link => (
                    <motion.div 
                      key={link.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-700 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div>
                        <h4 className="font-medium flex items-center">
                          <FaFigma className="text-purple-400 mr-2" /> {link.name}
                        </h4>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <span className="mr-3">Created: {link.date}</span>
                          <span>By: {link.createdBy}</span>
                        </div>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-purple-400 hover:text-purple-300 mt-1 block truncate max-w-xs"
                        >
                          {link.url}
                        </a>
                      </div>
                      <div className="flex space-x-2 self-end md:self-center">
                        <button 
                          onClick={() => handleCopyLink(link.url)}
                          className="p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
                          title="Copy link"
                        >
                          {copied ? <FaCheck /> : <FaClipboard />}
                        </button>
                        <button 
                          onClick={() => handleEditLink(link)}
                          className="p-2 bg-blue-600 hover:bg-blue-500 rounded transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningPage;