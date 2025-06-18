import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaChartBar, FaChartLine, FaChartPie, FaProjectDiagram, 
  FaUsers, FaCalendarAlt, FaClipboardCheck, FaUserCog,
  FaFilter, FaDownload, FaEllipsisH, FaArrowUp, FaArrowDown,
  FaExclamationCircle, FaCheckCircle, FaRegClock, FaCircleNotch,
  FaUserTie, FaBuilding, FaServer, FaMoneyBillWave, FaLightbulb,
  FaExclamation, FaFileAlt, FaSearch, FaPencilAlt, FaClipboardList,
  FaFlag, FaCalendarCheck, FaCalendarDay, FaUserAlt, FaClock,
  FaUserFriends, FaClipboard, FaHistory, FaInfoCircle
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
  
  .chart-container {
    position: relative;
    height: 300px;
    width: 100%;
  }
  
  .chart-container canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;

const styles = {
  card: "dashboard-card bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl backdrop-blur-sm hover:shadow-blue-900/20",
  heading: "text-xl font-bold text-white flex items-center",
  iconBox: "p-2 rounded-lg mr-3",
  button: "text-gray-400 hover:text-white transition-colors duration-200",
  badge: "text-xs font-medium py-1 px-3 rounded-full"
};

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Project Performance Chart Component
const ProjectPerformanceChart = () => {
  // Mock data for project performance over time
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const completedProjects = [4, 6, 8, 7, 10, 12, 9, 11, 13, 14, 12, 15];
  const onTimeDelivery = [85, 88, 90, 87, 92, 95, 93, 91, 94, 96, 93, 97];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className={styles.heading}>
          <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
            <FaChartLine className="text-blue-400" />
          </div>
          Project Performance
        </h3>
        <div className="flex space-x-2">
          <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
            <FaFilter />
          </button>
          <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
            <FaDownload />
          </button>
          <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
            <FaEllipsisH />
          </button>
        </div>
      </div>
      
      <div className="chart-container mb-4">
        {/* This is a placeholder for the chart - in a real app, you'd use a library like Chart.js or Recharts */}
        <div className="w-full h-full bg-gray-700/30 rounded-lg p-4 flex items-center justify-center">
          <div className="w-full h-full relative">
            {/* X-axis (months) */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
              {months.map((month, index) => (
                <div key={index} className="text-xs text-gray-400">{month}</div>
              ))}
            </div>
            
            {/* Y-axis (values) */}
            <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between py-4">
              <div className="text-xs text-gray-400">100%</div>
              <div className="text-xs text-gray-400">75%</div>
              <div className="text-xs text-gray-400">50%</div>
              <div className="text-xs text-gray-400">25%</div>
              <div className="text-xs text-gray-400">0%</div>
            </div>
            
            {/* Chart lines */}
            <div className="absolute top-8 left-8 right-8 bottom-8">
              {/* Completed Projects Line */}
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d={`M 0,${100 - (completedProjects[0] / 15) * 100} ` + 
                     months.map((_, i) => `L ${(i / (months.length - 1)) * 100},${100 - (completedProjects[i] / 15) * 100}`).join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              {/* On-Time Delivery Line */}
              <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d={`M 0,${100 - (onTimeDelivery[0] / 100) * 100} ` + 
                     months.map((_, i) => `L ${(i / (months.length - 1)) * 100},${100 - (onTimeDelivery[i] / 100) * 100}`).join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-300">Completed Projects</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-300">On-Time Delivery (%)</span>
        </div>
      </div>
    </motion.div>
  );
};

// Team Productivity Chart Component
const TeamProductivityChart = () => {
  // Mock data for team productivity
  const teams = ['Development', 'Design', 'Marketing', 'QA', 'DevOps'];
  const productivity = [85, 78, 92, 80, 88];
  const targetProductivity = [90, 85, 95, 85, 90];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className={styles.heading}>
          <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
            <FaUsers className="text-purple-400" />
          </div>
          Team Productivity
        </h3>
        <div className="flex space-x-2">
          <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
            <FaFilter />
          </button>
          <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
            <FaEllipsisH />
          </button>
        </div>
      </div>
      
      <div className="space-y-4 mb-4">
        {teams.map((team, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">{team}</span>
              <div className="flex space-x-4">
                <span className="text-sm text-gray-400">{productivity[index]}%</span>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-gray-400">Target: {targetProductivity[index]}%</span>
              </div>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${productivity[index]}%` }}
                transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                className={`h-full rounded-full ${productivity[index] >= targetProductivity[index] ? 'bg-green-500' : 'bg-blue-500'}`}
              ></motion.div>
              <div 
                className="absolute top-0 h-full w-px bg-yellow-400"
                style={{ left: `${targetProductivity[index]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white">Overall Productivity</span>
          <span className="text-sm font-medium text-white">
            {Math.round(productivity.reduce((acc, val) => acc + val, 0) / productivity.length)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.round(productivity.reduce((acc, val) => acc + val, 0) / productivity.length)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Project Status Distribution Component
const ProjectStatusDistribution = () => {
  const statusData = [
    { label: 'Completed', count: 24, percentage: 48, color: 'bg-green-500' },
    { label: 'In Progress', count: 18, percentage: 36, color: 'bg-blue-500' },
    { label: 'On Hold', count: 5, percentage: 10, color: 'bg-yellow-500' },
    { label: 'Cancelled', count: 3, percentage: 6, color: 'bg-red-500' },
  ];
  
  const total = statusData.reduce((acc, item) => acc + item.count, 0);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className={styles.heading}>
          <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
            <FaChartPie className="text-blue-400" />
          </div>
          Project Status Distribution
        </h3>
        <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {statusData.map((item, index) => {
              // Calculate the percentage and angles for the pie chart
              const percentage = item.percentage;
              const previousPercentages = statusData
                .slice(0, index)
                .reduce((acc, curr) => acc + curr.percentage, 0);
              
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
        {statusData.map((item, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-700/30 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
            <div>
              <p className="text-sm text-white">{item.label}</p>
              <p className="text-xs text-gray-400">{item.count} projects ({item.percentage}%)</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Task Completion Rate Component
const TaskCompletionRate = () => {
  const taskData = {
    total: 248,
    completed: 187,
    overdue: 12,
    inProgress: 49,
    weeklyCompletion: [32, 28, 35, 42, 38, 45, 39] // Last 7 days
  };
  
  const completionRate = Math.round((taskData.completed / taskData.total) * 100);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className={styles.heading}>
          <div className="bg-green-900/30 p-2 rounded-lg mr-3">
            <FaClipboardCheck className="text-green-400" />
          </div>
          Task Completion Rate
        </h3>
        <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-white">{completionRate}%</p>
          <p className="text-xs text-gray-400 mt-1">Completion Rate</p>
        </div>
        
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-400">{taskData.completed}</p>
          <p className="text-xs text-gray-400 mt-1">Completed Tasks</p>
        </div>
        
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-red-400">{taskData.overdue}</p>
          <p className="text-xs text-gray-400 mt-1">Overdue Tasks</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-4">Weekly Completion Trend</h4>
        <div className="flex items-end justify-between h-32 bg-gray-700/30 rounded-lg p-4">
          {taskData.weeklyCompletion.map((count, index) => {
            const height = (count / Math.max(...taskData.weeklyCompletion)) * 100;
            return (
              <div key={index} className="flex flex-col items-center">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="w-6 bg-indigo-500 rounded-t-sm"
                ></motion.div>
                <p className="text-xs text-gray-400 mt-2">{days[index]}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Current Active Tasks</span>
          <span className="text-sm font-medium text-white">{taskData.inProgress}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-400">Estimated Completion</span>
          <span className="text-sm font-medium text-white">5 days</span>
        </div>
      </div>
    </motion.div>
  );
};

// Resource Utilization Component
const ResourceUtilization = () => {
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
        <h3 className={styles.heading}>
          <div className="bg-yellow-900/30 p-2 rounded-lg mr-3">
            <FaServer className="text-yellow-400" />
          </div>
          Resource Utilization
        </h3>
        <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
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
          <span className="text-sm font-medium text-white">
            {Math.round(resources.reduce((acc, res) => acc + res.allocated, 0) / resources.length)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.round(resources.reduce((acc, res) => acc + res.allocated, 0) / resources.length)}%` }}
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
        <h3 className={styles.heading}>
          <div className="bg-green-900/30 p-2 rounded-lg mr-3">
            <FaMoneyBillWave className="text-green-400" />
          </div>
          Budget Overview
        </h3>
        <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
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

// Key Performance Indicators Component
const KeyPerformanceIndicators = () => {
  const kpiData = [
    { 
      label: 'Project Success Rate', 
      value: 92, 
      change: 3.5, 
      trend: 'up',
      icon: <FaProjectDiagram className="text-blue-400" />,
      bgColor: 'bg-blue-900/30'
    },
    { 
      label: 'Team Efficiency', 
      value: 87, 
      change: 2.1, 
      trend: 'up',
      icon: <FaUsers className="text-purple-400" />,
      bgColor: 'bg-purple-900/30'
    },
    { 
      label: 'Client Satisfaction', 
      value: 95, 
      change: 1.8, 
      trend: 'up',
      icon: <FaThumbsUp className="text-green-400" />,
      bgColor: 'bg-green-900/30'
    },
    { 
      label: 'Budget Adherence', 
      value: 89, 
      change: -1.2, 
      trend: 'down',
      icon: <FaMoneyBillWave className="text-yellow-400" />,
      bgColor: 'bg-yellow-900/30'
    }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className={styles.heading}>
          <div className="bg-indigo-900/30 p-2 rounded-lg mr-3">
            <FaChartBar className="text-indigo-400" />
          </div>
          Key Performance Indicators
        </h3>
        <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {kpiData.map((kpi, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="bg-gray-700/30 p-4 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-all duration-200"
          >
            <div className="flex items-center mb-3">
              <div className={`p-2 rounded-lg mr-3 ${kpi.bgColor}`}>
                {kpi.icon}
              </div>
              <span className="text-sm text-gray-300">{kpi.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold text-white">{kpi.value}%</span>
              </div>
              <div className={`flex items-center ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {kpi.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                <span className="text-sm">{Math.abs(kpi.change)}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Task Distribution by Type Component
const TaskDistributionByType = () => {
  const taskTypes = [
    { type: 'Feature', count: 45, icon: <FaLightbulb className="text-blue-400" />, color: 'bg-blue-500' },
    { type: 'Bug', count: 23, icon: <FaExclamation className="text-red-400" />, color: 'bg-red-500' },
    { type: 'Documentation', count: 18, icon: <FaFileAlt className="text-yellow-400" />, color: 'bg-yellow-500' },
    { type: 'Research', count: 15, icon: <FaSearch className="text-purple-400" />, color: 'bg-purple-500' },
    { type: 'Design', count: 20, icon: <FaPencilAlt className="text-green-400" />, color: 'bg-green-500' },
    { type: 'Testing', count: 25, icon: <FaClipboardList className="text-indigo-400" />, color: 'bg-indigo-500' },
    { type: 'Maintenance', count: 12, icon: <FaUserCog className="text-gray-400" />, color: 'bg-gray-500' },
  ];
  
  const total = taskTypes.reduce((acc, item) => acc + item.count, 0);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className={styles.heading}>
          <div className="bg-indigo-900/30 p-2 rounded-lg mr-3">
            <FaClipboard className="text-indigo-400" />
          </div>
          Task Distribution by Type
        </h3>
        <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="space-y-4">
        {taskTypes.map((task, index) => {
          const percentage = Math.round((task.count / total) * 100);
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-2">{task.icon}</div>
                  <span className="text-sm text-white">{task.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">{task.count} tasks</span>
                  <span className="text-xs text-gray-400">({percentage}%)</span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${task.color}`}
                ></motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Time Tracking Analysis Component
const TimeTrackingAnalysis = () => {
  const timeData = {
    estimatedHours: 1250,
    actualHours: 1320,
    efficiency: 95,
    categories: [
      { name: 'Development', estimated: 600, actual: 650 },
      { name: 'Design', estimated: 250, actual: 230 },
      { name: 'Testing', estimated: 200, actual: 240 },
      { name: 'Meetings', estimated: 100, actual: 120 },
      { name: 'Documentation', estimated: 100, actual: 80 },
    ]
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={styles.card}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className={styles.heading}>
          <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
            <FaClock className="text-blue-400" />
          </div>
          Time Tracking Analysis
        </h3>
        <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <p className="text-lg font-bold text-white">{timeData.estimatedHours}h</p>
          <p className="text-xs text-gray-400 mt-1">Estimated Hours</p>
        </div>
        
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <p className="text-lg font-bold text-white">{timeData.actualHours}h</p>
          <p className="text-xs text-gray-400 mt-1">Actual Hours</p>
        </div>
        
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <p className="text-lg font-bold text-white">{timeData.efficiency}%</p>
          <p className="text-xs text-gray-400 mt-1">Time Efficiency</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-white mb-4">Time Distribution by Category</h4>
        <div className="space-y-4">
          {timeData.categories.map((category, index) => {
            const variance = category.actual - category.estimated;
            const variancePercentage = Math.round((variance / category.estimated) * 100);
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white">{category.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">{category.estimated}h est.</span>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-xs text-gray-400">{category.actual}h actual</span>
                    <span className={`text-xs ${variance > 0 ? 'text-red-400' : variance < 0 ? 'text-green-400' : 'text-gray-400'}`}>
                      {variance > 0 ? '+' : ''}{variance}h ({variancePercentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(category.estimated / Math.max(...timeData.categories.map(c => Math.max(c.estimated, c.actual)))) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full rounded-full bg-blue-500 opacity-50"
                  ></motion.div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(category.actual / Math.max(...timeData.categories.map(c => Math.max(c.estimated, c.actual)))) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                    className={`h-full rounded-full absolute top-0 left-0 ${variance > 0 ? 'bg-red-500' : variance < 0 ? 'bg-green-500' : 'bg-blue-500'}`}
                  ></motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Main Analytics Component
function Analytics() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
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

  // Simulate loading
  useEffect(() => {
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
                        Analytics Dashboard
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-300 text-lg"
                      >
                        Comprehensive insights and performance metrics
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
                          <FaChartBar className="text-indigo-400 text-4xl" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              {/* Key Performance Indicators */}
              <div className="mb-8">
                <KeyPerformanceIndicators />
              </div>
              
              {/* Main analytics grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ProjectPerformanceChart />
                <TeamProductivityChart />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ProjectStatusDistribution />
                <TaskCompletionRate />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <ResourceUtilization />
                <BudgetOverview />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <TaskDistributionByType />
                <TimeTrackingAnalysis />
              </div>
              
              {/* Export Reports Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 mb-8"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <div className="bg-indigo-900/30 p-2 rounded-lg mr-3">
                    <FaDownload className="text-indigo-400" />
                  </div>
                  Export Reports
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 flex flex-col items-center justify-center text-center group">
                    <div className="bg-blue-900/30 p-3 rounded-full mb-3 group-hover:bg-blue-900/50 transition-colors duration-200">
                      <FaProjectDiagram className="text-blue-400 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-white">Project Report</span>
                  </button>
                  
                  <button className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 flex flex-col items-center justify-center text-center group">
                    <div className="bg-purple-900/30 p-3 rounded-full mb-3 group-hover:bg-purple-900/50 transition-colors duration-200">
                      <FaUserFriends className="text-purple-400 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-white">Team Report</span>
                  </button>
                  
                  <button className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 flex flex-col items-center justify-center text-center group">
                    <div className="bg-green-900/30 p-3 rounded-full mb-3 group-hover:bg-green-900/50 transition-colors duration-200">
                      <FaMoneyBillWave className="text-green-400 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-white">Financial Report</span>
                  </button>
                  
                  <button className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-200 flex flex-col items-center justify-center text-center group">
                    <div className="bg-yellow-900/30 p-3 rounded-full mb-3 group-hover:bg-yellow-900/50 transition-colors duration-200">
                      <FaClipboardCheck className="text-yellow-400 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-white">Task Report</span>
                  </button>
                </div>
              </motion.div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Analytics;

// Helper component for the ThumbsUp icon
const FaThumbsUp = (props) => {
  return (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 512 512" 
      height="1em" 
      width="1em" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"></path>
    </svg>
  );
};
