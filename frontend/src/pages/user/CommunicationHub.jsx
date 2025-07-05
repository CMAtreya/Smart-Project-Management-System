import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, FaComments, FaVideo, FaPhone, FaMicrophone, FaPaperPlane,
  FaSearch, FaFilter, FaBell, FaBellSlash, FaUserPlus, FaUsers, FaCog,
  FaSmile, FaPaperclip, FaImage, FaFile, FaMapMarkerAlt, FaClock,
  FaCheck, FaCheckDouble, FaReply, FaForward, FaStar, FaThumbsUp,
  FaRobot, FaBrain, FaLightbulb, FaShieldAlt, FaLock, FaUnlock,
  FaEye, FaEyeSlash, FaVolumeUp, FaVolumeMute, FaCamera, FaDesktop,
  FaMobile, FaTablet, FaGlobe, FaNetworkWired, FaChartLine, FaHistory,
  FaBookmark, FaArchive, FaTrash, FaEdit, FaCopy, FaShare, FaDownload,
  FaUpload, FaSync, FaPause, FaPlay, FaStop, FaExpand, FaCompress,
  FaRegSmile, FaRegFrown, FaRegMeh, FaRegHeart, FaRegStar, FaRegThumbsUp,
  FaRegThumbsDown, FaRegComment, FaRegEye, FaRegBookmark, FaRegClock,
  FaLink, FaArrowUp
} from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

const CommunicationHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [notifications, setNotifications] = useState(true);
  const [aiAssistant, setAiAssistant] = useState(false);
  const [meetLink, setMeetLink] = useState('');
  const [showMeetModal, setShowMeetModal] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const messagesEndRef = useRef(null);

  const channels = [
    { id: 'general', name: 'General', unread: 3, online: 12, type: 'public' },
    { id: 'development', name: 'Development', unread: 0, online: 8, type: 'public' },
    { id: 'design', name: 'Design Team', unread: 5, online: 6, type: 'private' },
    { id: 'marketing', name: 'Marketing', unread: 1, online: 4, type: 'public' },
    { id: 'support', name: 'Customer Support', unread: 0, online: 3, type: 'private' },
    { id: 'announcements', name: 'Announcements', unread: 2, online: 15, type: 'public' }
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Project Manager', status: 'online', avatar: 'SJ', lastSeen: '2 min ago' },
    { id: 2, name: 'Mike Chen', role: 'Lead Developer', status: 'online', avatar: 'MC', lastSeen: '1 min ago' },
    { id: 3, name: 'Emily Davis', role: 'UI/UX Designer', status: 'away', avatar: 'ED', lastSeen: '15 min ago' },
    { id: 4, name: 'Alex Rodriguez', role: 'Backend Developer', status: 'online', avatar: 'AR', lastSeen: '5 min ago' },
    { id: 5, name: 'Lisa Wang', role: 'QA Engineer', status: 'busy', avatar: 'LW', lastSeen: '30 min ago' },
    { id: 6, name: 'David Kim', role: 'DevOps Engineer', status: 'offline', avatar: 'DK', lastSeen: '2 hours ago' }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      avatar: 'SJ',
      message: 'Great work on the deployment! The new features are looking fantastic.',
      timestamp: '2:30 PM',
      type: 'text',
      status: 'read',
      reactions: [{ emoji: '👍', count: 3 }, { emoji: '🎉', count: 2 }]
    },
    {
      id: 2,
      sender: 'Mike Chen',
      avatar: 'MC',
      message: 'Thanks! The AI predictor really helped us catch those potential issues before deployment.',
      timestamp: '2:32 PM',
      type: 'text',
      status: 'read',
      reactions: [{ emoji: '🤖', count: 1 }]
    },
    {
      id: 3,
      sender: 'Emily Davis',
      avatar: 'ED',
      message: 'I\'ve uploaded the new design mockups for the dashboard. Can everyone take a look?',
      timestamp: '2:35 PM',
      type: 'file',
      fileType: 'image',
      fileName: 'dashboard-mockups-v2.fig',
      status: 'delivered',
      reactions: [{ emoji: '👀', count: 4 }]
    },
    {
      id: 4,
      sender: 'AI Assistant',
      avatar: '🤖',
      message: 'I\'ve analyzed the team\'s communication patterns and suggest scheduling a weekly sync meeting. Would you like me to set that up?',
      timestamp: '2:37 PM',
      type: 'ai-suggestion',
      status: 'read',
      reactions: [{ emoji: '💡', count: 2 }]
    }
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'productivity',
      title: 'Team Collaboration Score',
      value: '92%',
      trend: '+8%',
      description: 'Your team\'s communication effectiveness has improved significantly this week.'
    },
    {
      id: 2,
      type: 'engagement',
      title: 'Response Time',
      value: '2.3 min',
      trend: '-0.5 min',
      description: 'Average response time has decreased, indicating better team responsiveness.'
    },
    {
      id: 3,
      type: 'sentiment',
      title: 'Team Sentiment',
      value: 'Positive',
      trend: '+15%',
      description: 'Overall team sentiment is trending positive based on message analysis.'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mockMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage('');
      setIsTyping(false);
    }
  };

  const generateMeetLink = () => {
    // Generate a unique meeting ID
    const meetingId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    return `https://meet.google.com/${meetingId}-${timestamp}`;
  };

  const handleVideoCall = async () => {
    try {
      // Generate a new unique meeting link
      const newMeetLink = generateMeetLink();
      setMeetLink(newMeetLink);
      
      // Copy link to clipboard
      await navigator.clipboard.writeText(newMeetLink);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 3000);

      // Auto-paste to chat with the new link
      const videoCallMessage = `🎥 New video call started! Join here: ${newMeetLink}`;
      setMessage(videoCallMessage);
      
      // Send the message immediately
      const newMessage = {
        id: Date.now(),
        sender: 'You',
        avatar: 'U',
        message: videoCallMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        type: 'text'
      };
      setMockMessages(prev => [...prev, newMessage]);
      setMessage(''); // Clear the input
      
      // Directly open Google Meet with the new link
      window.open(newMeetLink, '_blank');
      
      // Show success notification
      toast.success('Meeting link created and copied to clipboard!');
      
    } catch (error) {
      console.error('Error creating meeting:', error);
      toast.error('Failed to create meeting link');
    }
  };

  const openMeetLink = () => {
    window.open(meetLink, '_blank');
    setShowMeetModal(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'busy': return 'bg-red-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getChannelTypeIcon = (type) => {
    return type === 'private' ? <FaLock className="text-xs" /> : <FaGlobe className="text-xs" />;
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
        .chat-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        .chat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
        }
        .message-bubble {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .ai-message {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .deployment-theme {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3));
          border-radius: 1rem;
          padding: 1px;
        }
        .deployment-theme > div {
          background: rgba(31, 41, 55, 0.9);
          border-radius: 0.875rem;
        }
        .typing-indicator {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #6b7280;
          animation: typing 1.4s infinite ease-in-out;
        }
        .typing-indicator:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(31, 41, 55, 0.8);
        }
        .sophisticated-gradient {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15));
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .premium-shadow {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1);
        }
        .elegant-border {
          border: 1px solid rgba(59, 130, 246, 0.2);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));
        }
        .floating-effect {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }
        @keyframes pulse-glow {
          from { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          to { box-shadow: 0 0 30px rgba(147, 51, 234, 0.5); }
        }
      `}</style>
      
      <div className="pt-16 min-h-screen py-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Communication Hub
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
            Advanced team collaboration with AI-powered insights and seamless video conferencing.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/user/project-architecture')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Back to Architecture
            </button>
            <button
              onClick={() => setAiAssistant(!aiAssistant)}
              className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 ${
                aiAssistant
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white'
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white'
              }`}
            >
              <FaRobot className="text-sm" />
              AI Assistant: {aiAssistant ? 'ON' : 'OFF'}
            </button>
          </div>
        </motion.div>

        {/* Main Communication Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Channels & Team */}
            <div className="lg:col-span-1 space-y-6">
                          {/* Channels */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="deployment-theme"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-blue-400 flex items-center">
                    <FaComments className="mr-2" />
                    Channels
                  </h2>
                  <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <FaUserPlus className="text-sm" />
                  </button>
                </div>
                  
                  <div className="space-y-2">
                    {channels.map((channel) => (
                      <div
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedChannel === channel.id
                            ? 'bg-blue-600/20 border border-blue-500/30'
                            : 'bg-gray-800/50 hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getChannelTypeIcon(channel.type)}
                            <span className="text-white font-medium">{channel.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {channel.unread > 0 && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {channel.unread}
                              </span>
                            )}
                            <span className="text-gray-400 text-xs">{channel.online}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Team Members */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="deployment-theme"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                    <FaUsers className="mr-2" />
                    Team
                  </h2>
                  
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {member.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-gray-800 ${getStatusColor(member.status)}`}></div>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{member.name}</div>
                            <div className="text-gray-400 text-xs">{member.role}</div>
                          </div>
                        </div>
                        <button 
                          onClick={handleVideoCall}
                          className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                        >
                          <FaVideo className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* AI Insights */}
              {aiAssistant && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="gradient-border"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                      <FaBrain className="mr-2" />
                      AI Insights
                    </h2>
                    
                    <div className="space-y-4">
                      {aiInsights.map((insight) => (
                        <div key={insight.id} className="p-4 bg-gray-800/50 rounded-lg border border-green-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-semibold">{insight.title}</h3>
                            <span className="text-green-400 font-bold">{insight.value}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-green-400 text-sm">{insight.trend}</span>
                            <FaArrowUp className="text-green-400 text-xs" />
                          </div>
                          <p className="text-gray-300 text-sm">{insight.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="deployment-theme h-full"
              >
                <div className="p-4 h-full flex flex-col">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <FaComments className="text-lg text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            #{channels.find(c => c.id === selectedChannel)?.name}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-400 text-sm">
                              {channels.find(c => c.id === selectedChannel)?.online} online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleVideoCall}
                        className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 text-white shadow-lg"
                      >
                        <FaVideo className="text-sm" />
                      </button>
                      <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-300 text-gray-300 border border-gray-600/50">
                        <FaCog className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {mockMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${msg.sender === 'AI Assistant' ? 'justify-end' : ''}`}
                      >
                        {msg.sender !== 'AI Assistant' && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                            {msg.avatar}
                          </div>
                        )}
                        
                        <div className={`flex-1 max-w-2xl ${msg.sender === 'AI Assistant' ? 'order-first' : ''}`}>
                          <div className={`p-3 rounded-lg ${
                            msg.sender === 'AI Assistant' 
                              ? 'ai-message' 
                              : msg.type === 'ai-suggestion'
                              ? 'ai-message'
                              : 'message-bubble'
                          }`}>
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium text-sm">{msg.sender}</span>
                                {msg.sender === 'AI Assistant' && <FaRobot className="text-green-400 text-xs" />}
                                <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {msg.status === 'read' && <FaCheckDouble className="text-blue-400 text-xs" />}
                                {msg.status === 'delivered' && <FaCheck className="text-gray-400 text-xs" />}
                              </div>
                            </div>
                            
                            {msg.type === 'file' ? (
                              <div className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg">
                                <FaFile className="text-blue-400 text-sm" />
                                <div>
                                  <div className="text-white font-medium text-sm">{msg.fileName}</div>
                                  <div className="text-gray-400 text-xs">Click to download</div>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-200 text-sm">{msg.message}</p>
                            )}
                            
                            {msg.reactions && msg.reactions.length > 0 && (
                              <div className="flex items-center gap-1 mt-2">
                                {msg.reactions.map((reaction, idx) => (
                                  <button
                                    key={idx}
                                    className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-xs transition-colors"
                                  >
                                    {reaction.emoji} {reaction.count}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <FaSmile className="text-sm" />
                        </button>
                        <button
                          onClick={() => setShowFileUpload(!showFileUpload)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <FaPaperclip className="text-sm" />
                        </button>
                      </div>
                      
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsRecording(!isRecording)}
                          className={`p-2 rounded-lg transition-colors ${
                            isRecording 
                              ? 'bg-red-600 text-white' 
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <FaMicrophone className="text-sm" />
                        </button>
                        <button
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaPaperPlane className="text-sm" />
                        </button>
                      </div>
                    </div>
                    
                    {showEmojiPicker && (
                      <div className="mt-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <div className="grid grid-cols-8 gap-2">
                          {['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '🎉', '💯', '👏', '🙏', '😎', '🤝', '💪', '🚀'].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                setMessage(prev => prev + emoji);
                                setShowEmojiPicker(false);
                              }}
                              className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors text-lg"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {showFileUpload && (
                      <div className="mt-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <div className="flex items-center gap-3">
                          <FaFile className="text-blue-400" />
                          <span className="text-gray-300 text-sm">Drag and drop files here or click to browse</span>
                          <button className="ml-auto px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                            Browse
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Google Meet Modal */}
        {showMeetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMeetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaVideo className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Google Meet Started</h3>
                <p className="text-gray-300 mb-6">
                  Your meeting link has been copied to clipboard and shared in the chat.
                </p>
                
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaLink className="text-blue-400" />
                    <span className="text-white font-medium">Meeting Link</span>
                  </div>
                  <div className="text-gray-300 text-sm break-all">{meetLink}</div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={openMeetLink}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Join Meeting
                  </button>
                  <button
                    onClick={() => setShowMeetModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default CommunicationHub; 