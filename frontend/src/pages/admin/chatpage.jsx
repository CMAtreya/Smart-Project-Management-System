import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPaperPlane, FaSmile, FaPaperclip, FaImage, FaFile, FaDownload,
  FaReply, FaEllipsisV, FaSearch, FaPhone, FaVideo, FaUserCircle,
  FaTasks, FaCalendarAlt, FaHashtag, FaAt, FaMicrophone, FaStop,
  FaPlay, FaPause, FaTimes, FaExpand, FaCompress, FaUsers,
  FaRegClock, FaCheck, FaCheckDouble, FaExclamationTriangle
} from 'react-icons/fa';

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: 'John Smith', avatar: null, status: 'online', lastSeen: null },
  { id: 2, name: 'Sarah Johnson', avatar: null, status: 'away', lastSeen: '2 hours ago' },
  { id: 3, name: 'Mike Wilson', avatar: null, status: 'offline', lastSeen: '1 day ago' },
];

const mockMessages = [
  {
    id: 1,
    senderId: 2,
    content: 'Hey team! Ive finished the login component. Ready for review.',
    timestamp: new Date(Date.now() - 3600000),
    type: 'text',
    status: 'read',
    reactions: [{ emoji: '👍', users: [1] }]
  },
  {
    id: 2,
    senderId: 1,
    content: 'Great work! Ill review it now.',
    timestamp: new Date(Date.now() - 3500000),
    type: 'text',
    status: 'read',
    replyTo: 1
  },
  {
    id: 3,
    senderId: 3,
    content: 'Should we schedule a meeting to discuss the API integration?',
    timestamp: new Date(Date.now() - 1800000),
    type: 'text',
    status: 'delivered'
  },
  {
    id: 4,
    senderId: 1,
    content: 'project-mockup.png',
    timestamp: new Date(Date.now() - 900000),
    type: 'file',
    fileData: {
      name: 'project-mockup.png',
      size: '2.4 MB',
      type: 'image'
    },
    status: 'read'
  }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentUserId = 1; // Mock current user ID

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock typing indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.7) {
        setTypingUsers([mockUsers[1].name]);
        setTimeout(() => setTypingUsers([]), 2000);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      senderId: currentUserId,
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      status: 'sent',
      replyTo: replyTo?.id
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyTo(null);

    // Mock message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'read' } : msg
      ));
    }, 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const message = {
      id: Date.now(),
      senderId: currentUserId,
      content: file.name,
      timestamp: new Date(),
      type: 'file',
      fileData: {
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
        type: file.type.includes('image') ? 'image' : 'file'
      },
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
  };

  const handleReaction = (messageId, emoji) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          if (existingReaction.users.includes(currentUserId)) {
            existingReaction.users = existingReaction.users.filter(u => u !== currentUserId);
          } else {
            existingReaction.users.push(currentUserId);
          }
        } else {
          reactions.push({ emoji, users: [currentUserId] });
        }

        return { ...msg, reactions: reactions.filter(r => r.users.length > 0) };
      }
      return msg;
    }));
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent': return <FaCheck className="text-gray-400" />;
      case 'delivered': return <FaCheck className="text-blue-400" />;
      case 'read': return <FaCheckDouble className="text-blue-400" />;
      default: return null;
    }
  };

  const getUserById = (id) => mockUsers.find(user => user.id === id) || { name: 'Unknown User' };

  const MessageBubble = ({ message, isOwn }) => {
    const user = getUserById(message.senderId);
    const replyToMessage = message.replyTo ? messages.find(m => m.id === message.replyTo) : null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 group`}
      >
        <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
          {replyToMessage && (
            <div className={`mb-2 p-2 rounded-lg bg-gray-700/50 border-l-4 ${isOwn ? 'border-blue-500' : 'border-gray-500'} text-xs`}>
              <div className="text-gray-400">
                Replying to {getUserById(replyToMessage.senderId).name}
              </div>
              <div className="text-gray-300 truncate">
                {replyToMessage.content}
              </div>
            </div>
          )}
          
          <div className={`rounded-2xl px-4 py-3 ${
            isOwn 
              ? 'bg-blue-600 text-white rounded-br-md' 
              : 'bg-gray-700 text-gray-100 rounded-bl-md'
          } shadow-lg`}>
            {!isOwn && (
              <div className="text-xs text-gray-400 mb-1 font-medium">
                {user.name}
              </div>
            )}
            
            {message.type === 'text' ? (
              <div className="break-words">{message.content}</div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {message.fileData.type === 'image' ? (
                    <FaImage className="text-2xl text-blue-400" />
                  ) : (
                    <FaFile className="text-2xl text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {message.fileData.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {message.fileData.size}
                  </div>
                </div>
                <button className="flex-shrink-0 p-1 hover:bg-white/10 rounded">
                  <FaDownload />
                </button>
              </div>
            )}

            {message.reactions && message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {message.reactions.map((reaction, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleReaction(message.id, reaction.emoji)}
                    className={`text-xs px-2 py-1 rounded-full ${
                      reaction.users.includes(currentUserId)
                        ? 'bg-blue-500/30 border border-blue-400'
                        : 'bg-gray-600/50 hover:bg-gray-600'
                    } transition-colors`}
                  >
                    {reaction.emoji} {reaction.users.length}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={`flex items-center gap-2 mt-1 px-2 text-xs text-gray-500 ${
            isOwn ? 'justify-end' : 'justify-start'
          }`}>
            <span>{formatTime(message.timestamp)}</span>
            {isOwn && getStatusIcon(message.status)}
          </div>
        </div>

        {/* Message Actions */}
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${
          isOwn ? 'order-1 mr-2' : 'order-2 ml-2'
        } flex items-center gap-1`}>
          <button
            onClick={() => handleReaction(message.id, '👍')}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
          >
            👍
          </button>
          <button
            onClick={() => setReplyTo(message)}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
          >
            <FaReply />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
            <FaEllipsisV />
          </button>
        </div>

        {!isOwn && (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium ml-3 flex-shrink-0">
            {user.name.charAt(0)}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className={`${isExpanded ? 'fixed inset-4 z-50' : 'h-[600px]'} bg-gray-900 rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden`}>
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              {selectedUser.name.charAt(0)}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
              selectedUser.status === 'online' ? 'bg-green-500' :
              selectedUser.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
            }`}></div>
          </div>
          <div>
            <h3 className="text-white font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-gray-400">
              {selectedUser.status === 'online' ? 'Active now' : 
               selectedUser.status === 'away' ? 'Away' : 
               `Last seen ${selectedUser.lastSeen}`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-48 px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-2 text-gray-400 text-sm" />
          </div>
          <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
            <FaPhone />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
            <FaVideo />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
            <FaUsers />
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? <FaCompress /> : <FaExpand />}
          </button>
          {isExpanded && (
            <button 
              onClick={() => setIsExpanded(false)}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-1 bg-gradient-to-b from-gray-900 to-gray-800">
        {messages
          .filter(msg => 
            !searchQuery || 
            msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            getUserById(msg.senderId).name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUserId}
            />
          ))}

        {/* Typing Indicator */}
        <AnimatePresence>
          {typingUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center space-x-2 px-4"
            >
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
                {typingUsers[0].charAt(0)}
              </div>
              <div className="bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview */}
      <AnimatePresence>
        {replyTo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 py-3 bg-gray-800/50 border-t border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaReply className="text-blue-400" />
                <div className="text-sm">
                  <span className="text-gray-400">Replying to </span>
                  <span className="text-white font-medium">{getUserById(replyTo.senderId).name}</span>
                </div>
              </div>
              <button
                onClick={() => setReplyTo(null)}
                className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            <div className="text-sm text-gray-300 truncate mt-1 ml-6">
              {replyTo.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
                rows="1"
              />
              <div className="absolute right-3 top-3 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaSmile />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaPaperclip />
                </button>
              </div>
            </div>

            {/* Emoji Picker Preview */}
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-20 right-6 bg-gray-700 rounded-lg p-3 border border-gray-600 shadow-xl"
                >
                  <div className="grid grid-cols-6 gap-2">
                    {['😊', '👍', '❤️', '😂', '😢', '😮', '😡', '🎉', '🔥', '💯', '✅', '❌'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setNewMessage(prev => prev + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="text-2xl hover:bg-gray-600 rounded p-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`p-3 rounded-full transition-colors ${
                isRecording 
                  ? 'bg-red-600 text-white animate-pulse' 
                  : 'bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600'
              }`}
            >
              {isRecording ? <FaStop /> : <FaMicrophone />}
            </button>
            
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;