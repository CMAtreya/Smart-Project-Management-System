import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTasks, FaChartBar, FaCalendarAlt, FaUser, FaSignOutAlt, 
  FaBell, FaSearch, FaEllipsisH, FaCircleNotch, FaCheckCircle,
  FaRegClock, FaExclamationCircle, FaFilter, FaPlus, FaTrash, FaPencilAlt,
  FaSortAmountDown, FaSortAmountUp, FaClipboardList, FaUsers, FaProjectDiagram,
  FaUserPlus, FaEdit, FaEye, FaArrowRight, FaBuilding, FaUserTie, FaUserCog,
  FaTag, FaCalendarCheck, FaCalendarDay, FaFlag, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

// Add CSS class for system fonts and background patterns
const backgroundCSS = `
  .bg-grid-pattern {
    background-image: 
      linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  .dashboard-card {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .dashboard-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .dashboard-card:hover::before {
    opacity: 1;
  }
`;

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Project Card Component
const ProjectCard = ({ project, onViewDetails, onEdit, onDelete }) => {
  const statusColors = {
    'Not Started': 'bg-gray-500',
    'In Progress': 'bg-blue-500',
    'On Hold': 'bg-yellow-500',
    'Completed': 'bg-green-500',
    'Cancelled': 'bg-red-500'
  };

  const priorityColors = {
    'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'High': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Urgent': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  };

  const priorityIcons = {
    'Low': <FaFlag className="mr-1" />,
    'Medium': <FaFlag className="mr-1" />,
    'High': <FaFlag className="mr-1" />,
    'Urgent': <FaFlag className="mr-1" />
  };

  // Calculate days remaining
  const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining(project.endDate);
  const isOverdue = daysRemaining < 0 && project.status !== 'Completed';

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="dashboard-card bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-blue-900/20"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-white text-lg mb-2">{project.title}</h4>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{project.description}</p>
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[project.priority]}`}>
              {priorityIcons[project.priority]} {project.priority}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full bg-${statusColors[project.status].split('-')[1]}-500/20 text-${statusColors[project.status].split('-')[1]}-400 border border-${statusColors[project.status].split('-')[1]}-500/30`}>
              {project.status}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(project)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaEdit />
          </button>
          <button 
            onClick={() => onDelete(project.id)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-red-400 hover:text-red-300 transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaCalendarDay className="text-gray-400 mr-2" />
            <span className="text-xs text-gray-300">
              {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${isOverdue ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {isOverdue ? 'Overdue' : `${daysRemaining} days left`}
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <FaUsers className="text-gray-400 mr-2" />
            <span className="text-xs text-gray-300">{project.teamMembers.length} team members</span>
          </div>
          <div className="flex -space-x-2">
            {project.teamMembers.slice(0, 3).map((member, index) => (
              <div key={index} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white">
                {member.name.charAt(0)}
              </div>
            ))}
            {project.teamMembers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white">
                +{project.teamMembers.length - 3}
              </div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs font-medium text-white">{project.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${project.progress < 30 ? 'bg-red-500' : project.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <button 
          onClick={() => onViewDetails(project.id)}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition-colors"
        >
          View Details <FaArrowRight className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

// Project Form Modal Component
const ProjectFormModal = ({ isOpen, onClose, project, onSave }) => {
  const initialFormState = project ? {
    ...project,
    startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
    endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : ''
  } : {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    status: 'Not Started',
    progress: 0,
    teamMembers: [],
    tags: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [availableUsers, setAvailableUsers] = useState([
    { id: 'user1', name: 'John Doe', role: 'Developer' },
    { id: 'user2', name: 'Jane Smith', role: 'Designer' },
    { id: 'user3', name: 'Mike Johnson', role: 'Project Manager' },
    { id: 'user4', name: 'Sarah Williams', role: 'QA Engineer' },
    { id: 'user5', name: 'David Brown', role: 'DevOps Engineer' },
    { id: 'user6', name: 'Emily Davis', role: 'UI/UX Designer' },
    { id: 'user7', name: 'Robert Wilson', role: 'Backend Developer' },
    { id: 'user8', name: 'Lisa Taylor', role: 'Frontend Developer' }
  ]);
  const [selectedTag, setSelectedTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (selectedTag && !formData.tags.includes(selectedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, selectedTag]
      }));
      setSelectedTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleAddTeamMember = (user) => {
    if (!formData.teamMembers.some(member => member.id === user.id)) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, user]
      }));
    }
  };

  const handleRemoveTeamMember = (userId) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== userId)
    }));
  };

  const filteredUsers = availableUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {project ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <FaSignOutAlt />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter project description"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Progress ({formData.progress}%)</label>
                <input
                  type="range"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Team Members</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                    placeholder="Search users..."
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="mt-2 max-h-40 overflow-y-auto bg-gray-700 rounded-lg border border-gray-600">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div 
                        key={user.id} 
                        className="flex items-center justify-between p-3 hover:bg-gray-600 cursor-pointer border-b border-gray-600 last:border-b-0"
                        onClick={() => handleAddTeamMember(user)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium mr-3">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.role}</p>
                          </div>
                        </div>
                        <FaUserPlus className="text-blue-400 hover:text-blue-300" />
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-400">No users found</div>
                  )}
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Selected Team Members</h4>
                  {formData.teamMembers.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {formData.teamMembers.map(member => (
                        <div 
                          key={member.id} 
                          className="flex items-center justify-between p-2 bg-gray-700 rounded-lg border border-gray-600"
                        >
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs mr-2">
                              {member.name.charAt(0)}
                            </div>
                            <span className="text-sm text-white">{member.name}</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleRemoveTeamMember(member.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center text-gray-400 bg-gray-700/50 rounded-lg border border-gray-600">
                      No team members selected
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
                <div className="flex">
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a tag</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Testing">Testing</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Research">Research</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-r-lg transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.length > 0 ? (
                    formData.tags.map((tag, index) => (
                      <div 
                        key={index} 
                        className="flex items-center bg-blue-600/30 text-blue-400 px-3 py-1 rounded-full text-sm"
                      >
                        <FaTag className="mr-1 text-xs" />
                        {tag}
                        <button 
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-blue-400 hover:text-blue-300"
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="w-full p-3 text-center text-gray-400 bg-gray-700/50 rounded-lg border border-gray-600">
                      No tags added
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              {project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Main Projects Component
function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('endDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const navigate = useNavigate();
  
  // Add the CSS styles to the document
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.textContent = backgroundCSS;
    document.head.appendChild(styleElement);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Fetch projects (mock data for now)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProjects = [
        {
          id: 1,
          title: 'Website Redesign',
          description: 'Complete overhaul of the company website with modern design and improved user experience',
          startDate: '2023-06-01',
          endDate: '2023-08-15',
          priority: 'High',
          status: 'In Progress',
          progress: 65,
          teamMembers: [
            { id: 'user1', name: 'John Doe', role: 'Developer' },
            { id: 'user2', name: 'Jane Smith', role: 'Designer' },
            { id: 'user6', name: 'Emily Davis', role: 'UI/UX Designer' }
          ],
          tags: ['Frontend', 'UI/UX', 'Design']
        },
        {
          id: 2,
          title: 'Mobile App Development',
          description: 'Develop a cross-platform mobile application for customer engagement and loyalty program',
          startDate: '2023-05-15',
          endDate: '2023-09-30',
          priority: 'Urgent',
          status: 'In Progress',
          progress: 40,
          teamMembers: [
            { id: 'user1', name: 'John Doe', role: 'Developer' },
            { id: 'user7', name: 'Robert Wilson', role: 'Backend Developer' },
            { id: 'user8', name: 'Lisa Taylor', role: 'Frontend Developer' },
            { id: 'user4', name: 'Sarah Williams', role: 'QA Engineer' }
          ],
          tags: ['Mobile', 'Frontend', 'Backend', 'API']
        },
        {
          id: 3,
          title: 'Database Migration',
          description: 'Migrate the existing database to a new cloud-based solution with improved security and performance',
          startDate: '2023-07-01',
          endDate: '2023-08-15',
          priority: 'Medium',
          status: 'Not Started',
          progress: 0,
          teamMembers: [
            { id: 'user5', name: 'David Brown', role: 'DevOps Engineer' },
            { id: 'user7', name: 'Robert Wilson', role: 'Backend Developer' }
          ],
          tags: ['Database', 'DevOps', 'Cloud']
        },
        {
          id: 4,
          title: 'Marketing Campaign',
          description: 'Launch a comprehensive digital marketing campaign to increase brand awareness and customer acquisition',
          startDate: '2023-06-15',
          endDate: '2023-07-30',
          priority: 'Medium',
          status: 'Completed',
          progress: 100,
          teamMembers: [
            { id: 'user3', name: 'Mike Johnson', role: 'Project Manager' }
          ],
          tags: ['Marketing', 'Digital', 'Social Media']
        },
        {
          id: 5,
          title: 'Security Audit',
          description: 'Conduct a comprehensive security audit of all systems and implement necessary improvements',
          startDate: '2023-08-01',
          endDate: '2023-09-15',
          priority: 'High',
          status: 'Not Started',
          progress: 0,
          teamMembers: [
            { id: 'user5', name: 'David Brown', role: 'DevOps Engineer' },
            { id: 'user4', name: 'Sarah Williams', role: 'QA Engineer' }
          ],
          tags: ['Security', 'Compliance', 'DevOps']
        },
        {
          id: 6,
          title: 'Customer Portal Enhancement',
          description: 'Add new features and improve existing functionality in the customer portal',
          startDate: '2023-07-15',
          endDate: '2023-10-30',
          priority: 'Low',
          status: 'In Progress',
          progress: 25,
          teamMembers: [
            { id: 'user1', name: 'John Doe', role: 'Developer' },
            { id: 'user8', name: 'Lisa Taylor', role: 'Frontend Developer' },
            { id: 'user2', name: 'Jane Smith', role: 'Designer' }
          ],
          tags: ['Frontend', 'UX', 'Customer Experience']
        }
      ];
      
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateProject = () => {
    setCurrentProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    // In a real app, you would call an API to delete the project
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const handleSaveProject = (projectData) => {
    if (currentProject) {
      // Update existing project
      setProjects(prev => prev.map(project => 
        project.id === currentProject.id ? { ...project, ...projectData } : project
      ));
    } else {
      // Create new project
      const newProject = {
        ...projectData,
        id: Date.now(), // Generate a temporary ID
        createdAt: new Date().toISOString()
      };
      setProjects(prev => [...prev, newProject]);
    }
    setIsModalOpen(false);
  };

  const handleViewDetails = (projectId) => {
    // Navigate to tasks page with the project ID
    navigate(`/admin/tasks`, { state: { projectId } });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const toggleFilterExpanded = () => {
    setIsFilterExpanded(prev => !prev);
  };

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      // Filter by status
      if (filterStatus !== 'All' && project.status !== filterStatus) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !(
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === 'title') {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Urgent': 4 };
        return sortOrder === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortBy === 'status') {
        return sortOrder === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      } else if (sortBy === 'progress') {
        return sortOrder === 'asc'
          ? a.progress - b.progress
          : b.progress - a.progress;
      } else if (sortBy === 'endDate') {
        return sortOrder === 'asc'
          ? new Date(a.endDate) - new Date(b.endDate)
          : new Date(b.endDate) - new Date(a.endDate);
      }
      return 0;
    });

  // Project statistics
  const projectStats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    notStarted: projects.filter(p => p.status === 'Not Started').length,
    onHold: projects.filter(p => p.status === 'On Hold').length,
    cancelled: projects.filter(p => p.status === 'Cancelled').length,
    urgent: projects.filter(p => p.priority === 'Urgent').length,
    high: projects.filter(p => p.priority === 'High').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white transition-colors duration-300">
      <Navbar />
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-screen"
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-8 pt-20"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center">
                  <FaProjectDiagram className="mr-3 text-blue-500" /> Project Management
                </h1>
                <p className="text-gray-400">Manage and track all company projects</p>
              </div>
              
              <button
                onClick={handleCreateProject}
                className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center transition-colors"
              >
                <FaPlus className="mr-2" /> Create New Project
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-900/30 rounded-lg mr-4">
                    <FaProjectDiagram className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">Total Projects</h3>
                    <p className="text-2xl font-bold text-white">{projectStats.total}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Active: {projectStats.inProgress}</span>
                  <span className="text-gray-400">Completed: {projectStats.completed}</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-yellow-900/30 rounded-lg mr-4">
                    <FaRegClock className="text-yellow-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">In Progress</h3>
                    <p className="text-2xl font-bold text-white">{projectStats.inProgress}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Not Started: {projectStats.notStarted}</span>
                  <span className="text-gray-400">On Hold: {projectStats.onHold}</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-900/30 rounded-lg mr-4">
                    <FaCheckCircle className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">Completed</h3>
                    <p className="text-2xl font-bold text-white">{projectStats.completed}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">This Month: {projectStats.completed}</span>
                  <span className="text-gray-400">Success Rate: 92%</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-red-900/30 rounded-lg mr-4">
                    <FaExclamationCircle className="text-red-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">High Priority</h3>
                    <p className="text-2xl font-bold text-white">{projectStats.high + projectStats.urgent}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Urgent: {projectStats.urgent}</span>
                  <span className="text-gray-400">High: {projectStats.high}</span>
                </div>
              </motion.div>
            </div>

            {/* Filters and Search */}
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-white mr-4">Projects</h3>
                  <button 
                    onClick={toggleFilterExpanded}
                    className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <FaFilter className="mr-2" />
                    Filters
                    {isFilterExpanded ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                  </button>
                </div>
                
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              
              {isFilterExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 border-t border-gray-700"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="title">Project Name</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                        <option value="progress">Progress</option>
                        <option value="endDate">Due Date</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Order</label>
                      <button
                        onClick={toggleSortOrder}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
                      >
                        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg text-center">
                <FaClipboardList className="text-gray-500 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                <p className="text-gray-400 mb-6">Try changing your filters or create a new project</p>
                <button
                  onClick={handleCreateProject}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center mx-auto transition-colors"
                >
                  <FaPlus className="mr-2" /> Create New Project
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProjectFormModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            project={currentProject}
            onSave={handleSaveProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
