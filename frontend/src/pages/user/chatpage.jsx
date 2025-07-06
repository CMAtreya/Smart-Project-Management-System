import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, FaComments, FaVideo, FaMicrophone, FaPaperPlane,
  FaSmile, FaPaperclip, FaFile, FaCheck, FaCheckDouble,
  FaUsers, FaCog, FaGlobe, FaLock, FaArrowDown, FaTasks, FaCopy
} from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import chatService from '../../services/chatService';
import { useTask } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';

const ChatPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, fetchTasks } = useTask();
  const [selectedChannel, setSelectedChannel] = useState('admin-chat');
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isChatInitialized, setIsChatInitialized] = useState(false);
  const [availableChannels, setAvailableChannels] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [maxTextareaHeight, setMaxTextareaHeight] = useState(120); // Default max height
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [showMeetingModal, setShowMeetingModal] = useState(false);

<<<<<<< HEAD
  // Initialize Google API
=======
// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

export default function ChatPage() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [activeChat, setActiveChat] = useState("Team Chat");
  
  // Simulate loading
>>>>>>> 5720e7de493f212afaee0d8037779331629de946
  useEffect(() => {
    const loadGoogleAPI = () => {
      if (window.gapi) {
        window.gapi.load('client:auth2', () => {
          window.gapi.client.init({
            apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: 'https://www.googleapis.com/auth/calendar.events'
          }).then(() => {
            setIsGoogleApiLoaded(true);
            console.log('Google API loaded successfully');
          }).catch((error) => {
            console.error('Error loading Google API:', error);
            // Fallback to manual link generation
            setIsGoogleApiLoaded(false);
          });
        });
      } else {
        // Fallback if Google API is not available
        setIsGoogleApiLoaded(false);
      }
    };

    // Load Google API script if not already loaded
    if (!window.gapi) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = loadGoogleAPI;
      script.onerror = () => {
        console.error('Failed to load Google API script');
        setIsGoogleApiLoaded(false);
      };
      document.head.appendChild(script);
    } else {
      loadGoogleAPI();
    }
  }, []);

  // Fetch tasks when component mounts
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  // Get user's current task assignments
  const getUserTaskAssignments = useMemo(() => {
    if (!user || !tasks.length) return [];
    
    return tasks.filter(task => 
      task.assignedTo && 
      (typeof task.assignedTo === 'object' ? task.assignedTo._id : task.assignedTo) === user._id
    );
  }, [user, tasks]);

  // Initialize chat service with real task data
  useEffect(() => {
    const initializeChat = async () => {
      try {
        if (!user || !tasks.length) return;

        // Get user info
        const userInfo = {
          id: user._id,
          role: user.role || 'user',
          tasks: getUserTaskAssignments.map(task => task._id)
        };

        // Initialize chat service with real task data
        const result = await chatService.initialize(
          userInfo.id, 
          userInfo.role, 
          userInfo.tasks,
          tasks // Pass all tasks to create channels based on assignments
        );
        
        if (result.success) {
          setCurrentUser(result.user);
          setMessages(chatService.getMessages());
          setAvailableChannels(result.availableChannels);
          setTeamMembers(chatService.getTeamMembersForChannel(selectedChannel));
          setIsChatInitialized(true);
          
          // Listen for message updates
          window.addEventListener('chatMessageUpdate', handleMessageUpdate);
        } else {
          toast.error('Failed to initialize chat: ' + result.error);
        }
      } catch (error) {
        console.error('Chat initialization error:', error);
        toast.error('Failed to initialize chat service');
      }
    };

    initializeChat();

    return () => {
      window.removeEventListener('chatMessageUpdate', handleMessageUpdate);
      chatService.disconnect();
    };
  }, [user, tasks, getUserTaskAssignments]);

  // Handle message updates from chat service
  const handleMessageUpdate = (event) => {
    setMessages([...event.detail.messages]);
  };

