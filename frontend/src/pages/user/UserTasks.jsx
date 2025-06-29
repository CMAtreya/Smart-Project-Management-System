import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTasks, FaChartBar, FaCalendarAlt, FaArrowLeft, FaProjectDiagram, FaUsers, FaFilter, FaSortAmountUp, FaSortAmountDown, FaClipboardList, FaPlus, FaPencilAlt, FaTrash, FaExclamationCircle, FaCheck
} from 'react-icons/fa';
import { HiOutlineClipboardCheck, HiOutlineCheckCircle } from 'react-icons/hi';
import Navbar from '../../components/Navbar';
import { useTask } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

function UserTasks() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, fetchTasks, loading } = useTask();
  const [projectDetails, setProjectDetails] = useState(null);
  const [filter, setFilter] = useState({
    type: 'all',
    status: 'all',
    priority: 'all',
    sortBy: 'dueDate',
    sortDirection: 'asc'
  });

  // Get projectId directly from location.state
  const projectId = location.state?.projectId;

  // Redirect if no projectId
  useEffect(() => {
    if (!projectId) {
      navigate('/user/projects');
    }
  }, [projectId, navigate]);

  // Fetch tasks for this project
  useEffect(() => {
    if (user && projectId) {
      fetchTasks({ projectId });
    }
  }, [user, projectId, fetchTasks]);

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    if (projectId && task.project !== projectId && task.project?._id !== projectId) return false;
    if (filter.type !== 'all' && task.type !== filter.type) return false;
    if (filter.status !== 'all' && task.status !== filter.status) return false;
    if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
    return true;
  }).sort((a, b) => {
    const direction = filter.sortDirection === 'asc' ? 1 : -1;
    if (filter.sortBy === 'dueDate') {
      return (new Date(a.dueDate) - new Date(b.dueDate)) * direction;
    } else if (filter.sortBy === 'priority') {
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction;
    } else if (filter.sortBy === 'status') {
      const statusOrder = { 'To Do': 0, 'In Progress': 1, 'Blocked': 2, 'Completed': 3 };
      return (statusOrder[a.status] - statusOrder[b.status]) * direction;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <button 
              onClick={() => navigate('/user/projects')}
              className="flex items-center text-gray-400 hover:text-white mb-2 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back to Projects
            </button>
            <h1 className="text-3xl font-bold flex items-center text-white">
              <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
                <FaProjectDiagram className="text-blue-400 text-2xl" />
              </div>
              Project Tasks
            </h1>
            <p className="text-gray-300 mt-2">
              Viewing tasks for project #{projectId}
            </p>
          </div>
        </div>
        {/* Filters */}
        <div className="dashboard-card gradient-border rounded-xl p-6 mb-8 shadow-xl hover:shadow-blue-900/20 transition-all duration-300">
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
                onChange={e => setFilter({ ...filter, type: e.target.value })}
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
                onChange={e => setFilter({ ...filter, status: e.target.value })}
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
                onChange={e => setFilter({ ...filter, priority: e.target.value })}
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
                  onChange={e => setFilter({ ...filter, sortBy: e.target.value })}
                  className="w-full bg-gray-700/70 backdrop-blur-sm border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500/50"
                >
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                </select>
                <button 
                  onClick={() => setFilter(f => ({ ...f, sortDirection: f.sortDirection === 'asc' ? 'desc' : 'asc' }))}
                  className="bg-gray-700/70 backdrop-blur-sm p-2 rounded-lg border border-gray-600 hover:bg-gray-600 transition-all duration-300 hover:border-blue-500/50 shadow-lg"
                  title={filter.sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                >
                  {filter.sortDirection === 'asc' ? <FaSortAmountUp className="text-blue-400" /> : <FaSortAmountDown className="text-blue-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Tasks Grid */}
        {loading ? (
          <Loader />
        ) : filteredTasks.length > 0 ? (
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
                <div className="dashboard-card rounded-xl p-5 shadow-lg border-l-4 border-l-blue-500 transition-all duration-300 hover:shadow-blue-900/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-white text-lg mb-2">{task.title}</h4>
                      <p className="text-sm text-gray-300 mb-3 line-clamp-2">{task.description}</p>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                        <span className="text-xs px-2 py-1 rounded-full border bg-blue-900/30 text-blue-300 border-blue-700">{task.type}</span>
                        <span className="text-xs px-2 py-1 rounded-full border bg-yellow-500/10 text-yellow-300 border-yellow-500/30">{task.priority}</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center border shadow-lg bg-yellow-500/10 text-yellow-300 border-yellow-500/30">
                      <FaTasks />
                    </div>
                  </div>
                  <div className="border-t border-gray-700 my-4 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-gray-300 text-sm">
                        <FaCalendarAlt className="mr-2 text-blue-400" />
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Status</span>
                      <span className="text-sm font-medium text-blue-400">{task.status}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: task.status === 'Completed' ? '100%' : task.status === 'In Progress' ? '50%' : task.status === 'Blocked' ? '75%' : task.status === 'Pending' ? '35%' : '25%' }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full rounded-full bg-blue-500"
                      ></motion.div>
                    </div>
                  </div>
                </div>
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
              No tasks match your current filters. Try changing your filter criteria.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default UserTasks;