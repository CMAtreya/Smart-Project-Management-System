import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaProjectDiagram, FaDatabase, FaCode, FaRocket, FaChartLine, FaShieldAlt, FaPlus, FaUser, FaUsers, FaCheckCircle, FaLightbulb, FaShareAlt, FaEdit, FaTrash, FaDownload, FaEye, FaHistory, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const mockContributors = [
  { name: 'Admin', avatar: 'A' },
  { name: 'Dev Team', avatar: 'D' },
  { name: 'QA', avatar: 'Q' },
];

const mockActivity = [
  { user: 'Admin', action: 'Created new API Model', time: '2 min ago' },
  { user: 'Dev Team', action: 'Updated System Architecture', time: '10 min ago' },
  { user: 'QA', action: 'Reviewed Data Model', time: '1 hr ago' },
];

const mockModels = {
  architecture: [
    { id: 1, name: 'System Architecture v2.1', status: 'Active', updated: '2024-01-15', contributors: ['Admin', 'Dev Team'], description: 'Microservices design', icon: <FaProjectDiagram className="text-blue-400" /> },
    { id: 2, name: 'API Gateway Design', status: 'Draft', updated: '2024-01-14', contributors: ['Admin'], description: 'Gateway config', icon: <FaProjectDiagram className="text-cyan-400" /> },
  ],
  data: [
    { id: 3, name: 'Database Schema v1.0', status: 'Active', updated: '2024-01-13', contributors: ['Admin', 'QA'], description: 'ERD with constraints', icon: <FaDatabase className="text-green-400" /> },
  ],
  api: [
    { id: 4, name: 'REST API Spec', status: 'Active', updated: '2024-01-12', contributors: ['Admin', 'Dev Team'], description: 'Endpoints & docs', icon: <FaCode className="text-purple-400" /> },
  ],
  deployment: [
    { id: 5, name: 'Prod Deployment', status: 'Active', updated: '2024-01-11', contributors: ['Admin'], description: 'Infra & pipeline', icon: <FaRocket className="text-orange-400" /> },
  ],
  performance: [
    { id: 6, name: 'Load Testing', status: 'Completed', updated: '2024-01-10', contributors: ['QA'], description: 'Benchmarks', icon: <FaChartLine className="text-yellow-400" /> },
  ],
  security: [
    { id: 7, name: 'Security Model', status: 'Active', updated: '2024-01-09', contributors: ['Admin', 'QA'], description: 'Threat modeling', icon: <FaShieldAlt className="text-red-400" /> },
  ],
};

const aiInsights = [
  { id: 1, type: 'Performance', title: 'Optimize API Caching', description: 'AI detected bottlenecks in API. Consider caching.', priority: 'High', icon: <FaChartLine className="text-yellow-400" /> },
  { id: 2, type: 'Security', title: 'Enable MFA', description: 'Strengthen authentication with multi-factor.', priority: 'Medium', icon: <FaShieldAlt className="text-red-400" /> },
  { id: 3, type: 'Architecture', title: 'Scale Microservices', description: 'Implement horizontal scaling.', priority: 'Low', icon: <FaProjectDiagram className="text-blue-400" /> },
];

