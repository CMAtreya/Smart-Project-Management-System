import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserShield, FaRobot, FaTable, FaCheck, FaTimes, FaHistory, FaFileExport, FaPlus, FaUsers, FaProjectDiagram, FaCalendarAlt, FaArrowLeft, FaBell, FaSort, FaFilter, FaCrown, FaChartBar, FaEdit, FaTrash, FaEye, FaDownload, FaClock, FaMapMarkerAlt, FaLightbulb } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = '/requirements';

const statusColors = {
  Pending: 'bg-blue-500',
  Approved: 'bg-green-500',
  Rejected: 'bg-red-500',
  'Clarification Needed': 'bg-yellow-500',
};

const priorityColors = {
  High: 'text-red-400',
  Medium: 'text-yellow-400',
  Low: 'text-green-400',
};

export default function AdminRequirementGathering() {
  const navigate = useNavigate();
  // State
  const [requirements, setRequirements] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [newReq, setNewReq] = useState('');
  const [newReqDescription, setNewReqDescription] = useState('');
  const [newReqPriority, setNewReqPriority] = useState('Medium');
  const [selectedReq, setSelectedReq] = useState(null);
  const [editingReq, setEditingReq] = useState(null);
  const [showAudit, setShowAudit] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showMeeting, setShowMeeting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    time: '',
    attendees: [],
    agenda: ''
  });
  const [meetings, setMeetings] = useState([
    // Example mock meetings
    { id: 1, title: 'Kickoff Meeting', date: new Date().toISOString().split('T')[0], time: '10:00', agenda: 'Project kickoff and introductions.' },
    { id: 2, title: 'Design Review', date: new Date().toISOString().split('T')[0], time: '15:00', agenda: 'Review UI/UX designs.' },
  ]);

  // Fetch requirements, stakeholders, audit logs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [reqRes, stRes, auditRes] = await Promise.all([
          axios.get(API),
          axios.get(`${API}/stakeholders`),
          axios.get(`${API}/audit`),
        ]);
        setRequirements(reqRes.data);
        setStakeholders(stRes.data);
        setAuditLogs(auditRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotification('Error loading data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // AI Extraction
  const handleAIExtract = async () => {
    if (!aiInput.trim()) return;
    try {
      setActionLoading(true);
      const res = await axios.post(`${API}/extract`, { text: aiInput });
      setAiSuggestions(res.data.requirements);
      setAiInput('');
      setNotification('AI extraction completed!');
    } catch (error) {
      console.error('AI extraction error:', error);
      setNotification('AI extraction failed');
    } finally {
      setActionLoading(false);
    }
  };

  // Add requirement (manual or from AI)
  const handleAddRequirement = async (req) => {
    setActionLoading(true);
    setTimeout(() => {
      const newRequirement = req || {
        _id: Date.now().toString(),
        title: newReq,
        description: newReqDescription,
        priority: newReqPriority,
        status: 'Pending',
        stakeholders: [],
      };
      setRequirements(prev => [...prev, newRequirement]);
      setNewReq('');
      setNewReqDescription('');
      setNewReqPriority('Medium');
      setActionLoading(false);
      setNotification('Requirement added successfully!');
    }, 500);
  };

  // Edit requirement
  const handleEditRequirement = async () => {
    setActionLoading(true);
    setTimeout(() => {
      setRequirements(prev => prev.map(r => r._id === editingReq._id ? editingReq : r));
      setEditingReq(null);
      setActionLoading(false);
      setNotification('Requirement updated successfully!');
    }, 500);
  };

  // Delete requirement
  const handleDeleteRequirement = async (id) => {
    setActionLoading(true);
    setTimeout(() => {
      setRequirements(prev => prev.filter(r => r._id !== id));
      setShowDeleteConfirm(null);
      setActionLoading(false);
      setNotification('Requirement deleted successfully!');
    }, 500);
  };

  // Approve/Reject/Clarify
  const handleApproval = async (id, status) => {
    setActionLoading(true);
    setTimeout(() => {
      setRequirements(prev => prev.map(r => r._id === id ? { ...r, status } : r));
      setActionLoading(false);
      setNotification(`Requirement ${status.toLowerCase()} successfully!`);
    }, 500);
  };

  // Prioritize
  const handlePrioritize = async (id, priority) => {
    setActionLoading(true);
    setTimeout(() => {
      setRequirements(prev => prev.map(r => r._id === id ? { ...r, priority } : r));
      setActionLoading(false);
      setNotification('Priority updated successfully!');
    }, 500);
  };

  // Add stakeholder
  const handleAddStakeholder = async (name, email, role) => {
    setActionLoading(true);
    setTimeout(() => {
      setStakeholders(prev => [...prev, { _id: Date.now().toString(), name, email, role }]);
      setActionLoading(false);
      setNotification('Stakeholder added successfully!');
    }, 500);
  };

  // Meeting scheduling
  const handleScheduleMeeting = async () => {
      setActionLoading(true);
    setTimeout(() => {
      setMeetings(prev => [
        ...prev,
        {
          id: Date.now(),
          title: meetingData.title,
          date: meetingData.date,
          time: meetingData.time,
          agenda: meetingData.agenda,
        },
      ]);
      setShowMeeting(false);
      setMeetingData({ title: '', date: '', time: '', attendees: [], agenda: '' });
      setActionLoading(false);
      setNotification('Meeting scheduled successfully!');
    }, 800);
  };

  // Export
  const handleExport = async () => {
    try {
      setActionLoading(true);
      const res = await axios.get(`${API}/export`);
      // Simulate download
      const link = document.createElement('a');
      link.href = res.data.url;
      link.download = 'requirements-export.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setNotification('Export completed!');
    } catch (error) {
      console.error('Export error:', error);
      setNotification('Export failed');
    } finally {
      setActionLoading(false);
    }
  };

  // Notification timeout
  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </>
    );
  }

  // UI
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 bg-grid-pattern pt-16 relative overflow-hidden">
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
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(139, 92, 246, 0.5) rgba(31, 41, 55, 0.3);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(31, 41, 55, 0.3);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(139, 92, 246, 0.5);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(139, 92, 246, 0.7);
          }
          .smooth-scroll {
            scroll-behavior: smooth;
          }
          .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(31, 41, 55, 0.8);
          }
        `}</style>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 w-full max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Requirement Gathering & Analysis (Admin)
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            Manage, review, and analyze project requirements with advanced admin tools and AI-powered insights.
          </p>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => navigate('/admin/projects')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Back to Projects
            </button>
            <button
              onClick={() => navigate('/admin/project-architecture')}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2"
            >
              <FaProjectDiagram className="text-sm" />
              Back to Architecture
            </button>
          </div>
        </motion.div>
        {/* Main Content Grid */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-8 mx-auto">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Project Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center">
                  <FaProjectDiagram className="mr-2" />
                  Project Summary
                </h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4">
                    <h3 className="text-xl font-semibold text-white mb-2">Smart Project Management System</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-blue-400 font-medium">In Progress</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phase:</span>
                        <span className="text-purple-400 font-medium">Requirement Gathering</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Requirements:</span>
                        <span className="text-green-400 font-medium">{requirements.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Quick Tips */}
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
                    Use AI extraction to quickly identify requirements from meeting notes and documents.
                  </p>
                  <p className="text-gray-200 text-sm leading-relaxed mb-3">
                    Collaborate with stakeholders and keep audit logs for transparency.
                  </p>
                </div>
              </div>
            </motion.div>
            {/* Today's Meetings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Today's Meetings
                </h2>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {meetings.filter(m => m.date === new Date().toISOString().split('T')[0]).length === 0 ? (
                    <div className="text-gray-400 text-sm">No meetings scheduled for today.</div>
                  ) : (
                    meetings.filter(m => m.date === new Date().toISOString().split('T')[0]).map(m => (
                      <div key={m.id} className="bg-green-900/40 rounded-lg p-3 flex flex-col">
                        <span className="text-white font-semibold">{m.title}</span>
                        <span className="text-xs text-gray-300">{m.time}</span>
                        <span className="text-xs text-gray-400">{m.agenda}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          {/* Main Content (col-span-3) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Dashboard cards, quick actions, AI extraction, requirements table, etc. */}
            {/* Wrap each major section in a gradient-border and add framer-motion animation as in user pages */}
            {/* Example for dashboard cards: */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-border"
            >
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div className="phase-card rounded-2xl p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 shadow-xl flex flex-col items-start">
              <FaTable className="text-2xl text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-white">{requirements.length}</div>
              <div className="text-gray-300">Total Requirements</div>
            </motion.div>
                <motion.div className="phase-card rounded-2xl p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 shadow-xl flex flex-col items-start">
              <FaUsers className="text-2xl text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">{stakeholders.length}</div>
              <div className="text-gray-300">Stakeholders</div>
            </motion.div>
                <motion.div className="phase-card rounded-2xl p-6 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 shadow-xl flex flex-col items-start">
              <FaHistory className="text-2xl text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{auditLogs.length}</div>
              <div className="text-gray-300">Audit Logs</div>
            </motion.div>
          </div>
            </motion.div>
          {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="gradient-border"
            >
              <div className="p-6 flex flex-wrap gap-4">
            <button 
              onClick={() => setShowAudit(!showAudit)} 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-cyan-700 text-white font-semibold shadow-xl flex items-center gap-2"
              disabled={actionLoading}
            >
              <FaHistory /> Audit Timeline
            </button>
            <button 
              onClick={() => setShowMatrix(!showMatrix)} 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-pink-700 text-white font-semibold shadow-xl flex items-center gap-2"
              disabled={actionLoading}
            >
              <FaProjectDiagram /> Traceability Matrix
            </button>
            <button 
              onClick={() => setShowMeeting(true)} 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-700 to-emerald-700 text-white font-semibold shadow-xl flex items-center gap-2"
              disabled={actionLoading}
            >
              <FaCalendarAlt /> Schedule Meeting
            </button>
            <button 
              onClick={handleExport} 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-700 to-orange-700 text-white font-semibold shadow-xl flex items-center gap-2"
              disabled={actionLoading}
            >
              <FaDownload /> Export
            </button>
          </div>
            </motion.div>
          {/* AI Extraction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="gradient-border"
            >
              <div className="p-6 mb-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 shadow-xl phase-card max-h-64 overflow-y-auto custom-scrollbar">
            <div className="flex items-center mb-4">
              <FaRobot className="text-2xl text-cyan-400 mr-2" />
              <span className="text-lg font-bold text-white">AI Requirement Extraction</span>
            </div>
            <div className="flex gap-2 mb-2">
              <input 
                value={aiInput} 
                onChange={e => setAiInput(e.target.value)} 
                placeholder="Paste meeting notes, emails, or docs..." 
                className="flex-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-cyan-500" 
                disabled={actionLoading}
              />
              <button 
                onClick={handleAIExtract} 
                className="px-4 py-2 rounded bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition flex items-center gap-2"
                disabled={actionLoading || !aiInput.trim()}
              >
                {actionLoading ? <FaClock className="animate-spin" /> : <FaRobot />}
                Extract
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {aiSuggestions.map((s, idx) => (
                <div key={idx} className="bg-cyan-900/60 text-cyan-200 px-3 py-2 rounded-lg flex items-center gap-2">
                  <span>{s.title}</span>
                  <button 
                    onClick={() => handleAddRequirement(s)} 
                    className="ml-2 px-2 py-1 bg-cyan-700 rounded text-white text-xs hover:bg-cyan-800 transition"
                    disabled={actionLoading}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
            </motion.div>
          {/* Requirements Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="gradient-border"
            >
              <div className="p-6 mb-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 shadow-xl phase-card max-h-64 overflow-hidden">
            <div className="flex items-center mb-4">
              <FaTable className="text-2xl text-blue-400 mr-2" />
              <span className="text-lg font-bold text-white">Requirements</span>
              <button 
                onClick={() => setSelectedReq('new')} 
                className="ml-auto px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center gap-1 transition"
                disabled={actionLoading}
              >
                <FaPlus /> Add
              </button>
            </div>
            <div className="overflow-x-auto max-h-40 overflow-y-auto custom-scrollbar">
              <table className="min-w-full text-sm text-gray-200">
                <thead>
                  <tr className="bg-gray-900/80">
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Priority</th>
                    <th className="px-3 py-2">Stakeholders</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <AnimatePresence initial={false}>
                  <tbody>
                    {requirements.map(r => (
                      <motion.tr
                        key={r._id}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-gray-700 hover:bg-gray-800/60 transition"
                      >
                        <td className="px-3 py-2 font-semibold text-white">{r.title}</td>
                        <td className="px-3 py-2"><span className={`px-2 py-1 rounded ${statusColors[r.status]}`}>{r.status}</span></td>
                        <td className="px-3 py-2"><span className={`font-bold ${priorityColors[r.priority]}`}>{r.priority}</span></td>
                        <td className="px-3 py-2">{r.stakeholders?.length || 0}</td>
                        <td className="px-3 py-2 flex gap-2">
                          <button 
                            onClick={() => handleApproval(r._id, 'Approved')} 
                            className="px-2 py-1 bg-green-700 rounded text-white hover:bg-green-800 transition"
                            disabled={actionLoading}
                            title="Approve"
                          >
                            <FaCheck />
                          </button>
                          <button 
                            onClick={() => handleApproval(r._id, 'Rejected')} 
                            className="px-2 py-1 bg-red-700 rounded text-white hover:bg-red-800 transition"
                            disabled={actionLoading}
                            title="Reject"
                          >
                            <FaTimes />
                          </button>
                          <button 
                            onClick={() => handleApproval(r._id, 'Clarification Needed')} 
                            className="px-2 py-1 bg-yellow-700 rounded text-white hover:bg-yellow-800 transition"
                            disabled={actionLoading}
                            title="Request Clarification"
                          >
                            <FaHistory />
                          </button>
                          <button 
                            onClick={() => setEditingReq(r)} 
                            className="px-2 py-1 bg-blue-700 rounded text-white hover:bg-blue-800 transition"
                            disabled={actionLoading}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(r._id)} 
                            className="px-2 py-1 bg-red-600 rounded text-white hover:bg-red-700 transition"
                            disabled={actionLoading}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                          <select 
                            value={r.priority} 
                            onChange={e => handlePrioritize(r._id, e.target.value)} 
                            className="bg-gray-900 text-white border border-gray-700 rounded px-2 py-1"
                            disabled={actionLoading}
                          >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </select>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </AnimatePresence>
              </table>
            </div>
          </div>
            </motion.div>
          {/* Stakeholder Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="gradient-border"
            >
              <div className="p-6 mb-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 shadow-xl phase-card max-h-64 overflow-y-auto custom-scrollbar">
            <div className="flex items-center mb-4">
              <FaUsers className="text-2xl text-green-400 mr-2" />
              <span className="text-lg font-bold text-white">Stakeholders</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {stakeholders.map(s => (
                <div key={s._id} className="bg-green-900/60 text-green-200 px-3 py-2 rounded-lg flex flex-col items-start">
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-xs">{s.role}</span>
                  <span className="text-xs text-gray-400">{s.email}</span>
                </div>
              ))}
            </div>
            <AddStakeholderForm onAdd={handleAddStakeholder} disabled={actionLoading} />
          </div>
            </motion.div>
          {/* Add Requirement Modal */}
          <AnimatePresence>
            {selectedReq === 'new' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-4">Add Requirement</h2>
                  <input 
                    value={newReq} 
                    onChange={e => setNewReq(e.target.value)} 
                    placeholder="Title" 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none" 
                      disabled={actionLoading}
                  />
                  <textarea 
                    value={newReqDescription} 
                    onChange={e => setNewReqDescription(e.target.value)} 
                    placeholder="Description" 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none h-20 resize-none" 
                      disabled={actionLoading}
                  />
                  <select 
                    value={newReqPriority} 
                    onChange={e => setNewReqPriority(e.target.value)} 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                      disabled={actionLoading}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setSelectedReq(null)} 
                      className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button 
                        onClick={async () => { await handleAddRequirement(); setSelectedReq(null); }} 
                      className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition flex items-center gap-2"
                      disabled={actionLoading || !newReq.trim()}
                    >
                      {actionLoading ? <FaClock className="animate-spin" /> : <FaPlus />}
                        {actionLoading ? 'Adding...' : 'Add'}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Edit Requirement Modal */}
          <AnimatePresence>
            {editingReq && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-4">Edit Requirement</h2>
                  <input 
                    value={editingReq.title} 
                    onChange={e => setEditingReq({...editingReq, title: e.target.value})} 
                    placeholder="Title" 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none" 
                  />
                  <textarea 
                    value={editingReq.description} 
                    onChange={e => setEditingReq({...editingReq, description: e.target.value})} 
                    placeholder="Description" 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none h-20 resize-none" 
                  />
                  <select 
                    value={editingReq.priority} 
                    onChange={e => setEditingReq({...editingReq, priority: e.target.value})} 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setEditingReq(null)} 
                      className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleEditRequirement} 
                      className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition flex items-center gap-2"
                      disabled={actionLoading || !editingReq.title.trim()}
                    >
                      {actionLoading ? <FaClock className="animate-spin" /> : <FaEdit />}
                      Update
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
                  <p className="text-gray-300 mb-6">Are you sure you want to delete this requirement? This action cannot be undone.</p>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setShowDeleteConfirm(null)} 
                      className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => handleDeleteRequirement(showDeleteConfirm)} 
                      className="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-800 transition flex items-center gap-2"
                      disabled={actionLoading}
                    >
                      {actionLoading ? <FaClock className="animate-spin" /> : <FaTrash />}
                      Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Meeting Scheduling Modal */}
          <AnimatePresence>
            {showMeeting && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaCalendarAlt /> Schedule Meeting
                  </h2>
                  <input 
                    value={meetingData.title} 
                    onChange={e => setMeetingData({...meetingData, title: e.target.value})} 
                    placeholder="Meeting Title" 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none" 
                  />
                  <input 
                    type="date"
                    value={meetingData.date} 
                    onChange={e => setMeetingData({...meetingData, date: e.target.value})} 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none" 
                  />
                  <input 
                    type="time"
                    value={meetingData.time} 
                    onChange={e => setMeetingData({...meetingData, time: e.target.value})} 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none" 
                  />
                  <textarea 
                    value={meetingData.agenda} 
                    onChange={e => setMeetingData({...meetingData, agenda: e.target.value})} 
                    placeholder="Meeting Agenda" 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none h-20 resize-none" 
                  />
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setShowMeeting(false)} 
                      className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
                      disabled={actionLoading}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleScheduleMeeting} 
                      className="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800 transition flex items-center gap-2"
                      disabled={actionLoading || !meetingData.title || !meetingData.date || !meetingData.time}
                    >
                      {actionLoading ? <FaClock className="animate-spin" /> : <FaCalendarAlt />}
                      Schedule
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Audit Timeline Modal */}
          <AnimatePresence>
            {showAudit && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl shadow-xl overflow-y-auto max-h-[80vh]">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaHistory /> Audit Timeline
                  </h2>
                  <ul className="space-y-3">
                    {auditLogs.map((log, idx) => (
                      <li key={idx} className="bg-gray-800/80 rounded-lg px-4 py-3 flex flex-col">
                        <span className="text-white font-semibold">{log.action}</span>
                        <span className="text-xs text-gray-400">{log.user?.name || 'System'} - {new Date(log.date).toLocaleString()}</span>
                        <span className="text-xs text-gray-300">{log.details}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-end mt-6">
                    <button 
                      onClick={() => setShowAudit(false)} 
                      className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Traceability Matrix Modal */}
          <AnimatePresence>
            {showMatrix && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl shadow-xl overflow-y-auto max-h-[80vh]">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaProjectDiagram /> Traceability Matrix
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-200">
                      <thead>
                        <tr className="bg-gray-900/80">
                          <th className="px-3 py-2">Requirement</th>
                          <th className="px-3 py-2">Linked Tasks</th>
                          <th className="px-3 py-2">Test Cases</th>
                          <th className="px-3 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requirements.map(r => (
                          <tr key={r._id} className="border-b border-gray-700">
                            <td className="px-3 py-2 font-semibold text-white">{r.title}</td>
                            <td className="px-3 py-2">
                              <span className="px-2 py-1 bg-blue-700/50 rounded text-xs">Task-001</span>
                            </td>
                            <td className="px-3 py-2">
                              <span className="px-2 py-1 bg-green-700/50 rounded text-xs">TC-001</span>
                            </td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-1 rounded text-xs ${statusColors[r.status]}`}>{r.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button 
                      onClick={() => setShowMatrix(false)} 
                      className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Notification Toast */}
          <AnimatePresence>
            {notification && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 30 }} 
                className="fixed bottom-8 right-8 bg-black/80 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2"
              >
                <FaBell className="text-yellow-400" />
                <span>{notification}</span>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

// Add Stakeholder Form
function AddStakeholderForm({ onAdd, disabled }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && role) {
      onAdd(name, email, role);
      setName('');
      setEmail('');
      setRole('');
    }
  };

  return (
    <form className="flex gap-2 mt-2" onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Name" 
        className="px-2 py-1 rounded bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none" 
        required 
        disabled={disabled}
      />
      <input 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email" 
        className="px-2 py-1 rounded bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none" 
        required 
        disabled={disabled}
      />
      <input 
        value={role} 
        onChange={e => setRole(e.target.value)} 
        placeholder="Role" 
        className="px-2 py-1 rounded bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none" 
        required 
        disabled={disabled}
      />
      <button 
        type="submit" 
        className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition flex items-center gap-1"
        disabled={disabled || !name || !email || !role}
      >
        {disabled ? <FaClock className="animate-spin" /> : <FaPlus />}
        {disabled ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
} 