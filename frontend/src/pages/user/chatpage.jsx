import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserFriends, FaPaperPlane, FaSmile, FaPaperclip, FaSearch, FaEllipsisV } from 'react-icons/fa';

// Import the common Navbar component
import Navbar from '../../components/Navbar';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

export default function ChatPage() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      content: "Hey team, how's the progress on the dashboard feature?",
      timestamp: "10:30 AM",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      isRead: true,
    },
    {
      id: 2,
      sender: "Jane Smith",
      content: "I've completed the UI design. Just need to implement the API integration.",
      timestamp: "10:32 AM",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      isRead: true,
    },
    {
      id: 3,
      sender: "Mike Johnson",
      content: "Backend endpoints are ready for testing. Let me know when you're ready to connect.",
      timestamp: "10:35 AM",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      isRead: true,
    },
    {
      id: 4,
      sender: "Sarah Williams",
      content: "I've found a bug in the authentication flow. Let's discuss it in our next meeting.",
      timestamp: "10:40 AM",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      isRead: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [activeChat, setActiveChat] = useState("Team Chat");
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      isRead: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const chatList = [
    { name: "Team Chat", unread: 2, lastMessage: "Backend endpoints are ready...", avatar: "https://randomuser.me/api/portraits/men/1.jpg", isGroup: true },
    { name: "John Doe", unread: 0, lastMessage: "Let me check and get back to you", avatar: "https://randomuser.me/api/portraits/men/1.jpg", isGroup: false },
    { name: "Jane Smith", unread: 1, lastMessage: "The design looks great!", avatar: "https://randomuser.me/api/portraits/women/2.jpg", isGroup: false },
    { name: "Project X Team", unread: 5, lastMessage: "Meeting scheduled for tomorrow", avatar: "https://randomuser.me/api/portraits/men/5.jpg", isGroup: true },
    { name: "Mike Johnson", unread: 0, lastMessage: "Thanks for the update", avatar: "https://randomuser.me/api/portraits/men/3.jpg", isGroup: false },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <AnimatePresence>
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-20 px-6 pb-6"
          >
            <main className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Messages</h1>
                <div className="flex space-x-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <FaUserFriends className="mr-2" /> New Chat
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Chat List */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-1 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-700">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search conversations..." 
                        className="w-full bg-gray-700 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                    {chatList.map((chat, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                        onClick={() => setActiveChat(chat.name)}
                        className={`p-4 border-b border-gray-700 cursor-pointer ${activeChat === chat.name ? 'bg-blue-900/30' : ''}`}
                      >
                        <div className="flex items-start">
                          <div className="relative">
                            <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
                            {chat.isGroup && (
                              <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                                <FaUserFriends size={10} />
                              </div>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{chat.name}</h3>
                              <span className="text-xs text-gray-400">12:30 PM</span>
                            </div>
                            <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                          </div>
                          {chat.unread > 0 && (
                            <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                              {chat.unread}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Chat Window */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-3 bg-gray-800 rounded-xl shadow-xl border border-gray-700 flex flex-col"
                >
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src="https://randomuser.me/api/portraits/men/1.jpg" 
                        alt="Team Chat" 
                        className="w-10 h-10 rounded-full mr-3" 
                      />
                      <div>
                        <h2 className="font-bold">{activeChat}</h2>
                        <p className="text-xs text-gray-400">4 members • 3 online</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button className="text-gray-400 hover:text-white">
                        <FaSearch />
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[calc(100vh-350px)]">
                    {messages.map((message) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        key={message.id}
                        className={`flex ${message.sender === "You" ? "justify-end" : ""}`}
                      >
                        {message.sender !== "You" && (
                          <img
                            src={message.avatar}
                            className="w-10 h-10 rounded-full mr-3"
                            alt={message.sender}
                          />
                        )}
                        <div
                          className={`max-w-md p-3 rounded-lg ${message.sender === "You" ? "bg-blue-600 rounded-br-none" : "bg-gray-700 rounded-bl-none"}`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{message.sender}</span>
                            <span className="text-xs text-gray-300">{message.timestamp}</span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        {message.sender === "You" && (
                          <img
                            src={message.avatar}
                            className="w-10 h-10 rounded-full ml-3"
                            alt={message.sender}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 border-t border-gray-700 flex items-center"
                  >
                    <button type="button" className="text-gray-400 hover:text-white mr-3">
                      <FaSmile size={20} />
                    </button>
                    <button type="button" className="text-gray-400 hover:text-white mr-3">
                      <FaPaperclip size={20} />
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-blue-600 text-white p-3 rounded-lg ml-3 hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FaPaperPlane />
                    </motion.button>
                  </form>
                </motion.div>
              </div>
              
              {/* Bottom Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Recent Activity */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    {[
                      { user: "John Doe", action: "shared a document", time: "2 hours ago", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
                      { user: "Jane Smith", action: "commented on a task", time: "3 hours ago", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
                      { user: "Mike Johnson", action: "completed a milestone", time: "5 hours ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <img src={activity.avatar} alt={activity.user} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Shared Files */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <h2 className="text-xl font-bold mb-4">Shared Files</h2>
                  
                  <div className="space-y-3">
                    {[
                      { name: "Project_Requirements.pdf", size: "2.4 MB", shared_by: "John Doe", date: "Today" },
                      { name: "UI_Mockups.sketch", size: "8.1 MB", shared_by: "Jane Smith", date: "Yesterday" },
                      { name: "API_Documentation.docx", size: "1.8 MB", shared_by: "Mike Johnson", date: "May 10" },
                    ].map((file, index) => (
                      <div key={index} className="p-3 bg-gray-700 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-gray-400">{file.size} • Shared by {file.shared_by}</p>
                        </div>
                        <p className="text-xs text-gray-400">{file.date}</p>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    View All Files
                  </motion.button>
                </motion.div>
                
                {/* Team Members */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <h2 className="text-xl font-bold mb-4">Team Members</h2>
                  
                  <div className="space-y-4">
                    {[
                      { name: "John Doe", role: "Project Manager", status: "Online", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
                      { name: "Jane Smith", role: "UI/UX Designer", status: "Online", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
                      { name: "Mike Johnson", role: "Backend Developer", status: "Online", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
                      { name: "Sarah Williams", role: "Frontend Developer", status: "Offline", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative">
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-gray-800 ${member.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-gray-400">{member.role}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Message
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}