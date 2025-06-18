import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaLock, FaCamera, FaEdit, 
  FaHistory, FaChartLine, FaCalendarAlt, FaShieldAlt,
  FaBell, FaCog, FaSignOutAlt, FaCheckCircle, FaExclamationCircle,
  FaUserCog, FaKey, FaToggleOn, FaToggleOff, FaDownload, FaTrash,
  FaFileAlt, FaClipboardList, FaUsers, FaProjectDiagram
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

export default function UserProfile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-avatar.png');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    phone: '',
    location: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: true,
    twoFactorAuth: false,
    darkMode: true,
    emailUpdates: true
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Activity data
  const recentActivity = [
    { id: 1, action: 'Completed task', target: 'Design Homepage Mockup', time: '2 hours ago' },
    { id: 2, action: 'Commented on', target: 'Marketing Campaign', time: '3 hours ago' },
    { id: 3, action: 'Uploaded file to', target: 'Project Documentation', time: '5 hours ago' },
    { id: 4, action: 'Started task', target: 'User Research', time: '1 day ago' },
    { id: 5, action: 'Joined project', target: 'Website Redesign', time: '2 days ago' },
  ];

  // Project statistics
  const statistics = [
    { label: 'Projects', value: 5, icon: <FaProjectDiagram className="text-blue-500" /> },
    { label: 'Tasks Completed', value: 27, icon: <FaCheckCircle className="text-green-500" /> },
    { label: 'Files Shared', value: 14, icon: <FaFileAlt className="text-purple-500" /> },
    { label: 'Hours Logged', value: 124, icon: <FaHistory className="text-orange-500" /> },
  ];

  // Projects data
  const projects = [
    { id: 1, name: 'Website Redesign', progress: 75, tasks: 12, completed: 9 },
    { id: 2, name: 'Mobile App Development', progress: 40, tasks: 20, completed: 8 },
    { id: 3, name: 'Marketing Campaign', progress: 90, tasks: 8, completed: 7 },
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setFormData({
          ...formData,
          name: user.name || '',
          email: user.email || '',
          role: user.role || 'user',
          bio: 'UI/UX Designer with 3 years of experience in creating user-centered designs for web and mobile applications.',
          phone: '+1 (555) 123-4567',
          location: 'New York, USA'
        });
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call updateProfile here
      // await updateProfile({ name: formData.name, email: formData.email, bio: formData.bio, phone: formData.phone, location: formData.location });
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call an API to change password
      // await updatePassword(formData.currentPassword, formData.newPassword);
      
      setSuccess('Password changed successfully!');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError('Failed to change password. Please check your current password.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Profile Card & Navigation */}
                <div className="lg:w-1/3">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden"
                  >
                    {/* Profile Header */}
                    <div className="relative">
                      <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="relative">
                          <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full border-4 border-gray-800 object-cover"
                          />
                          <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors duration-200">
                            <FaCamera className="text-white" />
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Profile Info */}
                    <div className="pt-20 pb-6 px-6 text-center">
                      <h1 className="text-2xl font-bold">{formData.name}</h1>
                      <p className="text-blue-400 font-medium mt-1 capitalize">{formData.role}</p>
                      <p className="text-gray-400 mt-1">{formData.email}</p>
                      
                      <div className="mt-6 flex justify-center space-x-3">
                        <button 
                          onClick={() => {
                            setActiveTab('personal');
                            setIsEditing(true);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                        >
                          <FaEdit className="mr-2" /> Edit Profile
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center"
                        >
                          <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                      </div>
                    </div>
                    
                    {/* Navigation Tabs */}
                    <div className="border-t border-gray-700">
                      <nav className="px-4 py-2">
                        <button 
                          onClick={() => setActiveTab('personal')}
                          className={`w-full text-left px-4 py-3 rounded-lg flex items-center mb-1 ${activeTab === 'personal' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                        >
                          <FaUser className="mr-3" /> Personal Information
                        </button>
                        <button 
                          onClick={() => setActiveTab('projects')}
                          className={`w-full text-left px-4 py-3 rounded-lg flex items-center mb-1 ${activeTab === 'projects' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                        >
                          <FaProjectDiagram className="mr-3" /> My Projects
                        </button>
                        <button 
                          onClick={() => setActiveTab('security')}
                          className={`w-full text-left px-4 py-3 rounded-lg flex items-center mb-1 ${activeTab === 'security' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                        >
                          <FaShieldAlt className="mr-3" /> Security
                        </button>
                        <button 
                          onClick={() => setActiveTab('activity')}
                          className={`w-full text-left px-4 py-3 rounded-lg flex items-center mb-1 ${activeTab === 'activity' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                        >
                          <FaHistory className="mr-3" /> Activity History
                        </button>
                        <button 
                          onClick={() => setActiveTab('settings')}
                          className={`w-full text-left px-4 py-3 rounded-lg flex items-center mb-1 ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                        >
                          <FaCog className="mr-3" /> Settings
                        </button>
                      </nav>
                    </div>
                  </motion.div>
                  
                  {/* Statistics Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 mt-6 p-6"
                  >
                    <h2 className="text-xl font-bold mb-4">Statistics</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {statistics.map((stat, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">{stat.label}</span>
                            {stat.icon}
                          </div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                {/* Right Column - Content */}
                <div className="lg:w-2/3">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6"
                  >
                    {/* Personal Information Tab */}
                    {activeTab === 'personal' && (
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-bold">Personal Information</h2>
                          {!isEditing && (
                            <button 
                              onClick={() => setIsEditing(true)}
                              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm"
                            >
                              <FaEdit className="mr-1" /> Edit
                            </button>
                          )}
                        </div>
                        
                        {error && (
                          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg flex items-center">
                            <FaExclamationCircle className="text-red-500 mr-2" />
                            <p className="text-red-400">{error}</p>
                          </div>
                        )}
                        
                        {success && (
                          <div className="mb-4 p-3 bg-green-900/30 border border-green-800 rounded-lg flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            <p className="text-green-400">{success}</p>
                          </div>
                        )}
                        
                        {isEditing ? (
                          <form onSubmit={handlePersonalInfoSubmit}>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-gray-400 mb-1">Full Name</label>
                                <div className="relative">
                                  <FaUser className="absolute left-3 top-3 text-gray-500" />
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-gray-400 mb-1">Email Address</label>
                                <div className="relative">
                                  <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-gray-400 mb-1">Bio</label>
                                <textarea
                                  name="bio"
                                  value={formData.bio}
                                  onChange={handleInputChange}
                                  className="w-full bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                ></textarea>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-gray-400 mb-1">Phone Number</label>
                                  <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-gray-400 mb-1">Location</label>
                                  <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-gray-400 mb-1">Role</label>
                                <div className="relative">
                                  <FaUserCog className="absolute left-3 top-3 text-gray-500" />
                                  <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    className="w-full bg-gray-700 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex space-x-3">
                              <button 
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                              >
                                Save Changes
                              </button>
                              <button 
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400 text-sm mb-1">Full Name</p>
                                <div className="flex items-center">
                                  <FaUser className="text-blue-500 mr-2" />
                                  <p className="font-medium">{formData.name}</p>
                                </div>
                              </div>
                              
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400 text-sm mb-1">Email Address</p>
                                <div className="flex items-center">
                                  <FaEnvelope className="text-blue-500 mr-2" />
                                  <p className="font-medium">{formData.email}</p>
                                </div>
                              </div>
                              
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400 text-sm mb-1">Phone Number</p>
                                <div className="flex items-center">
                                  <FaBell className="text-blue-500 mr-2" />
                                  <p className="font-medium">{formData.phone}</p>
                                </div>
                              </div>
                              
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400 text-sm mb-1">Location</p>
                                <div className="flex items-center">
                                  <FaCalendarAlt className="text-blue-500 mr-2" />
                                  <p className="font-medium">{formData.location}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-700 p-4 rounded-lg">
                              <p className="text-gray-400 text-sm mb-1">Bio</p>
                              <p className="mt-2">{formData.bio}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Projects Tab */}
                    {activeTab === 'projects' && (
                      <div>
                        <h2 className="text-xl font-bold mb-6">My Projects</h2>
                        
                        <div className="space-y-6">
                          {projects.map(project => (
                            <div key={project.id} className="bg-gray-700 rounded-lg p-6">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">{project.name}</h3>
                                <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                                  View Details
                                </button>
                              </div>
                              
                              <div className="mb-4">
                                <div className="flex justify-between mb-1">
                                  <span className="text-gray-400 text-sm">Progress</span>
                                  <span className="text-gray-400 text-sm">{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-600 rounded-full h-2.5">
                                  <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <div className="flex items-center">
                                  <FaClipboardList className="text-gray-400 mr-1" />
                                  <span>{project.tasks} Tasks</span>
                                </div>
                                <div className="flex items-center">
                                  <FaCheckCircle className="text-green-500 mr-1" />
                                  <span>{project.completed} Completed</span>
                                </div>
                                <div className="flex items-center">
                                  <FaUsers className="text-blue-500 mr-1" />
                                  <span>5 Members</span>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            View All Projects
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Security Tab */}
                    {activeTab === 'security' && (
                      <div>
                        <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                        
                        {error && (
                          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg flex items-center">
                            <FaExclamationCircle className="text-red-500 mr-2" />
                            <p className="text-red-400">{error}</p>
                          </div>
                        )}
                        
                        {success && (
                          <div className="mb-4 p-3 bg-green-900/30 border border-green-800 rounded-lg flex items-center">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            <p className="text-green-400">{success}</p>
                          </div>
                        )}
                        
                        <div className="bg-gray-700 p-6 rounded-lg mb-6">
                          <h3 className="text-lg font-medium mb-4">Change Password</h3>
                          <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                              <label className="block text-gray-400 mb-1">Current Password</label>
                              <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-500" />
                                <input
                                  type="password"
                                  name="currentPassword"
                                  value={formData.currentPassword}
                                  onChange={handleInputChange}
                                  className="w-full bg-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-gray-400 mb-1">New Password</label>
                              <div className="relative">
                                <FaKey className="absolute left-3 top-3 text-gray-500" />
                                <input
                                  type="password"
                                  name="newPassword"
                                  value={formData.newPassword}
                                  onChange={handleInputChange}
                                  className="w-full bg-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  required
                                  minLength="6"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-gray-400 mb-1">Confirm New Password</label>
                              <div className="relative">
                                <FaKey className="absolute left-3 top-3 text-gray-500" />
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  value={formData.confirmPassword}
                                  onChange={handleInputChange}
                                  className="w-full bg-gray-600 text-white p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  required
                                  minLength="6"
                                />
                              </div>
                            </div>
                            
                            <button 
                              type="submit"
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                              Update Password
                            </button>
                          </form>
                        </div>
                        
                        <div className="bg-gray-700 p-6 rounded-lg">
                          <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-300">Add an extra layer of security to your account</p>
                              <p className="text-gray-400 text-sm mt-1">We'll send a verification code to your phone when you sign in</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                name="twoFactorAuth"
                                checked={formData.twoFactorAuth}
                                onChange={handleInputChange}
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Activity History Tab */}
                    {activeTab === 'activity' && (
                      <div>
                        <h2 className="text-xl font-bold mb-6">Activity History</h2>
                        
                        <div className="bg-gray-700 rounded-lg overflow-hidden">
                          <div className="p-4 border-b border-gray-600 flex justify-between items-center">
                            <h3 className="font-medium">Recent Activities</h3>
                            <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors duration-200">
                              View All
                            </button>
                          </div>
                          
                          <div className="divide-y divide-gray-600">
                            {recentActivity.map((activity) => (
                              <div key={activity.id} className="p-4 hover:bg-gray-600 transition-colors duration-200">
                                <div className="flex items-start">
                                  <div className="bg-blue-600 p-2 rounded-lg mr-3">
                                    <FaHistory className="text-white" />
                                  </div>
                                  <div>
                                    <p className="text-gray-200">
                                      <span className="font-medium">You</span> {activity.action} <span className="text-blue-400">{activity.target}</span>
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">{activity.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="p-4 border-t border-gray-600">
                            <button className="w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200">
                              Load More
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-6 bg-gray-700 rounded-lg p-6">
                          <h3 className="text-lg font-medium mb-4">Login History</h3>
                          <div className="space-y-4">
                            {[
                              { device: 'Windows PC', browser: 'Chrome', ip: '192.168.1.1', location: 'New York, USA', time: 'Today, 10:30 AM' },
                              { device: 'MacBook Pro', browser: 'Safari', ip: '192.168.1.2', location: 'New York, USA', time: 'Yesterday, 8:45 PM' },
                              { device: 'iPhone 13', browser: 'Safari Mobile', ip: '192.168.1.3', location: 'New York, USA', time: '3 days ago, 2:15 PM' },
                            ].map((login, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                                <div>
                                  <p className="font-medium">{login.device} • {login.browser}</p>
                                  <p className="text-sm text-gray-400">{login.ip} • {login.location}</p>
                                </div>
                                <p className="text-sm text-gray-400">{login.time}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                      <div>
                        <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                        
                        <div className="space-y-6">
                          <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-lg font-medium mb-4">Notifications</h3>
                            
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-gray-300">Email Notifications</p>
                                  <p className="text-gray-400 text-sm mt-1">Receive project updates via email</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    name="emailUpdates"
                                    checked={formData.emailUpdates}
                                    onChange={handleInputChange}
                                    className="sr-only peer" 
                                  />
                                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-gray-300">Push Notifications</p>
                                  <p className="text-gray-400 text-sm mt-1">Receive notifications in the app</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    name="notifications"
                                    checked={formData.notifications}
                                    onChange={handleInputChange}
                                    className="sr-only peer" 
                                  />
                                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-lg font-medium mb-4">Appearance</h3>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-300">Dark Mode</p>
                                <p className="text-gray-400 text-sm mt-1">Use dark theme across the application</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  name="darkMode"
                                  checked={formData.darkMode}
                                  onChange={handleInputChange}
                                  className="sr-only peer" 
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          </div>
                          
                          <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-lg font-medium mb-4">Data Management</h3>
                            
                            <div className="space-y-4">
                              <button className="w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200 flex items-center justify-center">
                                <FaDownload className="mr-2" /> Export Your Data
                              </button>
                              
                              <button className="w-full py-2 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900/70 transition-colors duration-200 flex items-center justify-center">
                                <FaTrash className="mr-2" /> Delete Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}