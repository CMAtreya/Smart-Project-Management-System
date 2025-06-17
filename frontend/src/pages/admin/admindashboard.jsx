import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTasks, FaChartBar, FaCalendarAlt, FaUser, FaSignOutAlt, 
  FaBell, FaSearch, FaEllipsisH, FaCircleNotch, FaCheckCircle,
  FaRegClock, FaExclamationCircle, FaHeartbeat, FaProjectDiagram,
  FaClipboardCheck, FaChevronRight, FaClipboardList, FaLightbulb,
  FaUserCog, FaUserTie, FaUsers, FaFilter, FaPlus, FaArrowRight, FaEye,
  FaUserShield, FaChartPie, FaChartLine, FaBuilding, FaServer, FaCog,
  FaUserFriends, FaClipboard, FaFileAlt, FaExclamation, FaThumbsUp
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

// Import the common Navbar component
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
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .dashboard-card:hover::before {
    opacity: 1;
  }
`;

const styles = {
  card: "dashboard-card bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-sm hover:shadow-indigo-900/30",
  heading: "text-xl font-bold text-gray-800 dark:text-white flex items-center",
  iconBox: "p-2 rounded-lg mr-3",
  button: "text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors",
  badge: "text-xs font-medium py-1 px-3 rounded-full"
};

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
  </div>
);

// Company Performance Component
const CompanyPerformance = () => {
  const performanceData = [
    { label: 'Projects Completed', value: 87, percentage: 87, color: 'bg-green-500' },
    { label: 'On-Time Delivery', value: 92, percentage: 92, color: 'bg-blue-500' },
    { label: 'Client Satisfaction', value: 95, percentage: 95, color: 'bg-purple-500' },
    { label: 'Team Efficiency', value: 83, percentage: 83, color: 'bg-indigo-500' },
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <div className="bg-indigo-900/30 p-2 rounded-lg mr-3">
            <FaChartLine className="text-indigo-400" />
          </div>
          Company Performance
        </h3>
        <button className="text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 p-2 rounded-lg">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="space-y-5">
        {performanceData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-sm font-medium text-white">{item.value}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-full rounded-full ${item.color}`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Team Overview Component
