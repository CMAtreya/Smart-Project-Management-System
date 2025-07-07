import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaProjectDiagram, FaDatabase, FaCode, FaServer, FaShieldAlt, 
  FaChartLine, FaUsers, FaComments, FaHistory, FaDownload, 
  FaUpload, FaSave, FaEye, FaEdit, FaTrash, FaPlus, FaCog,
  FaRocket, FaLightbulb, FaBrain, FaNetworkWired, FaCloud,
  FaLock, FaUnlock, FaCheckCircle, FaExclamationTriangle,
  FaArrowRight, FaArrowLeft, FaSync, FaCopy, FaShare,
  FaFileAlt, FaLayerGroup, FaMicrochip, FaMemory, FaHdd,
  FaWifi, FaGlobe, FaShieldVirus, FaUserSecret, FaKey,
  FaFingerprint, FaEyeSlash, FaUserCheck, FaUserTimes
} from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import { useProject } from '../../contexts/ProjectContext';

const ModellingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getProject } = useProject();
  const [activeTab, setActiveTab] = useState('architecture');
  const [projectId, setProjectId] = useState(null);
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);

  // Mock data for demonstration
  const [models, setModels] = useState({
    architecture: [
      {
        id: 1,
        name: 'System Architecture v2.1',
        type: 'architecture',
        status: 'active',
        lastModified: '2024-01-15',
        contributors: ['Admin', 'Dev Team'],
        description: 'Complete system architecture with microservices design',
        thumbnail: '🏗️'
      },
      {
        id: 2,
        name: 'API Gateway Design',
        type: 'architecture',
        status: 'draft',
        lastModified: '2024-01-14',
        contributors: ['Admin'],
        description: 'API gateway and load balancer configuration',
        thumbnail: '🌐'
      }
    ],
    dataModels: [
      {
        id: 3,
        name: 'Database Schema v1.0',
        type: 'data',
        status: 'active',
        lastModified: '2024-01-13',
        contributors: ['Admin', 'DBA'],
        description: 'Complete ERD with relationships and constraints',
        thumbnail: '🗄️'
      }
    ],
    apis: [
      {
        id: 4,
        name: 'REST API Specification',
        type: 'api',
        status: 'active',
        lastModified: '2024-01-12',
        contributors: ['Admin', 'Backend Team'],
        description: 'Complete REST API documentation with endpoints',
        thumbnail: '🔌'
      }
    ],
    deployment: [
      {
        id: 5,
        name: 'Production Deployment',
        type: 'deployment',
        status: 'active',
        lastModified: '2024-01-11',
        contributors: ['Admin', 'DevOps'],
        description: 'Production infrastructure and deployment pipeline',
        thumbnail: '🚀'
      }
    ],
    performance: [
      {
        id: 6,
        name: 'Load Testing Results',
        type: 'performance',
        status: 'completed',
        lastModified: '2024-01-10',
        contributors: ['Admin', 'QA Team'],
        description: 'Performance benchmarks and optimization recommendations',
        thumbnail: '⚡'
      }
    ],
    security: [
      {
        id: 7,
        name: 'Security Architecture',
        type: 'security',
        status: 'active',
        lastModified: '2024-01-09',
        contributors: ['Admin', 'Security Team'],
        description: 'Security framework and threat modeling',
        thumbnail: '🔒'
      }
    ]
  });

  const [aiInsights] = useState([
    {
      type: 'optimization',
      title: 'Performance Optimization',
      description: 'AI detected potential bottlenecks in your API design. Consider implementing caching strategies.',
      priority: 'high',
      icon: <FaChartLine className="text-yellow-400" />
    },
    {
      type: 'security',
      title: 'Security Enhancement',
      description: 'Your authentication model could be strengthened with multi-factor authentication.',
      priority: 'medium',
      icon: <FaShieldAlt className="text-red-400" />
    },
    {
      type: 'architecture',
      title: 'Scalability Suggestion',
      description: 'Consider implementing horizontal scaling for your microservices architecture.',
      priority: 'low',
      icon: <FaServer className="text-blue-400" />
    }
  ]);

  useEffect(() => {
    if (location.state && location.state.projectId) {
      setProjectId(location.state.projectId);
      // Fetch project details
      const fetchProject = async () => {
        try {
          const projectData = await getProject(location.state.projectId);
          setProject(projectData);
        } catch (error) {
          console.error('Error fetching project:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProject();
    } else {
      setIsLoading(false);
    }
  }, [location, getProject]);

  const tabs = [
    { id: 'architecture', label: 'System Architecture', icon: <FaProjectDiagram />, color: 'from-blue-600 to-cyan-600' },
    { id: 'dataModels', label: 'Data Models', icon: <FaDatabase />, color: 'from-green-600 to-emerald-600' },
    { id: 'apis', label: 'API Design', icon: <FaCode />, color: 'from-purple-600 to-pink-600' },
    { id: 'deployment', label: 'Deployment', icon: <FaRocket />, color: 'from-orange-600 to-red-600' },
    { id: 'performance', label: 'Performance', icon: <FaChartLine />, color: 'from-yellow-600 to-orange-600' },
    { id: 'security', label: 'Security', icon: <FaShieldAlt />, color: 'from-red-600 to-pink-600' }
  ];

  const handleModelClick = (model) => {
    setSelectedModel(model);
    // Navigate to specific model editor
    navigate(`/admin/modelling/${model.type}/${model.id}`, { 
      state: { model, projectId } 
    });
  };

  const handleCreateModel = () => {
    setShowCreateModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/30';
      case 'draft': return 'text-yellow-400 bg-yellow-900/30';
      case 'completed': return 'text-blue-400 bg-blue-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

        <div className="relative z-10 flex flex-col items-center py-10 px-4">
          <style>{`
            .bg-grid-pattern {
              background-image: 
                linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px);
              background-size: 40px 40px;
            }
            .model-card {
              backdrop-filter: blur(10px);
              background: rgba(31, 41, 55, 0.8);
              transition: all 0.3s ease;
            }
            .model-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
          `}</style>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 w-full max-w-6xl"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Advanced Modelling Studio
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Design, visualize, and optimize your system architecture with AI-powered insights and collaborative tools.
            </motion.p>
            
            {/* Project Info */}
            {project && (
              <motion.div 
                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 mb-8 border border-blue-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-gray-300">{project.description}</p>
                <div className="flex justify-center items-center gap-6 mt-4 text-sm">
                  <span className="text-blue-400">Status: {project.status}</span>
                  <span className="text-green-400">Progress: {project.progress}%</span>
                  <span className="text-purple-400">Priority: {project.priority}</span>
                </div>
              </motion.div>
            )}

            {/* AI Insights Toggle */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <button
                onClick={() => setShowAIInsights(!showAIInsights)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <FaBrain className="text-sm" />
                {showAIInsights ? 'Hide AI Insights' : 'Show AI Insights'}
              </button>
            </motion.div>
          </motion.div>

          {/* AI Insights Panel */}
          <AnimatePresence>
            {showAIInsights && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mb-8"
              >
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <FaBrain className="mr-2 text-purple-400" />
                    AI-Powered Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiInsights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
                      >
                        <div className="flex items-center mb-2">
                          {insight.icon}
                          <span className="ml-2 text-sm font-medium text-gray-300">{insight.title}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{insight.description}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          insight.priority === 'high' ? 'bg-red-900/50 text-red-400' :
                          insight.priority === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
                          'bg-blue-900/50 text-blue-400'
                        }`}>
                          {insight.priority} priority
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Tabs */}
          <motion.div 
            className="w-full max-w-6xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div 
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white capitalize">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <button
                onClick={handleCreateModel}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <FaPlus className="text-sm" />
                Create New
              </button>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models[activeTab]?.map((model, index) => (
                <motion.div
                  key={model.id}
                  className="model-card rounded-2xl p-6 border border-gray-700 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.8 }}
                  onClick={() => handleModelClick(model)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{model.thumbnail}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{model.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Modified: {model.lastModified}</span>
                    <span>{model.contributors.length} contributors</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {(!models[activeTab] || models[activeTab].length === 0) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-bold text-white mb-2">No Models Yet</h3>
                <p className="text-gray-400 mb-6">Create your first {activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()} model to get started.</p>
                <button
                  onClick={handleCreateModel}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <FaPlus className="text-sm" />
                  Create First Model
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ModellingPage; 