import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTasks, FaChartBar, FaCalendarAlt, FaUser, FaSignOutAlt, 
  FaBell, FaSearch, FaEllipsisH, FaCircleNotch, FaCheckCircle,
  FaRegClock, FaExclamationCircle, FaFilter, FaPlus, FaTrash, FaPencilAlt,
  FaSortAmountDown, FaSortAmountUp, FaClipboardList
} from 'react-icons/fa';
import { 
  HiOutlineClipboardCheck, HiOutlineCheckCircle, HiOutlineClock,
  HiOutlineUser, HiOutlineOfficeBuilding 
} from 'react-icons/hi';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-apple-blue-600 border-t-transparent"></div>
  </div>
);

// Import the common Navbar component
import Navbar from '../../components/Navbar';

// Task Analytics Component
const TaskAnalytics = ({ taskCounts }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dashboard-card gradient-border mb-8 rounded-xl p-6 shadow-xl hover:shadow-blue-900/30 transition-all duration-300"
      whileHover={{ scale: 1.01, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-center mb-6">
        <div className="bg-blue-900/30 p-3 rounded-lg mr-3">
          <FaChartBar className="text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Task Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Task Type Distribution */}
        <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 shadow-lg">
          <div className="flex items-center mb-3">
            <div className="bg-blue-900/30 p-2 rounded-lg mr-2">
              <HiOutlineUser className="text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-200">Personal Tasks</h3>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-white">{taskCounts.personal}</span>
            <span className="text-xs text-gray-400 ml-2 mb-1">tasks</span>
          </div>
          <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${(taskCounts.personal / (taskCounts.personal + taskCounts.assigned || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 shadow-lg">
          <div className="flex items-center mb-3">
            <div className="bg-purple-900/30 p-2 rounded-lg mr-2">
              <HiOutlineOfficeBuilding className="text-purple-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-200">Assigned Tasks</h3>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-white">{taskCounts.assigned}</span>
            <span className="text-xs text-gray-400 ml-2 mb-1">tasks</span>
          </div>
          <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full" 
              style={{ width: `${(taskCounts.assigned / (taskCounts.personal + taskCounts.assigned || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Task Status Distribution */}
        <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 shadow-lg">
          <div className="flex items-center mb-3">
            <div className="bg-yellow-900/30 p-2 rounded-lg mr-2">
              <HiOutlineClipboardCheck className="text-yellow-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-200">To Do</h3>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-white">{taskCounts.todo}</span>
            <span className="text-xs text-gray-400 ml-2 mb-1">tasks</span>
          </div>
          <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full" 
              style={{ width: `${(taskCounts.todo / (taskCounts.todo + taskCounts.inProgress + taskCounts.completed || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 shadow-lg">
          <div className="flex items-center mb-3">
            <div className="bg-blue-900/30 p-2 rounded-lg mr-2">
              <HiOutlineClock className="text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-200">In Progress</h3>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-white">{taskCounts.inProgress}</span>
            <span className="text-xs text-gray-400 ml-2 mb-1">tasks</span>
          </div>
          <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${(taskCounts.inProgress / (taskCounts.todo + taskCounts.inProgress + taskCounts.completed || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 shadow-lg">
          <div className="flex items-center mb-3">
            <div className="bg-green-900/30 p-2 rounded-lg mr-2">
              <HiOutlineCheckCircle className="text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-200">Completed</h3>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-white">{taskCounts.completed}</span>
            <span className="text-xs text-gray-400 ml-2 mb-1">tasks</span>
          </div>
          <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${(taskCounts.completed / (taskCounts.todo + taskCounts.inProgress + taskCounts.completed || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Task Card Component
const TaskCard = ({ task, onStatusChange, onEdit, onDelete }) => {
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
    'Low': 'bg-green-500/10 text-green-600 border-green-500/30',
    'Medium': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
    'High': 'bg-red-500/10 text-red-600 border-red-500/30'
  };

  const priorityIcons = {
    'Low': <FaCircleNotch />,
    'Medium': <FaExclamationCircle />,
    'High': <FaExclamationCircle />
  };

  // Determine if this is a personal or assigned task for styling
  const isPersonal = task.type === 'personal';
  const cardBorderClass = isPersonal 
    ? `border-l-4 border-l-blue-500` 
    : `border-l-4 border-l-purple-500`;

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`dashboard-card rounded-xl p-5 shadow-lg ${cardBorderClass} transition-all duration-300 hover:shadow-blue-900/20`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-white text-lg mb-2">{task.title}</h4>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{task.description}</p>
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${isPersonal ? 'bg-blue-900/30 text-blue-300 border-blue-700' : 'bg-purple-900/30 text-purple-300 border-purple-700'}`}>
              {isPersonal ? 'Personal' : 'Assigned'}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority].replace('text-', 'text-').replace('600', '300')}`}>
              {task.priority}
            </span>
          </div>
        </div>
        <div className={`
          h-10 w-10 rounded-full flex items-center justify-center border shadow-lg
          ${priorityColors[task.priority].replace('text-', 'text-').replace('600', '300')}
        `}>
          {priorityIcons[task.priority]}
        </div>
      </div>
      
      <div className="border-t border-gray-700 my-4 pt-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-300 text-sm">
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
          <span className={`text-sm font-medium ${statusColors[task.status].replace('bg-', 'text-')}`}>
            {task.status}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ 
              width: task.status === 'Completed' ? '100%' : 
                    task.status === 'In Progress' ? '50%' : 
                    task.status === 'Blocked' ? '75%' : 
                    task.status === 'Pending' ? '35%' : '25%' 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-full rounded-full ${statusColors[task.status] || 'bg-gray-500'}`}
          ></motion.div>
        </div>
      </div>

      {/* Task Actions */}
      <div className="flex justify-end space-x-2 mt-4 pt-2 border-t border-gray-700">
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStatusChange(task.id)}
          className="bg-gray-700/70 backdrop-blur-sm hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center border border-gray-600 hover:border-blue-500/50"
        >
          <span className="mr-1">Status</span> <FaExclamationCircle />
        </motion.button>
        {isPersonal && (
          <>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(task)}
              className="text-xs bg-blue-900/30 hover:bg-blue-800/50 text-blue-300 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center border border-blue-800 hover:border-blue-500"
              title="Edit Task"
            >
              <FaPencilAlt />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(239, 68, 68, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(task.id)}
              className="text-xs bg-red-900/30 hover:bg-red-800/50 text-red-300 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center border border-red-800 hover:border-red-500"
              title="Delete Task"
            >
              <FaTrash />
            </motion.button>
          </>
        )}
        {!isPersonal && (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-xs text-purple-300 px-3 py-1.5 rounded-lg bg-purple-900/30 border border-purple-800 hover:border-purple-500 transition-all duration-300"
          >
            Admin Assigned
          </motion.div>
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

  // Determine if this is a personal or assigned task
  const isPersonal = task ? task.type === 'personal' : true;
  const isEditing = !!task;

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit} 
      className="space-y-4"
    >
      {!isPersonal && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}  
          className="mb-6 p-4 bg-purple-900/20 backdrop-blur-sm border border-purple-700 rounded-lg shadow-lg gradient-border"
        >
          <div className="flex items-center text-purple-400 mb-2">
            <FaExclamationCircle className="mr-2" />
            <span className="font-medium">Admin Assigned Task</span>
          </div>
          <p className="text-sm text-gray-300">This task was assigned by an administrator. You can update its status but cannot modify its core details.</p>
        </motion.div>
      )}

      {isPersonal && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 p-4 bg-blue-900/20 backdrop-blur-sm border border-blue-700 rounded-lg shadow-lg gradient-border"
        >
          <div className="flex items-center text-blue-400 mb-2">
            <FaUser className="mr-2" />
            <span className="font-medium">Personal Task</span>
          </div>
          <p className="text-sm text-gray-300">{isEditing ? "You can edit all details of this personal task." : "Creating a new personal task. You'll have full control over it."}</p>
        </motion.div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
        <input 
          type="text" 
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
          placeholder="Enter task title"
          required
          disabled={!isPersonal && isEditing}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] transition-all duration-300 hover:border-blue-500/50"
          placeholder="Enter task description"
          disabled={!isPersonal && isEditing}
        ></textarea>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
          <select 
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
            disabled={!isPersonal && isEditing}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
        <input 
          type="text" 
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
          placeholder="e.g. May 30"
          disabled={!isPersonal && isEditing}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Assigned To (comma separated)</label>
        <input 
          type="text" 
          name="assignedTo"
          value={typeof formData.assignedTo === 'string' ? formData.assignedTo : formData.assignedTo.join(', ')}
          onChange={handleChange}
          className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
          placeholder="e.g. John, Sarah, Mike"
          disabled={!isPersonal && isEditing}
        />
      </div>

      {/* Display task type but don't allow changing it */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Task Type</label>
        <motion.div 
          whileHover={{ boxShadow: isPersonal ? "0 0 10px rgba(59, 130, 246, 0.3)" : "0 0 10px rgba(168, 85, 247, 0.3)" }}
          className={`px-4 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 ${isPersonal ? 'bg-blue-900/20 border-blue-700 hover:border-blue-500' : 'bg-purple-900/20 border-purple-700 hover:border-purple-500'}`}
        >
          {!isPersonal ? (
            <div className="flex items-center">
              <span className="text-purple-400 font-medium">Assigned</span>
              <span className="ml-2 text-xs text-gray-400">(Cannot be changed)</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-blue-400 font-medium">Personal</span>
              {!isEditing && <span className="ml-2 text-xs text-gray-400">(Default for new tasks)</span>}
            </div>
          )}
        </motion.div>
      </div>
      
      <div className="pt-4 flex justify-end space-x-3">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700/70 backdrop-blur-sm border border-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-600"
        >
          Cancel
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 border border-blue-400/30 flex items-center"
          disabled={!isPersonal && isEditing}
        >
          {isEditing ? (
            isPersonal ? (
              <>
                <FaCheck className="mr-2" /> Update Personal Task
              </>
            ) : (
              <>
                <FaCheck className="mr-2" /> Update Status Only
              </>
            )
          ) : (
            <>
              <FaPlus className="mr-2" /> Add Personal Task
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="dashboard-card gradient-border rounded-xl p-6 w-full max-w-xl mx-4 shadow-xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className={`bg-${getStatusColor()}-900/30 p-3 rounded-lg mr-3`}>
              <FaExchangeAlt className={`text-${getStatusColor()}-400`} />
            </div>
            <h3 className="text-xl font-bold text-white">Update Task Status</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4 p-4 bg-gray-700 rounded-lg border border-gray-600 shadow-lg">
          <h4 className="font-medium text-white mb-1">{task?.title}</h4>
          <p className="text-gray-300 text-sm">{task?.type} task</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">New Status</label>
          <select 
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
         <motion.button 
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={onClose}
           className="px-4 py-2 bg-gray-700/70 backdrop-blur-sm border border-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-600"
         >
           Cancel
         </motion.button>
         <motion.button 
           whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
           whileTap={{ scale: 0.95 }}
           onClick={handleSubmit}
           className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center border border-blue-400/30"
         >
           <FaCheck className="mr-2" /> Update Status
         </motion.button>
       </div>
      </motion.div>
    </div>
  );
};

// Main Tasks Page Component
function TasksPage() {
  const location = useLocation();
  const navigate = useNavigate();
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

  // Simulate loading only (removed forced dark mode)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Check for state from navigation (e.g., from dashboard)
  useEffect(() => {
    if (location.state) {
      // If redirected from dashboard with openAddModal flag
      if (location.state.openAddModal) {
        setShowAddModal(true);
        // Set the filter to match the task type we're adding
        if (location.state.taskType) {
          setFilter(prev => ({ ...prev, type: location.state.taskType }));
        }
      }
      // Clear the location state to prevent modal from reopening on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

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
  
  // Count tasks by type and status for analytics
  const taskCounts = {
    personal: tasks.filter(t => t.type === 'personal').length,
    assigned: tasks.filter(t => t.type === 'assigned').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    todo: tasks.filter(t => t.status === 'To Do').length
  };

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

  // Define background pattern styles
  const backgroundStyles = `
    .bg-pattern {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.9)),
        radial-gradient(at 47% 33%, rgba(59, 130, 246, 0.15) 0, transparent 59%), 
        radial-gradient(at 82% 65%, rgba(16, 185, 129, 0.1) 0, transparent 55%);
      z-index: 0;
    }
    
    .bg-grid {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: 50px 50px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      z-index: 0;
    }
    
    .dashboard-card {
      backdrop-filter: blur(10px);
      background-color: rgba(31, 41, 55, 0.7);
      border: 1px solid rgba(75, 85, 99, 0.5);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
    
    .dashboard-card:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(59, 130, 246, 0.3);
      transform: translateY(-5px);
    }
    
    .gradient-border {
      position: relative;
      border-radius: 0.75rem;
      overflow: hidden;
    }
    
    .gradient-border::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 0.75rem;
      padding: 1px;
      background: linear-gradient(
        to right, 
        rgba(59, 130, 246, 0.5), 
        rgba(16, 185, 129, 0.5)
      );
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
  `;

  // Add styles to document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = backgroundStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Background pattern */}
      <div className="bg-pattern"></div>
      <div className="bg-grid"></div>
      
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
            className="min-h-screen relative z-10"
          >
            <Navbar />
            
            <main className="container mx-auto px-4 py-8 mt-16">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
              >
                <div>
                  <h1 className="text-3xl font-bold flex items-center text-white">
                    <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
                      <HiOutlineClipboardCheck className="text-blue-400 text-2xl" />
                    </div>
                    Task Management
                  </h1>
                  <p className="text-gray-300 mt-2">Manage your personal and assigned tasks efficiently</p>
                </div>
                {/* Only show Add New Task button when filter is set to 'personal' or 'all' */}
                {(filter.type === 'personal' || filter.type === 'all') && (
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 border border-blue-400/30"
                  >
                    <FaPlus className="mr-2" /> Add New Personal Task
                  </motion.button>
                )}
              </motion.div>
              
              {/* Filters */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="dashboard-card gradient-border rounded-xl p-6 mb-8 shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center mb-5">
                  <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
                    <FaFilter className="text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Filter & Sort Tasks</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Task Type</label>
                    <select
                      value={filter.type}
                      onChange={(e) => setFilter({...filter, type: e.target.value})}
                      className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
                    >
                      <option value="all">All Types</option>
                      <option value="personal">Personal</option>
                      <option value="assigned">Assigned</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                      value={filter.status}
                      onChange={(e) => setFilter({...filter, status: e.target.value})}
                      className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
                    >
                      <option value="all">All Statuses</option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                    <select
                      value={filter.priority}
                      onChange={(e) => setFilter({...filter, priority: e.target.value})}
                      className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
                    >
                      <option value="all">All Priorities</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                    <div className="flex space-x-2">
                      <select
                        value={filter.sortBy}
                        onChange={(e) => setFilter({...filter, sortBy: e.target.value})}
                        className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
                      >
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                      </select>
                      <button 
                        onClick={toggleSortDirection}
                        className="bg-gray-700/70 backdrop-blur-sm p-2 rounded-lg border border-gray-600 hover:bg-gray-600 transition-all duration-300 hover:border-blue-500/50 shadow-lg"
                        title={filter.sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                      >
                        {filter.sortDirection === 'asc' ? <FaSortAmountUp className="text-blue-400" /> : <FaSortAmountDown className="text-blue-400" />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Task Analytics */}
              <TaskAnalytics taskCounts={taskCounts} />
              
              {/* Tasks Grid */}
              {filteredTasks.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
                >
                  {filteredTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <TaskCard 
                        task={task}
                        onEdit={setEditingTask}
                        onDelete={handleDeleteTask}
                        onStatusChange={(taskId) => setStatusChangeTask(tasks.find(t => t.id === taskId))}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="dashboard-card gradient-border rounded-xl p-8 text-center shadow-xl mb-10"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <HiOutlineClipboardCheck className="text-blue-400 text-4xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">No tasks found</h3>
                  <p className="text-gray-300 max-w-md mx-auto">
                    {filter.type === 'personal' ? 
                      "You don't have any personal tasks matching your filters. Click 'Add New Personal Task' to create one." :
                      filter.type === 'assigned' ? 
                        "No assigned tasks match your current filters. Try changing your filter criteria." :
                        "No tasks match your current filters. Try changing your filter criteria or add a new personal task."}
                  </p>
                  {filter.type === 'personal' && (
                    <motion.button 
                      whileHover={{ scale: 1.03, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowAddModal(true)}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center mx-auto transition-all duration-300"
                    >
                      <FaPlus className="mr-2" /> Add New Personal Task
                    </motion.button>
                  )}
                </motion.div>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm overflow-y-auto py-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="dashboard-card gradient-border rounded-xl p-6 w-full max-w-xl mx-4 shadow-xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="bg-blue-900/30 p-3 rounded-lg mr-3">
                  <FaPlus className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Add New Personal Task</h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm overflow-y-auto py-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="dashboard-card gradient-border rounded-xl p-6 w-full max-w-xl mx-4 shadow-xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="bg-yellow-900/30 p-3 rounded-lg mr-3">
                  <FaPencilAlt className="text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Edit Task</h3>
              </div>
              <button 
                onClick={() => setEditingTask(null)}
                className="text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"
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