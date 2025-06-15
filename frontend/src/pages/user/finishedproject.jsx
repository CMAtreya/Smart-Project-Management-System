import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaUsers, FaCalendarAlt, FaCode, FaBuilding, FaCheckCircle, FaSearch, FaFilter, FaChartLine, FaTrophy, FaProjectDiagram } from "react-icons/fa";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-xl font-semibold text-white">Loading...</p>
    </div>
  </div>
);

const FinishedProject = () => {
  const [loading, setLoading] = useState(true);
  const [featuredProject, setFeaturedProject] = useState({
    title: "AI-Powered Car Recommender System",
    description: "Integrates 3D models, voice search and live chat for an immersive car shopping experience.",
    image: "https://source.unsplash.com/random/800x400?technology",
    tags: ["AI", "Chatbot", "3D Models"],
    completion: "May 5, 2023",
    client: "AutoDrive Inc."
  });
  
  const [topPerformers, setTopPerformers] = useState([
    { name: "Meena", role: "Frontend", projects: 12 },
    { name: "Akash", role: "Backend", projects: 10 },
    { name: "Priya", role: "Full Stack", projects: 9 },
    { name: "Rahul", role: "UI/UX", projects: 8 },
  ]);
  
  const [monthlyCompletion, setMonthlyCompletion] = useState([
    { month: "Jan", count: 8, percentage: 68 },
    { month: "Feb", count: 10, percentage: 76 },
    { month: "Mar", count: 12, percentage: 84 },
    { month: "Apr", count: 15, percentage: 92 },
    { month: "May", count: 13, percentage: 88 },
  ]);
  
  const [recentProjects, setRecentProjects] = useState([
    { name: "Smart Agriculture System", date: "May 12", client: "FarmTech Solutions" },
    { name: "E-Commerce Web App", date: "May 3", client: "RetailGiant" },
    { name: "Fitness Tracker API", date: "Apr 24", client: "HealthFirst" },
    { name: "Educational Platform", date: "Apr 15", client: "LearnQuest Academy" },
    { name: "Restaurant Management System", date: "Apr 8", client: "FoodChain Inc." },
  ]);
  
  const [projectsByCategory, setProjectsByCategory] = useState([
    { category: "Web Development", count: 24 },
    { category: "Mobile Apps", count: 16 },
    { category: "AI/ML Solutions", count: 10 },
    { category: "UI/UX Design", count: 8 },
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
                <h1 className="text-2xl font-bold">Finished Projects</h1>
                <div className="flex space-x-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <FaFilter className="mr-2" /> Filter Projects
                  </motion.button>
                </div>
              </div>

              {/* Stats Overview */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
              >
                <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Total Projects</h3>
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FaProjectDiagram className="text-blue-500" size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">58</p>
                  <p className="text-sm text-gray-400 mt-1">Successfully delivered</p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Success Rate</h3>
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FaCheckCircle className="text-green-500" size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2 text-green-400">94%</p>
                  <p className="text-sm text-gray-400 mt-1">Client satisfaction</p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Avg Completion</h3>
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FaCalendarAlt className="text-blue-500" size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2 text-blue-400">32 Days</p>
                  <p className="text-sm text-gray-400 mt-1">From start to finish</p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Team Size</h3>
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FaUsers className="text-purple-500" size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-2">24</p>
                  <p className="text-sm text-gray-400 mt-1">Active team members</p>
                </div>
              </motion.div>

              {/* Featured Project and Top Performers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <FaStar className="text-yellow-400 mr-2" /> Featured Project
                    </h2>
                    <img
                      src={featuredProject.image}
                      alt="Featured Project"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">{featuredProject.title}</h3>
                    <p className="text-gray-300 mb-3">{featuredProject.description}</p>
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <FaBuilding className="mr-1" />
                      <span>{featuredProject.client}</span>
                      <span className="mx-2">•</span>
                      <FaCalendarAlt className="mr-1" />
                      <span>{featuredProject.completion}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-blue-600/30 text-blue-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gray-800 rounded-xl shadow-xl border border-gray-700"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <FaTrophy className="text-yellow-400 mr-2" /> Top Performers
                    </h2>
                    <div className="space-y-4">
                      {topPerformers.map((performer, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center font-bold mr-3">
                              {performer.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{performer.name}</p>
                              <p className="text-xs text-gray-400">{performer.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-green-400 font-semibold">{performer.projects}</span>
                            <span className="text-gray-400 text-sm ml-1">projects</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Project Completion and Recent Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gray-800 rounded-xl shadow-xl border border-gray-700"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <FaChartLine className="text-blue-400 mr-2" /> Project Completion
                    </h2>
                    <div className="space-y-4">
                      {monthlyCompletion.map((month, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm">{month.month}</p>
                            <div className="flex items-center">
                              <span className="text-sm font-medium">{month.count}</span>
                              <span className="text-xs text-gray-400 ml-1">projects</span>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${month.percentage}%` }}
                              transition={{ duration: 1, delay: 0.1 * idx }}
                              className={`h-full rounded-full ${idx % 2 === 0 ? "bg-green-500" : "bg-blue-500"}`}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gray-800 rounded-xl shadow-xl border border-gray-700"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <FaProjectDiagram className="text-purple-400 mr-2" /> Recent Projects
                    </h2>
                    <div className="divide-y divide-gray-700">
                      {recentProjects.map((project, index) => (
                        <motion.div 
                          key={index} 
                          className="py-3 flex justify-between items-center"
                          whileHover={{ x: 5 }}
                        >
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-xs text-gray-400">{project.client}</p>
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <FaCalendarAlt className="mr-1" size={12} />
                            <span>{project.date}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Project Categories */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <h2 className="text-xl font-bold mb-4">Project Categories</h2>
                  
                  <div className="space-y-4">
                    {projectsByCategory.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span>{category.category}</span>
                          <span>{category.count} projects</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-full rounded-full ${index % 4 === 0 ? 'bg-blue-500' : index % 4 === 1 ? 'bg-green-500' : index % 4 === 2 ? 'bg-purple-500' : 'bg-yellow-500'}`} 
                            style={{ width: `${(category.count / 24) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Client Satisfaction */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <h2 className="text-xl font-bold mb-4">Client Satisfaction</h2>
                  
                  <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)]">
                    <div className="relative w-40 h-40 mb-4">
                      <div className="w-full h-full rounded-full bg-gray-700"></div>
                      <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500 border-t-transparent border-l-transparent border-r-transparent transform -rotate-45"></div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                        <span className="text-4xl font-bold text-green-400">94%</span>
                        <span className="text-sm text-gray-400">Satisfied</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-300">Based on feedback from 120+ clients</p>
                      <div className="flex justify-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 mx-0.5" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Team Efficiency */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <h2 className="text-xl font-bold mb-4">Team Efficiency</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>On-time Delivery</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Budget Adherence</span>
                        <span>88%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Code Quality</span>
                        <span>95%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Team Collaboration</span>
                        <span>90%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinishedProject;