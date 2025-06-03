import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTasks, FaChartBar, FaCalendarAlt, FaUser, FaSignOutAlt, 
  FaBell, FaSearch, FaEllipsisH, FaCircleNotch, FaCheckCircle,
  FaRegClock, FaExclamationCircle, FaHeartbeat, FaProjectDiagram
} from 'react-icons/fa';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm bg-opacity-80">
      <div className="flex items-center space-x-8">
        <Link to="/dashboard" className="text-2xl font-bold text-white flex items-center">
          <FaTasks className="text-blue-500 mr-2" />
          <span>SmartTask</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-white hover:text-blue-400 flex items-center">
            <span>Dashboard</span>
          </Link>
          <Link to="/charts" className="text-gray-400 hover:text-blue-400 flex items-center">
            <span>Analytics</span>
          </Link>
          <Link to="/calendar" className="text-gray-400 hover:text-blue-400 flex items-center">
            <span>Calendar</span>
          </Link>
          <Link to="/chatpage" className="text-gray-400 hover:text-blue-400 flex items-center">
            <span>Team Chat</span>
          </Link>
          <Link to="/finished" className="text-gray-400 hover:text-blue-400 flex items-center">
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
              onClick={() => navigate('/login')} 
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

// Stress Monitor Component with Semicircle
const StressMonitor = () => {
  // Stress level from 0 (low) to 100 (high)
  const stressLevel = 65;
  
  // Determine color based on stress level
  const getColor = () => {
    if (stressLevel < 30) return 'from-green-500 to-green-300';
    if (stressLevel < 70) return 'from-yellow-500 to-orange-400';
    return 'from-red-500 to-red-400';
  };
  
  // Calculate the rotation for the needle
  const needleRotation = (stressLevel / 100) * 180;
  
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <FaHeartbeat className="text-red-500 mr-2" /> Stress Monitor
        </h3>
        <button className="text-gray-400 hover:text-white">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)]">
        <div className="relative w-40 h-20 mb-4">
          {/* Semicircle background */}
          <div className="absolute w-full h-full rounded-t-full overflow-hidden bg-gray-700">
            <div className="absolute w-full h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 opacity-50"></div>
          </div>
          
          {/* Needle */}
          <div 
            className="absolute top-0 left-1/2 w-1 h-16 bg-white origin-bottom transform -translate-x-1/2"
            style={{ transform: `translateX(-50%) rotate(${needleRotation - 90}deg)` }}
          >
            <div className="w-3 h-3 rounded-full bg-white absolute -top-1 -left-1"></div>
          </div>
          
          {/* Center point */}
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2"></div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold mb-1">
            <span className={`${stressLevel < 30 ? 'text-green-500' : stressLevel < 70 ? 'text-yellow-500' : 'text-red-500'}`}>
              {stressLevel}%
            </span>
          </div>
          <p className="text-gray-400 text-sm">Team Stress Level</p>
        </div>
      </div>
    </div>
  );
};

// Today's Tasks Component
const TodaysTasks = () => {
  const tasks = {
    ongoing: 1,
    completed: 5,
    pending: 2
  };
  
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">TODAY'S TASKS</h3>
        <button className="text-gray-400 hover:text-white">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Ongoing</span>
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FaRegClock className="text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{tasks.ongoing}</div>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Completed</span>
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaCheckCircle className="text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{tasks.completed}</div>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Pending</span>
            <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <FaExclamationCircle className="text-yellow-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{tasks.pending}</div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-white font-medium">Task Progress</h4>
          <span className="text-sm text-gray-400">62.5% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: '62.5%' }}></div>
        </div>
      </div>
    </div>
  );
};

