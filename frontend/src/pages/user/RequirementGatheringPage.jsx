import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserFriends, FaRobot, FaComments, FaProjectDiagram, FaCalendarAlt, FaTable, FaHistory, FaFileExport, FaPlus, FaVoteYea, FaCheck, FaTimes, FaArrowLeft, FaRocket, FaRegClock, FaLightbulb, FaDatabase, FaCog, FaFileUpload, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';

const RequirementGatheringPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { getProject } = useProject();
  
  // Refs for scrollingnpm
  const mainContainerRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  
  // State management
  const [requirements, setRequirements] = useState([
    { id: 1, text: 'User login with 2FA authentication', status: 'Proposed', votes: 3, comments: [], version: 1, priority: 'High', category: 'Security' },
    { id: 2, text: 'Dashboard analytics for administrators', status: 'Approved', votes: 5, comments: ['Great idea!', 'Should include real-time data'], version: 2, priority: 'Medium', category: 'Analytics' },
    { id: 3, text: 'Real-time chat functionality', status: 'In Progress', votes: 2, comments: [], version: 1, priority: 'High', category: 'Communication' },
    { id: 4, text: 'Advanced reporting system with customizable dashboards', status: 'Proposed', votes: 1, comments: [], version: 1, priority: 'Medium', category: 'Analytics' },
    { id: 5, text: 'Mobile-responsive design for all screen sizes', status: 'Approved', votes: 4, comments: ['Essential for user experience'], version: 1, priority: 'High', category: 'General' },
  ]);
  const [newReq, setNewReq] = useState('');
  const [newReqPriority, setNewReqPriority] = useState('Medium');
  const [newReqCategory, setNewReqCategory] = useState('General');
  const [aiInput, setAiInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [stakeholders, setStakeholders] = useState([
    { id: 1, name: 'Alice Johnson', role: 'Product Manager', status: 'Active', avatar: 'AJ' },
    { id: 2, name: 'Bob Smith', role: 'Developer', status: 'Active', avatar: 'BS' },
    { id: 3, name: 'Carol Davis', role: 'Designer', status: 'Pending', avatar: 'CD' },
    { id: 4, name: 'David Wilson', role: 'QA Engineer', status: 'Active', avatar: 'DW' },
  ]);
  // Remove: const [meetings, setMeetings] = useState([...]);
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const statusColors = {
    Proposed: 'bg-blue-500',
    Approved: 'bg-green-500',
    'In Progress': 'bg-yellow-500',
    Implemented: 'bg-purple-500',
    Rejected: 'bg-red-500',
  };

  const priorityColors = {
    High: 'text-red-400',
    Medium: 'text-yellow-400',
    Low: 'text-green-400',
  };

  // Get projectId from location state
  useEffect(() => {
    if (location.state && location.state.projectId) {
      setProjectId(location.state.projectId);
    }
  }, [location]);

  // Fetch project data


  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        if (projectId) {
          const project = await getProject(projectId);
          if (project) {
            setProjectDetails(project);
          }
        } else {
          console.warn('No projectId provided');
          setProjectDetails(null);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
        setProjectDetails(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjectData();
  }, [projectId, getProject]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (mainContainerRef.current) {
        const scrollTop = mainContainerRef.current.scrollTop;
        setShowScrollTop(scrollTop > 300);
      }
    };

    const container = mainContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // AI extraction functionality
  const handleAIExtract = () => {
    if (aiInput.trim()) {
      const sentences = aiInput.split(/[.!?]+/).filter(s => s.trim().length > 10);
      const newSuggestions = sentences.map(sentence => ({
        id: Date.now() + Math.random(),
        text: sentence.trim(),
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        category: ['Security', 'Analytics', 'Communication', 'General'][Math.floor(Math.random() * 4)]
      }));
      setAiSuggestions([...aiSuggestions, ...newSuggestions]);
      setAiInput('');
    }
  };

  // Add requirement from AI suggestion
  const handleAddFromAI = (suggestion) => {
    const newRequirement = {
      id: Date.now(),
      text: suggestion.text,
      status: 'Proposed',
      votes: 0,
      comments: [],
      version: 1,
      priority: 'Medium',
      category: suggestion.category
    };
    setRequirements([...requirements, newRequirement]);
    setAiSuggestions(aiSuggestions.filter(s => s.id !== suggestion.id));
  };

  // Add new requirement
  const handleAddRequirement = () => {
    if (newReq.trim()) {
      const newRequirement = {
        id: Date.now(),
        text: newReq,
        status: 'Proposed',
        votes: 0,
        comments: [],
        version: 1,
        priority: newReqPriority,
        category: newReqCategory
      };
      setRequirements([...requirements, newRequirement]);
      setNewReq('');
      setNewReqPriority('Medium');
      setNewReqCategory('General');
    }
  };

  // Voting functionality
  const handleVote = (id) => {
    setRequirements(requirements.map(r => 
      r.id === id ? { ...r, votes: r.votes + 1 } : r
    ));
  };

  // Status change
  const handleStatusChange = (id, status) => {
    setRequirements(requirements.map(r => 
      r.id === id ? { ...r, status, version: r.version + 1 } : r
    ));
  };

  // Add comment
  const handleAddComment = (id) => {
    if (newComment.trim()) {
      setRequirements(requirements.map(r => 
        r.id === id ? { 
          ...r, 
          comments: [...r.comments, { 
            text: newComment, 
            user: user?.name || 'Anonymous', 
            date: new Date().toLocaleString() 
          }] 
        } : r
      ));
      setNewComment('');
    }
  };

  
  // Export functionality
  const handleExport = (type) => {
    const data = {
      project: projectDetails,
      requirements: requirements,
      stakeholders: stakeholders
    };
    if (type === 'PDF') {
      // Mock PDF export
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `requirements-${projectDetails?.title || 'project'}.json`;
      a.click();
    } else {
      // Mock other exports
      console.log(`Exporting as ${type}:`, data);
    }
    setShowExport(false);
  };

  // Add stakeholder
  const handleAddStakeholder = () => {
    const newStakeholder = {
      id: Date.now(),
      name: 'New Stakeholder',
      role: 'Team Member',
      status: 'Pending',
      avatar: 'NS'
    };
    setStakeholders([...stakeholders, newStakeholder]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

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
      
      <div 
        ref={mainContainerRef}
        className="pt-16 min-h-screen flex flex-col items-center py-10 px-4 custom-scrollbar smooth-scroll overflow-y-auto"
        style={{ height: '100vh' }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 w-full max-w-7xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Requirement Gathering & Analysis
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            Collaborate with stakeholders, document requirements, and analyze project needs with AI-powered insights.
          </p>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate('/user/project-architecture')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Back to Architecture
            </button>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                    <h3 className="text-xl font-semibold text-white mb-2">{projectDetails?.title || 'Project Title'}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-blue-400 font-medium">{projectDetails?.status || 'In Progress'}</span>
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
                    Encourage stakeholder voting to prioritize requirements effectively.
                  </p>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Keep requirements traceable by linking them to project tasks and test cases.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stakeholders */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="gradient-border"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-green-400 flex items-center">
                    <FaUserFriends className="mr-2" />
                    Stakeholders
                  </h2>
                  <button 
                    onClick={handleAddStakeholder}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-all duration-300 transform hover:scale-105"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  {stakeholders.map(stakeholder => (
                    <div key={stakeholder.id} className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-3 hover:from-green-900/40 hover:to-blue-900/40 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {stakeholder.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{stakeholder.name}</p>
                          <p className="text-gray-400 text-xs">{stakeholder.role}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          stakeholder.status === 'Active' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                        }`}>
                          {stakeholder.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center">
                  <FaRegClock className="mr-2" />
                  Recent Activity
                </h2>
                <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
                  <div className="flex items-center gap-3 text-sm">
                    <FaComments className="text-blue-400" />
                    <span className="text-gray-300">New requirement added</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaVoteYea className="text-green-400" />
                    <span className="text-gray-300">Vote cast on dashboard analytics</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaCalendarAlt className="text-purple-400" />
                    <span className="text-gray-300">Meeting scheduled</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaUserFriends className="text-yellow-400" />
                    <span className="text-gray-300">New stakeholder added</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* AI Requirement Extraction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gradient-border"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center">
                  <FaRobot className="mr-2" />
                  AI Requirement Extraction
                </h2>
                <div className="space-y-4">
                  <textarea 
                    value={aiInput} 
                    onChange={e => setAiInput(e.target.value)} 
                    placeholder="Paste meeting notes, documents, or requirements here for AI analysis..." 
                    className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none resize-none custom-scrollbar" 
                    rows={4}
                  />
                  <button 
                    onClick={handleAIExtract} 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Extract Requirements
                  </button>
                  
                  {aiSuggestions.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-white mb-3">AI Suggestions</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                        {aiSuggestions.map(suggestion => (
                          <div key={suggestion.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="text-white text-sm">{suggestion.text}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-gray-400 text-xs">Confidence: {suggestion.confidence}%</span>
                                  <span className="text-gray-400 text-xs">Category: {suggestion.category}</span>
                                </div>
                              </div>
                              <button 
                                onClick={() => handleAddFromAI(suggestion)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm ml-3 transition-all duration-300 transform hover:scale-105"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Requirements List & Collaboration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="gradient-border"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-green-400 flex items-center">
                    <FaComments className="mr-2" />
                    Requirements & Collaboration
                  </h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowMatrix(!showMatrix)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      <FaTable className="mr-1" />
                      Matrix
                    </button>
                    <button 
                      onClick={() => setShowHistory(!showHistory)} 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      <FaHistory className="mr-1" />
                      History
                    </button>
                    <button 
                      onClick={() => setShowExport(!showExport)} 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      <FaFileExport className="mr-1" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Add New Requirement */}
                <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <input 
                        value={newReq} 
                        onChange={e => setNewReq(e.target.value)} 
                        placeholder="Add new requirement..." 
                        className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-all duration-300"
                        onKeyPress={e => e.key === 'Enter' && handleAddRequirement()}
                      />
                    </div>
                    <div>
                      <select 
                        value={newReqPriority} 
                        onChange={e => setNewReqPriority(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-all duration-300"
                      >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        value={newReqCategory} 
                        onChange={e => setNewReqCategory(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-all duration-300"
                      >
                        <option value="General">General</option>
                        <option value="Security">Security</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Communication">Communication</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={handleAddRequirement}
                    className="mt-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <FaPlus className="mr-2" />
                    Add Requirement
                  </button>
                </div>

                {/* Requirements List */}
                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                  {requirements.map(req => (
                    <div key={req.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${statusColors[req.status]}`}></span>
                          <span className={`text-xs px-2 py-1 rounded ${priorityColors[req.priority]}`}>
                            {req.priority}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                            {req.category}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium mb-2">{req.text}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-400">v{req.version}</span>
                            <button 
                              onClick={() => handleVote(req.id)}
                              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                            >
                              <FaVoteYea /> {req.votes} votes
                            </button>
                            <select 
                              value={req.status} 
                              onChange={e => handleStatusChange(req.id, e.target.value)}
                              className="bg-gray-700 text-white text-xs rounded px-2 py-1 border border-gray-600 focus:border-blue-500 focus:outline-none transition-all duration-300"
                            >
                              {Object.keys(statusColors).map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <button 
                              onClick={() => setSelectedReq(selectedReq === req.id ? null : req.id)}
                              className="text-gray-400 hover:text-white text-xs transition-colors duration-300"
                            >
                              {selectedReq === req.id ? 'Hide' : 'Show'} Comments
                            </button>
                          </div>
                          
                          {/* Comments Section */}
                          {selectedReq === req.id && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 space-y-3"
                            >
                              {req.comments.length > 0 && (
                                <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                                  {req.comments.map((comment, index) => (
                                    <div key={index} className="bg-gray-700 rounded-lg p-3">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-green-400 text-sm font-medium">{comment.user}</span>
                                        <span className="text-gray-500 text-xs">{comment.date}</span>
                                      </div>
                                      <p className="text-gray-300 text-sm">{comment.text}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  value={newComment}
                                  onChange={e => setNewComment(e.target.value)}
                                  placeholder="Add a comment..." 
                                  className="flex-1 p-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-all duration-300"
                                  onKeyPress={e => e.key === 'Enter' && handleAddComment(req.id)}
                                />
                                <button 
                                  onClick={() => handleAddComment(req.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                  Add
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

           
            
            

            {/* Traceability Matrix */}
            {showMatrix && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="gradient-border"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-blue-400 flex items-center">
                      <FaTable className="mr-2" />
                      Traceability Matrix
                    </h2>
                    <button 
                      onClick={() => setShowMatrix(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      Close
                    </button>
                  </div>
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="px-4 py-2 text-left text-white">Requirement</th>
                          <th className="px-4 py-2 text-left text-white">Priority</th>
                          <th className="px-4 py-2 text-left text-white">Status</th>
                          <th className="px-4 py-2 text-left text-white">Linked Task</th>
                          <th className="px-4 py-2 text-left text-white">Test Case</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requirements.map(req => (
                          <tr key={req.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors duration-300">
                            <td className="px-4 py-2 text-white">{req.text}</td>
                            <td className="px-4 py-2">
                              <span className={priorityColors[req.priority]}>{req.priority}</span>
                            </td>
                            <td className="px-4 py-2 text-white">{req.status}</td>
                            <td className="px-4 py-2 text-gray-400">(Task link)</td>
                            <td className="px-4 py-2 text-gray-400">(Test case)</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Version History */}
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="gradient-border"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-400 flex items-center">
                      <FaHistory className="mr-2" />
                      Version History
                    </h2>
                    <button 
                      onClick={() => setShowHistory(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {requirements.map(req => (
                      <div key={req.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-500 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{req.text}</p>
                            <p className="text-gray-400 text-sm">Version {req.version} - {req.status}</p>
                          </div>
                          <span className="text-gray-500 text-xs">
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Export & Reporting */}
            {showExport && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="gradient-border"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-purple-400 flex items-center">
                      <FaFileExport className="mr-2" />
                      Export & Reporting
                    </h2>
                    <button 
                      onClick={() => setShowExport(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => handleExport('PDF')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Export PDF
                    </button>
                    <button 
                      onClick={() => handleExport('DOCX')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Export DOCX
                    </button>
                    <button 
                      onClick={() => handleExport('CSV')}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Export CSV
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          >
            <FaChevronUp className="text-lg" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default RequirementGatheringPage;