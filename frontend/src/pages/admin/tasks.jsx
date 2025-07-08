import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTasks, FaChartBar, FaCalendarAlt, FaUser, FaSignOutAlt, 
  FaBell, FaSearch, FaEllipsisH, FaCircleNotch, FaCheckCircle,
  FaRegClock, FaExclamationCircle, FaFilter, FaPlus, FaTrash, FaPencilAlt,
  FaSortAmountDown, FaSortAmountUp, FaClipboardList, FaUsers, FaProjectDiagram,
  FaUserPlus, FaEdit, FaEye, FaArrowRight, FaBuilding, FaUserTie, FaUserCog,
  FaTag, FaCalendarCheck, FaCalendarDay, FaFlag, FaChevronDown, FaChevronUp,
  FaArrowLeft, FaListUl, FaChartPie, FaUserAlt, FaClipboard, FaClock, FaCalendarWeek,
  FaFileAlt, FaComments, FaHistory, FaExclamation, FaInfoCircle, FaLightbulb
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useTask } from '../../contexts/TaskContext';
import Navbar from '../../components/Navbar';
import axios from 'axios'; // ✅ Fixes "axios is not defined"

import { toast } from 'react-toastify'; // ✅ Fixes "toast is not defined"
import 'react-toastify/dist/ReactToastify.css'; // Optional: ensures proper toast styling


  const priorityColors = {
    'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'High': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Urgent': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  };

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
const TaskCard = ({ task, onDelete, onStatusChange, onEdit }) => {
  const { deleteTask, updateTask } = useTask();
  const token = localStorage.getItem('userToken');

  const statusColors = {
    'To Do': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'In Review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Blocked': 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleUpdate = async () => {
    try {
      const updatedFields = {
        status: 'In Progress' // You can replace this with dynamic values or a form later
      };

      const updatedTask = await updateTask(task._id, updatedFields);
      console.log('Task updated:', updatedTask);
    } catch (error) {
      console.error('Error updating task:', error.response?.data || error.message);
    }
  };

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(task._id);
    } finally {
      setDeleting(false);
    }
  };

  const daysRemaining = calculateDaysRemaining(task.dueDate);
  const isOverdue = daysRemaining < 0 && task.status !== 'Completed';

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-blue-900/20"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-white text-lg mb-2">{task.title}</h4>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{task.description}</p>
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
              <FaFlag className="mr-1 inline-block" /> {task.priority}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[task.status]}`}>
              {task.status === 'Completed' ? <FaCheckCircle className="mr-1 inline-block" /> : 
               task.status === 'In Progress' ? <FaCircleNotch className="mr-1 inline-block" /> : 
               <FaRegClock className="mr-1 inline-block" />} 
              {task.status}
            </span>
            {task.tags && task.tags.length > 0 && task.tags.map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <FaTag className="mr-1 inline-block" /> {tag}
              </span>
            ))}
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
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-red-400 hover:text-red-300 transition-colors"
          >
            {deleting ? "Deleting..." : <FaTrash />}
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
          <div className={`text-xs px-2 py-1 rounded-full ${isOverdue ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {isOverdue ? 'Overdue' : `${daysRemaining} days left`}
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <FaUserAlt className="text-gray-400 mr-2" />
            <span className="text-xs text-gray-300">Assigned to:</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white mr-2">
              {task.assignedTo.name.charAt(0)}
            </div>
            <span className="text-sm text-white">{task.assignedTo.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {['To Do', 'In Progress', 'In Review', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => {
                updateTask(task._id, { status });
                if (onStatusChange) onStatusChange(task._id, status);
              }}
              className={`py-1 px-2 text-xs rounded-lg transition-colors ${task.status === status ? 
                'bg-blue-600 text-white' : 
                'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            >
              {status}
            </button>
          ))}
        </div>

        {task.timeTracking && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">Time Spent: {task.timeTracking.spent}h</span>
              <span className="text-xs text-gray-400">Estimated: {task.timeTracking.estimated}h</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${Math.min(100, (task.timeTracking.spent / task.timeTracking.estimated) * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Task Form Modal Component
const  TaskFormModal = ({ isOpen, onClose, task, onSave, projectId }) => {
  const initialFormState = task ? {
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  } : {
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '',
    assignedTo: null,
    tags: [],
    timeTracking: {
      estimated: 0,
      spent: 0
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedTag, setSelectedTag] = useState('');
  const [projectmember, setProjectmember] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchProjectMembers = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const res = await axios.get(`/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const members = res.data.teamMembers || []; // adjust according to actual backend shape
      setProjectmember(members);
    } catch (error) {
      console.error('Failed to fetch project members:', error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectMembers();
    }
  }, [projectId]);

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

  const handleTimeTrackingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      timeTracking: {
        ...prev.timeTracking,
        [name]: parseInt(value) || 0
      }
    }));
  };

  const handleAssigneeChange = (e) => {
    const memberId = e.target.value;
    if (memberId === '') {
      setFormData(prev => ({ ...prev, assignedTo: null }));
    } else {
      const selectedMember = projectmember.find(member => member._id === memberId);
      setFormData(prev => ({ ...prev, assignedTo: selectedMember }));
    }
  };

  const { createTask } = useTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (onSave) await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error creating the task:', error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <FaSignOutAlt />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none"
              placeholder="Enter task description"
            ></textarea>
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
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
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* Due Date & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
              <div className="flex">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white"
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-r-lg"
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

          {/* Assignee Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Assign To</label>
            <select
              value={formData.assignedTo ? formData.assignedTo._id : ''}
              onChange={handleAssigneeChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="">Select team member</option>
              {projectmember.map(member => (
                <option key={member._id} value={member._id}>
                  {member.name} ({member.role})
                </option>
              ))}
            </select>
          </div>

          {/* Time Tracking */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Time Tracking</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Estimated Hours</label>
                <input
                  type="number"
                  name="estimated"
                  value={formData.timeTracking.estimated}
                  onChange={handleTimeTrackingChange}
                  min="0"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Hours Spent</label>
                <input
                  type="number"
                  name="spent"
                  value={formData.timeTracking.spent}
                  onChange={handleTimeTrackingChange}
                  min="0"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Main Tasks Component
function Tasks() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAssignee, setFilterAssignee] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  
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
  const projectId = location.state?.projectId;

  if (!projectId) {
    navigate('/admin/projects');
    return;
  }

  const fetchProjectAndTasks = async () => {
    try {
      const token = localStorage.getItem('userToken');

      // 1️⃣ Fetch project details from backend
      if (!projectId || projectId === 'undefined') {
        toast.error('Invalid project ID.');
        navigate('/admin/projects');
        return;
      }
      const projectRes = await axios.get(`projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const fetchedProject = projectRes.data.project;

      // 2️⃣ Fetch all tasks for this project
      const tasksRes = await axios.get(`tasks?projectId=${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const fetchedTasks = tasksRes.data.tasks;

      // 3️⃣ Map tasks to team members
      const teamMembersWithTasks = fetchedProject.teamMembers.map(member => {
        const memberTasks = fetchedTasks.filter(
          task => task.assignedTo && task.assignedTo._id === member._id
        );
        return { ...member, tasks: memberTasks };
      });

      // 4️⃣ Update state
      setProject({ ...fetchedProject, teamMembers: teamMembersWithTasks });
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch project or tasks:', error);
      toast.error('Failed to load project details');
      navigate('/admin/projects');
    } finally {
      setLoading(false);
    }
  };

  fetchProjectAndTasks();
}, [location.state, navigate]);

  const handleCreateTask = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

