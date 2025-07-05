import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Mermaid from 'react-mermaid2';
import { FaLightbulb, FaRegClock, FaUser, FaCheckCircle, FaProjectDiagram, FaDatabase, FaCode, FaChartLine, FaFileUpload, FaComments, FaHistory, FaPalette, FaCog, FaRocket } from 'react-icons/fa';

const initialVersionHistory = [
  { version: 1, date: '2024-06-01', desc: 'Initial model created.', status: 'completed' },
  { version: 2, date: '2024-06-02', desc: 'Added database ERD.', status: 'completed' },
  { version: 3, date: '2024-06-03', desc: 'Updated system architecture.', status: 'in-progress' },
];

const initialActivity = [
  { time: '09:00', desc: 'Created initial system diagram', icon: <FaProjectDiagram className="text-blue-400" />, type: 'diagram' },
  { time: '10:30', desc: 'Added data model entities', icon: <FaDatabase className="text-green-400" />, type: 'data' },
  { time: '11:00', desc: 'Commented on architecture', icon: <FaComments className="text-purple-400" />, type: 'comment' },
  { time: '12:00', desc: 'Updated ERD relationships', icon: <FaChartLine className="text-yellow-400" />, type: 'update' },
];

const cardClass = 'bg-gray-800/80 border border-gray-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm';

const tips = [
  'Use clear, consistent naming for entities and relationships.',
  'Keep diagrams simple and focused on key flows.',
  'Link your models to project requirements for traceability.',
  'Review and update your models as the project evolves.',
  'Use comments to collaborate and gather feedback.',
  'Consider scalability and performance in your architecture.',
  'Document assumptions and design decisions clearly.'
];

