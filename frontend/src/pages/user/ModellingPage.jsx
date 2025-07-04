import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Mermaid from 'react-mermaid2';
import { FaLightbulb, FaRegClock, FaUser, FaCheckCircle, FaProjectDiagram } from 'react-icons/fa';

const initialVersionHistory = [
  { version: 1, date: '2024-06-01', desc: 'Initial model created.' },
  { version: 2, date: '2024-06-02', desc: 'Added database ERD.' },
];

const initialActivity = [
  { time: '09:00', desc: 'Created initial system diagram', icon: <FaProjectDiagram className="text-blue-400" /> },
  { time: '10:30', desc: 'Added data model entities', icon: <FaCheckCircle className="text-green-400" /> },
  { time: '11:00', desc: 'Commented on architecture', icon: <FaUser className="text-purple-400" /> },
];

const cardClass =
  'bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border border-gray-700';

const tips = [
  'Use clear, consistent naming for entities and relationships.',
  'Keep diagrams simple and focused on key flows.',
  'Link your models to project requirements for traceability.',
  'Review and update your models as the project evolves.',
  'Use comments to collaborate and gather feedback.'
];

const ModellingPage = () => {
  const [mermaidCode, setMermaidCode] = useState('graph TD\n    A[Start] --> B[Design]\n    B --> C[Develop]\n    C --> D[Test]\n    D --> E[Deploy]');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dataModel, setDataModel] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [versionHistory] = useState(initialVersionHistory);
  const [activity] = useState(initialActivity);
  const [tipIdx, setTipIdx] = useState(0);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, { text: commentInput, date: new Date().toLocaleString() }]);
      setCommentInput('');
    }
  };

  const handleNextTip = () => setTipIdx((tipIdx + 1) % tips.length);

  const handleOpenMermaidViewer = () => {
    navigate('/user/mermaid-viewer', { state: { mermaidCode } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-10">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-purple-400">Modelling (Waterfall Phase)</h1>
          <button
            onClick={() => navigate('/user/projectarch')}
            className="text-blue-400 hover:underline text-lg flex items-center gap-1"
            title="Back to Project Architecture"
          >
            <FaRegClock className="inline-block mr-1" /> Back
          </button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 text-gray-300 text-lg max-w-2xl"
        >
          Define your system's structure and design using diagrams, data models, and architecture descriptions. Collaborate, comment, and track changes—all in one place!
        </motion.p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Widgets and Diagram Editor */}
          <div className="w-full md:w-1/3">
            {/* Project Summary Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Project Summary</h2>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Smart Project Management System</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <p className="text-blue-400">In Progress</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Phase:</span>
                    <p className="text-yellow-400">Modelling</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Lead:</span>
                    <p className="text-green-400">You</p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Quick Tips/AI Suggestions Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6"
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center"><FaLightbulb className="mr-2 animate-pulse" /> Quick Tip</h2>
              <div className="text-gray-200 text-base mb-2 min-h-[40px]">{tips[tipIdx]}</div>
              <button
                className="text-xs text-yellow-300 hover:underline mt-2 self-end"
                onClick={handleNextTip}
              >Next Tip</button>
            </motion.div>
            {/* Recent Activity Timeline Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center"><FaRegClock className="mr-2" /> Recent Activity</h2>
              <ul className="text-sm text-gray-300 space-y-2">
                {activity.map((a, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-gray-400">{a.time}</span>
                    {a.icon}
                    <span>{a.desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right column - Diagram Editor, Uploads, Data Model, Architecture, Comments, Version History */}
          <div className="w-full md:w-2/3">
            {/* Mermaid Diagram Editor (input only, no output here) */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Diagram Code (Mermaid.js)</h2>
              <textarea
                className="w-full border border-gray-700 bg-gray-900 rounded px-3 py-2 mb-2 font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={4}
                value={mermaidCode}
                onChange={e => setMermaidCode(e.target.value)}
                placeholder="Enter Mermaid diagram code here..."
              />
              <div className="flex justify-end mb-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm"
                  onClick={handleOpenMermaidViewer}
                  title="Open diagram in a new page with comments and preview"
                >
                  Open Diagram in New Page
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-1">Supports flowcharts, ERD, sequence diagrams, and more. <a href="https://mermaid-js.github.io/mermaid/#/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">See syntax</a>.</div>
            </motion.section>

            {/* Upload Diagrams */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Model Files</h2>
              <input type="file" accept="image/*,.pdf" multiple onChange={handleFileUpload} className="mb-2" />
              <ul className="mt-2 text-sm text-gray-400">
                {uploadedFiles.length === 0 ? (
                  <li className="italic text-gray-500">No files uploaded yet.</li>
                ) : (
                  uploadedFiles.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))
                )}
              </ul>
            </motion.section>

            {/* Data Model */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Define Data Models</h2>
              <textarea
                className="w-full border border-gray-700 bg-gray-900 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={3}
                value={dataModel}
                onChange={e => setDataModel(e.target.value)}
                placeholder="Describe your data models, entities, and relationships..."
              />
            </motion.section>

            {/* System Architecture */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">System Architecture</h2>
              <textarea
                className="w-full border border-gray-700 bg-gray-900 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={3}
                value={architecture}
                onChange={e => setArchitecture(e.target.value)}
                placeholder="Describe the system architecture, components, and interactions..."
              />
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModellingPage; 