import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, FaBrain, FaChartLine, FaExclamationTriangle, FaCheck, 
  FaTimes, FaClock, FaCode, FaDatabase, FaServer, FaShieldAlt,
  FaLightbulb, FaArrowLeft, FaPlay, FaPause, FaSync, FaEye,
  FaDownload, FaUpload, FaCog, FaHistory, FaStar, FaArrowUp, FaGithub
} from 'react-icons/fa';

const DeploymentPredictor = () => {
  const navigate = useNavigate();
  const [analysisStatus, setAnalysisStatus] = useState('idle');
  const [predictionData, setPredictionData] = useState(null);
  const [codeMetrics, setCodeMetrics] = useState({});
  const [riskFactors, setRiskFactors] = useState([]);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Mock AI analysis data
  const mockAnalysis = {
    successProbability: 87,
    riskLevel: 'low',
    estimatedDeployTime: '2m 15s',
    confidenceScore: 92,
    codeQuality: 85,
    performanceScore: 78,
    securityScore: 91,
    complexityScore: 65,
    riskFactors: [
      { id: 1, type: 'warning', message: 'Large bundle size detected (2.1MB)', impact: 'medium', suggestion: 'Enable code splitting' },
      { id: 2, type: 'info', message: 'Database queries optimized', impact: 'positive', suggestion: 'No action needed' },
      { id: 3, type: 'error', message: 'Security vulnerability in dependencies', impact: 'high', suggestion: 'Update packages immediately' }
    ],
    optimizationSuggestions: [
      { id: 1, type: 'performance', title: 'Enable Gzip Compression', impact: 'High', effort: 'Low', description: 'Reduce bundle size by 40%' },
      { id: 2, type: 'security', title: 'Update React to v18.2.0', impact: 'Medium', effort: 'Medium', description: 'Fix 3 security vulnerabilities' },
      { id: 3, type: 'performance', title: 'Implement Lazy Loading', impact: 'High', effort: 'High', description: 'Improve initial load time by 60%' }
    ]
  };

  const handleAnalyze = () => {
    setAnalysisStatus('analyzing');
    // Simulate AI analysis
    setTimeout(() => {
      setPredictionData(mockAnalysis);
      setRiskFactors(mockAnalysis.riskFactors);
      setOptimizationSuggestions(mockAnalysis.optimizationSuggestions);
      setAnalysisStatus('completed');
    }, 3000);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-green-400';
      case 'low': return 'text-blue-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
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
        .prediction-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        .ai-glow {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI Deployment Predictor
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Advanced AI-powered analysis to predict deployment success, identify risks, and optimize your deployment strategy.
          </p>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => navigate('/user/deployment')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Back to Deployment
            </button>
            <button
              onClick={() => navigate('/user/deployment-templates')}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaCog className="text-sm" />
              Deployment Templates
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Analysis Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Analysis Trigger */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center">
                  <FaBrain className="mr-2" />
                  AI Analysis
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h3 className="font-semibold text-white mb-2">Code Analysis</h3>
                    <p className="text-sm text-gray-300 mb-3">
                      Upload your code or connect your repository for AI-powered analysis
                    </p>
                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <FaUpload />
                        Upload Code
                      </button>
                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <FaGithub />
                        Connect GitHub
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={analysisStatus === 'analyzing'}
                    className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                      analysisStatus === 'analyzing'
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                    }`}
                  >
                    {analysisStatus === 'analyzing' ? (
                      <>
                        <FaSync className="animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FaBrain />
                        Start AI Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Real-time Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center">
                  <FaChartLine className="mr-2" />
                  Code Metrics
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Code Quality</span>
                    <span className="text-green-400 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Performance</span>
                    <span className="text-yellow-400 font-semibold">78%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Security</span>
                    <span className="text-green-400 font-semibold">91%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Complexity</span>
                    <span className="text-blue-400 font-semibold">65%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Prediction Results */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {analysisStatus === 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="gradient-border"
                >
                  <div className="p-8 text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <h2 className="text-2xl font-bold text-white mb-4">Ready for AI Analysis</h2>
                    <p className="text-gray-300 mb-6">
                      Upload your code or connect your repository to get AI-powered deployment predictions, risk assessment, and optimization suggestions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <FaBrain className="text-purple-400 text-2xl mb-2" />
                        <h3 className="font-semibold text-white mb-1">Success Prediction</h3>
                        <p className="text-sm text-gray-300">AI predicts deployment success probability</p>
                      </div>
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <FaExclamationTriangle className="text-yellow-400 text-2xl mb-2" />
                        <h3 className="font-semibold text-white mb-1">Risk Assessment</h3>
                        <p className="text-sm text-gray-300">Identify potential deployment risks</p>
                      </div>
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <FaLightbulb className="text-blue-400 text-2xl mb-2" />
                        <h3 className="font-semibold text-white mb-1">Optimization</h3>
                        <p className="text-sm text-gray-300">Get AI-powered optimization suggestions</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {analysisStatus === 'analyzing' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="gradient-border"
                >
                  <div className="p-8 text-center">
                    <div className="text-6xl mb-4 animate-pulse">🧠</div>
                    <h2 className="text-2xl font-bold text-white mb-4">AI Analysis in Progress</h2>
                    <p className="text-gray-300 mb-6">
                      Our AI is analyzing your code, checking for potential issues, and generating deployment predictions...
                    </p>
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <FaCode />
                        Analyzing code structure...
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <FaDatabase />
                        Checking dependencies...
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <FaShieldAlt />
                        Security assessment...
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {analysisStatus === 'completed' && predictionData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Success Prediction */}
                  <div className="gradient-border ai-glow">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-6 text-green-400 flex items-center">
                        <FaArrowUp className="mr-2" />
                        Deployment Success Prediction
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="text-6xl font-bold text-green-400 mb-2">
                            {predictionData.successProbability}%
                          </div>
                          <p className="text-gray-300">Success Probability</p>
                          <div className="mt-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(predictionData.riskLevel)}`}>
                              {predictionData.riskLevel.toUpperCase()} RISK
                            </span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Estimated Deploy Time</span>
                            <span className="text-white font-semibold">{predictionData.estimatedDeployTime}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Confidence Score</span>
                            <span className="text-blue-400 font-semibold">{predictionData.confidenceScore}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">AI Recommendation</span>
                            <span className="text-green-400 font-semibold">Ready to Deploy</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div className="gradient-border">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
                        <FaExclamationTriangle className="mr-2" />
                        Risk Assessment
                      </h2>
                      <div className="space-y-4">
                        {riskFactors.map((risk) => (
                          <div key={risk.id} className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-yellow-500">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-white font-medium">{risk.message}</p>
                                <p className="text-sm text-gray-300 mt-1">{risk.suggestion}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(risk.impact)}`}>
                                {risk.impact.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Optimization Suggestions */}
                  <div className="gradient-border">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center">
                        <FaLightbulb className="mr-2" />
                        AI Optimization Suggestions
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {optimizationSuggestions.map((suggestion) => (
                          <div key={suggestion.id} className="p-4 bg-gray-800/50 rounded-lg border border-blue-500/30">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-white">{suggestion.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                suggestion.impact === 'High' ? 'bg-green-900/50 text-green-400' :
                                suggestion.impact === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                                'bg-blue-900/50 text-blue-400'
                              }`}>
                                {suggestion.impact} Impact
                              </span>
                            </div>
                            <p className="text-sm text-gray-300 mb-3">{suggestion.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-400">Effort: {suggestion.effort}</span>
                              <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors">
                                Apply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentPredictor; 