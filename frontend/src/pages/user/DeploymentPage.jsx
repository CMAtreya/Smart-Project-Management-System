import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { 
  FaRocket, FaServer, FaGlobe, FaShieldAlt, FaChartLine, FaCog, 
  FaPlay, FaPause, FaStop, FaSync, FaCheck, FaTimes, FaExclamationTriangle,
  FaEye, FaEyeSlash, FaDownload, FaUpload, FaCode, FaDatabase, FaNetworkWired,
  FaCloud, FaLock, FaUnlock, FaHistory, FaClock, FaUser, FaUsers, FaBell,
  FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight,
  FaTerminal, FaFileCode, FaBug, FaLightbulb, FaRobot, FaStar,
  FaBrain, FaUndo, FaDollarSign
} from 'react-icons/fa';

const DeploymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showProviderConfig, setShowProviderConfig] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [deploymentStatus, setDeploymentStatus] = useState('idle');
  const [selectedEnvironment, setSelectedEnvironment] = useState('production');
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [deploymentHistory, setDeploymentHistory] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [securityAlerts, setSecurityAlerts] = useState([]);
  const [autoDeploy, setAutoDeploy] = useState(false);

  // Mock data for demonstration
  const environments = [
    { id: 'development', name: 'Development', status: 'running', url: 'https://dev.example.com', color: 'green' },
    { id: 'staging', name: 'Staging', status: 'running', url: 'https://staging.example.com', color: 'yellow' },
    { id: 'production', name: 'Production', status: 'running', url: 'https://example.com', color: 'blue' },
    { id: 'testing', name: 'Testing', status: 'stopped', url: 'https://test.example.com', color: 'red' }
  ];

  const deploymentProviders = [
    { 
      name: 'Vercel', 
      icon: <FaRocket />, 
      status: 'connected', 
      color: 'black',
      url: 'https://vercel.com',
      description: 'Deploy frontend apps with zero configuration',
      features: ['Auto-deploy', 'Edge Functions', 'Analytics']
    },
    { 
      name: 'Netlify', 
      icon: <FaCloud />, 
      status: 'connected', 
      color: 'green',
      url: 'https://netlify.com',
      description: 'Build, deploy, and manage modern web projects',
      features: ['Form Handling', 'Serverless Functions', 'CDN']
    },
    { 
      name: 'AWS', 
      icon: <FaServer />, 
      status: 'available', 
      color: 'orange',
      url: 'https://aws.amazon.com',
      description: 'Comprehensive cloud computing platform',
      features: ['EC2', 'Lambda', 'S3', 'CloudFront']
    },
    { 
      name: 'Google Cloud', 
      icon: <FaGlobe />, 
      status: 'available', 
      color: 'blue',
      url: 'https://cloud.google.com',
      description: 'Enterprise-ready cloud platform',
      features: ['Compute Engine', 'Cloud Functions', 'App Engine']
    },
    { 
      name: 'Azure', 
      icon: <FaCloud />, 
      status: 'available', 
      color: 'blue',
      url: 'https://azure.microsoft.com',
      description: 'Microsoft\'s cloud computing platform',
      features: ['Virtual Machines', 'Functions', 'App Service']
    },
    { 
      name: 'Docker', 
      icon: <FaCode />, 
      status: 'connected', 
      color: 'blue',
      url: 'https://docker.com',
      description: 'Containerization platform for applications',
      features: ['Containers', 'Docker Hub', 'Docker Compose']
    },
    { 
      name: 'Heroku', 
      icon: <FaRocket />, 
      status: 'available', 
      color: 'purple',
      url: 'https://heroku.com',
      description: 'Cloud platform for deploying applications',
      features: ['Easy Deploy', 'Add-ons', 'Scaling']
    },
    { 
      name: 'DigitalOcean', 
      icon: <FaServer />, 
      status: 'available', 
      color: 'blue',
      url: 'https://digitalocean.com',
      description: 'Cloud infrastructure for developers',
      features: ['Droplets', 'App Platform', 'Kubernetes']
    }
  ];

  useEffect(() => {
    if (location.state && location.state.projectId) {
      setProjectId(location.state.projectId);
    }
    
    // Simulate loading deployment data
    setTimeout(() => {
      setDeploymentHistory([
        { id: 1, version: 'v1.2.0', environment: 'production', status: 'success', timestamp: '2024-01-15 14:30', duration: '2m 15s', user: 'John Doe' },
        { id: 2, version: 'v1.1.5', environment: 'staging', status: 'success', timestamp: '2024-01-14 16:45', duration: '1m 45s', user: 'Jane Smith' },
        { id: 3, version: 'v1.1.4', environment: 'production', status: 'failed', timestamp: '2024-01-13 10:20', duration: '0m 30s', user: 'Mike Johnson' }
      ]);
      
      setPerformanceMetrics({
        uptime: 99.9,
        responseTime: 245,
        errorRate: 0.1,
        throughput: 1250,
        cpuUsage: 45,
        memoryUsage: 62
      });
      
      setSecurityAlerts([
        { id: 1, type: 'warning', message: 'SSL certificate expires in 30 days', severity: 'medium' },
        { id: 2, type: 'info', message: 'Security scan completed successfully', severity: 'low' }
      ]);
      
      setAiRecommendations([
        { id: 1, type: 'performance', message: 'Consider enabling CDN for better global performance', priority: 'high' },
        { id: 2, type: 'security', message: 'Update dependencies to patch security vulnerabilities', priority: 'medium' },
        { id: 3, type: 'cost', message: 'Right-size your instances to reduce costs by 15%', priority: 'low' }
      ]);
    }, 1000);
  }, [location]);

  const handleDeploy = (environment) => {
    setDeploymentStatus('deploying');
    setTimeout(() => {
      setDeploymentStatus('success');
      setTimeout(() => setDeploymentStatus('idle'), 3000);
    }, 3000);
  };

  const handleRollback = () => {
    setDeploymentStatus('rolling-back');
    setTimeout(() => {
      setDeploymentStatus('success');
      setTimeout(() => setDeploymentStatus('idle'), 2000);
    }, 2000);
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
        .deployment-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        .swiper-pagination-bullet {
          background: rgba(59, 130, 246, 0.5) !important;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #3b82f6 !important;
        }
      `}</style>
      
      <div className="pt-16 min-h-screen flex flex-col items-center py-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Deployment Phase
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Deploy your applications with confidence using AI-powered recommendations, real-time monitoring, and automated security checks.
          </p>
          <div className="flex justify-center mt-6 gap-4 flex-wrap">
            <button
              onClick={() => navigate('/user/project-architecture')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaRocket className="text-sm" />
              Back to Architecture
            </button>
            <button
              onClick={() => navigate('/user/deployment-predictor')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaBrain className="text-sm" />
              AI Predictor
            </button>
            <button
              onClick={() => navigate('/user/deployment-templates')}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaCode className="text-sm" />
              Templates
            </button>
            <button
              onClick={() => navigate('/user/smart-rollback')}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaUndo className="text-sm" />
              Smart Rollback
            </button>
            <button
              onClick={() => navigate('/user/cost-optimization')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaDollarSign className="text-sm" />
              Cost Optimization
            </button>
            <button
              onClick={() => navigate('/user/deployment-analytics')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaChartLine className="text-sm" />
              Analytics
            </button>
          </div>
        </motion.div>

        {/* Main Content Grid - Original Layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Sidebar - Fixed Elements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Deploy Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-pink-400 flex items-center">
                  <FaRocket className="mr-2" />
                  Quick Deploy
                </h2>
                <div className="space-y-4">
                  <select
                    value={selectedEnvironment}
                    onChange={(e) => setSelectedEnvironment(e.target.value)}
                    className="w-full bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    {environments.map(env => (
                      <option key={env.id} value={env.id}>{env.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDeploy(selectedEnvironment)}
                    disabled={deploymentStatus !== 'idle'}
                    className={`w-full py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      deploymentStatus === 'idle'
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {deploymentStatus === 'deploying' ? (
                      <>
                        <FaSync className="animate-spin" />
                        Deploying...
                      </>
                    ) : deploymentStatus === 'success' ? (
                      <>
                        <FaCheck />
                        Deployed Successfully!
                      </>
                    ) : (
                      <>
                        <FaPlay />
                        Deploy Now
                      </>
                    )}
                  </button>
                  {deploymentStatus === 'success' && (
                    <button
                      onClick={handleRollback}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaHistory />
                      Rollback
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Security Status Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center">
                  <FaShieldAlt className="mr-2" />
                  Security Status
                </h2>
                <div className="space-y-3">
                  {securityAlerts.map((alert, idx) => (
                    <div key={alert.id} className="p-3 bg-gray-800/50 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-200">{alert.message}</p>
                          <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                            alert.severity === 'high' ? 'bg-red-900/50 text-red-400' :
                            alert.severity === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
                            'bg-green-900/50 text-green-400'
                          }`}>
                            {alert.severity}
                          </span>
                        </div>
                        <FaBell className="text-green-400 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>


          </div>

          {/* Main Content Area - Overview with Carousel */}
          <div className="lg:col-span-3">
            <div className="gradient-border h-full">
              <div className="p-6 h-full flex flex-col">
                <h2 className="text-2xl font-bold text-pink-400 flex items-center mb-6">
                  <FaRocket className="mr-2" />
                  Overview
                </h2>
                
                {/* Swiper Carousel for Overview Elements - Fixed Height */}
                <div className="flex-1 overflow-hidden">
                  <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={32}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                      1024: { slidesPerView: 2 },
                      768: { slidesPerView: 1 },
                    }}
                    className="h-full"
                    style={{ height: '400px' }}
                  >
                  {/* Performance Metrics Card */}
                  <SwiperSlide>
                    <div className="deployment-card p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <FaChartLine className="mr-2" />
                        Performance Metrics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">Uptime</p>
                          <p className="text-2xl font-bold text-green-400">{performanceMetrics.uptime}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">Response Time</p>
                          <p className="text-2xl font-bold text-blue-400">{performanceMetrics.responseTime}ms</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">Error Rate</p>
                          <p className="text-2xl font-bold text-red-400">{performanceMetrics.errorRate}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">Throughput</p>
                          <p className="text-2xl font-bold text-purple-400">{performanceMetrics.throughput}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Environment Status Card */}
                  <SwiperSlide>
                    <div className="deployment-card p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <FaServer className="mr-2" />
                        Environment Status
                      </h3>
                      <div className="space-y-3">
                        {environments.map((env) => (
                          <div key={env.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                              <h4 className="font-semibold text-white">{env.name}</h4>
                              <p className="text-gray-400 text-sm">{env.url}</p>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${
                              env.status === 'running' ? 'bg-green-400' : 'bg-red-400'
                            }`}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Quick Platform Links Card */}
                  <SwiperSlide>
                    <div className="deployment-card p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <FaGlobe className="mr-2" />
                        Cloud Platforms
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {deploymentProviders.slice(0, 4).map((provider) => (
                          <motion.a
                            key={provider.name}
                            href={provider.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
                          >
                            <div className="text-xl text-blue-400 group-hover:text-blue-300 mb-1">
                              {provider.icon}
                            </div>
                            <p className="text-sm font-medium text-white group-hover:text-blue-300">
                              {provider.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {provider.status}
                            </p>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* AI Insights Card */}
                  <SwiperSlide>
                    <div className="deployment-card p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <FaRobot className="mr-2" />
                        AI Insights
                      </h3>
                      <div className="space-y-3">
                        {aiRecommendations.map((rec, idx) => (
                          <div key={rec.id} className="p-3 bg-gray-800/50 rounded-lg border-l-4 border-purple-500">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm text-gray-200">{rec.message}</p>
                                <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                                  rec.priority === 'high' ? 'bg-red-900/50 text-red-400' :
                                  rec.priority === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
                                  'bg-green-900/50 text-green-400'
                                }`}>
                                  {rec.priority} priority
                                </span>
                              </div>
                              <FaLightbulb className="text-purple-400 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Recent Deployments Card */}
                  <SwiperSlide>
                    <div className="deployment-card p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <FaHistory className="mr-2" />
                        Recent Deployments
                      </h3>
                      <div className="space-y-3">
                        {deploymentHistory.map((deployment) => (
                          <div key={deployment.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                              <p className="text-white font-medium">{deployment.version}</p>
                              <p className="text-gray-400 text-sm">{deployment.environment}</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                deployment.status === 'success' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                              }`}>
                                {deployment.status}
                              </span>
                              <p className="text-xs text-gray-400 mt-1">{deployment.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Configuration Modal */}
        <AnimatePresence>
          {showProviderConfig && selectedProvider && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowProviderConfig(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900/95 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl text-blue-400">
                      {selectedProvider.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Configure {selectedProvider.name}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Set up deployment settings and preferences
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProviderConfig(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* API Configuration */}
                  <div className="deployment-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FaLock className="mr-2" />
                      API Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          API Key
                        </label>
                        <input
                          type="password"
                          placeholder="Enter your API key"
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Project ID
                        </label>
                        <input
                          type="text"
                          placeholder="Enter project identifier"
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Deployment Settings */}
                  <div className="deployment-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FaCog className="mr-2" />
                      Deployment Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Auto Deploy</h4>
                          <p className="text-sm text-gray-400">Deploy automatically on push to main branch</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Environment Variables</h4>
                          <p className="text-sm text-gray-400">Include environment variables in deployment</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Build Optimization</h4>
                          <p className="text-sm text-gray-400">Enable advanced build optimizations</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="deployment-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FaBell className="mr-2" />
                      Notification Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="deploy-success" className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="deploy-success" className="text-sm text-gray-300">
                          Deploy Success Notifications
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="deploy-failure" className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="deploy-failure" className="text-sm text-gray-300">
                          Deploy Failure Alerts
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="performance-alerts" className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="performance-alerts" className="text-sm text-gray-300">
                          Performance Alerts
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowProviderConfig(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowProviderConfig(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    Save Configuration
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeploymentPage; 