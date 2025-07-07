import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserShield, FaRobot, FaTable, FaCheck, FaTimes, FaHistory, FaFileExport, FaPlus, FaUsers, FaProjectDiagram, FaCalendarAlt, FaArrowLeft, FaBell, FaSort, FaFilter, FaCrown, FaChartBar, FaEdit, FaTrash, FaEye, FaDownload, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import axios from 'axios';

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
    try {
      setActionLoading(true);
      const payload = req || { 
        title: newReq, 
        description: newReqDescription, 
        priority: newReqPriority 
      };
      const res = await axios.post(API, payload);
      setRequirements([...requirements, res.data]);
      setNewReq('');
      setNewReqDescription('');
      setNewReqPriority('Medium');
      setNotification('Requirement added successfully!');
    } catch (error) {
      console.error('Add requirement error:', error);
      setNotification('Failed to add requirement');
    } finally {
      setActionLoading(false);
    }
  };

  // Edit requirement
  const handleEditRequirement = async () => {
    try {
      setActionLoading(true);
      const res = await axios.put(`${API}/${editingReq._id}`, editingReq);
      setRequirements(requirements.map(r => r._id === editingReq._id ? res.data : r));
      setEditingReq(null);
      setNotification('Requirement updated successfully!');
    } catch (error) {
      console.error('Edit requirement error:', error);
      setNotification('Failed to update requirement');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete requirement
  const handleDeleteRequirement = async (id) => {
    try {
      setActionLoading(true);
      await axios.delete(`${API}/${id}`);
      setRequirements(requirements.filter(r => r._id !== id));
      setShowDeleteConfirm(null);
      setNotification('Requirement deleted successfully!');
    } catch (error) {
      console.error('Delete requirement error:', error);
      setNotification('Failed to delete requirement');
    } finally {
      setActionLoading(false);
    }
  };

  // Approve/Reject/Clarify
  const handleApproval = async (id, status) => {
    try {
      setActionLoading(true);
      await axios.post(`${API}/${id}/approve`, { userId: 'admin', status });
      setRequirements(requirements.map(r => r._id === id ? { ...r, status } : r));
      setNotification(`Requirement ${status.toLowerCase()} successfully!`);
    } catch (error) {
      console.error('Approval error:', error);
      setNotification('Failed to update approval status');
    } finally {
      setActionLoading(false);
    }
  };

  // Prioritize
  const handlePrioritize = async (id, priority) => {
    try {
      setActionLoading(true);
      await axios.post(`${API}/${id}/prioritize`, { priority });
      setRequirements(requirements.map(r => r._id === id ? { ...r, priority } : r));
      setNotification('Priority updated successfully!');
    } catch (error) {
      console.error('Prioritize error:', error);
      setNotification('Failed to update priority');
    } finally {
      setActionLoading(false);
    }
  };

  // Add stakeholder
  const handleAddStakeholder = async (name, email, role) => {
    try {
      setActionLoading(true);
      const res = await axios.post(`${API}/stakeholders`, { name, email, role });
      setStakeholders([...stakeholders, res.data]);
      setNotification('Stakeholder added successfully!');
    } catch (error) {
      console.error('Add stakeholder error:', error);
      setNotification('Failed to add stakeholder');
    } finally {
      setActionLoading(false);
    }
  };

  // Meeting scheduling
  const handleScheduleMeeting = async () => {
    try {
      setActionLoading(true);
      await axios.post(`${API}/schedule`, meetingData);
      setShowMeeting(false);
      setMeetingData({ title: '', date: '', time: '', attendees: [], agenda: '' });
      setNotification('Meeting scheduled successfully!');
    } catch (error) {
      console.error('Schedule meeting error:', error);
      setNotification('Failed to schedule meeting');
    } finally {
      setActionLoading(false);
    }
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
      <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto py-10 px-4">
          {/* Dashboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div className="phase-card border border-blue-500/50 rounded-2xl p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 shadow-blue-500/25 shadow-lg flex flex-col items-start">
              <FaTable className="text-2xl text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-white">{requirements.length}</div>
              <div className="text-gray-300">Total Requirements</div>
            </motion.div>
            <motion.div className="phase-card border border-green-500/50 rounded-2xl p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 shadow-green-500/25 shadow-lg flex flex-col items-start">
              <FaUsers className="text-2xl text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">{stakeholders.length}</div>
              <div className="text-gray-300">Stakeholders</div>
            </motion.div>
            <motion.div className="phase-card border border-yellow-500/50 rounded-2xl p-6 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 shadow-yellow-500/25 shadow-lg flex flex-col items-start">
              <FaHistory className="text-2xl text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{auditLogs.length}</div>
              <div className="text-gray-300">Audit Logs</div>
            </motion.div>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => setShowAudit(!showAudit)} 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-cyan-700 text-white font-semibold shadow hover:scale-105 transition flex items-center gap-2"
              disabled={actionLoading}
            >
              <FaHistory /> Audit Timeline
            </button>
            <button 
              onClick={() => setShowMatrix(!showMatrix)} 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-pink-700 text-white font-semibold shadow hover:scale-105 transition flex items-center gap-2"
              disabled={actionLoading}
            >
              <FaProjectDiagram /> Traceability Matrix
            </button>
            <button 
              onClick={() => setShowMeeting(true)} 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-700 to-emerald-700 text-white font-semibold shadow hover:scale-105 transition flex items-center gap-2"
              disabled={actionLoading}
            >
              <FaCalendarAlt /> Schedule Meeting
            </button>
            <button 
              onClick={handleExport} 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-700 to-orange-700 text-white font-semibold shadow hover:scale-105 transition flex items-center gap-2"
              disabled={actionLoading}
            >
              <FaDownload /> Export
            </button>
          </div>

          {/* AI Extraction */}
          <div className="mb-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 shadow-xl phase-card">
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

          {/* Requirements Table */}
          <div className="mb-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 shadow-xl phase-card">
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
            <div className="overflow-x-auto">
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
                <tbody>
                  {requirements.map(r => (
                    <tr key={r._id} className="border-b border-gray-700 hover:bg-gray-800/60 transition">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stakeholder Management */}
          <div className="mb-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 shadow-xl phase-card">
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
                  />
                  <textarea 
                    value={newReqDescription} 
                    onChange={e => setNewReqDescription(e.target.value)} 
                    placeholder="Description" 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none h-20 resize-none" 
                  />
                  <select 
                    value={newReqPriority} 
                    onChange={e => setNewReqPriority(e.target.value)} 
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
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
                      onClick={() => { handleAddRequirement(); setSelectedReq(null); }} 
                      className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition flex items-center gap-2"
                      disabled={actionLoading || !newReq.trim()}
                    >
                      {actionLoading ? <FaClock className="animate-spin" /> : <FaPlus />}
                      Add
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
        Add
      </button>
    </form>
  );
} 