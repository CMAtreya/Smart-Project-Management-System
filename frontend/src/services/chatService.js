<<<<<<< HEAD
// Chat Service for Communication Hub
class ChatService {
  constructor() {
    this.messages = [];
    this.users = new Map();
    this.channels = new Map();
    this.currentUser = null;
    this.messageIdCounter = 0;
    this.isInitialized = false;
    this.eventListeners = new Set();
  }

  // Generate truly unique message ID
  generateUniqueId() {
    this.messageIdCounter++;
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `msg_${timestamp}_${this.messageIdCounter}_${random}`;
  }

  // Initialize chat service with user and task data
  async initialize(userId, userRole, userTasks, allTasks) {
    try {
      this.currentUser = {
        id: userId,
        role: userRole,
        tasks: userTasks || [],
        name: 'Current User',
        avatar: 'U'
      };

      // Create channels based on task assignments
      this.createTaskBasedChannels(allTasks, userTasks);
      
      // Add some initial messages
      this.addInitialMessages();
      
      this.isInitialized = true;
      
      return {
        success: true,
        user: this.currentUser,
        availableChannels: this.getAvailableChannels(),
        messages: this.messages
      };
    } catch (error) {
      console.error('Chat service initialization error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create channels based on task assignments
  createTaskBasedChannels(allTasks, userTasks) {
    // Clear existing channels
    this.channels.clear();
    
    // Always add admin chat and general
    this.channels.set('admin-chat', {
      id: 'admin-chat',
      name: 'Admin Chat',
      type: 'private',
      online: 1,
      unread: 0,
      members: ['admin']
    });

    this.channels.set('general', {
      id: 'general',
      name: 'General',
      type: 'public',
      online: 12,
      unread: 3,
      members: ['all']
    });

    // Create task-specific channels
    const taskTypes = new Set();
    
    // Analyze user's tasks to determine channel types
    userTasks.forEach(taskId => {
      const task = allTasks.find(t => t._id === taskId || t.id === taskId);
      if (task) {
        const title = task.title.toLowerCase();
        if (title.includes('develop') || title.includes('code') || title.includes('programming')) {
          taskTypes.add('development');
        } else if (title.includes('design') || title.includes('ui') || title.includes('ux')) {
          taskTypes.add('design');
        } else if (title.includes('market') || title.includes('promote') || title.includes('advertise')) {
          taskTypes.add('marketing');
        } else if (title.includes('test') || title.includes('qa') || title.includes('quality')) {
          taskTypes.add('qa');
        } else if (title.includes('support') || title.includes('help') || title.includes('customer')) {
          taskTypes.add('support');
        } else if (title.includes('deploy') || title.includes('devops') || title.includes('infrastructure')) {
          taskTypes.add('devops');
        }
      }
    });

    // Add task-specific channels
    taskTypes.forEach(type => {
      const channelMembers = this.getChannelMembersForTaskType(type, allTasks);
      this.channels.set(type, {
        id: type,
        name: this.getChannelDisplayName(type),
        type: 'public',
        online: channelMembers.length,
        unread: Math.floor(Math.random() * 5),
        members: channelMembers.map(m => m.id),
        requiredTask: type,
        taskCount: channelMembers.length,
        members: channelMembers
      });
    });
  }

  // Get channel display name
  getChannelDisplayName(type) {
    const names = {
      'development': 'Development',
      'design': 'Design Team',
      'marketing': 'Marketing',
      'qa': 'Quality Assurance',
      'support': 'Customer Support',
      'devops': 'DevOps'
    };
    return names[type] || type.charAt(0).toUpperCase() + type.slice(1);
  }

  // Get channel members for a specific task type
  getChannelMembersForTaskType(taskType, allTasks) {
    const members = new Map();
    
    allTasks.forEach(task => {
      const title = task.title.toLowerCase();
      let matchesType = false;
      
      switch (taskType) {
        case 'development':
          matchesType = title.includes('develop') || title.includes('code') || title.includes('programming');
          break;
        case 'design':
          matchesType = title.includes('design') || title.includes('ui') || title.includes('ux');
          break;
        case 'marketing':
          matchesType = title.includes('market') || title.includes('promote') || title.includes('advertise');
          break;
        case 'qa':
          matchesType = title.includes('test') || title.includes('qa') || title.includes('quality');
          break;
        case 'support':
          matchesType = title.includes('support') || title.includes('help') || title.includes('customer');
          break;
        case 'devops':
          matchesType = title.includes('deploy') || title.includes('devops') || title.includes('infrastructure');
          break;
      }
      
      if (matchesType && task.assignedTo) {
        const userId = typeof task.assignedTo === 'object' ? task.assignedTo._id : task.assignedTo;
        if (!members.has(userId)) {
          members.set(userId, {
            id: userId,
            name: task.assignedTo.name || `User ${userId.slice(-4)}`,
            role: task.assignedTo.role || 'Developer',
            avatar: (task.assignedTo.name || 'U').charAt(0).toUpperCase(),
            isOnline: Math.random() > 0.3,
            tasks: [task._id || task.id]
          });
        } else {
          members.get(userId).tasks.push(task._id || task.id);
        }
      }
    });
    
    return Array.from(members.values());
  }

  // Add initial messages
  addInitialMessages() {
    const adminMessage = {
      id: this.generateUniqueId(),
      message: "Welcome to the Communication Hub! I'm here to help you collaborate with your team. Feel free to ask questions or start a conversation.",
      sender: 'admin',
      senderName: 'System Admin',
      senderAvatar: 'A',
      timestamp: this.formatTimestamp(new Date()),
      status: 'read',
      isAdmin: true,
      type: 'text'
    };

    const generalMessage = {
      id: this.generateUniqueId(),
      message: "Hey team! Great to see everyone here. Let's make this project amazing! 🚀",
      sender: 'user1',
      senderName: 'Team Lead',
      senderAvatar: 'T',
      timestamp: this.formatTimestamp(new Date(Date.now() - 300000)),
      status: 'read',
      isAdmin: false,
      type: 'text'
    };

    this.messages = [adminMessage, generalMessage];
  }

  // Send a message
  async sendMessage(messageText) {
    if (!this.isInitialized) {
      return { success: false, error: 'Chat service not initialized' };
    }

    try {
      const newMessage = {
        id: this.generateUniqueId(),
        message: messageText,
        sender: this.currentUser.id,
        senderName: this.currentUser.name,
        senderAvatar: this.currentUser.avatar,
        timestamp: this.formatTimestamp(new Date()),
        status: 'sent',
        isAdmin: false,
        type: 'text'
      };

      this.messages.push(newMessage);
      
      // Simulate message delivery and read status
      setTimeout(() => {
        newMessage.status = 'delivered';
        this.notifyListeners();
      }, 1000);

      setTimeout(() => {
        newMessage.status = 'read';
        this.notifyListeners();
      }, 2000);

      // Simulate admin response for certain keywords
      if (messageText.toLowerCase().includes('help') || messageText.toLowerCase().includes('support')) {
        setTimeout(() => {
          const adminResponse = {
            id: this.generateUniqueId(),
            message: "I'm here to help! What specific assistance do you need?",
            sender: 'admin',
            senderName: 'System Admin',
            senderAvatar: 'A',
            timestamp: this.formatTimestamp(new Date()),
            status: 'sent',
            isAdmin: true,
            type: 'text'
          };
          this.messages.push(adminResponse);
          this.notifyListeners();
        }, 3000);
      }

      this.notifyListeners();
      
      return {
        success: true,
        message: newMessage
      };
    } catch (error) {
      console.error('Send message error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get all messages
  getMessages() {
    return [...this.messages];
  }

  // Get available channels
  getAvailableChannels() {
    return Array.from(this.channels.values());
  }

  // Get team members for a specific channel
  getTeamMembersForChannel(channelId) {
    const channel = this.channels.get(channelId);
    if (!channel) return [];

    if (channelId === 'admin-chat') {
      return [{
        id: 'admin',
        name: 'System Admin',
        role: 'Administrator',
        avatar: 'A',
        isOnline: true,
        tasks: []
      }];
    }

    if (channelId === 'general') {
      return [
        {
          id: 'user1',
          name: 'Team Lead',
          role: 'Project Manager',
          avatar: 'T',
          isOnline: true,
          tasks: []
        },
        {
          id: 'user2',
          name: 'Senior Developer',
          role: 'Lead Developer',
          avatar: 'S',
          isOnline: true,
          tasks: []
        },
        {
          id: 'user3',
          name: 'UI Designer',
          role: 'Design Lead',
          avatar: 'U',
          isOnline: false,
          tasks: []
        }
      ];
    }

    return channel.members || [];
  }

  // Mark message as read
  markAsRead(messageId) {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      message.status = 'read';
      this.notifyListeners();
    }
  }

  // Format timestamp
  formatTimestamp(date) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  // Notify listeners of updates
  notifyListeners() {
    this.eventListeners.forEach(listener => {
      try {
        listener({
          messages: this.messages,
          channels: this.getAvailableChannels()
        });
      } catch (error) {
        console.error('Error notifying listener:', error);
      }
    });

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('chatMessageUpdate', {
      detail: {
        messages: this.messages,
        channels: this.getAvailableChannels()
      }
    }));
  }

  // Disconnect service
  disconnect() {
    this.eventListeners.clear();
    this.isInitialized = false;
  }
}

// Create singleton instance
const chatService = new ChatService();
export default chatService; 
=======
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMessages = async (room) => {
  const res = await axios.get(`${API_URL}/messages/${room}`);
  return res.data;
};

export const saveMessages = async (room, messages) => {
  const res = await axios.post(`${API_URL}/messages`, { room, messages });
  return res.data;
};
>>>>>>> 5720e7de493f212afaee0d8037779331629de946