const ModellingPage = () => {
  const [mermaidCode, setMermaidCode] = useState(`graph TD
    A[User Interface] --> B[Authentication]
    B --> C[Project Management]
    C --> D[Task Management]
    D --> E[Database]
    E --> F[File Storage]
    F --> G[Notifications]`);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dataModel, setDataModel] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [versionHistory] = useState(initialVersionHistory);
  const [activity] = useState(initialActivity);
  const [tipIdx, setTipIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('diagram');
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, { text: commentInput, date: new Date().toLocaleString(), user: 'You' }]);
      setCommentInput('');
    }
  };

  const handleNextTip = () => setTipIdx((tipIdx + 1) % tips.length);

  const handleOpenMermaidViewer = () => {
    navigate('/user/mermaid-viewer', { state: { mermaidCode } });
  };

  const tabs = [
    { id: 'diagram', label: 'Diagram Editor', icon: <FaProjectDiagram /> },
    { id: 'data', label: 'Data Model', icon: <FaDatabase /> },
    { id: 'architecture', label: 'Architecture', icon: <FaCog /> },
    { id: 'files', label: 'Files', icon: <FaFileUpload /> },
    { id: 'comments', label: 'Comments', icon: <FaComments /> },
    { id: 'history', label: 'History', icon: <FaHistory /> },
  ];

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
              Modelling Phase
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Design your system's architecture with powerful diagramming tools, data modeling, and collaborative features.
          </p>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate('/user/project-architecture')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaRocket className="text-sm" />
              Back to Architecture
            </button>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Project Info & Activity */}
          <div className="lg:col-span-1 space-y-6">
            {/* Project Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center">
                  <FaProjectDiagram className="mr-2" />
                  Project Summary
                </h2>
                <div className="space-y-4">
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
                        <span className="text-gray-400">Lead:</span>
                        <span className="text-green-400 font-medium">You</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Tips Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center">
                  <FaLightbulb className="mr-2 animate-pulse" />
                  Quick Tips
                </h2>
                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-4">
                  <p className="text-gray-200 text-sm leading-relaxed mb-3">
                    {tips[tipIdx]}
                  </p>
                  <button
                    onClick={handleNextTip}
                    className="text-yellow-300 hover:text-yellow-200 text-xs font-medium transition-colors"
                  >
                    Next Tip →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center">
                  <FaRegClock className="mr-2" />
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {activity.map((a, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="mt-1">{a.icon}</div>
                      <div className="flex-1">
                        <div className="text-gray-400 text-xs">{a.time}</div>
                        <div className="text-gray-200 text-sm">{a.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="gradient-border"
            >
              <div className="p-6">
                {/* Diagram Editor Tab */}
                {activeTab === 'diagram' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center">
                      <FaProjectDiagram className="mr-2" />
                      Diagram Editor
                    </h2>
                    <div className="space-y-4">
                      <textarea
                        className="w-full border border-gray-700 bg-gray-900/80 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        rows={8}
                        value={mermaidCode}
                        onChange={e => setMermaidCode(e.target.value)}
                        placeholder="Enter Mermaid diagram code here..."
                      />
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                          Supports flowcharts, ERD, sequence diagrams, and more. 
                          <a href="https://mermaid-js.github.io/mermaid/#/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline ml-1">
                            See syntax
                          </a>
                        </div>
                        <button
                          onClick={handleOpenMermaidViewer}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Open Diagram Viewer
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Model Tab */}
                {activeTab === 'data' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center">
                      <FaDatabase className="mr-2" />
                      Data Model
                    </h2>
                    <textarea
                      className="w-full border border-gray-700 bg-gray-900/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={12}
                      value={dataModel}
                      onChange={e => setDataModel(e.target.value)}
                      placeholder="Describe your data models, entities, relationships, and database schema..."
                    />
                  </div>
                )}

                {/* Architecture Tab */}
                {activeTab === 'architecture' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center">
                      <FaCog className="mr-2" />
                      System Architecture
                    </h2>
                    <textarea
                      className="w-full border border-gray-700 bg-gray-900/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={12}
                      value={architecture}
                      onChange={e => setArchitecture(e.target.value)}
                      placeholder="Describe the system architecture, components, interactions, and technical decisions..."
                    />
                  </div>
                )}

                {/* Files Tab */}
                {activeTab === 'files' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center">
                      <FaFileUpload className="mr-2" />
                      Model Files
                    </h2>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-colors">
                        <input
                          type="file"
                          accept="image/*,.pdf,.doc,.docx"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <FaFileUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-300 mb-2">Click to upload files</p>
                          <p className="text-gray-500 text-sm">Supports images, PDFs, and documents</p>
                        </label>
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-gray-300">Uploaded Files:</h3>
                          {uploadedFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                              <span className="text-gray-300">{file.name}</span>
                              <span className="text-gray-500 text-sm">{(file.size / 1024).toFixed(1)} KB</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Comments Tab */}
                {activeTab === 'comments' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-pink-400 flex items-center">
                      <FaComments className="mr-2" />
                      Comments & Collaboration
                    </h2>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={e => setCommentInput(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 border border-gray-700 bg-gray-900/80 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          onKeyPress={e => e.key === 'Enter' && handleAddComment()}
                        />
                        <button
                          onClick={handleAddComment}
                          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300"
                        >
                          Add
                        </button>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {comments.map((comment, idx) => (
                          <div key={idx} className="p-4 bg-gray-800/50 rounded-xl">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-pink-400 font-medium">{comment.user}</span>
                              <span className="text-gray-500 text-sm">{comment.date}</span>
                            </div>
                            <p className="text-gray-300">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-orange-400 flex items-center">
                      <FaHistory className="mr-2" />
                      Version History
                    </h2>
                    <div className="space-y-3">
                      {versionHistory.map((version, idx) => (
                        <div key={idx} className="p-4 bg-gray-800/50 rounded-xl border-l-4 border-orange-500">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-orange-400 font-semibold">Version {version.version}</span>
                            <span className="text-gray-500 text-sm">{version.date}</span>
                          </div>
                          <p className="text-gray-300 mb-2">{version.desc}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            version.status === 'completed' 
                              ? 'bg-green-900/50 text-green-400' 
                              : 'bg-blue-900/50 text-blue-400'
                          }`}>
                            {version.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
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
    </div>
  );
};

export default ModellingPage; 