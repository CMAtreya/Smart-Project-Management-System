import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaSmile, FaPaperclip, FaSearch, FaEllipsisV, FaVideo, FaPhone } from 'react-icons/fa';

// Sample data - in a real app, this would come from your backend
const initialChats = [
  {
    id: 1,
    name: 'Website Redesign Team',
    type: 'group',
    avatar: 'https://via.placeholder.com/40/4F46E5/FFFFFF?text=WR',
    members: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'],
    lastMessage: {
      sender: 'Jane Smith',
      text: 'I just pushed the new navbar component',
      time: '10:42 AM',
      unread: true
    }
  },
  {
    id: 2,
    name: 'Mobile App Project',
    type: 'group',
    avatar: 'https://via.placeholder.com/40/10B981/FFFFFF?text=MA',
    members: ['John Doe', 'Alex Brown', 'Lisa Taylor'],
    lastMessage: {
      sender: 'Alex Brown',
      text: 'The API integration is complete',
      time: 'Yesterday',
      unread: false
    }
  },
  {
    id: 3,
    name: 'Jane Smith',
    type: 'direct',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    online: true,
    lastMessage: {
      sender: 'Jane Smith',
      text: 'Can we discuss the design changes?',
      time: 'Yesterday',
      unread: false
    }
  },
  {
    id: 4,
    name: 'Mike Johnson',
    type: 'direct',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    online: true,
    lastMessage: {
      sender: 'You',
      text: 'Ill check the backend issue',
      time: 'Monday',
      unread: false
    }
  },
  {
    id: 5,
    name: 'Sarah Williams',
    type: 'direct',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    online: false,
    lastMessage: {
      sender: 'Sarah Williams',
      text: 'The client approved the proposal',
      time: 'Monday',
      unread: false
    }
  }
];

const initialMessages = [
  {
    id: 1,
    sender: {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    text: 'Good morning team! I ve finished the homepage redesign. Can you take a look?',
    time: '9:30 AM',
    attachment: null
  },
  {
    id: 2,
    sender: {
      id: 3,
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    text: 'Looks great! I especially like the new navigation.',
    time: '9:45 AM',
    attachment: null
  },
  {
    id: 3,
    sender: {
      id: 1,
      name: 'You',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    text: 'I agree. The color scheme works really well with our brand guidelines.',
    time: '10:15 AM',
    attachment: null
  },
  {
    id: 4,
    sender: {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    text: 'Thanks! I ve also prepared the mobile version. Heres a preview:',
    time: '10:30 AM',
    attachment: {
      type: 'image',
      url: 'https://via.placeholder.com/300x200/E2E8F0/475569?text=Mobile+Design+Preview',
      name: 'mobile-design-preview.jpg'
    }
  },
  {
    id: 5,
    sender: {
      id: 4,
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    text: 'I just pushed the new navbar component to the repository. You can pull the latest changes.',
    time: '10:42 AM',
    attachment: null
  }
];

export default function ChatInterface() {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(initialChats[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: {
        id: 1,
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment: null
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Chat List */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Messages</h2>
          <div className="mt-3 relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-grow">
          {filteredChats.map(chat => (
            <div 
              key={chat.id} 
              className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${activeChat.id === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="relative">
                <img 
                  src={chat.avatar} 
                  alt={chat.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.type === 'direct' && chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                )}
              </div>
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800 dark:text-white">{chat.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{chat.lastMessage.time}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[180px]">
                    {chat.lastMessage.sender !== 'You' ? `${chat.lastMessage.sender}: ` : ''}
                    {chat.lastMessage.text}
                  </p>
                  {chat.lastMessage.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col">
        {/* Chat Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={activeChat.avatar} 
              alt={activeChat.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="font-medium text-gray-800 dark:text-white">{activeChat.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activeChat.type === 'group' 
                  ? `${activeChat.members.length} members` 
                  : activeChat.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <FaPhone />
            </button>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <FaVideo />
            </button>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <FaEllipsisV />
            </button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender.name === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender.name !== 'You' && (
                  <img 
                    src={message.sender.avatar} 
                    alt={message.sender.name} 
                    className="w-8 h-8 rounded-full object-cover mr-2 mt-1"
                  />
                )}
                <div className="max-w-[70%]">
                  {message.sender.name !== 'You' && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{message.sender.name}</p>
                  )}
                  <div 
                    className={`p-3 rounded-lg ${message.sender.name === 'You' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'}`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.attachment && (
                      <div className="mt-2">
                        {message.attachment.type === 'image' && (
                          <img 
                            src={message.attachment.url} 
                            alt={message.attachment.name} 
                            className="rounded-lg max-w-full h-auto"
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{message.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message Input */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-3">
              <FaPaperclip />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-grow py-2 px-4 bg-gray-100 dark:bg-gray-700 border-0 rounded-full text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ml-3">
              <FaSmile />
            </button>
            <button 
              className="ml-3 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
