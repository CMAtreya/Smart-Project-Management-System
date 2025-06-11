import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaTasks, FaChartBar, FaCalendarAlt, FaUser, FaSignOutAlt, 
  FaBell, FaSearch, FaEllipsisH, FaCircleNotch, FaCheckCircle,
  FaRegClock, FaExclamationCircle, FaFilter, FaPlus, FaTrash, FaPencilAlt,
  FaSortAmountDown, FaSortAmountUp, FaClipboardList
} from 'react-icons/fa';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm bg-opacity-80">
      <div className="flex items-center space-x-8">
        <Link to="/user/dashboard" className="text-2xl font-bold text-white flex items-center">
          <FaTasks className="text-blue-500 mr-2" />
          <span>SmartTask</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/user/dashboard" className="text-gray-400 hover:text-blue-400 flex items-center">
            <span>Dashboard</span>
          </Link>
          <Link to="/user" className="text-gray-400 hover:text-blue-400 flex items-center">
            <span>Analytics</span>
          </Link>
          <Link to="/user/calendar" className="text-gray-400 hover:text-blue-400 flex items-center">
            <span>Calendar</span>
          </Link>
          <Link to="/user/chat" className="text-gray-400 hover:text-blue-400 flex items-center">
            <span>Team Chat</span>
          </Link>
          <Link to="/user/tasks" className="text-white hover:text-blue-400 flex items-center">
            <span>Tasks</span>
          </Link>
          <Link to="/user/finishedproject" className="text-gray-400 hover:text-blue-400 flex items-center">
            <span>Completed</span>
          </Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        
        <button className="relative p-2 text-gray-400 hover:text-white">
          <FaBell />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="relative group">
          <button className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <FaUser />
            </div>
            <span className="hidden md:inline text-white">John Doe</span>
          </button>
          
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50 hidden group-hover:block">
            <Link to="/profile" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              Profile
            </Link>
            <Link to="/settings" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              Settings
            </Link>
            <div className="border-t border-gray-700 my-1"></div>
            <button 
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <span className="flex items-center">
                <FaSignOutAlt className="mr-2" /> Sign Out
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Task Card Component
const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statusColors = {
    'To Do': 'bg-yellow-500',
    'In Progress': 'bg-blue-500',
    'Completed': 'bg-green-500',
    'Blocked': 'bg-red-500',
    'Pending': 'bg-purple-500'
  };

  const statusBgColors = {
    'To Do': 'bg-yellow-500/10 border-yellow-500/30',
    'In Progress': 'bg-blue-500/10 border-blue-500/30',
    'Completed': 'bg-green-500/10 border-green-500/30',
    'Blocked': 'bg-red-500/10 border-red-500/30',
    'Pending': 'bg-purple-500/10 border-purple-500/30'
  };

  const priorityColors = {
    'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'High': 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const priorityIcons = {
    'Low': <FaCircleNotch />,
    'Medium': <FaExclamationCircle />,
    'High': <FaExclamationCircle />
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
      className={`bg-gray-800 rounded-xl p-5 shadow-lg border ${statusBgColors[task.status] || 'border-gray-700'} transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-medium text-white text-lg mb-2">{task.title}</h4>
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${task.type === 'personal' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'}`}>
              {task.type === 'personal' ? 'Personal' : 'Assigned'}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
        </div>
        <div className={`
          h-10 w-10 rounded-full flex items-center justify-center border
          ${priorityColors[task.priority]}
        `}>
          {priorityIcons[task.priority]}
        </div>
      </div>
      
      <div className="border-t border-gray-700 my-4 pt-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-400 text-sm">
            <FaRegClock className="mr-2 text-blue-400" />
            <span>Due: {task.dueDate}</span>
          </div>
          {task.assignedTo && task.assignedTo.length > 0 && (
            <div className="flex -space-x-2">
              {typeof task.assignedTo === 'string' ? (
                <div 
                  className="h-8 w-8 rounded-full bg-blue-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white shadow-lg"
                  title={task.assignedTo}
                >
                  {task.assignedTo.charAt(0)}
                </div>
              ) : (
                task.assignedTo.map((member, idx) => (
                  <div 
                    key={idx} 
                    className="h-8 w-8 rounded-full bg-blue-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white shadow-lg"
                    title={member}
                  >
                    {member.charAt(0)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Status</span>
          <span className={`text-sm font-medium ${statusColors[task.status].replace('bg-', 'text-').replace('500', '400')}`}>
            {task.status}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${statusColors[task.status] || 'bg-gray-500'}`}
            style={{ 
              width: task.status === 'Completed' ? '100%' : 
                    task.status === 'In Progress' ? '50%' : 
                    task.status === 'Blocked' ? '75%' : 
                    task.status === 'Pending' ? '35%' : '25%' 
            }}
          ></div>
        </div>
      </div>

      {/* Task Actions */}
      <div className="flex justify-end space-x-2 mt-4 pt-2 border-t border-gray-700">
        <button 
          onClick={() => onStatusChange(task.id)}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center"
        >
          <span className="mr-1">Status</span> <FaExclamationCircle />
        </button>
        {task.type === 'personal' && (
          <>
            <button 
              onClick={() => onEdit(task)}
              className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center"
              title="Edit Task"
            >
              <FaPencilAlt />
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="text-xs bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center"
              title="Delete Task"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Task Form Component
const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'Medium',
    status: task?.status || 'To Do',
    dueDate: task?.dueDate || '',
    assignedTo: task?.assignedTo || '',
    type: task?.type || 'personal' // Default to personal, but keep original type if editing
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure type is 'personal' for new tasks
    const taskType = task ? formData.type : 'personal';
    onSubmit({
      ...formData,
      type: taskType,
      id: task?.id || Date.now(),
      assignedTo: formData.assignedTo.split(',').map(item => item.trim()).filter(item => item !== '')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">Task Title</label>
        <input 
          type="text" 
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          placeholder="Enter task title"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] transition-all duration-200"
          placeholder="Enter task description"
        ></textarea>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
          <select 
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
        <input 
          type="text" 
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          placeholder="e.g. May 30"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">Assigned To (comma separated)</label>
        <input 
          type="text" 
          name="assignedTo"
          value={typeof formData.assignedTo === 'string' ? formData.assignedTo : formData.assignedTo.join(', ')}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          placeholder="e.g. John, Sarah, Mike"
        />
      </div>

      {/* Display task type but don't allow changing it */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">Task Type</label>
        <div className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600">
          {task && task.type === 'assigned' ? (
            <div className="flex items-center">
              <span className="text-purple-400">Assigned</span>
              <span className="ml-2 text-xs text-gray-500">(Cannot be changed)</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-blue-400">Personal</span>
              {!task && <span className="ml-2 text-xs text-gray-500">(Default for new tasks)</span>}
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-4 flex justify-end space-x-3">
        <button 
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-200"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center"
        >
          {task ? 'Update Task' : 'Add Personal Task'}
        </button>
      </div>
    </form>
  );
};

// Status Change Modal
const StatusChangeModal = ({ task, onClose, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(task?.status || 'To Do');

  const handleSubmit = () => {
    onStatusChange(task.id, newStatus);
    onClose();
  };

  // Get status color for the icon background
  const getStatusColor = () => {
    switch(newStatus) {
      case 'To Do': return 'yellow';
      case 'In Progress': return 'blue';
      case 'Blocked': return 'red';
      case 'Completed': return 'green';
      case 'Pending': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-700"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`bg-${getStatusColor()}-500/20 p-2 rounded-lg mr-3`}>
              <FaExchangeAlt className={`text-${getStatusColor()}-400`} />
            </div>
            <h3 className="text-xl font-bold text-white">Update Task Status</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
          <h4 className="font-medium text-white mb-1">{task?.title}</h4>
          <p className="text-gray-400 text-sm">{task?.type} task</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">New Status</label>
          <select 
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <FaCheck className="mr-2" /> Update Status
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Main Tasks Page Component
function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Implement Login Feature",
      description: "Create login form with validation and authentication",
      priority: "High",
      status: "In Progress",
      dueDate: "May 25",
      assignedTo: ["John", "Sarah"],
      type: "personal"
    },
    {
      id: 2,
      title: "Database Schema Design",
      description: "Design database schema for user management module",
      priority: "Medium",
      status: "To Do",
      dueDate: "May 30",
      assignedTo: ["Mike"],
      type: "personal"
    },
    {
      id: 3,
      title: "API Documentation",
      description: "Create comprehensive documentation for all API endpoints",
      priority: "Low",
      status: "Completed",
      dueDate: "May 20",
      assignedTo: ["Emma"],
      type: "personal"
    },
    {
      id: 4,
      title: "Security Audit",
      description: "Perform security audit on authentication system",
      priority: "High",
      status: "To Do",
      dueDate: "June 5",
      assignedTo: ["David", "Lisa"],
      type: "assigned"
    },
    {
      id: 5,
      title: "Performance Optimization",
      description: "Optimize database queries for better performance",
      priority: "Medium",
      status: "In Progress",
      dueDate: "June 2",
      assignedTo: ["Alex"],
      type: "assigned"
    },
    {
      id: 6,
      title: "UI/UX Improvements",
      description: "Enhance user interface and experience based on feedback",
      priority: "Medium",
      status: "To Do",
      dueDate: "June 10",
      assignedTo: ["Sarah"],
      type: "personal"
    },
    {
      id: 7,
      title: "Code Review",
      description: "Conduct thorough code review for quality assurance",
      priority: "High",
      status: "Pending",
      dueDate: "June 8",
      assignedTo: ["John", "Mike"],
      type: "assigned"
    }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusChangeTask, setStatusChangeTask] = useState(null);
  const [filter, setFilter] = useState({
    type: 'all',
    status: 'all',
    priority: 'all',
    sortBy: 'dueDate',
    sortDirection: 'asc'
  });

  // Force dark mode and simulate loading
  useEffect(() => {
    document.documentElement.classList.add('dark');
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    if (filter.type !== 'all' && task.type !== filter.type) return false;
    if (filter.status !== 'all' && task.status !== filter.status) return false;
    if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
    return true;
  }).sort((a, b) => {
    const direction = filter.sortDirection === 'asc' ? 1 : -1;
    
    if (filter.sortBy === 'dueDate') {
      return a.dueDate.localeCompare(b.dueDate) * direction;
    } else if (filter.sortBy === 'priority') {
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction;
    } else if (filter.sortBy === 'status') {
      const statusOrder = { 'To Do': 0, 'In Progress': 1, 'Blocked': 2, 'Completed': 3 };
      return (statusOrder[a.status] - statusOrder[b.status]) * direction;
    }
    return 0;
  });

  // Handle adding a new task
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowAddModal(false);
  };

  // Handle editing a task
  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handle changing task status
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Toggle sort direction
  const toggleSortDirection = () => {
    setFilter(prev => ({
      ...prev,
      sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="font-poppins min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white">
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
            className="min-h-screen"
          >
            <Navbar />
            
            <main className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-bold flex items-center">
                    <FaClipboardList className="text-blue-500 mr-2" /> Task Management
                  </h1>
                  <p className="text-gray-400 mt-1">Manage your personal and assigned tasks efficiently</p>
                </div>
                {/* Only show Add New Task button when filter is set to 'personal' or 'all' */}
                {(filter.type === 'personal' || filter.type === 'all') && (
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
                  >
                    <FaPlus className="mr-2" /> Add New Personal Task
                  </button>
                )}
              </div>
              
              {/* Filters */}
              <div className="bg-gray-800 rounded-xl p-5 mb-6 shadow-lg border border-gray-700">
                <div className="flex items-center mb-4">
                  <FaFilter className="text-blue-500 mr-2" />
                  <h2 className="text-white font-medium">Filter & Sort Tasks</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Task Type</label>
                    <select
                      value={filter.type}
                      onChange={(e) => setFilter({...filter, type: e.target.value})}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Types</option>
                      <option value="personal">Personal</option>
                      <option value="assigned">Assigned</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                    <select
                      value={filter.status}
                      onChange={(e) => setFilter({...filter, status: e.target.value})}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Statuses</option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                    <select
                      value={filter.priority}
                      onChange={(e) => setFilter({...filter, priority: e.target.value})}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Priorities</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Sort By</label>
                    <div className="flex space-x-2">
                      <select
                        value={filter.sortBy}
                        onChange={(e) => setFilter({...filter, sortBy: e.target.value})}
                        className="flex-grow bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      >
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                      </select>
                      <button 
                        onClick={toggleSortDirection}
                        className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 hover:bg-gray-600 transition-all duration-200"
                        title={filter.sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                      >
                        {filter.sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tasks Grid */}
              {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTasks.map(task => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TaskCard 
                        task={task}
                        onEdit={setEditingTask}
                        onDelete={handleDeleteTask}
                        onStatusChange={(taskId) => setStatusChangeTask(tasks.find(t => t.id === taskId))}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700 shadow-lg"
                >
                  <div className="bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTasks className="text-blue-500 text-4xl" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No tasks found</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    {filter.type === 'personal' ? 
                      "You don't have any personal tasks matching your filters. Click 'Add New Personal Task' to create one." :
                      filter.type === 'assigned' ? 
                        "No assigned tasks match your current filters. Try changing your filter criteria." :
                        "No tasks match your current filters. Try changing your filter criteria or add a new personal task."}
                  </p>
                  {filter.type === 'personal' && (
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto transition-all duration-200"
                    >
                      <FaPlus className="mr-2" /> Add New Personal Task
                    </button>
                  )}
                </motion.div>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                  <FaPlus className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Add New Personal Task</h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <TaskForm 
              onSubmit={handleAddTask}
              onCancel={() => setShowAddModal(false)}
            />
          </motion.div>
        </div>
      )}
      
      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                  <FaPencilAlt className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Edit Task</h3>
              </div>
              <button 
                onClick={() => setEditingTask(null)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <TaskForm 
              task={editingTask}
              onSubmit={handleEditTask}
              onCancel={() => setEditingTask(null)}
            />
          </motion.div>
        </div>
      )}
      
      {/* Status Change Modal */}
      {statusChangeTask && (
        <StatusChangeModal 
          task={statusChangeTask}
          onClose={() => setStatusChangeTask(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default TasksPage;