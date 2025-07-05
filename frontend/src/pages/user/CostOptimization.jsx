import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, FaDollarSign, FaChartLine, FaLightbulb, FaCog, 
  FaPlay, FaPause, FaSync, FaEye, FaDownload, FaUpload, FaStar,
  FaRocket, FaBrain, FaUsers, FaCode, FaDatabase, FaServer, 
  FaShieldAlt, FaClock, FaThermometerHalf, FaTachometerAlt, 
  FaMemory, FaHdd, FaNetworkWired, FaCloud, FaAws, FaGoogle,
  FaMicrosoft, FaCheck, FaTimes, FaExclamationTriangle,
  FaArrowUp, FaArrowDown, FaCalculator, FaPiggyBank
} from 'react-icons/fa';

const CostOptimization = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [optimizationStatus, setOptimizationStatus] = useState('idle');

  const costData = {
    currentMonth: {
      total: 2847.50,
      breakdown: {
        compute: 1245.30,
        storage: 456.80,
        network: 234.40,
        database: 911.00
      },
      trend: '+12.5%',
      savings: 423.75
    },
    lastMonth: {
      total: 2530.25,
      breakdown: {
        compute: 1100.50,
        storage: 420.30,
        network: 210.45,
        database: 799.00
      }
    }
  };

  const optimizationRecommendations = [
    {
      id: 1,
      title: 'Resize EC2 Instances',
      description: 'Downsize 3 underutilized instances based on usage patterns',
      potentialSavings: 245.60,
      effort: 'Low',
      impact: 'High',
      category: 'compute',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Enable S3 Lifecycle Policies',
      description: 'Move infrequently accessed data to cheaper storage tiers',
      potentialSavings: 89.30,
      effort: 'Medium',
      impact: 'Medium',
      category: 'storage',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Optimize Database Queries',
      description: 'Reduce database costs by 15% through query optimization',
      potentialSavings: 136.65,
      effort: 'High',
      impact: 'High',
      category: 'database',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Implement Auto Scaling',
      description: 'Scale resources automatically based on demand',
      potentialSavings: 187.20,
      effort: 'Medium',
      impact: 'High',
      category: 'compute',
      status: 'pending',
      priority: 'medium'
    }
  ];

  const cloudComparison = [
    {
      provider: 'AWS',
      currentCost: 2847.50,
      estimatedCost: 2650.00,
      savings: 197.50,
      features: ['EC2', 'S3', 'RDS', 'CloudFront'],
      rating: 4.8
    },
    {
      provider: 'Google Cloud',
      currentCost: 2847.50,
      estimatedCost: 2480.00,
      savings: 367.50,
      features: ['Compute Engine', 'Cloud Storage', 'Cloud SQL', 'CDN'],
      rating: 4.6
    },
    {
      provider: 'Azure',
      currentCost: 2847.50,
      estimatedCost: 2720.00,
      savings: 127.50,
      features: ['Virtual Machines', 'Blob Storage', 'SQL Database', 'CDN'],
      rating: 4.4
    }
  ];

  const handleOptimize = () => {
    setOptimizationStatus('analyzing');
    setTimeout(() => {
      setOptimizationStatus('completed');
    }, 3000);
  };

  const getTrendColor = (trend) => {
    return trend.startsWith('+') ? 'text-red-400' : 'text-green-400';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'compute': return <FaServer />;
      case 'storage': return <FaHdd />;
      case 'database': return <FaDatabase />;
      case 'network': return <FaNetworkWired />;
      default: return <FaCloud />;
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
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3));
          border-radius: 1rem;
          padding: 1px;
        }
        .gradient-border > div {
          background: rgba(31, 41, 55, 0.9);
          border-radius: 0.875rem;
        }
        .cost-card {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1));
          border: 1px solid rgba(34, 197, 94, 0.2);
          transition: all 0.3s ease;
        }
        .cost-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.2);
        }
        .savings-highlight {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
          border: 1px solid rgba(34, 197, 94, 0.3);
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
              Cost Optimization
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            AI-powered cost optimization with real-time tracking and intelligent recommendations.
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
              onClick={handleOptimize}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaBrain />
              Run AI Analysis
            </button>
          </div>
        </motion.div>

        {/* Cost Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="cost-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaDollarSign className="text-3xl text-green-400" />
                <span className={`text-lg font-bold ${getTrendColor(costData.currentMonth.trend)}`}>
                  {costData.currentMonth.trend}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                ${costData.currentMonth.total.toLocaleString()}
              </div>
              <p className="text-gray-400">Total Cost (This Month)</p>
            </div>

            <div className="cost-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaPiggyBank className="text-3xl text-blue-400" />
                <FaArrowDown className="text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                ${costData.currentMonth.savings.toLocaleString()}
              </div>
              <p className="text-gray-400">Potential Savings</p>
            </div>

            <div className="cost-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaServer className="text-3xl text-purple-400" />
                <FaTachometerAlt className="text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round((costData.currentMonth.breakdown.compute / costData.currentMonth.total) * 100)}%
              </div>
              <p className="text-gray-400">Compute Usage</p>
            </div>

            <div className="cost-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaDatabase className="text-3xl text-yellow-400" />
                <FaMemory className="text-pink-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round((costData.currentMonth.breakdown.database / costData.currentMonth.total) * 100)}%
              </div>
              <p className="text-gray-400">Database Usage</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-center">
            <div className="bg-gray-800/50 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Cost Overview
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'recommendations'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                AI Recommendations
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'comparison'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Cloud Comparison
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Cost Breakdown */}
                <div className="gradient-border">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-green-400 flex items-center">
                      <FaChartLine className="mr-2" />
                      Cost Breakdown
                    </h2>
                    <div className="space-y-4">
                      {Object.entries(costData.currentMonth.breakdown).map(([category, amount]) => (
                        <div key={category} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getCategoryIcon(category)}
                            <span className="text-white font-medium capitalize">{category}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold">${amount.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">
                              {Math.round((amount / costData.currentMonth.total) * 100)}% of total
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cost Trends */}
                <div className="gradient-border">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center">
                      <FaArrowUp className="mr-2" />
                      Cost Trends
                    </h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">This Month vs Last Month</span>
                          <span className={`font-bold ${getTrendColor(costData.currentMonth.trend)}`}>
                            {costData.currentMonth.trend}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">This Month: ${costData.currentMonth.total.toLocaleString()}</span>
                          <span className="text-gray-400">Last Month: ${costData.lastMonth.total.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="savings-highlight rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaLightbulb className="text-yellow-400" />
                          <span className="text-white font-semibold">AI Optimization Potential</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400 mb-1">
                          ${costData.currentMonth.savings.toLocaleString()}
                        </div>
                        <p className="text-gray-300 text-sm">
                          Potential monthly savings through AI recommendations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'recommendations' && (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {optimizationRecommendations.map((recommendation) => (
                  <motion.div
                    key={recommendation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="cost-card rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(recommendation.category)}
                        <div>
                          <h3 className="text-xl font-bold text-white">{recommendation.title}</h3>
                          <p className="text-gray-300 text-sm">{recommendation.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                          {recommendation.priority.toUpperCase()}
                        </span>
                        <span className="text-green-400 font-bold">
                          ${recommendation.potentialSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Effort</div>
                        <div className="text-white font-semibold capitalize">{recommendation.effort}</div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Impact</div>
                        <div className="text-white font-semibold capitalize">{recommendation.impact}</div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Savings</div>
                        <div className="text-green-400 font-semibold">
                          ${recommendation.potentialSavings.toLocaleString()}/month
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <FaPlay />
                        Apply
                      </button>
                      <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <FaEye />
                        Details
                      </button>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <FaCalculator />
                        Calculate
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'comparison' && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {cloudComparison.map((cloud) => (
                  <motion.div
                    key={cloud.provider}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="gradient-border"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">{cloud.provider}</h3>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="text-white text-sm">{cloud.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Current Cost</span>
                          <span className="text-white font-semibold">${cloud.currentCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Estimated Cost</span>
                          <span className="text-blue-400 font-semibold">${cloud.estimatedCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Potential Savings</span>
                          <span className="text-green-400 font-bold">${cloud.savings.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {cloud.features.map((feature) => (
                            <span key={feature} className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                        Migrate to {cloud.provider}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Analysis Modal */}
        <AnimatePresence>
          {optimizationStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="gradient-border max-w-md w-full"
              >
                <div className="p-6 text-center">
                  {optimizationStatus === 'analyzing' && (
                    <>
                      <FaBrain className="text-4xl text-purple-400 mx-auto mb-4 animate-pulse" />
                      <h2 className="text-2xl font-bold text-white mb-4">AI Analysis in Progress</h2>
                      <p className="text-gray-300 mb-6">
                        Analyzing your infrastructure and generating cost optimization recommendations...
                      </p>
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                      </div>
                    </>
                  )}

                  {optimizationStatus === 'completed' && (
                    <>
                      <FaCheck className="text-4xl text-green-400 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-white mb-4">Analysis Complete</h2>
                      <p className="text-gray-300 mb-6">
                        Found 4 optimization opportunities with potential savings of ${costData.currentMonth.savings.toLocaleString()}/month.
                      </p>
                      <button
                        onClick={() => {
                          setOptimizationStatus('idle');
                          setActiveTab('recommendations');
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors"
                      >
                        View Recommendations
                      </button>
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

export default CostOptimization; 