import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, FaChartLine, FaChartBar, FaChartPie, FaChartArea,
  FaPlay, FaPause, FaSync, FaEye, FaDownload, FaUpload, FaCog,
  FaRocket, FaBrain, FaUsers, FaCode, FaDatabase, FaServer, 
  FaShieldAlt, FaClock, FaThermometerHalf, FaTachometerAlt, 
  FaMemory, FaHdd, FaNetworkWired, FaCloud, FaCheck, FaTimes,
  FaExclamationTriangle, FaArrowUp, FaArrowDown, FaCalculator,
  FaLightbulb, FaHistory, FaCalendar, FaGlobe, FaMobile, FaDesktop,
  FaTablet, FaRegClock, FaRegEye, FaRegHeart, FaRegStar
} from 'react-icons/fa';

const DeploymentAnalytics = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  const analyticsData = {
    overview: {
      totalDeployments: 156,
      successRate: 94.2,
      averageDeployTime: '2m 15s',
      totalDowntime: '12m 30s',
      uptime: 99.8,
      activeUsers: 15420,
      pageViews: 89250,
      revenue: 45680
    },
    performance: {
      responseTime: {
        current: 120,
        previous: 135,
        trend: -11.1
      },
      throughput: {
        current: 1250,
        previous: 1180,
        trend: 5.9
      },
      errorRate: {
        current: 0.5,
        previous: 0.8,
        trend: -37.5
      },
      availability: {
        current: 99.8,
        previous: 99.5,
        trend: 0.3
      }
    },
    deployments: [
      { date: '2024-01-15', count: 8, success: 7, failures: 1 },
      { date: '2024-01-14', count: 12, success: 11, failures: 1 },
      { date: '2024-01-13', count: 6, success: 6, failures: 0 },
      { date: '2024-01-12', count: 15, success: 14, failures: 1 },
      { date: '2024-01-11', count: 9, success: 9, failures: 0 },
      { date: '2024-01-10', count: 11, success: 10, failures: 1 },
      { date: '2024-01-09', count: 7, success: 7, failures: 0 }
    ],
    insights: [
      {
        id: 1,
        type: 'performance',
        title: 'Response Time Improved',
        description: 'Average response time decreased by 11.1% this week',
        impact: 'positive',
        confidence: 95,
        recommendation: 'Continue current optimization strategies'
      },
      {
        id: 2,
        type: 'deployment',
        title: 'Deployment Success Rate High',
        description: '94.2% success rate over the last 30 days',
        impact: 'positive',
        confidence: 98,
        recommendation: 'Maintain current deployment practices'
      },
      {
        id: 3,
        type: 'warning',
        title: 'Peak Load Detected',
        description: 'Traffic spike detected during business hours',
        impact: 'neutral',
        confidence: 87,
        recommendation: 'Consider auto-scaling configuration'
      }
    ]
  };

  const getTrendColor = (trend) => {
    return trend >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getTrendIcon = (trend) => {
    return trend >= 0 ? <FaArrowUp /> : <FaArrowDown />;
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-yellow-400';
      default: return 'text-gray-400';
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
        .analytics-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        .analytics-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
        }
        .metric-highlight {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .chart-container {
          background: linear-gradient(135deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
          border: 1px solid rgba(59, 130, 246, 0.2);
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Advanced Analytics Dashboard
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            Comprehensive deployment analytics with AI-powered insights and predictive modeling.
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
              onClick={() => setIsLoading(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaSync className={`text-sm ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="analytics-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaRocket className="text-3xl text-blue-400" />
                <div className="flex items-center gap-1 text-green-400">
                  <FaArrowUp />
                  <span className="text-sm">+5.2%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {analyticsData.overview.totalDeployments}
              </div>
              <p className="text-gray-400">Total Deployments</p>
            </div>

            <div className="analytics-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaCheck className="text-3xl text-green-400" />
                <div className="flex items-center gap-1 text-green-400">
                  <FaArrowUp />
                  <span className="text-sm">+2.1%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {analyticsData.overview.successRate}%
              </div>
              <p className="text-gray-400">Success Rate</p>
            </div>

            <div className="analytics-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaClock className="text-3xl text-yellow-400" />
                <div className="flex items-center gap-1 text-green-400">
                  <FaArrowDown />
                  <span className="text-sm">-15%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {analyticsData.overview.averageDeployTime}
              </div>
              <p className="text-gray-400">Avg Deploy Time</p>
            </div>

            <div className="analytics-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaUsers className="text-3xl text-purple-400" />
                <div className="flex items-center gap-1 text-green-400">
                  <FaArrowUp />
                  <span className="text-sm">+12.3%</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {analyticsData.overview.activeUsers.toLocaleString()}
              </div>
              <p className="text-gray-400">Active Users</p>
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
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'performance'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === 'insights'
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                AI Insights
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
                {/* Deployment Chart */}
                <div className="gradient-border">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center">
                      <FaChartBar className="mr-2" />
                      Deployment Activity
                    </h2>
                    <div className="chart-container rounded-lg p-4 h-64 flex items-end justify-between">
                      {analyticsData.deployments.map((day, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="flex flex-col items-center mb-2">
                            <div 
                              className="bg-blue-500 rounded-t w-8 mb-1"
                              style={{ height: `${(day.success / 15) * 120}px` }}
                            ></div>
                            <div 
                              className="bg-red-500 rounded-t w-8"
                              style={{ height: `${(day.failures / 15) * 120}px` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{day.date.slice(-2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span className="text-sm text-gray-300">Successful</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span className="text-sm text-gray-300">Failed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="gradient-border">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-green-400 flex items-center">
                      <FaChartLine className="mr-2" />
                      Performance Metrics
                    </h2>
                    <div className="space-y-4">
                      {Object.entries(analyticsData.performance).map(([metric, data]) => (
                        <div key={metric} className="p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium capitalize">
                              {metric.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <div className={`flex items-center gap-1 ${getTrendColor(data.trend)}`}>
                              {getTrendIcon(data.trend)}
                              <span className="text-sm">{Math.abs(data.trend)}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-white">
                              {typeof data.current === 'number' && data.current < 10 
                                ? data.current.toFixed(1) 
                                : data.current}
                              {metric === 'availability' ? '%' : 
                               metric === 'responseTime' ? 'ms' : 
                               metric === 'throughput' ? ' req/s' : '%'}
                            </span>
                            <span className="text-sm text-gray-400">
                              vs {typeof data.previous === 'number' && data.previous < 10 
                                ? data.previous.toFixed(1) 
                                : data.previous}
                              {metric === 'availability' ? '%' : 
                               metric === 'responseTime' ? 'ms' : 
                               metric === 'throughput' ? ' req/s' : '%'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'performance' && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Real-time Performance */}
                <div className="gradient-border">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center">
                      <FaTachometerAlt className="mr-2" />
                      Real-time Performance
                    </h2>
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">CPU Usage</span>
                          <span className="text-white font-semibold">45%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Memory Usage</span>
                          <span className="text-white font-semibold">62%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Network I/O</span>
                          <span className="text-white font-semibold">78%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Disk Usage</span>
                          <span className="text-white font-semibold">34%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Geographic Distribution */}
                <div className="gradient-border">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center">
                      <FaGlobe className="mr-2" />
                      Geographic Distribution
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-white">North America</span>
                        </div>
                        <span className="text-gray-300">45.2%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-white">Europe</span>
                        </div>
                        <span className="text-gray-300">32.8%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-white">Asia Pacific</span>
                        </div>
                        <span className="text-gray-300">18.5%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-white">Other</span>
                        </div>
                        <span className="text-gray-300">3.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {analyticsData.insights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="analytics-card rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${
                          insight.type === 'performance' ? 'bg-blue-500/20' :
                          insight.type === 'deployment' ? 'bg-green-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          {insight.type === 'performance' ? <FaTachometerAlt className="text-blue-400" /> :
                           insight.type === 'deployment' ? <FaRocket className="text-green-400" /> :
                           <FaExclamationTriangle className="text-yellow-400" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{insight.title}</h3>
                          <p className="text-gray-300">{insight.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getImpactColor(insight.impact)}`}>
                          {insight.impact.toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {insight.confidence}% confidence
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaLightbulb className="text-yellow-400" />
                        <span className="text-white font-medium">Recommendation</span>
                      </div>
                      <p className="text-gray-300">{insight.recommendation}</p>
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                        Apply Recommendation
                      </button>
                      <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                        Learn More
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DeploymentAnalytics; 