// Monthly Tasks Component
const MonthlyTasks = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const data = [
    { day: 'Mon', value: 30 },
    { day: 'Tue', value: 75 },
    { day: 'Wed', value: 50 },
    { day: 'Thu', value: 65 },
    { day: 'Fri', value: 40 },
    { day: 'Sat', value: 20 }
  ];
  
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">MONTHLY TASKS</h3>
        <button className="text-gray-400 hover:text-white">
          <FaEllipsisH />
        </button>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{item.day}</span>
              <span className="text-xs text-gray-500">{item.value}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${index % 2 === 0 ? 'bg-blue-500' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`} 
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg h-full">
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
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, isActive, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-300
        ${isActive ? 'bg-blue-600/20 border border-blue-500/50' : 'bg-gray-700/40 hover:bg-gray-700/60 border border-transparent'}
      `}
    >
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
        <div className="flex items-center text-gray-400">
          <FaRegClock className="mr-1" />
          <span>{project.deadline}</span>
        </div>
        <div className="flex -space-x-2">
          {project.team.map((member, idx) => (
            <div 
              key={idx} 
              className="h-6 w-6 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white"
              title={member}
            >
              {member.charAt(0)}
            </div>
          ))}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs text-gray-400">{project.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${project.progress > 70 ? 'bg-green-500' : project.progress > 30 ? 'bg-blue-500' : 'bg-yellow-500'}`}
            style={{ width: `${project.progress}%` }}
          ></div>
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

// Projects Component
const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "TechCorp Inc.",
      priority: "High",
      deadline: "Oct 25",
      progress: 65,
      team: ["Sarah", "Mike", "Alex"],
      description: "Complete overhaul of the company website with new branding and improved user experience.",
      tasks: [
        { name: "Wireframing", status: "Completed" },
        { name: "UI Design", status: "In Progress" },
        { name: "Frontend Development", status: "Pending" },
        { name: "Backend Integration", status: "Pending" }
      ]
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "Innovate Solutions",
      priority: "Medium",
      deadline: "Nov 10",
      progress: 30,
      team: ["John", "Lisa", "David"],
      description: "Develop a cross-platform mobile application for inventory management with offline capabilities.",
      tasks: [
        { name: "Requirements Gathering", status: "Completed" },
        { name: "UI/UX Design", status: "Completed" },
        { name: "Frontend Development", status: "In Progress" },
        { name: "Backend Development", status: "Pending" }
      ]
    },
    {
      id: 3,
      name: "Marketing Campaign",
      client: "GrowFast Agency",
      priority: "Low",
      deadline: "Oct 30",
      progress: 85,
      team: ["Emma", "Ryan"],
      description: "Create and execute a digital marketing campaign across multiple platforms to increase brand awareness.",
      tasks: [
        { name: "Strategy Planning", status: "Completed" },
        { name: "Content Creation", status: "Completed" },
        { name: "Campaign Setup", status: "Completed" },
        { name: "Performance Monitoring", status: "In Progress" }
      ]
    },
    {
      id: 4,
      name: "Database Migration",
      client: "SecureData Systems",
      priority: "High",
      deadline: "Nov 5",
      progress: 40,
      team: ["Tom", "Anna", "Chris", "Maria"],
      description: "Migrate existing database to a new cloud infrastructure with zero downtime and improved security.",
      tasks: [
        { name: "Planning", status: "Completed" },
        { name: "Data Mapping", status: "In Progress" },
        { name: "Migration Script", status: "In Progress" },
        { name: "Testing", status: "Pending" }
      ]
    }
  ];
  
  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <FaProjectDiagram className="text-blue-500 mr-2" /> Projects Assigned
        </h3>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-white text-sm bg-gray-700 px-3 py-1 rounded-lg">
            All
          </button>
          <button className="text-gray-400 hover:text-white text-sm">
            Active
          </button>
          <button className="text-gray-400 hover:text-white text-sm">
            Completed
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {projects.map((project) => (
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
          <ProjectDetails 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Dashboard Component
function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Force dark mode and simulate loading
  useEffect(() => {
    // Apply dark mode to root element
    document.documentElement.classList.add('dark');
    
    // Simulate loading resources
    const timer = setTimeout(() => setLoading(false), 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
              <h1 className="text-3xl font-bold mb-6">DASHBOARD</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <TodaysTasks />
                </div>
                <div>
                  <StressMonitor />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <Projects />
                </div>
                <div>
                  <div className="grid grid-cols-1 gap-6">
                    <CalendarWidget />
                    <MonthlyTasks />
                  </div>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;