const handleDeleteTask = async (taskId) => {
const authToken = localStorage.getItem('Token');

  try {
    const res = await axios.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${authToken}` // ⬅️ Replace with your actual token
      }
    });

    toast.success(res.data.message || "🗑️ Task deleted successfully!");

  const taskRes = await axios.get(`/tasks?projectId=${project._id}`, {
  headers: { Authorization: `Bearer ${authToken}` }
});
setTasks(taskRes.data.tasks);

    const projectRes = await axios.get(`/projects/${project.id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    setProject(projectRes.data);

  } catch (error) {
    console.error("❌ Error deleting task:", error);
    toast.error(error?.response?.data?.message || "❌ Failed to delete task");
  }
};


const handleSaveTask = async (taskData) => {
  const authToken = localStorage.getItem('Token');

  try {
    // Always include the project field in the request body
    const dataToSend = { ...taskData, project: project._id };

    if (currentTask) {
      // ✅ Update existing task (use _id, not id)
      const res = await axios.patch(`/tasks/${currentTask._id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      toast.success("✅ Task updated successfully!");
    } else {
      // ✅ Create new task
      await axios.post(`/tasks/create`, dataToSend, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      toast.success("✅ Task created successfully!");
    }

    // ✅ Refetch tasks after update/create (fetch only for current project)
    const taskRes = await axios.get(`/tasks?projectId=${project._id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log("Fetched tasks:", taskRes.data.tasks);
    setTasks(taskRes.data.tasks);

    // ✅ Refetch updated project data
    if (project?.id) {
      const projectRes = await axios.get(`/projects/${project.id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setProject(projectRes.data);
    }

    // ✅ Close modal
    setIsModalOpen(false);

    // ✅ Scroll to task section
    setTimeout(() => {
      const taskSection = document.getElementById("task-section");
      if (taskSection) {
        taskSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

  } catch (error) {
    console.error("❌ Error saving task:", error);
    toast.error(error?.response?.data?.message || "❌ Failed to save task. Please try again.");
  }
};
  const handleStatusChange = async (taskId, newStatus) => {
  const authToken = localStorage.getItem('Token');
  try {
    // Update task status in backend
    await axios.patch(`/tasks/${taskId}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    // Refetch tasks for the current project
    const taskRes = await axios.get(`/tasks?projectId=${project._id}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    setTasks(taskRes.data.tasks);

    // Optionally, refetch project data if needed
    // const projectRes = await axios.get(`/projects/${project._id}`, {
    //   headers: { Authorization: `Bearer ${authToken}` }
    // });
    // setProject(projectRes.data);

  } catch (error) {
    console.error("❌ Error updating task status:", error);
    toast.error(error?.response?.data?.message || "❌ Failed to update task status");
  }
};

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const toggleFilterExpanded = () => {
    setIsFilterExpanded(prev => !prev);
  };

  const handleBackToProjects = () => {
    navigate('/admin/projects');
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      // Filter by status
      if (filterStatus !== 'All' && task.status !== filterStatus) {
        return false;
      }
      
      // Filter by assignee
      if (filterAssignee !== 'All' && task.assignedTo.id !== filterAssignee) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !(
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.type.toLowerCase().includes(searchTerm.toLowerCase())
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
      } else if (sortBy === 'dueDate') {
        return sortOrder === 'asc'
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      } else if (sortBy === 'assignee') {
        return sortOrder === 'asc'
          ? a.assignedTo.name.localeCompare(b.assignedTo.name)
          : b.assignedTo.name.localeCompare(a.assignedTo.name);
      }
      return 0;
    });

  // Task statistics
  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'To Do').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    inReview: tasks.filter(t => t.status === 'In Review').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    blocked: tasks.filter(t => t.status === 'Blocked').length,
    urgent: tasks.filter(t => t.priority === 'Urgent').length,
    high: tasks.filter(t => t.priority === 'High').length
  };

  // Calculate project completion percentage
  const calculateProjectCompletion = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  // Calculate time tracking statistics
  const calculateTimeStats = () => {
    const totalEstimated = tasks.reduce((total, task) => total + (task.timeTracking?.estimated || 0), 0);
    const totalSpent = tasks.reduce((total, task) => total + (task.timeTracking?.spent || 0), 0);
    
    return {
      estimated: totalEstimated,
      spent: totalSpent,
      remaining: Math.max(0, totalEstimated - totalSpent),
      progress: totalEstimated > 0 ? Math.min(100, Math.round((totalSpent / totalEstimated) * 100)) : 0
    };
  };

  const timeStats = calculateTimeStats();
  const projectCompletion = calculateProjectCompletion();

  // Group tasks by status for Kanban view
  const tasksByStatus = {
    'To Do': tasks.filter(task => task.status === 'To Do'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'In Review': tasks.filter(task => task.status === 'In Review'),
    'Completed': tasks.filter(task => task.status === 'Completed'),
    'Blocked': tasks.filter(task => task.status === 'Blocked')
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
              
              <button
                onClick={handleCreateTask}
                className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center transition-colors"
              >
                <FaPlus className="mr-2" /> Create New Task
              </button>
            </div>

            {/* Project Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg col-span-1 md:col-span-2"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Project Overview</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Status</p>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${project?.status === 'Completed' ? 'bg-green-500' : project?.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                      <p className="text-sm font-medium text-white">{project?.status}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Priority</p>
                    <p className="text-sm font-medium text-white">{project?.priority}</p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Start Date</p>
                    <p className="text-sm font-medium text-white">{new Date(project?.startDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">End Date</p>
                    <p className="text-sm font-medium text-white">{new Date(project?.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Project Completion</span>
                    <span className="text-xs font-medium text-white">{projectCompletion}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${projectCompletion < 30 ? 'bg-red-500' : projectCompletion < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${projectCompletion}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project?.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/30"
                    >
                      <FaTag className="inline-block mr-1 text-xs" /> {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Time Tracking</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Time Spent: {timeStats.spent}h</span>
                    <span className="text-xs text-gray-400">Estimated: {timeStats.estimated}h</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${timeStats.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Spent</p>
                    <p className="text-xl font-semibold text-white">{timeStats.spent}h</p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Remaining</p>
                    <p className="text-xl font-semibold text-white">{timeStats.remaining}h</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="text-sm font-medium text-white mb-2">Task Status</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                      <span className="text-xs text-gray-400">To Do: {taskStats.todo}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-xs text-gray-400">In Progress: {taskStats.inProgress}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-xs text-gray-400">In Review: {taskStats.inReview}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs text-gray-400">Completed: {taskStats.completed}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'tasks' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              >
                <FaListUl className="inline-block mr-2" /> Tasks
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'team' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              >
                <FaUsers className="inline-block mr-2" /> Team
              </button>
              <button
                onClick={() => setActiveTab('kanban')}
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'kanban' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
              >
                <FaClipboard className="inline-block mr-2" /> Kanban
              </button>
            </div>

            {/* Tasks Tab Content */}
            {activeTab === 'tasks' && (
              <div>
                {/* Filters and Search */}
                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-white mr-4">Tasks</h3>
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
                        placeholder="Search tasks..."
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                          <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="All">All Statuses</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="In Review">In Review</option>
                            <option value="Completed">Completed</option>
                            <option value="Blocked">Blocked</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Assignee</label>
                          <select
                            value={filterAssignee}
                            onChange={(e) => setFilterAssignee(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="All">All Team Members</option>
                            {project?.teamMembers.map(member => (
                              <option key={member._id} value={member._id}>{member.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Sort By</label>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="dueDate">Due Date</option>
                            <option value="title">Task Name</option>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                            <option value="assignee">Assignee</option>
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

                {/* Tasks Grid */}
                {filteredTasks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map(task => (
                      <TaskCard 
                        key={task._id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={() => handleDeleteTask(task._id)}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg text-center">
                    <FaClipboardList className="text-gray-500 text-5xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
                    <p className="text-gray-400 mb-6">Try changing your filters or create a new task</p>
                    <button
                      onClick={handleCreateTask}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center mx-auto transition-colors"
                    >
                      <FaPlus className="mr-2" /> Create New Task
                    </button>
                  </div>
                )}
             </div>
            )}

            {/* Team Tab Content */}
            {activeTab === 'team' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {project?.teamMembers.map(member => (
                    <TeamMemberCard key={member._id} member={member} />
                  ))}
                </div>
              </div>
            )}

            {/* Kanban Board Tab Content */}
            {activeTab === 'kanban' && (
              <div className="mb-6">
                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <FaClipboard className="mr-2 text-blue-500" /> Kanban Board
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCreateTask}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center text-sm transition-colors"
                      >
                        <FaPlus className="mr-1" /> Add Task
                      </button>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="All">All Statuses</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="In Review">In Review</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    <FaInfoCircle className="inline-block mr-1 text-blue-400" /> 
                    Drag and drop tasks between columns to update their status. Click on a task to edit its details.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
                  {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                    <div key={status} className="min-w-[280px]">
                      <div className={`rounded-t-xl p-3 border border-b-0 ${status === 'To Do' ? 'bg-gray-800 border-gray-700' : 
                                                                              status === 'In Progress' ? 'bg-blue-900/30 border-blue-800/50' : 
                                                                              status === 'In Review' ? 'bg-yellow-900/30 border-yellow-800/50' : 
                                                                              status === 'Completed' ? 'bg-green-900/30 border-green-800/50' : 
                                                                              'bg-red-900/30 border-red-800/50'}`}>
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-white flex items-center">
                            {status === 'To Do' && <FaRegClock className="mr-2 text-gray-400" />}
                            {status === 'In Progress' && <FaCircleNotch className="mr-2 text-blue-400 animate-spin" />}
                            {status === 'In Review' && <FaSearch className="mr-2 text-yellow-400" />}
                            {status === 'Completed' && <FaCheckCircle className="mr-2 text-green-400" />}
                            {status === 'Blocked' && <FaExclamationCircle className="mr-2 text-red-400" />}
                            {status}
                          </h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${status === 'To Do' ? 'bg-gray-700' : 
                                                                                        status === 'In Progress' ? 'bg-blue-800/70' : 
                                                                                        status === 'In Review' ? 'bg-yellow-800/70' : 
                                                                                        status === 'Completed' ? 'bg-green-800/70' : 
                                                                                        'bg-red-800/70'}`}>
                            {statusTasks.length}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`rounded-b-xl p-3 border border-t-0 min-h-[500px] ${status === 'To Do' ? 'bg-gray-800/50 border-gray-700' : 
                                                                                        status === 'In Progress' ? 'bg-blue-900/10 border-blue-800/50' : 
                                                                                        status === 'In Review' ? 'bg-yellow-900/10 border-yellow-800/50' : 
                                                                                        status === 'Completed' ? 'bg-green-900/10 border-green-800/50' : 
                                                                                        'bg-red-900/10 border-red-800/50'}`}
                           onDragOver={(e) => {
                             e.preventDefault();
                             e.currentTarget.classList.add('bg-opacity-70');
                           }}
                           onDragLeave={(e) => {
                             e.currentTarget.classList.remove('bg-opacity-70');
                           }}
                           onDrop={(e) => {
                             e.preventDefault();
                             e.currentTarget.classList.remove('bg-opacity-70');
                             const taskId = e.dataTransfer.getData('taskId');
                             handleStatusChange(taskId, status);
                           }}
                      >
                        {statusTasks.length > 0 ? (
                          <div className="space-y-3">
                            {statusTasks.map(task => (
                              <motion.div
                                key={task._id}
                                layoutId={`task-${task._id}`}
                                whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
                                className={`p-4 rounded-lg cursor-pointer shadow-md ${status === 'To Do' ? 'bg-gray-800 border-l-4 border-gray-500' : 
                                                                                    status === 'In Progress' ? 'bg-gray-800 border-l-4 border-blue-500' : 
                                                                                    status === 'In Review' ? 'bg-gray-800 border-l-4 border-yellow-500' : 
                                                                                    status === 'Completed' ? 'bg-gray-800 border-l-4 border-green-500' : 
                                                                                    'bg-gray-800 border-l-4 border-red-500'}`}
                                onClick={() => handleEditTask(task)}
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('taskId', task._id.toString());
                                }}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-white text-sm line-clamp-2">{task.title}</h4>
                                  <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                                    {task.priority}
                                  </span>
                                </div>
                                
                                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                                
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center">
                                    <FaCalendarDay className="text-gray-400 mr-1 text-xs" />
                                    <span className="text-xs text-gray-400">
                                      {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                  
                                  {task.tags && task.tags.length > 0 && (
                                    <div className="flex items-center">
                                      <FaTag className="text-gray-400 mr-1 text-xs" />
                                      <span className="text-xs text-gray-400">{task.tags[0]}{task.tags.length > 1 ? ` +${task.tags.length - 1}` : ''}</span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">
                                      {task.assignedTo.name.charAt(0)}
                                    </div>
                                    <span className="text-xs text-gray-400 ml-1">{task.assignedTo.name.split(' ')[0]}</span>
                                  </div>
                                  
                                  {task.timeTracking && (
                                    <div className="flex items-center">
                                      <FaClock className="text-gray-400 mr-1 text-xs" />
                                      <span className="text-xs text-gray-400">
                                        {task.timeTracking.spent}/{task.timeTracking.estimated}h
                                      </span>
                                    </div>
                                  )}
                                </div>
                                
                                {task.timeTracking && (
                                  <div className="mt-2 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${task.priority === 'Urgent' ? 'bg-red-500' : 
                                                                        task.priority === 'High' ? 'bg-orange-500' : 
                                                                        task.priority === 'Medium' ? 'bg-yellow-500' : 
                                                                        'bg-green-500'}`}
                                      style={{ width: `${Math.min(100, (task.timeTracking.spent / task.timeTracking.estimated) * 100)}%` }}
                                    ></div>
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center py-8">
                            <FaClipboardList className="text-gray-600 text-3xl mb-2" />
                            <p className="text-gray-500 text-sm">No tasks</p>
                            <button 
                              onClick={handleCreateTask}
                              className="mt-4 px-3 py-1 bg-blue-600/50 hover:bg-blue-500 rounded-lg text-xs transition-colors"
                            >
                              <FaPlus className="mr-1 inline-block" /> Add Task
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <FaLightbulb className="mr-2 text-yellow-400" /> Task Management Tips
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-700">
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                        <FaRegClock className="mr-2 text-blue-400" /> Time Management
                      </h4>
                      <p className="text-xs text-gray-400">Break down large tasks into smaller, manageable chunks. Estimate time accurately and track progress regularly.</p>
                    </div>
                    <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-700">
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                        <FaExclamationCircle className="mr-2 text-red-400" /> Blockers
                      </h4>
                      <p className="text-xs text-gray-400">Identify and communicate blockers early. Don't let tasks stay blocked for too long without attention.</p>
                    </div>
                    <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-700">
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                        <FaUsers className="mr-2 text-green-400" /> Collaboration
                      </h4>
                      <p className="text-xs text-gray-400">Maintain clear communication with team members. Update task status regularly to keep everyone informed.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
           <AnimatePresence>
  {isModalOpen && (
    <TaskFormModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      task={currentTask}
      onSave={handleSaveTask}
      projectMembers={project?.teamMembers || []}
      projectId={project?._id}  // ✅ This is the fix
    />
  )}
</AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Tasks;