import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, FaUndo, FaHistory, FaExclamationTriangle, FaCheck, 
  FaTimes, FaClock, FaServer, FaDatabase, FaChartLine, FaShieldAlt,
  FaPlay, FaPause, FaSync, FaEye, FaDownload, FaUpload, FaCog,
  FaRocket, FaBrain, FaLightbulb, FaUsers, FaCode, FaNetworkWired,
  FaThermometerHalf, FaTachometerAlt, FaMemory, FaHdd
} from 'react-icons/fa';

const SmartRollback = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('deployments');
  const [selectedDeployment, setSelectedDeployment] = useState(null);
  const [rollbackStatus, setRollbackStatus] = useState('idle');
  const [autoRollbackEnabled, setAutoRollbackEnabled] = useState(true);

  const deploymentHistory = [
    {
      id: 1,
      version: 'v2.1.0',
      status: 'active',
      deployedAt: '2024-01-15 14:30:00',
      deployedBy: 'John Doe',
      commitHash: 'a1b2c3d4',
      branch: 'main',
      environment: 'production',
      metrics: {
        responseTime: 120,
        errorRate: 0.5,
        cpuUsage: 45,
        memoryUsage: 60,
        uptime: 99.8
      },
      healthScore: 95,
      rollbackReason: null,
      canRollback: true
    },
    {
      id: 2,
      version: 'v2.0.9',
      status: 'rolled-back',
      deployedAt: '2024-01-14 10:15:00',
      deployedBy: 'Jane Smith',
      commitHash: 'e5f6g7h8',
      branch: 'main',
      environment: 'production',
      metrics: {
        responseTime: 350,
        errorRate: 8.2,
        cpuUsage: 85,
        memoryUsage: 90,
        uptime: 92.1
      },
      healthScore: 45,
      rollbackReason: 'High error rate detected (8.2%)',
      canRollback: false,
      rolledBackAt: '2024-01-14 11:45:00'
    },
    {
      id: 3,
      version: 'v2.0.8',
      status: 'stable',
      deployedAt: '2024-01-13 16:20:00',
      deployedBy: 'Mike Johnson',
      commitHash: 'i9j0k1l2',
      branch: 'main',
      environment: 'production',
      metrics: {
        responseTime: 110,
        errorRate: 0.3,
        cpuUsage: 40,
        memoryUsage: 55,
        uptime: 99.9
      },
      healthScore: 98,
      rollbackReason: null,
      canRollback: true
    }
  ];

  const rollbackStrategies = [
    {
      id: 1,
      name: 'Immediate Rollback',
      description: 'Instant rollback to previous stable version',
      trigger: 'Critical errors detected',
      timeToRollback: '< 30 seconds',
      risk: 'Low',
      recommended: true
    },
    {
      id: 2,
      name: 'Gradual Rollback',
      description: 'Gradual traffic shift to previous version',
      trigger: 'Performance degradation',
      timeToRollback: '2-5 minutes',
      risk: 'Very Low',
      recommended: false
    },
    {
      id: 3,
      name: 'Canary Rollback',
      description: 'Rollback for subset of users first',
      trigger: 'Suspicious behavior patterns',
      timeToRollback: '1-3 minutes',
      risk: 'Low',
      recommended: false
    }
  ];

  const handleRollback = (deployment) => {
    setSelectedDeployment(deployment);
    setRollbackStatus('confirming');
  };

  const confirmRollback = () => {
    setRollbackStatus('rolling-back');
    // Simulate rollback process
    setTimeout(() => {
      setRollbackStatus('completed');
      setTimeout(() => {
        setRollbackStatus('idle');
        setSelectedDeployment(null);
      }, 2000);
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'rolled-back': return 'text-red-400';
      case 'stable': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getHealthColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
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
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(59, 130, 246, 0.3));
          border-radius: 1rem;
          padding: 1px;
        }
        .gradient-border > div {
          background: rgba(31, 41, 55, 0.9);
          border-radius: 0.875rem;
        }
        .deployment-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        .deployment-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
        }
        .rollback-alert {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1));
          border: 1px solid rgba(239, 68, 68, 0.3);
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
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Smart Rollback System
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            Intelligent rollback system with automatic failure detection and instant recovery capabilities.
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
              onClick={() => setAutoRollbackEnabled(!autoRollbackEnabled)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 ${
                autoRollbackEnabled
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white'
                  : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white'
              }`}
            >
              {autoRollbackEnabled ? <FaCheck /> : <FaTimes />}
              Auto Rollback: {autoRollbackEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </motion.div>

        {/* Auto Rollback Alert */}
        {autoRollbackEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="rollback-alert rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaBrain className="text-2xl text-orange-400" />
                <h2 className="text-xl font-bold text-white">AI-Powered Auto Rollback Active</h2>
              </div>
              <p className="text-gray-300 mb-4">
                The system is continuously monitoring your deployment and will automatically rollback if critical issues are detected.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-400" />
                    <span className="text-sm text-gray-300">Error Rate &gt; 5%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaThermometerHalf className="text-orange-400" />
                    <span className="text-sm text-gray-300">Response Time &gt; 500ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTachometerAlt className="text-yellow-400" />
                    <span className="text-sm text-gray-300">CPU Usage &gt; 90%</span>
                  </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-center">
            <div className="bg-gray-800/50 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('deployments')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'deployments'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Deployment History
              </button>
              <button
                onClick={() => setActiveTab('strategies')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'strategies'
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Rollback Strategies
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'deployments' && (
              <motion.div
                key="deployments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {deploymentHistory.map((deployment) => (
                  <motion.div
                    key={deployment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="deployment-card rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{deployment.version}</div>
                          <div className={`text-sm font-medium ${getStatusColor(deployment.status)}`}>
                            {deployment.status.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaServer className="text-gray-400" />
                          <span className="text-gray-300">{deployment.environment}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`text-2xl font-bold ${getHealthColor(deployment.healthScore)}`}>
                          {deployment.healthScore}
                        </div>
                        <span className="text-gray-400 text-sm">Health Score</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <FaClock className="text-blue-400" />
                          <span className="text-sm text-gray-400">Response Time</span>
                        </div>
                        <div className="text-white font-semibold">{deployment.metrics.responseTime}ms</div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <FaExclamationTriangle className="text-red-400" />
                          <span className="text-sm text-gray-400">Error Rate</span>
                        </div>
                        <div className="text-white font-semibold">{deployment.metrics.errorRate}%</div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <FaTachometerAlt className="text-orange-400" />
                          <span className="text-sm text-gray-400">CPU Usage</span>
                        </div>
                        <div className="text-white font-semibold">{deployment.metrics.cpuUsage}%</div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <FaMemory className="text-purple-400" />
                          <span className="text-sm text-gray-400">Memory</span>
                        </div>
                        <div className="text-white font-semibold">{deployment.metrics.memoryUsage}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Deployed by {deployment.deployedBy} on {deployment.deployedAt}
                        {deployment.rollbackReason && (
                          <div className="text-red-400 mt-1">
                            Rollback: {deployment.rollbackReason}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                          <FaEye className="text-sm" />
                        </button>
                        {deployment.canRollback && (
                          <button
                            onClick={() => handleRollback(deployment)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          >
                            <FaUndo className="text-sm" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'strategies' && (
              <motion.div
                key="strategies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {rollbackStrategies.map((strategy) => (
                  <motion.div
                    key={strategy.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="gradient-border"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">{strategy.name}</h3>
                        {strategy.recommended && (
                          <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                            Recommended
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{strategy.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Trigger</span>
                          <span className="text-white text-sm">{strategy.trigger}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Time to Rollback</span>
                          <span className="text-blue-400 text-sm font-medium">{strategy.timeToRollback}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Risk Level</span>
                          <span className="text-green-400 text-sm font-medium">{strategy.risk}</span>
                        </div>
                      </div>
                      
                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                        Configure Strategy
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rollback Confirmation Modal */}
        <AnimatePresence>
          {selectedDeployment && rollbackStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => rollbackStatus === 'confirming' && setSelectedDeployment(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="gradient-border max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 text-center">
                  {rollbackStatus === 'confirming' && (
                    <>
                      <FaExclamationTriangle className="text-4xl text-red-400 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-white mb-4">Confirm Rollback</h2>
                      <p className="text-gray-300 mb-6">
                        Are you sure you want to rollback to version <strong>{selectedDeployment.version}</strong>?
                        This action cannot be undone.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedDeployment(null)}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmRollback}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors"
                        >
                          Rollback
                        </button>
                      </div>
                    </>
                  )}

                  {rollbackStatus === 'rolling-back' && (
                    <>
                      <FaSync className="text-4xl text-blue-400 mx-auto mb-4 animate-spin" />
                      <h2 className="text-2xl font-bold text-white mb-4">Rolling Back...</h2>
                      <p className="text-gray-300">
                        Rolling back to version {selectedDeployment.version}. Please wait...
                      </p>
                    </>
                  )}

                  {rollbackStatus === 'completed' && (
                    <>
                      <FaCheck className="text-4xl text-green-400 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-white mb-4">Rollback Complete</h2>
                      <p className="text-gray-300">
                        Successfully rolled back to version {selectedDeployment.version}.
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartRollback; 