<<<<<<< HEAD
  // Update messages when chat service messages change
  useEffect(() => {
    if (isChatInitialized) {
      setMessages(chatService.getMessages());
    }
  }, [isChatInitialized]);

  // Update team members when channel changes
  useEffect(() => {
    if (isChatInitialized) {
      setTeamMembers(chatService.getTeamMembersForChannel(selectedChannel));
    }
  }, [selectedChannel, isChatInitialized]);

  // Calculate max textarea height on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(calculateMaxTextareaHeight, 100);
    };

    // Calculate initial max height
    setTimeout(calculateMaxTextareaHeight, 500);

    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Add mutation observer to watch for DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(calculateMaxTextareaHeight, 100);
    });
    
    const tasksContainer = document.querySelector('.tasks-container');
    if (tasksContainer) {
      observer.observe(tasksContainer, { 
        childList: true, 
        subtree: true, 
        attributes: true 
      });
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [availableChannels, getUserTaskAssignments.length]);

  // Recalculate textarea height when max height changes
  useEffect(() => {
    if (maxTextareaHeight > 0) {
      autoResizeTextarea();
    }
  }, [maxTextareaHeight]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      setIsScrolledToBottom(true);
      setShowScrollToBottom(false);
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsScrolledToBottom(isAtBottom);
      setShowScrollToBottom(!isAtBottom);
      
      // Calculate scroll progress
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      
      // Mark messages as read when scrolled to bottom
      if (isAtBottom) {
        setUnreadCount(0);
      }
    }
  };

  const markMessagesAsRead = () => {
    setUnreadCount(0);
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom();
    }
  }, [messages, isScrolledToBottom]);

  // Scroll to bottom when channel changes
  useEffect(() => {
    if (messagesContainerRef.current) {
      setTimeout(() => {
        scrollToBottom();
        calculateMaxTextareaHeight();
      }, 100);
    }
  }, [selectedChannel]);

  const handleSendMessage = async () => {
    if (message.trim() && isChatInitialized) {
      try {
        const result = await chatService.sendMessage(message.trim());
        
        if (result.success) {
          setMessage('');
          setIsTyping(false);
          
          // Update messages from chat service
          setMessages(chatService.getMessages());
          
          // Mark message as read
          chatService.markAsRead(result.message.id);
        } else {
          toast.error('Failed to send message: ' + result.error);
        }
      } catch (error) {
        console.error('Send message error:', error);
        toast.error('Failed to send message');
      }
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value.trim()) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
    
    // Auto-resize textarea
    autoResizeTextarea();
  };

  // Auto-resize textarea based on content
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // Calculate new height based on content
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, maxTextareaHeight);
      
      setTextareaHeight(`${newHeight}px`);
    }
  };

  // Calculate max textarea height for separated input
  const calculateMaxTextareaHeight = () => {
    try {
      // Since the input is now separated, we can use a fixed max height
      // or calculate based on viewport height
      const viewportHeight = window.innerHeight;
      const availableHeight = Math.min(200, Math.max(60, viewportHeight * 0.15)); // 15% of viewport height, max 200px
      
      setMaxTextareaHeight(availableHeight);
      
      // Recalculate current textarea height
      setTimeout(autoResizeTextarea, 0);
    } catch (error) {
      console.error('Error calculating max textarea height:', error);
      // Fallback to default height
      setMaxTextareaHeight(120);
    }
  };

  // Handle channel switching with proper scrolling
  const handleChannelSwitch = (channelId) => {
    setSelectedChannel(channelId);
    
    // Reset scroll position for new channel
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      setIsScrolledToBottom(true);
      setShowScrollToBottom(false);
      setUnreadCount(0);
    }
    
    // Recalculate heights after channel switch
    setTimeout(() => {
      calculateMaxTextareaHeight();
    }, 100);
  };

  const handleVideoCall = async () => {
    setIsCreatingMeeting(true);
    
    try {
      let meetLink = '';
      let isApiMeeting = false;
      
      if (isGoogleApiLoaded && window.gapi && window.gapi.auth2) {
        // Try to use Google Calendar API to create a meeting
        try {
          const authInstance = window.gapi.auth2.getAuthInstance();
          if (!authInstance.isSignedIn.get()) {
            await authInstance.signIn();
          }
          
          const event = {
            'summary': `Team Meeting - ${selectedChannel === 'admin-chat' ? 'Admin Chat' : 
                       selectedChannel === 'general' ? 'General' : 
                       availableChannels.find(c => c.id === selectedChannel)?.name || 'Team'}`,
            'description': 'Team meeting created via chat interface',
            'start': {
              'dateTime': new Date().toISOString(),
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            'end': {
              'dateTime': new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour later
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            'conferenceData': {
              'createRequest': {
                'requestId': `meet-${Date.now()}`,
                'conferenceSolutionKey': {
                  'type': 'hangoutsMeet'
                }
              }
            }
          };

          const response = await window.gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
            'conferenceDataVersion': 1
          });

          if (response.result.conferenceData?.entryPoints?.[0]?.uri) {
            meetLink = response.result.conferenceData.entryPoints[0].uri;
            isApiMeeting = true;
            console.log('Google Meet link created via API:', meetLink);
          } else {
            throw new Error('No conference link generated');
          }
        } catch (apiError) {
          console.error('Google API error:', apiError);
          // Fallback to manual link generation
          meetLink = generateManualMeetLink();
          console.log('Using fallback manual link:', meetLink);
        }
      } else {
        // Fallback to manual link generation
        meetLink = generateManualMeetLink();
        console.log('Google API not available, using manual link:', meetLink);
      }
      
      setMeetingLink(meetLink);
      setShowMeetingModal(true);
      
      // Auto-share the link in the chat
      setTimeout(() => {
        const shareMessage = `🎥 **Video Meeting Started!**\n\n📋 Meeting Link: ${meetLink}\n\n${isApiMeeting ? '✅ Created via Google Calendar API' : '🔧 Generated manually'}\n\nJoin the meeting and let's collaborate!`;
        setMessage(shareMessage);
      }, 500);
      
    } catch (error) {
      console.error('Error creating meeting:', error);
      toast.error('Failed to create meeting. Please try again.');
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  const generateManualMeetLink = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const part1 = Array.from({length: 3}, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    const part2 = Array.from({length: 4}, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    const part3 = Array.from({length: 3}, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    
    return `https://meet.google.com/${part1}-${part2}-${part3}`;
  };

  const openMeeting = () => {
    if (meetingLink) {
      const meetWindow = window.open(meetingLink, '_blank', 'noopener,noreferrer');
      if (meetWindow) {
        meetWindow.focus();
      } else {
        toast.error('Popup blocked! Please allow popups and try again.');
      }
    }
  };

  const copyMeetingLink = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      toast.success('Meeting link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
      handleSendMessage();
    } else if (e.key === 'Enter' && e.shiftKey) {
      // Allow Shift+Enter for new line
      return;
    }
  };

  // Keyboard shortcuts for scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + Down to scroll to bottom
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToBottom();
        markMessagesAsRead();
      }
      // Ctrl/Cmd + Up to scroll to top
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp') {
        e.preventDefault();
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = 0;
        }
      }
      // End key to scroll to bottom
      if (e.key === 'End') {
        e.preventDefault();
        scrollToBottom();
        markMessagesAsRead();
      }
      // Home key to scroll to top
      if (e.key === 'Home') {
        e.preventDefault();
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = 0;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
=======
  const chatList = [
    { name: "Team Chat", unread: 0, lastMessage: "", avatar: "", isGroup: true }
  ];
>>>>>>> 5720e7de493f212afaee0d8037779331629de946

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
        
        /* Custom Scrollbar Styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 3px;
          transition: background 0.3s ease;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:active {
          background: rgba(156, 163, 175, 1);
        }
        
        /* Smooth scrolling for the entire chat container */
        .chat-scroll-container {
          scroll-behavior: smooth;
        }
        
        /* Responsive height adjustments for fixed input layout */
        @media (max-width: 1024px) {
          .h-\[calc\(100vh-200px\)\] {
            height: calc(100vh - 150px);
          }
          .chat-container {
            height: calc(100vh - 150px) !important;
          }
        }
        
        @media (max-width: 768px) {
          .h-\[calc\(100vh-200px\)\] {
            height: calc(100vh - 120px);
          }
          .chat-container {
            height: calc(100vh - 120px) !important;
          }
        }
        
        /* Ensure proper flex behavior */
        .flex-col {
          display: flex;
          flex-direction: column;
        }
        
        .min-h-0 {
          min-height: 0;
        }
        
        .flex-shrink-0 {
          flex-shrink: 0;
        }
        
        /* Chat container height synchronization */
        .chat-container {
          display: flex;
          flex-direction: column;
        }
        
        .chat-container .deployment-theme {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        
        .chat-container .deployment-theme > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        
        /* Messages container proper scrolling */
        .chat-scroll-container {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          scroll-behavior: smooth;
        }
        
        /* Tasks container proper scrolling */
        .tasks-container {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #4B5563 #1F2937;
        }
        
        .tasks-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .tasks-container::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }
        
        .tasks-container::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 3px;
          transition: background 0.3s ease;
        }
        
        .tasks-container::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }
        
        /* Enhanced message input animations */
        .message-input-container {
          background: linear-gradient(135deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(59, 130, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .message-input-container:hover {
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        
        .input-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .input-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .send-button-active {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          box-shadow: 
            0 10px 25px rgba(59, 130, 246, 0.4),
            0 0 0 1px rgba(59, 130, 246, 0.3);
        }
        
        .send-button-active:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 
            0 15px 35px rgba(59, 130, 246, 0.5),
            0 0 0 1px rgba(59, 130, 246, 0.4);
        }
        
        .typing-indicator-enhanced {
          animation: typing-enhanced 1.4s infinite ease-in-out;
        }
        
        @keyframes typing-enhanced {
          0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
        
        .character-counter {
          background: linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.3);
        }
        
        /* Textarea auto-resize styles */
        .resize-none {
          resize: none;
        }
        
        .overflow-y-auto {
          overflow-y: auto;
        }
        
        /* Smooth textarea height transitions */
        textarea {
          transition: height 0.2s ease-out;
        }
        
        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 4px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 2px;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 2px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
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
            Advanced team collaboration with seamless video conferencing and real-time messaging.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 backdrop-blur-sm">
              <FaCog className="text-sm" />
              Tasks: {getUserTaskAssignments.length} assigned
                </div>
              </div>
        </motion.div>

        {/* Main Communication Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ height: 'calc(100vh - 200px)' }}>
            {/* Left Sidebar - Channels & Team */}
            <div className="lg:col-span-1 space-y-6 tasks-container">
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
                    <div className="text-xs text-gray-400">
                      {currentUser?.tasks?.length > 0 && (
                        <span>Tasks: {currentUser.tasks.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {availableChannels.map((channel, index) => (
                      <div
                        key={`channel-${channel.id}-${index}`}
                        onClick={() => handleChannelSwitch(channel.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedChannel === channel.id
                            ? 'bg-blue-600/20 border border-blue-500/30'
                            : 'bg-gray-800/50 hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getChannelTypeIcon(channel.type)}
                            <div>
                              <span className="text-white font-medium">{channel.name}</span>
                              {channel.requiredTask && (
                                <div className="text-xs text-gray-400">
                                  Task: {channel.requiredTask}
                                </div>
                              )}
                              {channel.taskCount && (
                                <div className="text-xs text-blue-400">
                                  {channel.taskCount} tasks • {channel.members?.length || 0} members
                                </div>
                              )}
                            </div>
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
                  
                  {availableChannels.length === 0 && (
                    <div className="text-center py-4 text-gray-400 text-sm">
                      No channels available for your tasks
                    </div>
                  )}
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
                    {selectedChannel === 'admin-chat' ? 'Admin' : 
                     selectedChannel === 'general' ? 'All Team' : 
                     `${availableChannels.find(c => c.id === selectedChannel)?.name} Team`}
                  </h2>
                  
                  <div className="space-y-2">
                    {teamMembers.map((member, index) => (
                      <div key={`member-${member.id}-${index}`} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {member.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-gray-800 ${getStatusColor(member.isOnline ? 'online' : 'offline')}`}></div>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{member.name}</div>
                            <div className="text-gray-400 text-xs">{member.role}</div>
                            {member.tasks && member.tasks.length > 0 && (
                              <div className="text-xs text-blue-400">
                                {member.tasks.length} tasks assigned
                              </div>
                            )}
                          </div>
                            </div>
                        <button 
                          onClick={handleVideoCall}
                          disabled={isCreatingMeeting}
                          className="p-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded transition-colors"
                        >
                          {isCreatingMeeting ? (
                            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <FaVideo className="text-xs" />
                          )}
                        </button>
                          </div>
                    ))}
                  </div>
                  
                  {teamMembers.length === 0 && (
                    <div className="text-center py-4 text-gray-400 text-sm">
                      No team members in this channel
                            </div>
                          )}
                        </div>
                      </motion.div>

              {/* Task Assignments */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="deployment-theme"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                    <FaTasks className="mr-2" />
                    Your Tasks
                  </h2>
                  
                  <div className="space-y-2">
                    {getUserTaskAssignments.map((task, index) => (
                      <div key={`task-${task._id || task.id}-${index}`} className="p-3 bg-gray-800/50 rounded-lg border border-purple-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-medium text-sm">{task.title}</div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                            task.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                            task.status === 'To Do' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                        <div className="text-gray-400 text-xs mb-2">{task.description}</div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                            task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-gray-400 text-xs">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {getUserTaskAssignments.length === 0 && (
                      <div className="text-center py-4 text-gray-400 text-sm">
                        No tasks assigned yet
                      </div>
                    )}
                  </div>
                  </div>
                </motion.div>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3 chat-container" style={{ height: 'calc(100vh - 200px)' }}>
                <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="deployment-theme h-full flex flex-col"
              >
                <div className="p-4 h-full flex flex-col">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700/50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <FaComments className="text-lg text-white" />
                        </div>
                      <div>
                          <h2 className="text-xl font-bold text-white">
                            {selectedChannel === 'admin-chat' ? '💬 Admin Chat' : `#${availableChannels.find(c => c.id === selectedChannel)?.name}`}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-400 text-sm">
                              {selectedChannel === 'admin-chat' ? 'Admin Online' : `${availableChannels.find(c => c.id === selectedChannel)?.online} online`}
                            </span>
                            {currentUser && (
                              <span className="text-gray-400 text-sm">• Logged in as {currentUser.name}</span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isGoogleApiLoaded 
                                ? 'text-green-400 bg-green-400/10' 
                                : 'text-orange-400 bg-orange-400/10'
                            }`}>
                              {isGoogleApiLoaded ? '🔗 Google API Ready' : '⚠️ Manual Mode'}
                            </span>
                            {!isScrolledToBottom && (
                              <span className="text-yellow-400 text-xs bg-yellow-400/10 px-2 py-1 rounded-full">
                                ↑ Scroll up for new messages
                              </span>
                            )}
                      </div>
                    </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleVideoCall}
                        disabled={isCreatingMeeting}
                        className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 rounded-lg transition-all duration-300 text-white shadow-lg"
                      >
                        {isCreatingMeeting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <FaVideo className="text-sm" />
                        )}
                      </button>
                      <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-300 text-gray-300 border border-gray-600/50">
                        <FaCog className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <div 
                      ref={messagesContainerRef}
                      className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 transition-all duration-300 chat-scroll-container min-h-0 relative"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#4B5563 #1F2937',
                        maxHeight: 'calc(100vh - 400px)',
                        minHeight: '200px'
                      }}
                    >
                      {messages.map((msg, index) => (
                      <motion.div
                          key={`msg-${msg.id || index}-${msg.timestamp}`}
                          initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-2 ${msg.isAdmin ? 'justify-start' : msg.sender === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                        >
                          {!msg.isAdmin && msg.sender !== currentUser?.id && (
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                              {msg.senderAvatar}
                            </div>
                          )}
                          
                          <div className={`flex-1 max-w-2xl ${msg.isAdmin ? 'order-first' : msg.sender === currentUser?.id ? 'order-first' : ''}`}>
                            <div className={`p-3 rounded-lg ${
                              msg.isAdmin 
                                ? 'bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600' 
                                : msg.sender === currentUser?.id
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'message-bubble'
                            }`}>
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className={`font-medium text-sm ${msg.isAdmin ? 'text-white' : msg.sender === currentUser?.id ? 'text-white' : 'text-white'}`}>
                                    {msg.senderName}
                                  </span>
                                  {msg.isAdmin && <span className="text-blue-400 text-xs">👨‍💼 Admin</span>}
                                  <span className={`text-xs ${msg.isAdmin ? 'text-gray-300' : msg.sender === currentUser?.id ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {msg.timestamp}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {msg.status === 'read' && <FaCheckDouble className="text-blue-400 text-xs" />}
                                  {msg.status === 'delivered' && <FaCheck className="text-gray-400 text-xs" />}
                                  {msg.status === 'sent' && <FaCheck className="text-gray-500 text-xs" />}
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
                                <p className={`text-sm ${msg.isAdmin ? 'text-gray-200' : msg.sender === currentUser?.id ? 'text-white' : 'text-gray-200'}`}>
                                  {msg.message.includes('meet.google.com') ? (
                                    <span>
                                      {msg.message.split('meet.google.com')[0]}
                                      <a 
                                        href={msg.message.match(/https:\/\/meet\.google\.com\/[^\s]+/)?.[0]} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 underline"
                                      >
                                        meet.google.com{msg.message.split('meet.google.com')[1]}
                                      </a>
                                    </span>
                                  ) : (
                                    msg.message
                                  )}
                                </p>
                              )}
                          </div>
                        </div>
                          
                          {msg.isAdmin && (
                            <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                              {msg.senderAvatar}
                            </div>
                        )}
                      </motion.div>
                    ))}
                      
                      {isTyping && (
                        <div className="flex gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {currentUser?.avatar || 'U'}
                  </div>
                          <div className="p-3 rounded-lg message-bubble">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400 text-sm">You are typing</span>
                              <div className="flex gap-1">
                                <div className="typing-indicator"></div>
                                <div className="typing-indicator"></div>
                                <div className="typing-indicator"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                      
                      {/* Scroll to Bottom Button */}
                      <AnimatePresence>
                        {showScrollToBottom && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => {
                              scrollToBottom();
                              markMessagesAsRead();
                            }}
                            className="absolute bottom-4 right-4 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                            title="Scroll to bottom"
                          >
                            <FaArrowDown className="text-sm" />
                            {unreadCount > 0 && (
                              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {unreadCount > 99 ? '99+' : unreadCount}
                              </span>
                            )}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Message Input - Fixed at Bottom */}
                  <div className="mt-auto flex-shrink-0">
                    <div className="relative">
                      {/* Main Input Container */}
                      <div className="flex items-end gap-3 p-4 message-input-container rounded-2xl">
                        {/* Left Side - Emoji & Attachments */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-3 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-xl input-button"
                            title="Add emoji"
                          >
                            <FaSmile className="text-lg" />
                    </button>
                          <button
                            onClick={() => setShowFileUpload(!showFileUpload)}
                            className="p-3 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl input-button"
                            title="Attach file"
                          >
                            <FaPaperclip className="text-lg" />
                    </button>
                        </div>
                        
                        {/* Center - Text Input */}
                        <div className="flex-1 relative">
                          <div className="relative">
                            <textarea
                              ref={textareaRef}
                              value={message}
                              onChange={handleMessageChange}
                              onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                              className="w-full bg-gray-800/50 text-white placeholder-gray-400 outline-none text-sm resize-none overflow-y-auto rounded-xl p-4 border border-gray-600/30 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                              style={{ 
                                height: textareaHeight, 
                                maxHeight: `${maxTextareaHeight}px`,
                                minHeight: '50px'
                              }}
                              rows={1}
                            />
                            {/* Character counter */}
                            {message.length > 0 && (
                              <div className="absolute bottom-2 right-2 text-xs text-gray-500 character-counter px-2 py-1 rounded-full">
                                {message.length}/1000
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Right Side - Voice & Send */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => setIsRecording(!isRecording)}
                            className={`p-3 rounded-xl input-button ${
                              isRecording 
                                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 animate-pulse' 
                                : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                            }`}
                            title={isRecording ? "Stop recording" : "Voice message"}
                          >
                            <FaMicrophone className="text-lg" />
                          </button>
                          <button
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                            className={`p-3 rounded-xl input-button ${
                              message.trim() 
                                ? 'send-button-active text-white' 
                                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                            }`}
                            title="Send message"
                          >
                            <FaPaperPlane className="text-lg" />
                          </button>
                        </div>
              </div>
              
                      {/* Typing indicator */}
                      {isTyping && (
                        <div className="absolute -top-8 left-4 bg-gray-800/90 backdrop-blur-sm text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700/50">
                          <div className="flex items-center gap-2">
                            <span>You are typing</span>
                            <div className="flex gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full typing-indicator-enhanced"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full typing-indicator-enhanced" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full typing-indicator-enhanced" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-3 p-4 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-medium text-sm">Choose an emoji</h3>
                          <button 
                            onClick={() => setShowEmojiPicker(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-8 gap-2">
                          {['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '🎉', '💯', '👏', '🙏', '😎', '🤝', '💪', '🚀', '😊', '🥳', '🤩', '😅', '🤗', '😌', '😇', '🥰'].map((emoji, index) => (
                            <button
                              key={`emoji-${emoji}-${index}`}
                              onClick={() => {
                                setMessage(prev => prev + emoji);
                                setShowEmojiPicker(false);
                              }}
                              className="p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 transform hover:scale-110 text-xl"
                            >
                              {emoji}
                            </button>
                    ))}
                  </div>
                </motion.div>
                    )}
                
                    {/* File Upload */}
                    {showFileUpload && (
                <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-3 p-4 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-medium text-sm">Attach files</h3>
                          <button 
                            onClick={() => setShowFileUpload(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="border-2 border-dashed border-gray-600/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-colors duration-300">
                          <FaFile className="text-blue-400 text-2xl mx-auto mb-3" />
                          <p className="text-gray-300 text-sm mb-3">Drag and drop files here or click to browse</p>
                          <p className="text-gray-500 text-xs mb-4">Supports: PDF, DOC, Images, Videos (max 10MB)</p>
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm rounded-lg transition-all duration-300 transform hover:scale-105">
                            Browse Files
                          </button>
                      </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                </motion.div>
            </div>
          </div>
        </div>
      </div>
                
      {/* Meeting Modal */}
      <AnimatePresence>
        {showMeetingModal && (
                <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMeetingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaVideo className="text-2xl text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  Video Meeting Created!
                </h3>
                
                <p className="text-gray-300 text-sm mb-4">
                  Your Google Meet link has been generated and shared in the chat.
                </p>
                
                <div className="bg-gray-700/50 rounded-lg p-3 mb-4 border border-gray-600/50">
                  <p className="text-blue-400 text-sm font-mono break-all">
                    {meetingLink}
                  </p>
                          </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={openMeeting}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <FaVideo className="inline mr-2" />
                    Join Meeting
                  </button>
                  
                  <button
                    onClick={copyMeetingLink}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <FaCopy className="inline mr-2" />
                    Copy Link
                  </button>
                          </div>
                
                <button
                  onClick={() => setShowMeetingModal(false)}
                  className="mt-4 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Close
                </button>
                  </div>
                </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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

export default ChatPage;