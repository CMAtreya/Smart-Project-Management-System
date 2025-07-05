import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Mermaid from 'react-mermaid2';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaDownload, FaCopy, FaShareAlt, FaUserCircle, FaClock, FaUndo, FaRedo, FaSearchPlus, FaSearchMinus, FaFilePdf } from 'react-icons/fa';

const TEMPLATES = [
  {
    name: 'Flowchart',
    code: `graph TD\n    Start([Start]) --> Input{Input Valid?}\n    Input -- Yes --> Process[Process Data]\n    Input -- No --> Error[Show Error]\n    Process --> Output[Display Result]\n    Output --> End([End])\n    Error --> End`
  },
  {
    name: 'ER Diagram',
    code: `erDiagram\n    CUSTOMER ||--o{ ORDER : places\n    ORDER ||--|{ LINE_ITEM : contains\n    CUSTOMER }|..|{ DELIVERY_ADDRESS : uses\n    ORDER }|..|{ PAYMENT : paid-by\n    CUSTOMER {\n      string name\n      string email\n    }\n    ORDER {\n      int id\n      date orderDate\n    }\n    LINE_ITEM {\n      int quantity\n      float price\n    }\n    DELIVERY_ADDRESS {\n      string street\n      string city\n    }\n    PAYMENT {\n      string method\n      float amount\n    }`
  },
  {
    name: 'Sequence',
    code: `sequenceDiagram\n    participant User\n    participant App\n    participant DB\n    User->>App: Request Data\n    App->>DB: Query Data\n    DB-->>App: Return Data\n    App-->>User: Show Data`
  },
  {
    name: 'Gantt',
    code: `gantt\n    title Project Timeline\n    dateFormat  YYYY-MM-DD\n    section Planning\n    Requirements :done, req, 2024-06-01, 5d\n    Design       :active, des, 2024-06-06, 4d\n    section Development\n    Backend      :dev1, 2024-06-10, 10d\n    Frontend     :dev2, after dev1, 8d\n    section Testing\n    Unit Tests   :test1, after dev2, 4d\n    Integration  :test2, after test1, 3d`
  }
];

const MermaidViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCode = location.state?.mermaidCode || TEMPLATES[0].code;
  const [mermaidCode, setMermaidCode] = useState(initialCode);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState([initialCode]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [error, setError] = useState('');
  const diagramAreaRef = useRef(null);
  const [templateSelect, setTemplateSelect] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Undo/Redo logic
  const handleCodeChange = (code) => {
    setMermaidCode(code);
    setHistory((prev) => prev.slice(0, historyIdx + 1).concat(code));
    setHistoryIdx((idx) => idx + 1);
    setError('');
  };
  const handleUndo = () => {
    if (historyIdx > 0) {
      setMermaidCode(history[historyIdx - 1]);
      setHistoryIdx(historyIdx - 1);
      setError('');
    }
  };
  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      setMermaidCode(history[historyIdx + 1]);
      setHistoryIdx(historyIdx + 1);
      setError('');
    }
  };

  // Template insert
  const handleTemplate = (code) => {
    if (!code) return;
    setMermaidCode(code);
    setHistory((prev) => prev.slice(0, historyIdx + 1).concat(code));
    setHistoryIdx((idx) => idx + 1);
    setError('');
    setTemplateSelect('');
  };

  // Zoom
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));

  // Export as PDF (mock)
  const handleExportPDF = () => {
    alert('Export as PDF is not implemented in this mockup, but would export the diagram as a PDF.');
  };

  // Copy code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(mermaidCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Shareable link (mock)
  const shareableLink = window.location.href;

  // Syntax validation (basic)
  React.useEffect(() => {
    // Simple check for common Mermaid keywords
    if (!mermaidCode.trim()) {
      setError('Diagram code is empty.');
    } else if (!/graph|erDiagram|sequenceDiagram|gantt/.test(mermaidCode)) {
      setError('Warning: Mermaid code does not contain a recognized diagram type.');
    } else {
      setError('');
    }
  }, [mermaidCode]);

  // Comments
  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, { text: commentInput, date: new Date().toLocaleString() }]);
      setCommentInput('');
    }
  };

  // Resizable diagram area (drag bottom right corner)
  // (For simplicity, use CSS resize)

  // Helper to generate a unique key for Mermaid based on code
  const getMermaidKey = (code) => {
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      hash = ((hash << 5) - hash) + code.charCodeAt(i);
      hash |= 0;
    }
    return hash;
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
          <h1 className="text-3xl md:text-4xl font-bold text-purple-400">Diagram Viewer</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-400 hover:underline text-lg flex items-center gap-1"
            title="Back to Modelling"
          >
            <FaArrowLeft className="inline-block mr-1" /> Back
          </button>
        </motion.div>
        {/* Diagram Info & Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <FaUserCircle className="text-3xl text-blue-400" />
              <div>
                <div className="text-lg font-semibold">Author: <span className="text-white">You</span></div>
                <div className="text-sm text-gray-400 flex items-center"><FaClock className="mr-1" /> Last edited: {new Date().toLocaleString()}</div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-2 text-sm" onClick={() => handleDownload('SVG')} title="Download as SVG"><FaDownload /> SVG</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-2 text-sm" onClick={() => handleDownload('PNG')} title="Download as PNG"><FaDownload /> PNG</button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center gap-2 text-sm" onClick={handleCopyCode} title="Copy Mermaid code"><FaCopy /> {copied ? 'Copied!' : 'Copy Code'}</button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center gap-2 text-sm" onClick={() => navigator.clipboard.writeText(shareableLink)} title="Copy shareable link"><FaShareAlt /> Link</button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center gap-2 text-sm" onClick={handleExportPDF} title="Export as PDF"><FaFilePdf /> PDF</button>
            </div>
          </div>
          {/* Templates, Undo/Redo, Validation */}
          <div className="flex flex-wrap gap-2 mb-4">
            <select
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white"
              onChange={e => handleTemplate(e.target.value)}
              value={templateSelect}
            >
              <option value="">Insert Template...</option>
              {TEMPLATES.map(t => (
                <option key={t.name} value={t.code}>{t.name}</option>
              ))}
            </select>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center gap-2 text-sm" onClick={handleUndo} disabled={historyIdx === 0}><FaUndo /> Undo</button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center gap-2 text-sm" onClick={handleRedo} disabled={historyIdx === history.length - 1}><FaRedo /> Redo</button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center gap-2 text-sm" onClick={handleZoomIn}><FaSearchPlus /> Zoom In</button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center gap-2 text-sm" onClick={handleZoomOut}><FaSearchMinus /> Zoom Out</button>
          </div>
          {/* Visual template previews (select to preview, then insert) */}
          <div className="flex overflow-x-auto gap-4 pb-2 mb-4">
            {TEMPLATES.map((t) => (
              <button
                key={t.name}
                className={`min-w-[160px] bg-gray-900 border border-gray-700 rounded-xl shadow p-4 flex flex-col items-center cursor-pointer hover:border-blue-500 transition-all text-base font-semibold text-yellow-400 ${previewTemplate && previewTemplate.name === t.name ? 'border-blue-500' : ''}`}
                title={`Preview ${t.name} template`}
                onClick={() => setPreviewTemplate(t)}
              >
                {t.name}
              </button>
            ))}
          </div>
          {previewTemplate && (
            <div className="bg-gray-900 border border-blue-700 rounded-xl shadow p-6 mb-4 flex flex-col items-center">
              <div className="text-lg font-bold text-yellow-400 mb-2">{previewTemplate.name} Preview</div>
              <div className="w-full bg-gray-800 rounded p-2 flex items-center justify-center mb-4" style={{ minHeight: 120 }}>
                <Mermaid chart={previewTemplate.code} config={{ theme: 'dark' }} key={getMermaidKey(previewTemplate.code)} />
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors text-sm"
                onClick={() => handleTemplate(previewTemplate.code)}
              >
                Insert Template
              </button>
            </div>
          )}
          <textarea
            className="w-full border border-gray-700 bg-gray-900 rounded px-3 py-2 mb-2 font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-y"
            rows={4}
            value={mermaidCode}
            onChange={e => handleCodeChange(e.target.value)}
            placeholder="Edit Mermaid diagram code here..."
          />
          {error && <div className="text-sm text-yellow-400 mb-2">{error}</div>}
        </motion.section>
        {/* Diagram Output */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 rounded-xl p-6 shadow-lg mb-8 border border-blue-700"
        >
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Diagram Output</h2>
          <div
            className="bg-gray-900 border border-gray-700 rounded p-4 overflow-auto mb-2 flex justify-center"
            ref={diagramAreaRef}
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s' }}
          >
            <Mermaid chart={mermaidCode} config={{ theme: 'dark' }} key={getMermaidKey(mermaidCode)} />
          </div>
        </motion.section>
        {/* Comments */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Comments</h2>
          <div className="mb-2 flex flex-col md:flex-row md:items-center">
            <input
              className="w-full md:w-3/4 border border-gray-700 bg-gray-900 rounded px-3 py-2 mr-2 text-white mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              placeholder="Add a comment..."
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddComment}>Add</button>
          </div>
          <ul className="text-sm text-gray-300">
            {comments.length === 0 ? (
              <li className="italic text-gray-500">No comments yet.</li>
            ) : (
              comments.map((c, idx) => (
                <li key={idx} className="mb-1 border-b border-gray-700 pb-1"><span className="font-semibold">User:</span> {c.text} <span className="text-xs text-gray-500 ml-2">({c.date})</span></li>
              ))
            )}
          </ul>
        </motion.section>
      </div>
    </div>
  );
};

export default MermaidViewer; 