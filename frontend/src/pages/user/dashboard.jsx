import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTasks, FaChartBar, FaCalendarAlt, FaUser, FaSignOutAlt, 
  FaBell, FaSearch, FaEllipsisH, FaCircleNotch, FaCheckCircle,
  FaRegClock, FaExclamationCircle, FaHeartbeat, FaProjectDiagram,
  FaClipboardCheck, FaChevronRight, FaClipboardList, FaLightbulb,
  FaUserCog, FaUserTie, FaUsers, FaFilter, FaPlus, FaArrowRight
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

// Import the common Navbar component
import Navbar from '../../components/Navbar';

// Add CSS class for system fonts and background patterns
// This ensures we use system fonts instead of SF Pro fonts

// Add a styled background pattern using CSS
const backgroundStyles = `
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
  
  .gradient-border {
    position: relative;
  }
  
  .gradient-border::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #3b82f6, #9333ea);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  .gradient-border:hover::after {
    transform: scaleX(1);
  }
`;

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// We're now using the common Navbar component imported from components/Navbar.jsx

// Stress Monitor Component with Semicircle
const StressMonitor = () => {
  // Stress level from 0 (low) to 100 (high)
  const stressLevel = 65;
  
  // Calculate the rotation for the needle
  const needleRotation = (stressLevel / 100) * 180;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dashboard-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl h-full border border-gray-200 dark:border-gray-700 hover:shadow-blue-900/30 transition-all duration-300 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
      whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mr-3">
            <FaHeartbeat className="text-red-500 dark:text-red-400" />
          </div>
          Stress Monitor
        </h3>
        <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
        <div className="relative w-56 h-28 mb-8">
          {/* Semicircle background with better gradient and border */}
          <div className="absolute w-full h-full rounded-t-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600">
            <div className="absolute w-full h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 opacity-60 dark:opacity-50"></div>
          </div>
          
          {/* Tick marks - more detailed */}
          <div className="absolute w-full h-full">
            {[0, 30, 60, 90, 120, 150, 180].map((deg) => (
              <div 
                key={deg}
                className="absolute bottom-0 w-1 h-3 bg-gray-400 dark:bg-gray-500"
                style={{ 
                  left: `${(deg/180) * 100}%`, 
                  transform: `translateX(-50%) rotate(${deg-90}deg)`,
                  transformOrigin: 'bottom'
                }}
              />
            ))}
          </div>
          
          {/* Needle with better styling */}
          <div 
            className="absolute top-0 left-1/2 w-1.5 h-24 bg-blue-600 dark:bg-blue-400 origin-bottom transform -translate-x-1/2 transition-transform duration-1000 ease-elastic shadow-md"
            style={{ transform: `translateX(-50%) rotate(${needleRotation - 90}deg)` }}
          >
            <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 absolute -top-2 -left-1.5 shadow-lg border-2 border-white dark:border-gray-800"></div>
          </div>
          
          {/* Center point - larger and with border */}
          <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full transform -translate-x-1/2 shadow-md border-2 border-white dark:border-gray-800"></div>
          
          {/* Labels with better positioning and styling */}
          <div className="absolute -bottom-6 left-0 w-full flex justify-between px-2">
            <span className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">Low</span>
            <span className="text-sm text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">High</span>
          </div>
        </div>
        
        <div className="text-center bg-gray-50 dark:bg-gray-700/50 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="text-3xl font-bold mb-1">
            <span className={`${stressLevel < 30 ? 'text-green-600 dark:text-green-400' : stressLevel < 70 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
              {stressLevel}%
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">Team Stress Level</p>
        </div>
      </div>
    </motion.div>
  );
};

// Today's Tasks Component
const TodaysTasks = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="dashboard-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl h-full border border-gray-200 dark:border-gray-700 hover:shadow-blue-900/30 transition-all duration-300 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
      whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
            <FaRegClock className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Today's Tasks</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium bg-blue-500/20 text-blue-400 py-1 px-3 rounded-full">4 tasks</span>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <FaEllipsisH />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center p-4 bg-gray-700/30 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
        >
          <div className="mr-4">
            <div className="h-4 w-4 rounded-full bg-yellow-500 group-hover:scale-110 transition-transform duration-200"></div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-white group-hover:text-yellow-300 transition-colors duration-200">Complete project proposal</h4>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <FaRegClock className="mr-1 text-gray-500" /> Due in 3 hours
            </p>
          </div>
          <div>
            <span className="text-xs font-medium bg-yellow-500/20 text-yellow-400 py-1 px-3 rounded-full">In Progress</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex items-center p-4 bg-gray-700/30 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
        >
          <div className="mr-4">
            <div className="h-4 w-4 rounded-full bg-blue-500 group-hover:scale-110 transition-transform duration-200"></div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors duration-200">Team meeting</h4>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <FaRegClock className="mr-1 text-gray-500" /> 2:00 PM
            </p>
          </div>
          <div>
            <span className="text-xs font-medium bg-blue-500/20 text-blue-400 py-1 px-3 rounded-full">To Do</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex items-center p-4 bg-gray-700/30 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
        >
          <div className="mr-4">
            <div className="h-4 w-4 rounded-full bg-green-500 group-hover:scale-110 transition-transform duration-200"></div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-white group-hover:text-green-300 transition-colors duration-200">Review code changes</h4>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <FaCheckCircle className="mr-1 text-green-500" /> Completed at 10:30 AM
            </p>
          </div>
          <div>
            <span className="text-xs font-medium bg-green-500/20 text-green-400 py-1 px-3 rounded-full">Completed</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex items-center p-4 bg-gray-700/30 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
        >
          <div className="mr-4">
            <div className="h-4 w-4 rounded-full bg-blue-500 group-hover:scale-110 transition-transform duration-200"></div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors duration-200">Update documentation</h4>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <FaRegClock className="mr-1 text-gray-500" /> Due at 5:00 PM
            </p>
          </div>
          <div>
            <span className="text-xs font-medium bg-blue-500/20 text-blue-400 py-1 px-3 rounded-full">To Do</span>
          </div>
        </motion.div>
        
        <div className="pt-2 text-center">
          <Link to="/user/TasksPage" className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center transition-colors duration-200">
            View all tasks <FaChevronRight className="ml-1 text-xs" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Monthly Tasks Component

// Calendar Component
const CalendarWidget = () => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SA', 'SU'];
  const dates = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, null, null, null, null, null]
  ];
  
  // Highlighted dates (meetings, deadlines, etc)
  const highlights = [6, 8, 17, 21];
  const today = 17; // Current date
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="dashboard-card bg-gray-800 rounded-xl p-5 shadow-lg h-full border border-gray-700 backdrop-blur-sm bg-opacity-80"
      whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Calendar</h3>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-white text-sm bg-gray-700 px-2 py-1 rounded">
            Month
          </button>
          <button className="text-gray-400 hover:text-white text-sm">
            Week
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day, idx) => (
          <div key={idx} className="text-center text-xs text-gray-400 font-medium py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {dates.flat().map((date, idx) => {
          if (date === null) return <div key={idx} className="h-8"></div>;
          
          const isHighlighted = highlights.includes(date);
          const isToday = date === today;
          
          return (
            <div 
              key={idx} 
              className={`
                h-8 flex items-center justify-center text-sm rounded-full cursor-pointer
                ${isToday ? 'bg-blue-500 text-white' : ''}
                ${isHighlighted && !isToday ? 'bg-red-500/70 text-white' : ''}
                ${!isHighlighted && !isToday ? 'text-gray-300 hover:bg-gray-700' : ''}
              `}
            >
              {date}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Project Card Component
const ProjectCard = ({ project, isActive, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' }}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden
        ${isActive ? 'bg-blue-600/20 border border-blue-500/50' : 'bg-gray-700/40 hover:bg-gray-700/60 border border-transparent'}
      `}
    >
      {/* Background decorative elements using golden ratio */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -left-4 -top-4 w-16 h-16 bg-purple-500/5 rounded-full blur-lg pointer-events-none"></div>
      
      {/* Project type indicator */}
      <div className="absolute top-2 right-2 z-10">
        <div className={`px-2 py-0.5 rounded-full text-xs ${project.type === 'personal' ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'}`}>
          {project.type === 'personal' ? 'Personal' : 'Assigned'}
        </div>
      </div>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-white mb-1">{project.name}</h4>
          <p className="text-xs text-gray-400">{project.client}</p>
        </div>
        <div className={`
          h-8 w-8 rounded-full flex items-center justify-center
          ${project.priority === 'High' ? 'bg-red-500/20 text-red-400' : 
            project.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
            'bg-green-500/20 text-green-400'}
        `}>
          {project.priority === 'High' ? 
            <FaExclamationCircle /> : 
            project.priority === 'Medium' ? 
            <FaExclamationCircle /> : 
            <FaCheckCircle />}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
          <FaRegClock className="mr-1" />
          <span>{project.deadline}</span>
        </div>
        <div className="flex -space-x-2">
          {project.team.map((member, idx) => (
            <motion.div 
              key={idx} 
              className="h-6 w-6 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white"
              title={member}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {member.charAt(0)}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Progress bar with animation */}
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs text-gray-400">{project.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-full rounded-full ${project.progress > 70 ? 'bg-green-500' : project.progress > 30 ? 'bg-blue-500' : 'bg-yellow-500'}`}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Project Details Component
const ProjectDetails = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
          <p className="text-sm text-gray-400">{project.client}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-700/50 p-3 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Priority</p>
          <p className={`
            text-sm font-medium
            ${project.priority === 'High' ? 'text-red-400' : 
              project.priority === 'Medium' ? 'text-yellow-400' : 
              'text-green-400'}
          `}>{project.priority}</p>
        </div>
        
        <div className="bg-gray-700/50 p-3 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Deadline</p>
          <p className="text-sm font-medium text-white">{project.deadline}</p>
        </div>
        
        <div className="bg-gray-700/50 p-3 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Progress</p>
          <p className="text-sm font-medium text-white">{project.progress}%</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-2">Description</h4>
        <p className="text-sm text-gray-400">{project.description}</p>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-2">Team Members</h4>
        <div className="flex flex-wrap gap-2">
          {project.team.map((member, idx) => (
            <div key={idx} className="bg-gray-700 px-3 py-1 rounded-full text-xs text-white">
              {member}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-white mb-2">Tasks</h4>
        <div className="space-y-2">
          {project.tasks.map((task, idx) => (
            <div key={idx} className="flex items-center justify-between bg-gray-700/50 p-2 rounded-lg">
              <div className="flex items-center">
                <div className={`
                  h-4 w-4 rounded-full mr-2
                  ${task.status === 'Completed' ? 'bg-green-500' : 
                    task.status === 'In Progress' ? 'bg-blue-500' : 
                    'bg-yellow-500'}
                `}></div>
                <span className="text-sm text-white">{task.name}</span>
              </div>
              <span className="text-xs text-gray-400">{task.status}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Projects Component with enhanced management capabilities
const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    name: '',
    client: '',
    priority: 'Medium',
    deadline: '',
    description: '',
    team: [],
    tasks: [],
    type: 'personal' // Default to personal project
  });
  
  // Sample projects data with type field to distinguish personal vs assigned
  const [projects, setProjects] = useState([
    {
      
}]);
  
  // Filter projects by type
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'personal') return project.type === 'personal';
    if (activeFilter === 'assigned') return project.type === 'assigned';
    if (activeFilter === 'completed') return project.progress === 100;
    return true;
  });

  // Handle adding a new project
  const handleAddProject = () => {
    const newProject = {
      ...projectFormData,
      id: projects.length + 1,
      progress: 0,
      tasks: projectFormData.tasks.length > 0 ? projectFormData.tasks : [
        { name: "Planning", status: "Pending" }
      ],
      team: projectFormData.team.length > 0 ? projectFormData.team : ["Admin"]
    };
    
    setProjects([...projects, newProject]);
    setShowAddModal(false);
    setProjectFormData({
      name: '',
      client: '',
      priority: 'Medium',
      deadline: '',
      description: '',
      team: [],
      tasks: [],
      type: 'personal'
    });
  };

  // Handle editing an existing project
  const handleEditProject = () => {
    if (!activeProject || activeProject.type === 'assigned') return;
    
    const updatedProjects = projects.map(project => 
      project.id === activeProject.id ? 
        {...project, ...projectFormData, team: projectFormData.team.length > 0 ? projectFormData.team : project.team} : 
        project
    );
    
    setProjects(updatedProjects);
    setEditMode(false);
    setActiveProject(null);
    setProjectFormData({
      name: '',
      client: '',
      priority: 'Medium',
      deadline: '',
      description: '',
      team: [],
      tasks: [],
      type: 'personal'
    });
  };

  // Handle deleting a project
  const handleDeleteProject = (projectId) => {
    const projectToDelete = projects.find(p => p.id === projectId);
    if (projectToDelete.type === 'assigned') {
      // Cannot delete assigned projects
      return;
    }
    
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    if (activeProject && activeProject.id === projectId) {
      setActiveProject(null);
    }
  };

  // Start editing a project
  const startEditProject = (project) => {
    if (project.type === 'assigned') return; // Cannot edit assigned projects
    
    setProjectFormData({
      name: project.name,
      client: project.client,
      priority: project.priority,
      deadline: project.deadline,
      description: project.description,
      team: project.team,
      tasks: project.tasks,
      type: project.type
    });
    
    setEditMode(true);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="dashboard-card bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 backdrop-blur-sm bg-opacity-80"
      whileHover={{ scale: 1.01, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <FaProjectDiagram className="text-blue-500 mr-2" /> Projects Management
        </h3>
        <div className="flex space-x-2">
          <button 
            className={`text-sm px-3 py-1 rounded-lg ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white bg-gray-700'}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`text-sm px-3 py-1 rounded-lg ${activeFilter === 'personal' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white bg-gray-700'}`}
            onClick={() => setActiveFilter('personal')}
          >
            Personal
          </button>
          <button 
            className={`text-sm px-3 py-1 rounded-lg ${activeFilter === 'assigned' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white bg-gray-700'}`}
            onClick={() => setActiveFilter('assigned')}
          >
            Assigned
          </button>
          <button 
            className={`text-sm px-3 py-1 rounded-lg ${activeFilter === 'completed' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white bg-gray-700'}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="flex justify-end mb-4">
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.97 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200"></div>
          <Link 
            to="/user/tasks"
            state={{ openAddModal: true, taskType: 'personal' }}
            className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"></div>
            <div className="relative flex items-center">
              <span className="bg-white/20 p-1 rounded-full mr-2">
                <FaPlus className="text-white" />
              </span>
              Add Personal Project
            </div>
          </Link>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id}
            project={project}
            isActive={activeProject?.id === project.id}
            onClick={() => setActiveProject(project)}
          />
        ))}
      </div>
      
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{activeProject.name}</h3>
                <p className="text-sm text-gray-400">{activeProject.client}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeProject.type === 'personal' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'} mt-2 inline-block`}>
                  {activeProject.type === 'personal' ? 'Personal Project' : 'Assigned Project'}
                </span>
              </div>
              <div className="flex space-x-2">
                {activeProject.type === 'personal' && (
                  <>
                    <button 
                      onClick={() => startEditProject(activeProject)}
                      className="text-gray-400 hover:text-white bg-gray-700 p-2 rounded-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(activeProject.id)}
                      className="text-red-400 hover:text-red-300 bg-red-500/10 p-2 rounded-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </>
                )}
                <button 
                  onClick={() => setActiveProject(null)}
                  className="text-gray-400 hover:text-white bg-gray-700 p-2 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Priority</p>
                <p className={`
                  text-sm font-medium
                  ${activeProject.priority === 'High' ? 'text-red-400' : 
                    activeProject.priority === 'Medium' ? 'text-yellow-400' : 
                    'text-green-400'}
                `}>{activeProject.priority}</p>
              </div>
              
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Deadline</p>
                <p className="text-sm font-medium text-white">{activeProject.deadline}</p>
              </div>
              
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Progress</p>
                <p className="text-sm font-medium text-white">{activeProject.progress}%</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Description</h4>
              <p className="text-sm text-gray-400">{activeProject.description}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Team Members</h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.team.map((member, idx) => (
                  <div key={idx} className="bg-gray-700 px-3 py-1 rounded-full text-xs text-white">
                    {member}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-white">Tasks</h4>
                {activeProject.type === 'personal' && (
                  <Link to="/user/tasks" className="text-xs text-blue-400 hover:text-blue-300">
                    + Add Task
                  </Link>
                )}
                {activeProject.type === 'assigned' && (
                  <Link to="/user/tasks" className="text-xs text-blue-400 hover:text-blue-300">
                    View Tasks
                  </Link>
                )}
              </div>
              <div className="space-y-2">
                {activeProject.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-700/50 p-2 rounded-lg">
                    <div className="flex items-center">
                      <div className={`
                        h-4 w-4 rounded-full mr-2
                        ${task.status === 'Completed' ? 'bg-green-500' : 
                          task.status === 'In Progress' ? 'bg-blue-500' : 
                          'bg-yellow-500'}
                      `}></div>
                      <span className="text-sm text-white">{task.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-2">{task.status}</span>
                      {activeProject.type === 'personal' && (
                        <div className="flex space-x-1">
                          <button className="text-gray-400 hover:text-white">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add/Edit Project Modal */}
      {(showAddModal || editMode) && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                {editMode ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setEditMode(false);
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
                <input 
                  type="text" 
                  value={projectFormData.name}
                  onChange={(e) => setProjectFormData({...projectFormData, name: e.target.value})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Client</label>
                <input 
                  type="text" 
                  value={projectFormData.client}
                  onChange={(e) => setProjectFormData({...projectFormData, client: e.target.value})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                <select 
                  value={projectFormData.priority}
                  onChange={(e) => setProjectFormData({...projectFormData, priority: e.target.value})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Deadline</label>
                <input 
                  type="text" 
                  value={projectFormData.deadline}
                  onChange={(e) => setProjectFormData({...projectFormData, deadline: e.target.value})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Oct 30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea 
                  value={projectFormData.description}
                  onChange={(e) => setProjectFormData({...projectFormData, description: e.target.value})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                  placeholder="Enter project description"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Team Members (comma separated)</label>
                <input 
                  type="text" 
                  value={projectFormData.team.join(', ')}
                  onChange={(e) => setProjectFormData({...projectFormData, team: e.target.value.split(',').map(item => item.trim()).filter(item => item !== '')})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. John, Sarah, Mike"
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  onClick={() => {
                    setShowAddModal(false);
                    setEditMode(false);
                  }}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button 
                  onClick={editMode ? handleEditProject : handleAddProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={!projectFormData.name}
                >
                  {editMode ? 'Save Changes' : 'Add Project'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
// Main Dashboard Component
function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isUserEmployee, setIsUserEmployee] = useState(user?.role !== 'admin'); // Fetch from user context
  const navigate = useNavigate();
  
  // Add the CSS styles to the document
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.textContent = backgroundStyles;
    document.head.appendChild(styleElement);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Simulate loading only
  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => setLoading(false), 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle redirect to tasks page for adding personal project
  const handleAddPersonalProject = () => {
    navigate('/user/TasksPage', { state: { openAddModal: true, taskType: 'personal' } });
  };

  return (
    <div className="apple-font min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-[#1e1e1e] dark:to-[#121212] text-gray-900 dark:text-white transition-colors duration-300">
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
            className="min-h-screen relative"
          >
            {/* Background pattern overlay for visual interest */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            
            <Navbar />
            
            <main className="container mx-auto px-4 py-6 mt-16 relative z-10 max-w-7xl">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="dashboard-card bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 relative overflow-hidden"
                  whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                >
                  {/* Enhanced decorative elements using golden ratio proportions */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                  <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-lg"></div>
                  
                  {/* Golden spiral inspired decorative element */}
                  <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M98,2 Q60,2 60,40 Q60,78 22,78 Q-16,78 -16,40" fill="none" stroke="url(#gradient)" strokeWidth="0.5"></path>
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center">
                    <div className="md:w-8/13 pr-0 md:pr-8"> {/* Using golden ratio for content division */}
                      <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2"
                      >
                        Welcome Back!
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-600 dark:text-gray-300 text-lg"
                      >
                        Here's an overview of your projects and tasks
                      </motion.p>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "6rem" }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4"
                      ></motion.div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="mt-6 md:mt-0 md:w-5/13 flex justify-center md:justify-end"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md"></div>
                        <div className="relative bg-blue-900/30 w-24 h-24 rounded-full flex items-center justify-center">
                          <FaLightbulb className="text-blue-400 text-4xl" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              {/* Using golden ratio (1:1.618) for layout proportions */}
              <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 mb-8">
                <div className="lg:col-span-5"> {/* Approximately 5/8 of the width (close to golden ratio) */}
                  <TodaysTasks />
                </div>
                <div className="lg:col-span-3"> {/* Approximately 3/8 of the width */}
                  <StressMonitor />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 mb-8">
                <div className="lg:col-span-5"> {/* Approximately 5/8 of the width (close to golden ratio) */}
                  <Projects />
                </div>
                <div className="lg:col-span-3"> {/* Approximately 3/8 of the width */}
                  <div className="grid grid-cols-1 gap-6">
                    <CalendarWidget />
                
                  </div>
                </div>
              </div>

              {isUserEmployee && (
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                      <FaClipboardCheck className="text-blue-600 dark:text-blue-400" />
                    </div>
                    Assigned Tasks Overview
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-all duration-200 cursor-pointer group border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Pending Tasks</div>
                        <div className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded text-xs group-hover:bg-yellow-500/30 transition-all duration-200">5</div>
                      </div>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 cursor-pointer group">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">In Progress</div>
                        <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs group-hover:bg-blue-500/30 transition-all duration-200">3</div>
                      </div>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 cursor-pointer group">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400 group-hover:text-white transition-colors duration-200">Completed</div>
                        <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs group-hover:bg-green-500/30 transition-all duration-200">8</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link to="/user/TasksPage" className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center transition-colors duration-200">
                      View all assigned tasks <FaArrowRight className="ml-1 text-xs" />
                    </Link>
                  </div>
                </div>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;