const tabs = [
  { id: 'architecture', label: 'Architecture', icon: <FaProjectDiagram /> },
  { id: 'data', label: 'Data Models', icon: <FaDatabase /> },
  { id: 'api', label: 'API Design', icon: <FaCode /> },
  { id: 'deployment', label: 'Deployment', icon: <FaRocket /> },
  { id: 'performance', label: 'Performance', icon: <FaChartLine /> },
  { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
];

export default function AdminModellingPage() {
  const [activeTab, setActiveTab] = useState('architecture');
  const [selectedModel, setSelectedModel] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [models, setModels] = useState(mockModels);
  const [insights, setInsights] = useState(aiInsights);
  const [activity, setActivity] = useState(mockActivity);
  const [newModel, setNewModel] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  // Executive Overview Metrics
  const totalModels = Object.values(models).reduce((sum, arr) => sum + arr.length, 0);
  const lastUpdated = Object.values(models).flat().sort((a, b) => b.updated.localeCompare(a.updated))[0]?.updated || '-';
  const contributors = Array.from(new Set(Object.values(models).flat().flatMap(m => m.contributors)));

  // AI Insight Actions
  const handleApplyInsight = (id) => {
    setInsights(insights.filter(i => i.id !== id));
    setActivity([{ user: 'Admin', action: 'Applied AI Insight', time: 'Just now' }, ...activity]);
  };
  const handleIgnoreInsight = (id) => {
    setInsights(insights.filter(i => i.id !== id));
    setActivity([{ user: 'Admin', action: 'Ignored AI Insight', time: 'Just now' }, ...activity]);
  };

  // Model Actions
  const handleCreateModel = () => {
    if (!newModel.name) return;
    const newId = Date.now();
    const model = {
      id: newId,
      name: newModel.name,
      status: 'Draft',
      updated: new Date().toISOString().split('T')[0],
      contributors: ['Admin'],
      description: newModel.description,
      icon: tabs.find(t => t.id === activeTab)?.icon,
    };
    setModels({ ...models, [activeTab]: [model, ...models[activeTab]] });
    setShowCreateModal(false);
    setNewModel({ name: '', description: '' });
    setActivity([{ user: 'Admin', action: `Created ${model.name}`, time: 'Just now' }, ...activity]);
  };
  const handleDeleteModel = (id) => {
    setModels({ ...models, [activeTab]: models[activeTab].filter(m => m.id !== id) });
    setSelectedModel(null);
    setActivity([{ user: 'Admin', action: 'Deleted a model', time: 'Just now' }, ...activity]);
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
      `}</style>
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col items-center py-10 px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Modelling Phase (Admin)
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Design, manage, and optimize your system's architecture with powerful tools, AI insights, and collaborative features.
          </p>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => navigate('/admin/project-architecture')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Back to Architecture
            </button>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-border"
            >
              <div className="p-6">
                {/* Project Summary */}
                <h2 className="text-2xl font-bold mb-2 text-purple-400 flex items-center">
                  <FaProjectDiagram className="mr-2" /> Project Summary
                </h2>
                <div className="space-y-4 mb-4">
                  <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4">
                    <h3 className="text-xl font-semibold text-white mb-2">Smart Project Management</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-blue-400 font-medium">In Progress</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phase:</span>
                        <span className="text-yellow-400 font-medium">Modelling</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Models:</span>
                        <span className="text-green-400 font-medium">{totalModels}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4 border-gray-700" />
                {/* Quick Tips */}
                <h2 className="text-2xl font-bold mb-2 text-yellow-400 flex items-center">
                  <FaLightbulb className="mr-2 animate-pulse" /> Quick Tips
                </h2>
                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-4 mb-4">
                  <p className="text-gray-200 text-sm leading-relaxed mb-3">
                    Use AI insights to optimize your models and architecture.
                  </p>
                  <p className="text-gray-200 text-sm leading-relaxed mb-3">
                    Collaborate with your team and keep track of recent changes.
                  </p>
                </div>
                <hr className="my-4 border-gray-700" />
                {/* Recent Activity */}
                <h2 className="text-2xl font-bold mb-2 text-purple-400 flex items-center">
                  <FaHistory className="mr-2" /> Recent Activity
                </h2>
                <div className="space-y-3">
                  {activity.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300">
                      <FaUser className="text-gray-500" />
                      <span className="font-semibold text-white">{a.user}</span>
                      <span>{a.action}</span>
                      <span className="ml-auto text-xs text-gray-400">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content (col-span-3) */}
          <div className="lg:col-span-3 space-y-8">
            {/* AI Insights Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center">
                  <FaLightbulb className="mr-2 animate-pulse" />
                  AI-Powered Insights
                </h2>
                <div className="flex flex-wrap gap-4">
                  {insights.length === 0 && <div className="text-gray-400">No new insights. All caught up!</div>}
                  {insights.map(insight => (
                    <motion.div key={insight.id} className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl p-4 flex-1 flex flex-col gap-2 border-l-4" style={{ borderColor: insight.priority === 'High' ? '#facc15' : insight.priority === 'Medium' ? '#f87171' : '#60a5fa' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex items-center gap-2">
                        {insight.icon}
                        <span className="font-semibold text-white">{insight.title}</span>
                        <span className={`ml-auto px-2 py-1 rounded text-xs font-bold ${insight.priority === 'High' ? 'bg-yellow-500/20 text-yellow-300' : insight.priority === 'Medium' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'}`}>{insight.priority}</span>
                      </div>
                      <div className="text-gray-300 text-sm mb-2">{insight.description}</div>
                      <div className="flex gap-2">
                        <button onClick={() => handleApplyInsight(insight.id)} className="px-3 py-1 rounded bg-green-700 text-white hover:bg-green-800 transition">Apply</button>
                        <button onClick={() => handleIgnoreInsight(insight.id)} className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-800 transition">Ignore</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Model Gallery & Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="gradient-border"
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-4 mb-4 items-center">
                  {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                  <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold flex items-center gap-2 shadow-xl hover:scale-105 transition ml-auto">
                    <FaPlus /> New Model
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence>
                    {models[activeTab].map(model => (
                      <motion.div key={model.id} className={`bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl p-6 flex flex-col gap-2 cursor-pointer border-l-4 ${model.status === 'Active' ? 'border-green-500' : model.status === 'Draft' ? 'border-yellow-500' : 'border-blue-500'}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} onClick={() => setSelectedModel(model)}>
                        <div className="flex items-center gap-2">
                          {model.icon}
                          <span className="font-bold text-white text-lg">{model.name}</span>
                          <span className={`ml-auto px-2 py-1 rounded text-xs font-bold ${model.status === 'Active' ? 'bg-green-500/20 text-green-300' : model.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}`}>{model.status}</span>
                        </div>
                        <div className="text-gray-300 text-sm">{model.description}</div>
                        <div className="flex items-center gap-2 mt-2">
                          {model.contributors.map(c => <span key={c} className="bg-gray-700 text-white rounded-full px-2 py-1 text-xs font-medium">{c}</span>)}
                          <span className="ml-auto flex gap-2">
                            <button className="p-1 rounded hover:bg-gray-800" title="View"><FaEye /></button>
                            <button className="p-1 rounded hover:bg-gray-800" title="Edit"><FaEdit /></button>
                            <button className="p-1 rounded hover:bg-gray-800" title="Share"><FaShareAlt /></button>
                            <button className="p-1 rounded hover:bg-gray-800" title="Download"><FaDownload /></button>
                            <button className="p-1 rounded hover:bg-gray-800 text-red-400" title="Delete" onClick={e => { e.stopPropagation(); handleDeleteModel(model.id); }}><FaTrash /></button>
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Live Model Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="gradient-border"
            >
              <div className="p-6 min-h-[340px]">
                {!selectedModel ? (
                  <div className="text-gray-400 flex flex-col items-center justify-center h-full">
                    <FaEye className="text-4xl mb-2" />
                    <span>Select a model to preview</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      {selectedModel.icon}
                      <span className="font-bold text-white text-lg">{selectedModel.name}</span>
                      <span className={`ml-auto px-2 py-1 rounded text-xs font-bold ${selectedModel.status === 'Active' ? 'bg-green-500/20 text-green-300' : selectedModel.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}`}>{selectedModel.status}</span>
                    </div>
                    <div className="text-gray-300 text-sm mb-2">{selectedModel.description}</div>
                    <div className="flex gap-2 mb-4">
                      <button className="px-3 py-1 rounded bg-blue-700 text-white hover:bg-blue-800 transition flex items-center gap-2"><FaDownload /> Export</button>
                      <button className="px-3 py-1 rounded bg-purple-700 text-white hover:bg-purple-800 transition flex items-center gap-2"><FaShareAlt /> Share</button>
                      <button className="px-3 py-1 rounded bg-green-700 text-white hover:bg-green-800 transition flex items-center gap-2"><FaEdit /> Open Editor</button>
                    </div>
                    <div className="bg-gray-800/80 rounded-xl p-4 text-gray-200 text-xs font-mono">
                      {/* Mock preview: could be diagram, code, or ERD */}
                      <pre>{`// Preview of ${selectedModel.name}
{
  "type": "${activeTab}",
  "description": "${selectedModel.description}"
}`}</pre>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Create New Model Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-2xl p-8 w-full max-w-md shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Create New Model</h2>
                <input value={newModel.name} onChange={e => setNewModel({ ...newModel, name: e.target.value })} placeholder="Model Name" className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none" />
                <textarea value={newModel.description} onChange={e => setNewModel({ ...newModel, description: e.target.value })} placeholder="Description" className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none h-20 resize-none" />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition">Cancel</button>
                  <button onClick={handleCreateModel} className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition flex items-center gap-2"><FaPlus /> Create</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 