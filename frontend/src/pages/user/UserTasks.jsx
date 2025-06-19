import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  FaTasks, FaChartBar, FaCalendarAlt, FaUser, 
  FaBell, FaSearch, FaEllipsisH, FaCircleNotch, FaCheckCircle,
  FaRegClock, FaExclamationCircle, FaFilter, FaPlus, FaTrash, FaPencilAlt,
  FaSortAmountDown, FaSortAmountUp, FaClipboardList, FaUsers, FaProjectDiagram,
  FaEdit, FaEye, FaArrowRight, FaTag, FaCalendarCheck, FaCalendarDay, FaFlag, 
  FaChevronDown, FaChevronUp, FaArrowLeft, FaListUl, FaChartPie, FaUserAlt, 
  FaClipboard, FaClock, FaCalendarWeek, FaFileAlt, FaComments, FaHistory, 
  FaExclamation, FaInfoCircle, FaLightbulb
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

// Add CSS class for system fonts and background patterns
const backgroundCSS = `
  .bg-grid-pattern {
    background-size: 40px 40px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  }
`;

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Task Card Component
const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priorityColors = {
    'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'High': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Urgent': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  };

  const statusColors = {
    'To Do': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'In Review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Blocked': 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-white text-lg mb-2">{task.title}</h4>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{task.description}</p>
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
              <FaFlag className="inline mr-1" /> {task.priority}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[task.status]}`}>
              {task.status}
            </span>
            {task.type && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {task.type}
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(task)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaEdit />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-red-400 hover:text-red-300 transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <FaCalendarDay className="text-gray-400 mr-2" />
            <span className="text-xs text-gray-300">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white mr-2">
              {task.assignedTo?.name ? task.assignedTo.name.charAt(0) : '?'}
            </div>
            <span className="text-xs text-gray-300">{task.assignedTo?.name || 'Unassigned'}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <button 
              onClick={() => onStatusChange(task.id, 'To Do')}
              className={`px-2 py-1 text-xs rounded ${task.status === 'To Do' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            >
              To Do
            </button>
            <button 
              onClick={() => onStatusChange(task.id, 'In Progress')}
              className={`px-2 py-1 text-xs rounded ${task.status === 'In Progress' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            >
              In Progress
            </button>
            <button 
              onClick={() => onStatusChange(task.id, 'In Review')}
              className={`px-2 py-1 text-xs rounded ${task.status === 'In Review' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            >
              In Review
            </button>
            <button 
              onClick={() => onStatusChange(task.id, 'Completed')}
              className={`px-2 py-1 text-xs rounded ${task.status === 'Completed' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member }) => {
  const completionRate = member.completedTasks / member.assignedTasks * 100;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-4">
          {member.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-white text-lg">{member.name}</h4>
          <p className="text-sm text-gray-400">{member.role}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Task Completion</span>
          <span className="text-xs font-medium text-white">{completionRate.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${completionRate < 30 ? 'bg-red-500' : completionRate < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-700/50 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-400">Assigned</p>
          <p className="text-xl font-semibold text-white">{member.assignedTasks}</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-400">Completed</p>
          <p className="text-xl font-semibold text-white">{member.completedTasks}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Main Tasks Component
function UserTasks() {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', type: 'all' });
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Inject background CSS
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = backgroundCSS;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Fetch project and tasks data
  useEffect(() => {
    // Get project ID from location state
    const projectId = location.state?.projectId;
    
    if (!projectId) {
      // If no project ID is provided, redirect to projects page
      navigate('/user/projects');
      return;
    }
    
    // Simulate API call to fetch project and tasks
    setTimeout(() => {
      // Mock project data
      const mockProject = {
        id: projectId,
        title: 'Website Redesign',
        description: 'Complete overhaul of the company website with modern design and improved user experience',
        startDate: '2023-06-01',
        endDate: '2023-08-15',
        priority: 'High',
        status: 'In Progress',
        progress: 65,
        teamMembers: [
          { id: 'user1', name: 'John Doe', role: 'Developer', assignedTasks: 8, completedTasks: 5 },
          { id: 'user2', name: 'Jane Smith', role: 'Designer', assignedTasks: 6, completedTasks: 4 },
          { id: 'user6', name: 'Emily Davis', role: 'UI/UX Designer', assignedTasks: 5, completedTasks: 2 },
          { id: 'user3', name: 'Mike Johnson', role: 'Project Manager', assignedTasks: 4, completedTasks: 3 }
        ],
        tags: ['Frontend', 'UI/UX', 'Design']
      };
      
      // Mock tasks data
      const mockTasks = [
        {
          id: 1,
          title: 'Design Homepage Mockup',
          description: 'Create a modern and user-friendly homepage design that aligns with the brand guidelines',
          priority: 'High',
          status: 'Completed',
          dueDate: '2023-06-15',
          assignedTo: { id: 'user2', name: 'Jane Smith', role: 'Designer' },
          type: 'Design',
          timeTracking: { estimated: 16, spent: 20 }
        },
        {
          id: 2,
          title: 'Implement Responsive Navigation',
          description: 'Develop a responsive navigation menu that works well on all device sizes',
          priority: 'Medium',
          status: 'In Progress',
          dueDate: '2023-07-05',
          assignedTo: { id: 'user1', name: 'John Doe', role: 'Developer' },
          type: 'Development',
          timeTracking: { estimated: 8, spent: 6 }
        },
        {
          id: 3,
          title: 'Create User Authentication System',
          description: 'Implement secure user authentication with login, registration, and password recovery',
          priority: 'High',
          status: 'To Do',
          dueDate: '2023-07-20',
          assignedTo: { id: 'user1', name: 'John Doe', role: 'Developer' },
          type: 'Development',
          timeTracking: { estimated: 24, spent: 0 }
        },
        {
          id: 4,
          title: 'Design Product Page Templates',
          description: 'Create templates for product listing and detail pages',
          priority: 'Medium',
          status: 'In Review',
          dueDate: '2023-06-30',
          assignedTo: { id: 'user2', name: 'Jane Smith', role: 'Designer' },
          type: 'Design',
          timeTracking: { estimated: 12, spent: 14 }
        },
        {
          id: 5,
          title: 'Optimize Website Performance',
          description: 'Improve loading times and overall performance of the website',
          priority: 'Low',
          status: 'To Do',
          dueDate: '2023-08-10',
          assignedTo: { id: 'user1', name: 'John Doe', role: 'Developer' },
          type: 'Development',
          timeTracking: { estimated: 16, spent: 0 }
        },
        {
          id: 6,
          title: 'Implement Payment Gateway',
          description: 'Integrate secure payment processing for online transactions',
          priority: 'Urgent',
          status: 'Blocked',
          dueDate: '2023-07-15',
          assignedTo: { id: 'user1', name: 'John Doe', role: 'Developer' },
          type: 'Development',
          timeTracking: { estimated: 20, spent: 4 }
        }
      ];
      
      setProject(mockProject);
      setTasks(mockTasks);
      setLoading(false);
    }, 1000);
  }, [location, navigate]);

  // Handle back to projects
  const handleBackToProjects = () => {
    navigate('/user/projects');
  };

  // Handle create task
  const handleCreateTask = () => {
    setCurrentTask(null);
    setShowModal(true);
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  // Handle delete task
  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Handle status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Handle save task
  const handleSaveTask = (taskData) => {
    if (currentTask) {
      // Update existing task
      setTasks(prev => prev.map(task => 
        task.id === currentTask.id ? { ...task, ...taskData } : task
      ));
    } else {
      // Create new task
      const newTask = {
        ...taskData,
        id: Date.now(), // Generate a temporary ID
        createdAt: new Date().toISOString()
      };
      setTasks(prev => [...prev, newTask]);
    }
    setShowModal(false);
  };

  // Toggle filter expanded
  const toggleFilterExpanded = () => {
    setIsFilterExpanded(prev => !prev);
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      // Filter by status
      if (filter.status !== 'all' && task.status !== filter.status) {
        return false;
      }
      
      // Filter by priority
      if (filter.priority !== 'all' && task.priority !== filter.priority) {
        return false;
      }
      
      // Filter by type
      if (filter.type !== 'all' && task.type !== filter.type) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !(
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      )) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      const direction = sortOrder === 'asc' ? 1 : -1;
      
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate) * direction;
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Urgent': 4 };
        return (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction;
      } else if (sortBy === 'status') {
        const statusOrder = { 'To Do': 1, 'In Progress': 2, 'In Review': 3, 'Completed': 4, 'Blocked': 5 };
        return (statusOrder[a.status] - statusOrder[b.status]) * direction;
      }
      
      return 0;
    });

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'Completed').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    toDo: tasks.filter(task => task.status === 'To Do').length,
    inReview: tasks.filter(task => task.status === 'In Review').length,
    blocked: tasks.filter(task => task.status === 'Blocked').length,
    timeSpent: tasks.reduce((total, task) => total + (task.timeTracking?.spent || 0), 0),
    timeEstimated: tasks.reduce((total, task) => total + (task.timeTracking?.estimated || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white transition-colors duration-300">
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <button 
                  onClick={handleBackToProjects}
                  className="flex items-center text-gray-400 hover:text-white mb-2 transition-colors"
                >
                  <FaArrowLeft className="mr-2" /> Back to Projects
                </button>
                <h1 className="text-3xl font-bold mb-2">{project?.title}</h1>
                <p className="text-gray-400">{project?.description}</p>
              </div>
              
              {/* Create New Task button removed */}
            </div>

            {/* Project Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg col-span-1 md:col-span-2"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaProjectDiagram className="mr-2 text-blue-400" /> Project Overview
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Status</p>
                    <div className="flex items-center mt-1">
                      <div className={`w-3 h-3 rounded-full mr-2 ${project?.status === 'Completed' ? 'bg-green-500' : project?.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                      <p className="font-medium">{project?.status}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Priority</p>
                    <div className="flex items-center mt-1">
                      <div className={`w-3 h-3 rounded-full mr-2 ${project?.priority === 'High' || project?.priority === 'Urgent' ? 'bg-red-500' : project?.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                      <p className="font-medium">{project?.priority}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Start Date</p>
                    <p className="font-medium mt-1">{new Date(project?.startDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">End Date</p>
                    <p className="font-medium mt-1">{new Date(project?.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Completion</span>
                    <span className="text-sm font-medium">{project?.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${project?.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project?.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-700/50 px-3 py-1 rounded-full text-sm flex items-center">
                      <FaTag className="mr-2 text-blue-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaClock className="mr-2 text-blue-400" /> Time Tracking
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">Time Spent</p>
                    <p className="text-xl font-semibold">{taskStats.timeSpent} hrs</p>
                  </div>
                  
                  <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">Estimated</p>
                    <p className="text-xl font-semibold">{taskStats.timeEstimated} hrs</p>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded-lg text-center mb-4">
                  <p className="text-gray-400 text-sm">Remaining</p>
                  <p className="text-xl font-semibold">{Math.max(0, taskStats.timeEstimated - taskStats.timeSpent)} hrs</p>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm font-medium">
                      {taskStats.timeEstimated > 0 ? Math.min(100, Math.round((taskStats.timeSpent / taskStats.timeEstimated) * 100)) : 0}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${taskStats.timeEstimated > 0 ? Math.min(100, Math.round((taskStats.timeSpent / taskStats.timeEstimated) * 100)) : 0}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaListUl className="mr-2 text-blue-400" /> Task Status
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">To Do</p>
                    <p className="text-xl font-semibold">{taskStats.toDo}</p>
                  </div>
                  
                  <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">In Progress</p>
                    <p className="text-xl font-semibold">{taskStats.inProgress}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">In Review</p>
                    <p className="text-xl font-semibold">{taskStats.inReview}</p>
                  </div>
                  
                  <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-xl font-semibold">{taskStats.completed}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg col-span-1 md:col-span-2"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaUsers className="mr-2 text-blue-400" /> Team Members
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project?.teamMembers.map((member, index) => (
                    <div key={index} className="bg-gray-700/50 p-3 rounded-lg flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium mr-3">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{member.name}</p>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 mb-6">
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
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'kanban' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('kanban')}
              >
                Kanban
              </button>
            </div>

            {/* Tasks Tab Content */}
            {activeTab === 'tasks' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="flex items-center">
                    <button
                      onClick={toggleFilterExpanded}
                      className="flex items-center text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-4 py-2 mr-4 transition-colors"
                    >
                      <FaFilter className="mr-2" /> Filters
                      {isFilterExpanded ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                    </button>
                    
                    <div className="relative w-full md:w-64">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search tasks..."
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                      />
                      <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 md:mt-0">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-2"
                    >
                      <option value="dueDate">Due Date</option>
                      <option value="priority">Priority</option>
                      <option value="status">Status</option>
                    </select>
                    
                    <button
                      onClick={toggleSortOrder}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white hover:bg-gray-700 transition-colors"
                    >
                      {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                    </button>
                  </div>
                </div>
                
                {isFilterExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg mb-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                        <select
                          value={filter.status}
                          onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="all">All Statuses</option>
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="In Review">In Review</option>
                          <option value="Completed">Completed</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                        <select
                          value={filter.priority}
                          onChange={(e) => setFilter(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="all">All Priorities</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                        <select
                          value={filter.type}
                          onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="all">All Types</option>
                          <option value="Development">Development</option>
                          <option value="Design">Design</option>
                          <option value="Research">Research</option>
                          <option value="Testing">Testing</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {filteredTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTasks.map(task => (
                      <TaskCard 
                        key={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg text-center">
                    <FaClipboardList className="text-gray-500 text-5xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
                    <p className="text-gray-400 mb-6">Try changing your filters or search for different tasks</p>
                    {/* Create New Task button removed */}
                  </div>
                )}
              </div>
            )}

            {/* Team Tab Content */}
            {activeTab === 'team' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project?.teamMembers.map((member, index) => (
                    <TeamMemberCard key={index} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* Kanban Board Tab Content */}
            {activeTab === 'kanban' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Kanban Board</h3>
                  <div className="flex items-center space-x-2">
                    {/* Add Task button removed */}
                    <select 
                      className="text-sm bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-1.5"
                      value={filter.status}
                      onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="all">All Statuses</option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="In Review">In Review</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* To Do Column */}
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                      To Do ({tasks.filter(task => task.status === 'To Do').length})
                    </h4>
                    <div className="space-y-4">
                      {tasks
                        .filter(task => task.status === 'To Do')
                        .filter(task => filter.priority === 'all' || task.priority === filter.priority)
                        .filter(task => filter.type === 'all' || task.type === filter.type)
                        .map(task => (
                          <div 
                            key={task.id}
                            className="bg-gray-700 rounded-lg p-3 border border-gray-600 shadow cursor-pointer hover:border-blue-500 transition-colors"
                            onClick={() => handleEditTask(task)}
                          >
                            <h5 className="font-medium text-white mb-2">{task.title}</h5>
                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{task.description}</p>
                            <div className="flex justify-between items-center">
                              <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </span>
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
                                {task.assignedTo?.name ? task.assignedTo.name.charAt(0) : '?'}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  
                  {/* In Progress Column */}
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      In Progress ({tasks.filter(task => task.status === 'In Progress').length})
                    </h4>
                    <div className="space-y-4">
                      {tasks
                        .filter(task => task.status === 'In Progress')
                        .filter(task => filter.priority === 'all' || task.priority === filter.priority)
                        .filter(task => filter.type === 'all' || task.type === filter.type)
                        .map(task => (
                          <div 
                            key={task.id}
                            className="bg-gray-700 rounded-lg p-3 border border-gray-600 shadow cursor-pointer hover:border-blue-500 transition-colors"
                            onClick={() => handleEditTask(task)}
                          >
                            <h5 className="font-medium text-white mb-2">{task.title}</h5>
                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{task.description}</p>
                            <div className="flex justify-between items-center">
                              <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </span>
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
                                {task.assignedTo?.name ? task.assignedTo.name.charAt(0) : '?'}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  
                  {/* In Review Column */}
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      In Review ({tasks.filter(task => task.status === 'In Review').length})
                    </h4>
                    <div className="space-y-4">
                      {tasks
                        .filter(task => task.status === 'In Review')
                        .filter(task => filter.priority === 'all' || task.priority === filter.priority)
                        .filter(task => filter.type === 'all' || task.type === filter.type)
                        .map(task => (
                          <div 
                            key={task.id}
                            className="bg-gray-700 rounded-lg p-3 border border-gray-600 shadow cursor-pointer hover:border-blue-500 transition-colors"
                            onClick={() => handleEditTask(task)}
                          >
                            <h5 className="font-medium text-white mb-2">{task.title}</h5>
                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{task.description}</p>
                            <div className="flex justify-between items-center">
                              <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </span>
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
                                {task.assignedTo?.name ? task.assignedTo.name.charAt(0) : '?'}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  
                  {/* Completed Column */}
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      Completed ({tasks.filter(task => task.status === 'Completed').length})
                    </h4>
                    <div className="space-y-4">
                      {tasks
                        .filter(task => task.status === 'Completed')
                        .filter(task => filter.priority === 'all' || task.priority === filter.priority)
                        .filter(task => filter.type === 'all' || task.type === filter.type)
                        .map(task => (
                          <div 
                            key={task.id}
                            className="bg-gray-700 rounded-lg p-3 border border-gray-600 shadow cursor-pointer hover:border-blue-500 transition-colors"
                            onClick={() => handleEditTask(task)}
                          >
                            <h5 className="font-medium text-white mb-2">{task.title}</h5>
                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{task.description}</p>
                            <div className="flex justify-between items-center">
                              <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                                {task.priority}
                              </span>
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
                                {task.assignedTo?.name ? task.assignedTo.name.charAt(0) : '?'}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserTasks;