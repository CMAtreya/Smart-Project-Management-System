import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import {
  FaSearch, FaEllipsisH, FaCircleNotch, FaCheckCircle,
  FaRegClock, FaExclamationCircle, FaFilter, FaTrash, FaPencilAlt,
  FaSortAmountDown, FaSortAmountUp, FaClipboardList, FaUsers, FaProjectDiagram,
  FaEdit, FaEye, FaArrowRight, 
  FaCalendarCheck, FaCalendarDay, FaFlag, FaChevronDown, FaChevronUp,
  FaUserFriends, FaCode, FaGithub, FaCodeBranch,
  FaExclamationTriangle, FaHourglassHalf, FaLink, FaExternalLinkAlt, FaCircle
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';
import axios from 'axios';

// Add CSS class for system fonts and background patterns
const backgroundCSS = `
  .bg-grid-pattern {
    background-image: 
      linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  .dashboard-card {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
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
    z-index: -1;
    background-image: radial-gradient(#3182ce 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  .dashboard-card:hover::before {
    opacity: 0.05;
  }
`;

// Loader component
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onViewDetails }) => {
  const statusColors = {
    'Not Started': 'bg-gray-500',
    'In Progress': 'bg-blue-500',
    'On Hold': 'bg-yellow-500',
    'Completed': 'bg-green-500',
    'Cancelled': 'bg-red-500'
  };
    const navigate = useNavigate();


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
    if (!endDate) return 0;
    
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
            {project.taskType && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {project.taskType}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaCalendarDay className="text-gray-400 mr-2" />
            <span className="text-xs text-gray-300">
              {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}
            </span>
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${isOverdue ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {isOverdue ? 'Overdue' : project.endDate ? `${daysRemaining} days left` : 'No deadline'}
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <FaUsers className="text-gray-400 mr-2" />
            <span className="text-xs text-gray-300">{project.teamMembers?.length || 0} team members</span>
          </div>
          <div className="flex -space-x-2">            
            {project.teamMembers && project.teamMembers.length > 0 ? (
              <>
                {project.teamMembers.slice(0, 3).map((member, index) => (
                  <div key={index} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white">
                    {member?.name ? member.name.charAt(0) : member?.email?.charAt(0) || '?'}
                  </div>
                ))}
                {(project.teamMembers.length > 3) && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white">
                    +{project.teamMembers.length - 3}
                  </div>
                )}
              </>
            ) : (
              <span className="text-xs text-gray-400">No team members</span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs font-medium text-white">{project.progress || 0}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${(project.progress || 0) < 30 ? 'bg-red-500' : (project.progress || 0) < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${project.progress || 0}%` }}
            ></div>
          </div>
        </div>

        <button 
          onClick={() => onViewDetails(project.id)}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition-colors"
          aria-label="View project details"
        >
          View Details <FaArrowRight className="ml-2" />
        </button>
        <button
          onClick={() => navigate(`/user/projectarch`, { state: { projectId: project._id } })}
          className="w-full mt-2 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg flex items-center justify-center transition-colors"
          aria-label="View project architecture"
        >
          Project Architecture
        </button>
      </div>
    </motion.div>
  );
};

// Task Card Component for Project Details
const TaskCard = ({ task }) => {
  const statusColors = {
    'To Do': 'bg-yellow-500',
    'In Progress': 'bg-blue-500',
    'Completed': 'bg-green-500',
    'Blocked': 'bg-red-500',
    'Pending': 'bg-purple-500'
  };

  const priorityColors = {
    'Low': 'text-green-400',
    'Medium': 'text-yellow-400',
    'High': 'text-red-400',
    'Urgent': 'text-purple-400'
  };

  const priorityIcons = {
    'Low': <FaFlag className="mr-1" title="Low Priority" />,
    'Medium': <FaFlag className="mr-1" title="Medium Priority" />,
    'High': <FaFlag className="mr-1" title="High Priority" />,
    'Urgent': <FaFlag className="mr-1" title="Urgent Priority" />
  };

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 5px 15px -5px rgba(0, 0, 0, 0.3)' }}
      className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-md"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-white">{task.title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]} bg-opacity-20 border border-opacity-30`}>
          {priorityIcons[task.priority]} {task.priority}
        </span>
      </div>
      
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaRegClock className="text-gray-500 mr-1" />
          <span className="text-xs text-gray-400">{task.dueDate ? task.dueDate : 'No due date'}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status].replace('bg-', 'bg-').replace('500', '500/20')} ${statusColors[task.status].replace('bg-', 'text-').replace('500', '400')}`}>
            {task.status}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          {task.assignedTo ? (
            <div className="flex -space-x-2">
              {typeof task.assignedTo === 'string' ? (
                <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white" title={task.assignedTo}>
                  {task.assignedTo.charAt(0)}
                </div>
              ) : (
                task.assignedTo.map((member, idx) => (
                  <div key={idx} className="w-6 h-6 rounded-full bg-blue-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white" title={member}>
                    {member.charAt(0)}
                  </div>
                ))
              )}
            </div>
          ) : (
            <span className="text-xs text-gray-500">Unassigned</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded flex items-center">
            <FaGithub className="mr-1" /> GitHub
          </a>
          <a href="vscode://" className="text-xs bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 px-2 py-1 rounded flex items-center">
            <FaVisualStudioCode className="mr-1" /> VS Code
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Project Details Component
const ProjectDetails = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <button 
            onClick={onBack}
            className="mb-4 text-sm text-blue-400 hover:text-blue-300 flex items-center"
          >
            <FaChevronDown className="transform rotate-90 mr-1" /> Back to Projects
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-gray-300 mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-xs px-2 py-1 rounded-full bg-${project.status === 'Completed' ? 'green' : project.status === 'In Progress' ? 'blue' : project.status === 'On Hold' ? 'yellow' : 'gray'}-500/20 text-${project.status === 'Completed' ? 'green' : project.status === 'In Progress' ? 'blue' : project.status === 'On Hold' ? 'yellow' : 'gray'}-400 border border-${project.status === 'Completed' ? 'green' : project.status === 'In Progress' ? 'blue' : project.status === 'On Hold' ? 'yellow' : 'gray'}-500/30`}>
              {project.status}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full bg-${project.priority === 'High' ? 'red' : project.priority === 'Medium' ? 'yellow' : 'green'}-500/20 text-${project.priority === 'High' ? 'red' : project.priority === 'Medium' ? 'yellow' : 'green'}-400 border border-${project.priority === 'High' ? 'red' : project.priority === 'Medium' ? 'yellow' : 'green'}-500/30`}>
              {project.priority} Priority
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Start Date</p>
              <p className="text-sm font-medium text-white">{new Date(project.startDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">End Date</p>
              <p className="text-sm font-medium text-white">{new Date(project.endDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Progress</p>
              <div className="flex items-center">
                <div className="w-full h-2 bg-gray-600 rounded-full mr-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${project.progress < 30 ? 'bg-red-500' : project.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-white">{project.progress}%</span>
              </div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Team Size</p>
              <p className="text-sm font-medium text-white">{project.teamMembers?.length || 0} members</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'tasks' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'team' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('team')}
          >
            Team
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'resources' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </div>
        
        {activeTab === 'tasks' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Project Tasks</h3>
              <div className="flex items-center space-x-2">
                <Link 
                  to="/user/tasks" 
                  state={{ projectId: project.id }}
                  className="text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-1.5 flex items-center transition-colors"
                >
                  <FaEye className="mr-2" /> View All Tasks
                </Link>
                <select className="text-sm bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-1.5">
                  <option value="all">All Tasks</option>
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.tasks && project.tasks.length > 0 ? (
                project.tasks.map((task, index) => (
                  <TaskCard key={index} task={task} />
                ))
              ) : (
                <p className="text-gray-400 col-span-2 text-center py-8">No tasks found for this project.</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'team' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Team Members</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.teamMembers && project.teamMembers.length > 0 ? (
                project.teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                        {member.name ? member.name.charAt(0) : member.email?.charAt(0) || '?'}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{member.name || member.email}</h4>
                        <p className="text-xs text-gray-400">{member.role || 'Team Member'}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 col-span-3 text-center py-8">No team members assigned to this project.</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'resources' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Project Resources</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 mr-3">
                    <FaGithub size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">GitHub Repository</h4>
                    <a href="https://github.com/company/project" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">github.com/company/project</a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 mr-3">
                    <FaCode size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">VS Code Workspace</h4>
                    <a href="vscode://" className="text-xs text-blue-400 hover:underline">Open in VS Code</a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 mr-3">
                    <FaCode size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">API Documentation</h4>
                    <a href="#" className="text-xs text-blue-400 hover:underline">View Documentation</a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 mr-3">
                    <FaCodeBranch size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Development Environment</h4>
                    <a href="#" className="text-xs text-blue-400 hover:underline">Access Dev Environment</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Main Projects Component
function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('endDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(false); // <-- NEW
  const { user } = useAuth(); // Get user from context
  const { fetchUserProjects } = useProject(); // Get fetchUserProjects from context
  const location = useLocation();
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
  
  useEffect(() => {
    const fetchProjectsForUser = async () => {
      setLoading(true); // Ensure loading state is set on user change
      if (!user || !user._id) {
        setProjects([]);
        setLoading(false);
        return;
      }
      try {
        const projectsArr = await fetchUserProjects(user._id);
        setProjects(projectsArr);
        setLoading(false);
      } catch (error) {
        setProjects([]);
        setLoading(false);
      }
    };
    fetchProjectsForUser();
  }, [user, fetchUserProjects, location]);

  // Fetch a single project by ID from backend
  const fetchProjectById = async (projectId) => {
    setProjectLoading(true);
    try {
      const res = await axios.get(`/projects/${projectId}`);
      setSelectedProject(res.data);
    } catch (err) {
      toast.error('Failed to fetch project details.');
      setSelectedProject(null);
    } finally {
      setProjectLoading(false);
    }
  };

  // When a project is clicked, fetch its details from backend
  const handleViewDetails = (projectId) => {
    fetchProjectById(projectId);
  };

  // If selectedProject is set (e.g. after refresh), fetch its details
  useEffect(() => {
    if (location.state && location.state.projectId) {
      fetchProjectById(location.state.projectId);
    }
    // eslint-disable-next-line
  }, []);

  const handleBackToProjects = () => {
    setSelectedProject(null);
    navigate('/user/projects');
  };

  // Filter and sort projects
  const filteredProjects = projects.filter(project => {
    // Filter by status
    if (filterStatus !== 'All' && project.status !== filterStatus) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by selected field
    let valueA, valueB;
    
    switch (sortBy) {
      case 'title':
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
        break;
      case 'priority':
        const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Urgent': 4 };
        valueA = priorityOrder[a.priority] || 0;
        valueB = priorityOrder[b.priority] || 0;
        break;
      case 'status':
        const statusOrder = { 'Not Started': 1, 'In Progress': 2, 'On Hold': 3, 'Completed': 4, 'Cancelled': 5 };
        valueA = statusOrder[a.status] || 0;
        valueB = statusOrder[b.status] || 0;
        break;
      case 'progress':
        valueA = a.progress;
        valueB = b.progress;
        break;
      case 'startDate':
        valueA = new Date(a.startDate).getTime();
        valueB = new Date(b.startDate).getTime();
        break;
      case 'endDate':
      default:
        valueA = new Date(a.endDate).getTime();
        valueB = new Date(b.endDate).getTime();
        break;
    }
    
    // Apply sort order
    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence>
            {loading ? (
              <Loader />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {!selectedProject ? (
                  <>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <h1 className="text-2xl font-bold mb-4 md:mb-0">My Projects</h1>
                      
                      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <FaSearch className="absolute right-3 top-3 text-gray-400" />
                        </div>
                        
                        <button
                          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center justify-center"
                        >
                          <FaFilter className="mr-2" /> Filters
                        </button>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {isFilterExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                              <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
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
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              >
                                <option value="endDate">Deadline</option>
                                <option value="startDate">Start Date</option>
                                <option value="title">Title</option>
                                <option value="priority">Priority</option>
                                <option value="status">Status</option>
                                <option value="progress">Progress</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-400 mb-1">Sort Order</label>
                              <div className="flex">
                                <button
                                  onClick={() => setSortOrder('asc')}
                                  className={`flex-1 px-3 py-2 flex items-center justify-center ${sortOrder === 'asc' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} rounded-l-lg border border-gray-600`}
                                >
                                  <FaSortAmountDown className="mr-2" /> Ascending
                                </button>
                                <button
                                  onClick={() => setSortOrder('desc')}
                                  className={`flex-1 px-3 py-2 flex items-center justify-center ${sortOrder === 'desc' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} rounded-r-lg border border-gray-600 border-l-0`}
                                >
                                  <FaSortAmountUp className="mr-2" /> Descending
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {filteredProjects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                          <ProjectCard
                            key={project._id}
                            project={project}
                            onViewDetails={() => handleViewDetails(project._id)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
                        <FaProjectDiagram className="mx-auto text-gray-600 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
                        <p className="text-gray-400 mb-6">No projects match your current filters. Try adjusting your search criteria.</p>
                        <button
                          onClick={() => {
                            setFilterStatus('All');
                            setSearchTerm('');
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                        >
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  projectLoading ? (
                    <Loader />
                  ) : (
                    <ProjectDetails project={selectedProject} onBack={handleBackToProjects} />
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Export the Projects component as UserProjects
export default Projects;