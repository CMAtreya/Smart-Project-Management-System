import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartBar, FaClipboardCheck, FaCalendarAlt } from 'react-icons/fa';

// Import the common Navbar component
import Navbar from '../../components/Navbar';

// Card component definition with motion
function Card({ children, className }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
      className={`p-6 bg-gray-800 shadow-xl rounded-xl border border-gray-700 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

function ChartPage() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('kanban');
  const kanbanData = [
    { title: 'To Do', tasks: ['Task 1', 'Task 2'], color: 'bg-yellow-500', icon: <FaClipboardCheck className="text-yellow-400" /> },
    { title: 'In Progress', tasks: ['Task 3'], color: 'bg-blue-500', icon: <FaCalendarAlt className="text-blue-400" /> },
    { title: 'Done', tasks: ['Task 4', 'Task 5'], color: 'bg-green-500', icon: <FaChartBar className="text-green-400" /> }
  ];
  const ganttData = [
    { task: 'Task 1', start: 0, end: 3, color: 'bg-blue-500' },
    { task: 'Task 2', start: 2, end: 5, color: 'bg-green-500' },
    { task: 'Task 3', start: 4, end: 8, color: 'bg-purple-500' },
    { task: 'Task 4', start: 6, end: 10, color: 'bg-yellow-500' }
  ];

  // Simulate loading
  useEffect(() => {
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
                <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                <div className="flex space-x-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('kanban')} 
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${view === 'kanban' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    Kanban View
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('gantt')} 
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${view === 'gantt' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    Gantt View
                  </motion.button>
                </div>
              </div>

              {/* Chart Overview Card */}
              <Card className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-900/30 p-3 rounded-lg mr-3">
                    <FaChartBar className="text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold">Chart Overview</h2>
                </div>
                <p className="text-gray-300 mb-4">This dashboard provides visual analytics of your project and task data.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Total Tasks</span>
                      <span className="text-lg font-bold">16</span>
                    </div>
                    <div className="w-full bg-gray-600 h-1 mt-2 rounded-full">
                      <div className="bg-blue-500 h-1 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Completion Rate</span>
                      <span className="text-lg font-bold">68%</span>
                    </div>
                    <div className="w-full bg-gray-600 h-1 mt-2 rounded-full">
                      <div className="bg-green-500 h-1 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Overdue Tasks</span>
                      <span className="text-lg font-bold">3</span>
                    </div>
                    <div className="w-full bg-gray-600 h-1 mt-2 rounded-full">
                      <div className="bg-red-500 h-1 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Kanban View */}
              {view === 'kanban' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {kanbanData.map((column, index) => (
                    <Card key={index}>
                      <div className="flex items-center mb-4">
                        <div className="bg-gray-700 p-2 rounded-lg mr-2">
                          {column.icon}
                        </div>
                        <h3 className="font-bold">{column.title}</h3>
                        <span className="ml-auto bg-gray-700 px-2 py-1 rounded text-xs">
                          {column.tasks.length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {column.tasks.map((task, i) => (
                          <motion.div 
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="p-3 bg-gray-700 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                          >
                            <p className="font-medium">{task}</p>
                            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                              <span>Due: Oct 30</span>
                              <span>Priority: Medium</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </motion.div>
              )}

              {/* Gantt View */}
              {view === 'gantt' && (
                <Card>
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-900/30 p-3 rounded-lg mr-3">
                      <FaCalendarAlt className="text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold">Project Timeline</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {ganttData.map((item, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium">{item.task}</p>
                          <span className="text-xs text-gray-400">Days: {item.start} - {item.end}</span>
                        </div>
                        <div className="relative h-8 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${(item.end - item.start) * 10}%`,
                              x: `${item.start * 10}%`
                            }}
                            transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                            className={`${item.color} h-full rounded-lg absolute top-0 left-0`}
                          ></motion.div>
                        </div>
                      </motion.div>
                    ))}
                    <div className="flex justify-between text-xs text-gray-400 pt-2 px-1">
                      {[...Array(11).keys()].map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
              
              {/* Bottom Section - Aligned in the same line */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card className="md:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-900/30 p-3 rounded-lg mr-3">
                      <FaChartBar className="text-purple-400" />
                    </div>
                    <h2 className="text-lg font-bold">Weekly Progress</h2>
                  </div>
                  <div className="space-y-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">{day}</span>
                          <span className="text-xs text-gray-500">{Math.floor(Math.random() * 10) + 1} tasks</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(idx + 1) * 15 + 10}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${idx % 2 === 0 ? "bg-blue-500" : "bg-purple-500"}`}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-900/30 p-3 rounded-lg mr-3">
                      <FaClipboardCheck className="text-green-400" />
                    </div>
                    <h2 className="text-lg font-bold">Completion</h2>
                  </div>
                  <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-700 stroke-current"
                          strokeWidth="10"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                        ></circle>
                        <circle
                          className="text-green-500 stroke-current"
                          strokeWidth="10"
                          strokeLinecap="round"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeDasharray="251.2"
                          strokeDashoffset="75.36"
                          transform="rotate(-90 50 50)"
                        ></circle>
                      </svg>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <span className="text-2xl font-bold">70%</span>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-300 text-sm">Overall Completion</p>
                  </div>
                </Card>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChartPage;