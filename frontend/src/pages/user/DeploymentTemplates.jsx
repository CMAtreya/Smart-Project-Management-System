import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, FaPlus, FaEdit, FaCopy, FaDownload, FaUpload, FaStar,
  FaArrowLeft, FaCog, FaPlay, FaPause, FaTrash, FaEye, FaHeart,
  FaCode, FaDatabase, FaServer, FaShieldAlt, FaClock, FaUsers,
  FaChartLine, FaLightbulb, FaCheck, FaTimes, FaExternalLinkAlt,
  FaShoppingCart
} from 'react-icons/fa';

const DeploymentTemplates = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-templates');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myTemplates = [
    {
      id: 1,
      name: 'React Production Build',
      description: 'Optimized deployment for React applications with CDN and caching',
      category: 'Frontend',
      difficulty: 'Easy',
      estimatedTime: '5 min',
      successRate: 95,
      lastUsed: '2 days ago',
      isFavorite: true,
      config: {
        buildCommand: 'npm run build',
        outputDir: 'dist',
        environment: 'production',
        optimization: true
      }
    },
    {
      id: 2,
      name: 'Node.js API Deployment',
      description: 'High-performance Node.js API with load balancing and monitoring',
      category: 'Backend',
      difficulty: 'Medium',
      estimatedTime: '8 min',
      successRate: 92,
      lastUsed: '1 week ago',
      isFavorite: false,
      config: {
        runtime: 'nodejs18',
        instances: 3,
        memory: '512MB',
        environment: 'production'
      }
    },
    {
      id: 3,
      name: 'Full-Stack MERN',
      description: 'Complete MERN stack deployment with database and file storage',
      category: 'Full-Stack',
      difficulty: 'Hard',
      estimatedTime: '12 min',
      successRate: 88,
      lastUsed: '3 days ago',
      isFavorite: true,
      config: {
        frontend: 'react',
        backend: 'nodejs',
        database: 'mongodb',
        storage: 'aws-s3'
      }
    }
  ];

  const marketplaceTemplates = [
    {
      id: 101,
      name: 'Next.js SSR Template',
      description: 'Server-side rendering with edge caching and analytics',
      category: 'Frontend',
      difficulty: 'Medium',
      estimatedTime: '7 min',
      successRate: 94,
      downloads: 1247,
      rating: 4.8,
      author: 'Vercel Team',
      price: 'Free',
      isVerified: true
    },
    {
      id: 102,
      name: 'Microservices Architecture',
      description: 'Kubernetes-based microservices with service mesh',
      category: 'Architecture',
      difficulty: 'Expert',
      estimatedTime: '20 min',
      successRate: 89,
      downloads: 892,
      rating: 4.6,
      author: 'Cloud Native Expert',
      price: '$29',
      isVerified: true
    },
    {
      id: 103,
      name: 'E-commerce Platform',
      description: 'Complete e-commerce solution with payment processing',
      category: 'E-commerce',
      difficulty: 'Hard',
      estimatedTime: '15 min',
      successRate: 91,
      downloads: 2156,
      rating: 4.9,
      author: 'E-commerce Pro',
      price: '$49',
      isVerified: true
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleDeploy = (template) => {
    // Navigate to deployment page with template pre-loaded
    navigate('/user/deployment', { state: { template } });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend': return <FaCode />;
      case 'Backend': return <FaServer />;
      case 'Full-Stack': return <FaDatabase />;
      case 'Architecture': return <FaCog />;
      case 'E-commerce': return <FaShoppingCart />;
      default: return <FaRocket />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-grid-pattern">
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
        .template-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        .template-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
        }
        .marketplace-card {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
      `}</style>
      
      <div className="pt-16 min-h-screen py-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Deployment Templates
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            Pre-configured deployment strategies and templates to accelerate your deployment process.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/user/deployment')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Back to Deployment
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              Create Template
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-center">
            <div className="bg-gray-800/50 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('my-templates')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'my-templates'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                My Templates
              </button>
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'marketplace'
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Template Marketplace
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'my-templates' && (
              <motion.div
                key="my-templates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {myTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="template-card rounded-xl p-6 cursor-pointer"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(template.category)}
                        <span className="text-sm text-gray-400">{template.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {template.isFavorite && <FaHeart className="text-red-400" />}
                        <FaStar className="text-yellow-400" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{template.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Difficulty</span>
                        <span className={`text-sm font-medium ${getDifficultyColor(template.difficulty)}`}>
                          {template.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Time</span>
                        <span className="text-white text-sm">{template.estimatedTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Success Rate</span>
                        <span className="text-green-400 text-sm font-medium">{template.successRate}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Last used: {template.lastUsed}</span>
                      <div className="flex gap-2">
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                          <FaEdit className="text-sm" />
                        </button>
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                          <FaCopy className="text-sm" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeploy(template);
                          }}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          <FaPlay className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'marketplace' && (
              <motion.div
                key="marketplace"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {marketplaceTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="marketplace-card rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(template.category)}
                        <span className="text-sm text-gray-400">{template.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {template.isVerified && (
                          <div className="bg-blue-600 text-white p-1 rounded-full">
                            <FaCheck className="text-xs" />
                          </div>
                        )}
                        <span className={`text-sm font-medium ${
                          template.price === 'Free' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {template.price}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{template.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Difficulty</span>
                        <span className={`text-sm font-medium ${getDifficultyColor(template.difficulty)}`}>
                          {template.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Time</span>
                        <span className="text-white text-sm">{template.estimatedTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Success Rate</span>
                        <span className="text-green-400 text-sm font-medium">{template.successRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Rating</span>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="text-white text-sm">{template.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-500">by {template.author}</span>
                      <span className="text-xs text-gray-500">{template.downloads} downloads</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <FaEye />
                        Preview
                      </button>
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <FaDownload />
                        Install
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Template Details Modal */}
        <AnimatePresence>
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedTemplate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="gradient-border max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">{selectedTemplate.name}</h2>
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{selectedTemplate.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h3 className="font-semibold text-white mb-2">Configuration</h3>
                      <pre className="text-sm text-gray-300 overflow-auto">
                        {JSON.stringify(selectedTemplate.config, null, 2)}
                      </pre>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h3 className="font-semibold text-white mb-2">Statistics</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Success Rate</span>
                          <span className="text-green-400">{selectedTemplate.successRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Estimated Time</span>
                          <span className="text-white">{selectedTemplate.estimatedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Difficulty</span>
                          <span className={getDifficultyColor(selectedTemplate.difficulty)}>
                            {selectedTemplate.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDeploy(selectedTemplate)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaRocket />
                      Deploy Now
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <FaEdit />
                      Edit Template
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeploymentTemplates; 