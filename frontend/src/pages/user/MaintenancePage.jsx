import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTools, FaBug, FaShieldAlt, FaChartLine, FaCog, FaUserCog, FaExclamationTriangle, 
  FaCheckCircle, FaClock, FaArrowLeft, FaRocket, FaRegClock, FaLightbulb, 
  FaDatabase, FaServer, FaNetworkWired, FaDesktop, FaMobile, FaCloud, 
  FaEye, FaEyeSlash, FaDownload, FaUpload, FaSync, FaHistory, FaBell,
  FaChevronUp, FaChevronDown, FaPlay, FaPause, FaStop, FaRedo, FaUndo,
  FaSearch, FaFilter, FaSort, FaCalendarAlt, FaUserFriends, FaFileAlt, FaInfo
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MaintenancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { getProject } = useProject();
  
  // Refs for scrolling
  const mainContainerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // State management
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleTask, setRescheduleTask] = useState(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [modalIssue, setModalIssue] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for maintenance features
  const [systemHealth, setSystemHealth] = useState({
    overall: 94,
    performance: 92,
    security: 98,
    uptime: 99.7,
    responseTime: 245,
    errorRate: 0.3
  });

  const [issues, setIssues] = useState([
    { 
      id: 1, 
      title: 'Database connection timeout', 
      severity: 'Medium', 
      status: 'In Progress', 
      priority: 'High',
      category: 'Performance',
      assignedTo: 'John Doe',
      createdAt: '2024-01-15',
      description: 'Database queries taking longer than expected',
      impact: 'User experience degradation',
      solution: 'Optimizing database indexes and connection pooling'
    },
    { 
      id: 2, 
      title: 'Memory leak in user dashboard', 
      severity: 'High', 
      status: 'Open', 
      priority: 'Critical',
      category: 'Bug',
      assignedTo: 'Jane Smith',
      createdAt: '2024-01-14',
      description: 'Memory usage increases over time in dashboard',
      impact: 'System crashes after extended use',
      solution: 'Investigating memory allocation patterns'
    },
    { 
      id: 3, 
      title: 'SSL certificate expiring soon', 
      severity: 'Low', 
      status: 'Scheduled', 
      priority: 'Medium',
      category: 'Security',
      assignedTo: 'Mike Johnson',
      createdAt: '2024-01-13',
      description: 'SSL certificate expires in 30 days',
      impact: 'Security warning for users',
      solution: 'Renewing SSL certificate'
    }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    cpu: 45,
    memory: 62,
    disk: 28,
    network: 78,
    database: 34
  });

  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, type: 'Vulnerability Scan', status: 'Passed', date: '2024-01-15', details: 'No critical vulnerabilities found' },
    { id: 2, type: 'DDoS Protection', status: 'Active', date: '2024-01-15', details: 'Traffic filtering enabled' },
    { id: 3, type: 'Firewall Check', status: 'Passed', date: '2024-01-14', details: 'All rules properly configured' }
  ]);

  const [automatedTests, setAutomatedTests] = useState([
    { id: 1, name: 'Unit Tests', status: 'Passed', coverage: 87, lastRun: '2024-01-15 10:30' },
    { id: 2, name: 'Integration Tests', status: 'Passed', coverage: 92, lastRun: '2024-01-15 10:35' },
    { id: 3, name: 'E2E Tests', status: 'Failed', coverage: 78, lastRun: '2024-01-15 10:40' },
    { id: 4, name: 'Performance Tests', status: 'Passed', coverage: 85, lastRun: '2024-01-15 10:45' }
  ]);

  const [userFeedback, setUserFeedback] = useState([
    { id: 1, user: 'Alice', rating: 5, comment: 'Great performance improvements!', date: '2024-01-15' },
    { id: 2, user: 'Bob', rating: 4, comment: 'Dashboard loads much faster now', date: '2024-01-14' },
    { id: 3, user: 'Carol', rating: 3, comment: 'Still experiencing some lag', date: '2024-01-13' }
  ]);

  const [maintenanceSchedule, setMaintenanceSchedule] = useState([
    { id: 1, task: 'Database optimization', frequency: 'Weekly', nextRun: '2024-01-22', status: 'Scheduled' },
    { id: 2, task: 'Security updates', frequency: 'Monthly', nextRun: '2024-02-15', status: 'Scheduled' },
    { id: 3, task: 'Performance monitoring', frequency: 'Daily', nextRun: '2024-01-16', status: 'Active' }
  ]);

  // Get projectId from location state
  useEffect(() => {
    if (location.state && location.state.projectId) {
      setProjectId(location.state.projectId);
    }
  }, [location]);

  // Fetch project data
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        if (projectId) {
          const project = await getProject(projectId);
          if (project) {
            setProjectDetails(project);
          }
        } else {
          // Mock project data
          setProjectDetails({
            id: 1,
            title: 'Smart Project Management System',
            description: 'A comprehensive project management system with advanced features.',
            startDate: '2024-01-01',
            endDate: '2024-06-30',
            status: 'In Production',
            priority: 'High'
          });
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectData();
  }, [projectId, getProject]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (mainContainerRef.current) {
        const scrollTop = mainContainerRef.current.scrollTop;
        setShowScrollTop(scrollTop > 300);
      }
    };

    const container = mainContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // AI-powered issue detection simulation
  const runAIAnalysis = () => {
    // Simulate AI analysis
    const newIssue = {
      id: Date.now(),
      title: 'AI Detected: Potential memory optimization opportunity',
      severity: 'Low',
      status: 'Open',
      priority: 'Medium',
      category: 'AI Detection',
      assignedTo: 'AI System',
      createdAt: new Date().toISOString().split('T')[0],
      description: 'AI analysis suggests memory usage can be optimized by 15%',
      impact: 'Improved performance and reduced resource usage',
      solution: 'Implementing AI-suggested memory management improvements'
    };
    setIssues([newIssue, ...issues]);
  };

  // Update issue status
  const updateIssueStatus = (id, status) => {
    setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, status } : issue
    ));
  };

  // Run automated test
  const runTest = (testId) => {
    setAutomatedTests(automatedTests.map(test => 
      test.id === testId ? { ...test, status: 'Running', lastRun: new Date().toLocaleString() } : test
    ));
    // Simulate test completion
    setTimeout(() => {
      setAutomatedTests(automatedTests.map(test => 
        test.id === testId ? { ...test, status: 'Passed', lastRun: new Date().toLocaleString() } : test
      ));
    }, 3000);
  };

  // Run all tests
  const runAllTests = () => {
    toast.info('Running all tests...');
    automatedTests.forEach(test => runTest(test.id));
  };

  // Security scan simulation
  const runSecurityScan = () => {
    toast.info('Security scan started...');
    setTimeout(() => {
      toast.success('Security scan completed! No critical vulnerabilities found.');
      setLastUpdated(new Date());
    }, 2000);
  };

  // Open reschedule modal
  const openRescheduleModal = (task) => {
    setRescheduleTask(task);
    setShowRescheduleModal(true);
  };

  // Handle reschedule (mock)
  const handleReschedule = (date) => {
    setMaintenanceSchedule(maintenanceSchedule.map(s =>
      s.id === rescheduleTask.id ? { ...s, nextRun: date, status: 'Scheduled' } : s
    ));
    setShowRescheduleModal(false);
    toast.success('Maintenance rescheduled!');
  };

  // Open issue modal
  const openIssueModal = (issue) => {
    setModalIssue(issue);
    setShowIssueModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-600';
      case 'In Progress': return 'bg-yellow-600';
      case 'Resolved': return 'bg-green-600';
      case 'Scheduled': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-grid-pattern font-sans">
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(100, 116, 139, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100, 116, 139, 0.07) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .gradient-border {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3));
          border-radius: 1rem;
          padding: 1px;
        }
        .gradient-border > div {
          background: rgba(31, 41, 55, 0.9);
          border-radius: 0.875rem;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.5) rgba(31, 41, 55, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
        .smooth-scroll {
          scroll-behavior: smooth;
        }
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(31, 41, 55, 0.8);
        }
        .health-indicator {
          background: conic-gradient(from 0deg, #10b981 0deg, #10b981 ${systemHealth.overall * 3.6}deg, #374151 ${systemHealth.overall * 3.6}deg, #374151 360deg);
        }
      `}</style>
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="dark" />
      
      <div 
        ref={mainContainerRef}
        className="pt-16 min-h-screen flex flex-col items-center py-10 px-4 custom-scrollbar smooth-scroll overflow-y-auto"
        style={{ height: '100vh' }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 w-full max-w-7xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Maintenance & Operations
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            Proactive system maintenance, AI-powered monitoring, and continuous improvement for optimal performance.
          </p>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate('/user/project-architecture')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 focus:ring-2 focus:ring-purple-400"
              title="Back to Project Architecture"
            >
              <FaArrowLeft className="text-sm" />
              Back to Architecture
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-2">Last updated: {lastUpdated.toLocaleString()}</div>
        </motion.div>

        {/* Compact Sidebar with Horizontal Scrolling Cards */}
        <div className="w-full max-w-7xl mb-8">
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4">
            {/* System Health Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-border flex-shrink-0"
              style={{ minWidth: '280px' }}
            >
              <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl p-4 h-full">
                <h2 className="text-lg font-bold mb-3 text-green-400 flex items-center">
                  <FaChartLine className="mr-2" />
                  System Health
                </h2>
                <div className="flex items-center justify-center mb-3">
                  <div className="relative w-16 h-16">
                    <div className="w-16 h-16 rounded-full health-indicator flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{systemHealth.overall}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Performance:</span>
                    <span className="text-blue-400 font-medium">{systemHealth.performance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Security:</span>
                    <span className="text-green-400 font-medium">{systemHealth.security}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-purple-400 font-medium">{systemHealth.uptime}%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="gradient-border flex-shrink-0"
              style={{ minWidth: '280px' }}
            >
              <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-xl p-4 h-full">
                <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
                  <FaTools className="mr-2" />
                  Quick Actions
                </h2>
                <div className="max-h-32 overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    <button 
                      onClick={runAIAnalysis}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-pink-400 text-sm"
                      title="Run AI-powered analysis"
                    >
                      <FaLightbulb className="mr-2" />
                      AI Analysis
                    </button>
                    <button 
                      onClick={runAllTests}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-400 text-sm"
                      title="Run all automated tests"
                    >
                      <FaSync className="mr-2" />
                      Run Tests
                    </button>
                    <button 
                      onClick={runSecurityScan}
                      className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white p-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-yellow-400 text-sm"
                      title="Run security scan"
                    >
                      <FaShieldAlt className="mr-2" />
                      Security Scan
                    </button>
                    <button 
                      onClick={() => toast.info('Backup initiated')}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-indigo-400 text-sm"
                      title="Create system backup"
                    >
                      <FaDownload className="mr-2" />
                      Backup System
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Performance Metrics Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="gradient-border flex-shrink-0"
              style={{ minWidth: '280px' }}
            >
              <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl p-4 h-full">
                <h2 className="text-lg font-bold mb-3 text-yellow-400 flex items-center">
                  <FaServer className="mr-2" />
                  Performance
                </h2>
                <div className="max-h-32 overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    {Object.entries(performanceMetrics).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-medium capitalize text-xs">{key}</span>
                          <span className="text-yellow-400 font-bold text-xs">{value}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              value > 80 ? 'bg-red-500' : value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="gradient-border flex-shrink-0"
              style={{ minWidth: '280px' }}
            >
              <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-4 h-full">
                <h2 className="text-lg font-bold mb-3 text-purple-400 flex items-center">
                  <FaRegClock className="mr-2" />
                  Recent Activity
                </h2>
                <div className="max-h-32 overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <FaCheckCircle className="text-green-400" />
                      <span className="text-gray-300">Security scan completed</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FaExclamationTriangle className="text-yellow-400" />
                      <span className="text-gray-300">Performance alert resolved</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FaBug className="text-red-400" />
                      <span className="text-gray-300">Bug fix deployed</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FaSync className="text-blue-400" />
                      <span className="text-gray-300">Automated tests passed</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <FaDatabase className="text-purple-400" />
                      <span className="text-gray-300">Database backup created</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* System Alerts Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="gradient-border flex-shrink-0"
              style={{ minWidth: '280px' }}
            >
              <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-4 h-full">
                <h2 className="text-lg font-bold mb-3 text-red-400 flex items-center">
                  <FaBell className="mr-2" />
                  System Alerts
                </h2>
                <div className="max-h-32 overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-lg p-2 border-l-4 border-red-500">
                      <div className="flex items-center gap-2 mb-1">
                        <FaExclamationTriangle className="text-red-400 text-xs" />
                        <span className="text-white font-medium text-xs">High CPU Usage</span>
                      </div>
                      <p className="text-gray-300 text-xs">CPU usage at 85% for 10 minutes</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-2 border-l-4 border-yellow-500">
                      <div className="flex items-center gap-2 mb-1">
                        <FaExclamationTriangle className="text-yellow-400 text-xs" />
                        <span className="text-white font-medium text-xs">Memory Warning</span>
                      </div>
                      <p className="text-gray-300 text-xs">Available memory below 20%</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-2 border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 mb-1">
                        <FaInfo className="text-blue-400 text-xs" />
                        <span className="text-white font-medium text-xs">Update Available</span>
                      </div>
                      <p className="text-gray-300 text-xs">New security patch ready</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content with Scroll */}
        <div className="w-full max-w-7xl">
          <div className="gradient-border">
            <div className="p-6 max-h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar">

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: <FaChartLine /> },
                    { id: 'issues', label: 'Issues', icon: <FaBug /> },
                    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
                    { id: 'testing', label: 'Testing', icon: <FaCog /> },
                    { id: 'feedback', label: 'Feedback', icon: <FaUserFriends /> },
                    { id: 'schedule', label: 'Schedule', icon: <FaCalendarAlt /> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-3">System Status</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Response Time:</span>
                          <span className="text-white">{systemHealth.responseTime}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Error Rate:</span>
                          <span className="text-white">{systemHealth.errorRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Active Users:</span>
                          <span className="text-white">1,247</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-3">Recent Deployments</h3>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-green-400">v2.1.4</span>
                          <span className="text-gray-400 ml-2">- Performance improvements</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-green-400">v2.1.3</span>
                          <span className="text-gray-400 ml-2">- Bug fixes</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-green-400">v2.1.2</span>
                          <span className="text-gray-400 ml-2">- Security updates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'issues' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Active Issues</h3>
                      <span className="text-gray-400 text-sm">{issues.length} total issues</span>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                      {issues.map(issue => (
                        <div key={issue.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-white font-medium">{issue.title}</h4>
                                <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(issue.severity)}`}>
                                  {issue.severity}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded text-white ${getStatusColor(issue.status)}`}>
                                  {issue.status}
                                </span>
                              </div>
                              <p className="text-gray-400 text-sm mb-2">{issue.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Assigned: {issue.assignedTo}</span>
                                <span>Created: {issue.createdAt}</span>
                                <span>Category: {issue.category}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                                className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300"
                              >
                                {selectedIssue === issue.id ? 'Hide' : 'Details'}
                              </button>
                              <select 
                                value={issue.status} 
                                onChange={e => updateIssueStatus(issue.id, e.target.value)}
                                className="bg-gray-700 text-white text-xs rounded px-2 py-1 border border-gray-600 focus:border-blue-500 focus:outline-none transition-all duration-300"
                              >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Scheduled">Scheduled</option>
                              </select>
                            </div>
                          </div>
                          {selectedIssue === issue.id && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 space-y-3"
                            >
                              <div className="bg-gray-700 rounded-lg p-3">
                                <h5 className="text-white font-medium mb-2">Impact</h5>
                                <p className="text-gray-300 text-sm">{issue.impact}</p>
                              </div>
                              <div className="bg-gray-700 rounded-lg p-3">
                                <h5 className="text-white font-medium mb-2">Solution</h5>
                                <p className="text-gray-300 text-sm">{issue.solution}</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Security Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {securityAlerts.map(alert => (
                        <div key={alert.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium">{alert.type}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${
                              alert.status === 'Passed' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                            }`}>
                              {alert.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{alert.details}</p>
                          <span className="text-gray-500 text-xs">{alert.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'testing' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Automated Testing</h3>
                    <div className="space-y-3">
                      {automatedTests.map(test => (
                        <div key={test.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-medium">{test.name}</h4>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span className={`px-2 py-1 rounded ${
                                  test.status === 'Passed' ? 'bg-green-600 text-white' : 
                                  test.status === 'Failed' ? 'bg-red-600 text-white' : 
                                  'bg-yellow-600 text-white'
                                }`}>
                                  {test.status}
                                </span>
                                <span className="text-gray-400">Coverage: {test.coverage}%</span>
                                <span className="text-gray-400">Last run: {test.lastRun}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => runTest(test.id)}
                              disabled={test.status === 'Running'}
                              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                              {test.status === 'Running' ? 'Running...' : 'Run Test'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'feedback' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">User Feedback</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                      {userFeedback.map(feedback => (
                        <div key={feedback.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-white font-medium">{feedback.user}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <FaCheckCircle 
                                      key={i} 
                                      className={`text-sm ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-gray-500 text-sm">{feedback.date}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{feedback.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Maintenance Schedule</h3>
                    <div className="space-y-3">
                      {maintenanceSchedule.map(schedule => (
                        <div key={schedule.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-medium">{schedule.task}</h4>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span className="text-gray-400">Frequency: {schedule.frequency}</span>
                                <span className="text-gray-400">Next run: {schedule.nextRun}</span>
                                <span className={`px-2 py-1 rounded ${
                                  schedule.status === 'Active' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                                }`}>
                                  {schedule.status}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => openRescheduleModal(schedule)}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-purple-400"
                              title="Reschedule maintenance"
                            >
                              Reschedule
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            </div>
          </div>
        </div>

        {/* Reschedule Modal */}
        {showRescheduleModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setShowRescheduleModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.95 }} 
              className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Reschedule Maintenance</h3>
              <input 
                type="date" 
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none mb-4"
                onChange={e => handleReschedule(e.target.value)}
              />
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Issue Details Modal */}
        {showIssueModal && modalIssue && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setShowIssueModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.95 }} 
              className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Issue Details</h3>
              <div className="mb-2 text-white font-semibold">{modalIssue.title}</div>
              <div className="mb-2 text-gray-400">Severity: <span className={getSeverityColor(modalIssue.severity)}>{modalIssue.severity}</span></div>
              <div className="mb-2 text-gray-400">Status: <span className={getStatusColor(modalIssue.status)}>{modalIssue.status}</span></div>
              <div className="mb-2 text-gray-400">Assigned: {modalIssue.assignedTo}</div>
              <div className="mb-2 text-gray-400">Created: {modalIssue.createdAt}</div>
              <div className="mb-2 text-gray-400">Category: {modalIssue.category}</div>
              <div className="mb-2 text-gray-300">{modalIssue.description}</div>
              <div className="mb-2 text-gray-300">Impact: {modalIssue.impact}</div>
              <div className="mb-2 text-gray-300">Solution: {modalIssue.solution}</div>
              <button 
                onClick={() => setShowIssueModal(false)}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          >
            <FaChevronUp className="text-lg" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default MaintenancePage; 