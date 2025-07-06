import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClipboardCheck, FaBell, FaCheckCircle } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import { fetchEvents, createEvent } from '../../services/calendarService';

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);


export default function Calendar() {
  const [loading, setLoading] = useState(true);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', priority: 'Medium' });
  const [creating, setCreating] = useState(false);

  // Fetch events from backend when month or year changes
  useEffect(() => {
    setLoading(true);
    const fetchAllEvents = async () => {
      try {
        const month = currentMonth.getMonth() + 1;
        const year = currentMonth.getFullYear();
        const data = await fetchEvents(month, year);
        setEvents(data);
      } catch (err) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllEvents();
  }, [currentMonth]);

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const calendar = [];
    let dayCount = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || dayCount > daysInMonth) {
          week.push(null);
        } else {
          week.push(dayCount++);
        }
      }
      calendar.push(week);
      if (dayCount > daysInMonth && i < 5) break;
    }
    return calendar;
  };

  const calendar = generateCalendar();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Add Event Modal logic
  const handleAddEvent = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await createEvent(newEvent);
      setShowEventModal(false);
      setNewEvent({ title: '', date: '', priority: 'Medium' });
      // Refetch events after adding
      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();
      const data = await fetchEvents(month, year);
      setEvents(data);
    } catch (err) {
      // Optionally show error
    } finally {
      setCreating(false);
    }
  };

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
                <h1 className="text-2xl font-bold">Calendar</h1>
                <div className="flex space-x-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => setShowEventModal(true)}
                  >
                    Add Event
                  </motion.button>
                </div>
              </div>

              {/* Add Event Modal */}
              {showEventModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <form onSubmit={handleAddEvent} className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700 relative">
                    <button type="button" className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl" onClick={() => setShowEventModal(false)}>&times;</button>
                    <h2 className="text-xl font-bold mb-4">Add Event</h2>
                    <div className="mb-4">
                      <label className="block text-sm mb-1">Title</label>
                      <input type="text" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm mb-1">Description</label>
                      <textarea className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white" value={newEvent.description || ''} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} rows={2} />
                    </div>
                    <div className="mb-4 flex space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm mb-1">Date</label>
                        <input type="date" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} required />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm mb-1">Start Time</label>
                        <input type="time" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white" value={newEvent.startTime || ''} onChange={e => setNewEvent({ ...newEvent, startTime: e.target.value })} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm mb-1">End Time</label>
                        <input type="time" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white" value={newEvent.endTime || ''} onChange={e => setNewEvent({ ...newEvent, endTime: e.target.value })} />
                      </div>
                    </div>
                    <div className="mb-4 flex space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm mb-1">Priority</label>
                        <select className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white" value={newEvent.priority} onChange={e => setNewEvent({ ...newEvent, priority: e.target.value })}>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm mb-1">Location</label>
                        <input type="text" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white" value={newEvent.location || ''} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" disabled={creating}>{creating ? 'Adding...' : 'Add Event'}</button>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Calendar Grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-3 bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div className="bg-blue-900/30 p-3 rounded-lg mr-3">
                        <FaCalendarAlt className="text-blue-400" />
                      </div>
                      <h2 className="text-xl font-bold">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevMonth}
                        className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                      >
                        &lt;
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextMonth}
                        className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                      >
                        &gt;
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 text-center font-semibold mb-4">
                    {days.map((day) => (
                      <div key={day} className="text-sm text-gray-300">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {calendar.map((week, i) => (
                    <div key={i} className="grid grid-cols-7 text-center gap-2 mb-2">
                      {week.map((day, j) => {
                        // Find if there is an event for this day
                        const eventForDay = events.find(ev => {
                          if (!ev.date) return false;
                          const evDate = new Date(ev.date);
                          return (
                            evDate.getFullYear() === currentMonth.getFullYear() &&
                            evDate.getMonth() === currentMonth.getMonth() &&
                            evDate.getDate() === day
                          );
                        });
                        return (
                          <motion.div
                            key={j}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`h-14 flex flex-col items-center justify-center rounded-lg ${eventForDay ? "bg-blue-900/30 border border-blue-700" : day ? "bg-gray-700/50 border border-gray-600 hover:bg-gray-700 cursor-pointer" : ""}`}
                          >
                            {day && (
                              <>
                                <span className={`text-sm ${eventForDay ? "font-bold text-white" : "text-gray-300"}`}>{day}</span>
                                {eventForDay && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                                )}
                              </>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </motion.div>

                {/* Events Sidebar */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-1 bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-900/30 p-3 rounded-lg mr-3">
                      <FaClipboardCheck className="text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold">Upcoming Events</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {events.length === 0 ? (
                      <div className="text-gray-400 text-center">No events for this month.</div>
                    ) : (
                      events.map((event, index) => (
                        <motion.div 
                          key={event._id || index}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-lg border ${event.priority === 'High' ? 'bg-red-900/30 border-red-700' : event.priority === 'Medium' ? 'bg-yellow-900/30 border-yellow-700' : 'bg-green-900/30 border-green-700'}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              <p className="text-sm text-gray-400">{event.date ? new Date(event.date).toLocaleDateString() : ''}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${event.priority === 'High' ? 'bg-red-900/50 text-red-300' : event.priority === 'Medium' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-green-900/50 text-green-300'}`}>
                              {event.priority}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <FaBell className="mr-2" /> Set Reminder
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Bottom Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Monthly Overview */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-900/30 p-3 rounded-lg mr-3">
                      <FaCheckCircle className="text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold">Monthly Overview</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Events</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-gray-400">Completed</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-gray-400">Pending</span>
                      <span className="font-bold">4</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Team Availability */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <h2 className="text-xl font-bold mb-4">Team Availability</h2>
                  
                  <div className="space-y-4">
                    {[
                      { name: "John Doe", status: "Available", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
                      { name: "Jane Smith", status: "In Meeting", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
                      { name: "Mike Johnson", status: "Away", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
                      { name: "Sarah Williams", status: "Available", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full mr-3" />
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-400">Developer</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${member.status === 'Available' ? 'bg-green-900/50 text-green-300' : member.status === 'In Meeting' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-gray-700 text-gray-300'}`}>
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Quick Actions */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                >
                  <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Schedule Meeting", icon: "📅" },
                      { name: "Add Task", icon: "✓" },
                      { name: "Set Reminder", icon: "⏰" },
                      { name: "Share Calendar", icon: "🔗" },
                    ].map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex flex-col items-center justify-center"
                      >
                        <span className="text-2xl mb-2">{action.icon}</span>
                        <span className="text-sm">{action.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Floating Action Button */}
              <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg text-xl">
                +
              </button>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}