const TeamOverview = () => {
  const teamData = [
    { name: 'Development', count: 12, active: 10, color: 'bg-blue-500' },
    { name: 'Design', count: 8, active: 7, color: 'bg-purple-500' },
    { name: 'Marketing', count: 6, active: 5, color: 'bg-pink-500' },
    { name: 'Management', count: 4, active: 4, color: 'bg-yellow-500' },
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
            <FaUserFriends className="text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Team Overview</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium bg-purple-500/20 text-purple-400 py-1 px-3 rounded-full">{teamData.reduce((acc, team) => acc + team.count, 0)} members</span>
          <Link to="/admin/team" className="text-gray-400 hover:text-white transition-colors duration-200">
            <FaEllipsisH />
          </Link>
        </div>
      </div>
      
      <div className="space-y-4">
        {teamData.map((team, index) => (
          <motion.div 
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
            className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center">
              <div className="mr-4">
                <div className={`h-10 w-10 rounded-lg ${team.color}/20 flex items-center justify-center`}>
                  <FaUsers className={`text-${team.color.split('-')[1]}-400`} />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-200">{team.name} Team</h4>
                <p className="text-xs text-gray-400 flex items-center mt-1">
                  <FaUser className="mr-1 text-gray-500" /> {team.count} members
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium bg-green-500/20 text-green-400 py-1 px-2 rounded-full">{team.active} active</span>
                <FaChevronRight className="text-gray-500 group-hover:text-white transition-colors duration-200" />
              </div>
            </div>
          </motion.div>
        ))}
        
        <div className="pt-2 text-center">
          <Link to="/admin/team" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-flex items-center transition-colors duration-200">
            Manage teams <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Project Status Component
const ProjectStatus = () => {
  const projectStatusData = [
    { label: 'Completed', count: 24, color: 'bg-green-500' },
    { label: 'In Progress', count: 18, color: 'bg-blue-500' },
    { label: 'On Hold', count: 5, color: 'bg-yellow-500' },
    { label: 'Cancelled', count: 3, color: 'bg-red-500' },
  ];
  
  const total = projectStatusData.reduce((acc, item) => acc + item.count, 0);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
            <FaChartPie className="text-blue-400" />
          </div>
          Project Status
        </h3>
        <Link to="/admin/projects" className="text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 p-2 rounded-lg">
          <FaEye />
        </Link>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {projectStatusData.map((item, index) => {
              // Calculate the percentage and angles for the pie chart
              const percentage = (item.count / total) * 100;
              const previousPercentages = projectStatusData
                .slice(0, index)
                .reduce((acc, curr) => acc + (curr.count / total) * 100, 0);
              
              // Convert percentages to coordinates on the circle
              const startAngle = (previousPercentages / 100) * 360;
              const endAngle = ((previousPercentages + percentage) / 100) * 360;
              
              // Convert angles to radians
              const startRad = (startAngle - 90) * (Math.PI / 180);
              const endRad = (endAngle - 90) * (Math.PI / 180);
              
              // Calculate the coordinates
              const x1 = 50 + 40 * Math.cos(startRad);
              const y1 = 50 + 40 * Math.sin(startRad);
              const x2 = 50 + 40 * Math.cos(endRad);
              const y2 = 50 + 40 * Math.sin(endRad);
              
              // Determine if the arc should be drawn as a large arc
              const largeArcFlag = percentage > 50 ? 1 : 0;
              
              // Create the SVG path
              const path = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');
              
              return (
                <path
                  key={index}
                  d={path}
                  className={`${item.color} opacity-80`}
                  stroke="#1f2937"
                  strokeWidth="1"
                />
              );
            })}
            <circle cx="50" cy="50" r="30" fill="#1f2937" />
            <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10" fontWeight="bold">
              {total}
            </text>
            <text x="50" y="62" textAnchor="middle" dominantBaseline="middle" fill="gray" fontSize="6">
              Projects
            </text>
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {projectStatusData.map((item, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-700/30 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
            <div>
              <p className="text-sm text-white">{item.label}</p>
              <p className="text-xs text-gray-400">{item.count} projects</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Recent Activities Component
const RecentActivities = () => {
  const activities = [
    { 
      user: 'John Doe', 
      action: 'completed', 
      target: 'Website Redesign project', 
      time: '2 hours ago',
      icon: <FaCheckCircle className="text-green-400" />,
      bgColor: 'bg-green-500/20'
    },
    { 
      user: 'Sarah Smith', 
      action: 'commented on', 
      target: 'Mobile App Development', 
      time: '4 hours ago',
      icon: <FaFileAlt className="text-blue-400" />,
      bgColor: 'bg-blue-500/20'
    },
    { 
      user: 'Mike Johnson', 
      action: 'started', 
      target: 'Database Migration task', 
      time: '6 hours ago',
      icon: <FaClipboardCheck className="text-indigo-400" />,
      bgColor: 'bg-indigo-500/20'
    },
    { 
      user: 'Emily Davis', 
      action: 'requested approval for', 
      target: 'New Marketing Campaign', 
      time: '8 hours ago',
      icon: <FaExclamation className="text-yellow-400" />,
      bgColor: 'bg-yellow-500/20'
    },
    { 
      user: 'Robert Wilson', 
      action: 'received positive feedback on', 
      target: 'Customer Portal', 
      time: '10 hours ago',
      icon: <FaThumbsUp className="text-purple-400" />,
      bgColor: 'bg-purple-500/20'
    },
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <div className="bg-green-900/30 p-2 rounded-lg mr-3">
            <FaClipboard className="text-green-400" />
          </div>
          Recent Activities
        </h3>
        <button className="text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 p-2 rounded-lg">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div 
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
            className="flex items-start p-4 bg-gray-700/30 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-all duration-200 group"
          >
            <div className="mr-4">
              <div className={`h-10 w-10 rounded-full ${activity.bgColor} flex items-center justify-center`}>
                {activity.icon}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">
                <span className="font-medium text-indigo-300">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
        
        <div className="pt-2 text-center">
          <Link to="/admin/activities" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-flex items-center transition-colors duration-200">
            View all activities <FaArrowRight className="ml-1 text-xs" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Resource Allocation Component
const ResourceAllocation = () => {
  const resources = [
    { name: 'Development', allocated: 75, available: 25, color: 'bg-blue-500' },
    { name: 'Design', allocated: 60, available: 40, color: 'bg-purple-500' },
    { name: 'Testing', allocated: 85, available: 15, color: 'bg-green-500' },
    { name: 'Infrastructure', allocated: 50, available: 50, color: 'bg-yellow-500' },
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <div className="bg-yellow-900/30 p-2 rounded-lg mr-3">
            <FaServer className="text-yellow-400" />
          </div>
          Resource Allocation
        </h3>
        <button className="text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 p-2 rounded-lg">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="space-y-5">
        {resources.map((resource, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">{resource.name}</span>
              <div className="flex space-x-2 text-xs">
                <span className="text-gray-400">{resource.allocated}% allocated</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400">{resource.available}% available</span>
              </div>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${resource.allocated}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-full rounded-full ${resource.color}`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white">Overall Resource Utilization</span>
          <span className="text-sm font-medium text-white">67.5%</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '67.5%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Budget Overview Component
const BudgetOverview = () => {
  const budgetData = {
    total: 250000,
    spent: 175000,
    remaining: 75000,
    categories: [
      { name: 'Development', amount: 80000, percentage: 32 },
      { name: 'Design', amount: 45000, percentage: 18 },
      { name: 'Marketing', amount: 30000, percentage: 12 },
      { name: 'Operations', amount: 20000, percentage: 8 },
    ]
  };
  
  const spentPercentage = (budgetData.spent / budgetData.total) * 100;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <div className="bg-green-900/30 p-2 rounded-lg mr-3">
            <FaBuilding className="text-green-400" />
          </div>
          Budget Overview
        </h3>
        <button className="text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 p-2 rounded-lg">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700/30 p-4 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Total Budget</p>
          <p className="text-lg font-bold text-white">${budgetData.total.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-700/30 p-4 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Spent</p>
          <p className="text-lg font-bold text-green-400">${budgetData.spent.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-700/30 p-4 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Remaining</p>
          <p className="text-lg font-bold text-yellow-400">${budgetData.remaining.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Budget Utilization</span>
          <span className="text-sm font-medium text-white">{spentPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${spentPercentage}%` }}
            transition={{ duration: 1 }}
            className={`h-full rounded-full ${spentPercentage > 90 ? 'bg-red-500' : spentPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
          ></motion.div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-white mb-4">Spending by Category</h4>
        <div className="space-y-3">
          {budgetData.categories.map((category, index) => (
            <div key={index} className="flex items-center">
              <div className="w-1/3">
                <span className="text-sm text-gray-400">{category.name}</span>
              </div>
              <div className="w-1/3">
                <span className="text-sm text-white">${category.amount.toLocaleString()}</span>
              </div>
              <div className="w-1/3 flex items-center">
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mr-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage * 2}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full rounded-full bg-indigo-500"
                  ></motion.div>
                </div>
                <span className="text-xs text-gray-400">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
function Admindashboard() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
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

  // Simulate loading only
  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => setLoading(false), 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
                  className="dashboard-card bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 w-full backdrop-blur-sm bg-opacity-80 relative overflow-hidden"
                  whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                >
                  {/* Enhanced decorative elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center">
                    <div className="md:w-8/13 pr-0 md:pr-8">
                      <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2"
                      >
                        Admin Dashboard
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-300 text-lg"
                      >
                        Project management overview and analytics
                      </motion.p>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "6rem" }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-4"
                      ></motion.div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="mt-6 md:mt-0 md:w-5/13 flex justify-center md:justify-end"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-md"></div>
                        <div className="relative bg-indigo-900/30 w-24 h-24 rounded-full flex items-center justify-center">
                          <FaUserShield className="text-indigo-400 text-4xl" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              {/* Main dashboard grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <CompanyPerformance />
                <div className="lg:col-span-2">
                  <TeamOverview />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <ProjectStatus />
                <div className="lg:col-span-2">
                  <RecentActivities />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ResourceAllocation />
                <BudgetOverview />
              </div>
              
              {/* Quick Actions Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 mb-8"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <div className="bg-indigo-900/30 p-2 rounded-lg mr-3">
                    <FaCog className="text-indigo-400" />
                  </div>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link to="/admin/projects" className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 flex flex-col items-center justify-center text-center group">
                    <div className="bg-blue-900/30 p-3 rounded-full mb-3 group-hover:bg-blue-900/50 transition-colors duration-200">
                      <FaProjectDiagram className="text-blue-400 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-white">Manage Projects</span>
                  </Link>
                  
                  <Link to="/admin/team" className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 flex flex-col items-center justify-center text-center group">
                    <div className="bg-purple-900/30 p-3 rounded-full mb-3 group-hover:bg-purple-900/50 transition-colors duration-200">
                      <FaUserFriends className="text-purple-400 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-white">Team Management</span>
                  </Link>
                  
                  <Link to="/admin/analytics" className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 flex flex-col items-center justify-center text-center group">
                    <div className="bg-green-900/30 p-3 rounded-full mb-3 group-hover:bg-green-900/50 transition-colors duration-200">
                      <FaChartBar className="text-green-400 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-white">Detailed Analytics</span>
                  </Link>
                  
                  <Link to="/admin/settings" className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 flex flex-col items-center justify-center text-center group">
                    <div className="bg-yellow-900/30 p-3 rounded-full mb-3 group-hover:bg-yellow-900/50 transition-colors duration-200">
                      <FaCog className="text-yellow-400 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-white">System Settings</span>
                  </Link>
                </div>
              </motion.div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Admindashboard;
