import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, FaPlus, FaTrash, FaEdit, FaChevronLeft, FaChevronRight,
  FaFilter, FaSearch, FaEllipsisH, FaUserAlt, FaTag, FaFlag, FaRegClock,
  FaClipboardList, FaProjectDiagram, FaUsers, FaCalendarCheck, FaCalendarDay,
  FaExclamationCircle, FaCheckCircle, FaInfoCircle, FaListUl, FaChartPie
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

// Add CSS class for system fonts and background patterns
const backgroundCSS = `
  .bg-grid-pattern {
    background-size: 40px 40px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  }
`;

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

// Event Modal Component
const EventModal = ({ isOpen, onClose, event, onSave, onDelete }) => {
  const initialFormState = event ? {
    ...event,
    date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
    startTime: event.startTime || '',
    endTime: event.endTime || ''
  } : {
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    type: 'meeting',
    priority: 'medium',
    participants: [],
    location: '',
    reminder: '15'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(event.id);
      onClose();
    } else {
      setConfirmDelete(true);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          {event ? 'Edit Event' : 'Create New Event'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
                <option value="reminder">Reminder</option>
                <option value="task">Task</option>
                <option value="event">Event</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Reminder</label>
            <select
              name="reminder"
              value={formData.reminder}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="0">No reminder</option>
              <option value="5">5 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            {event ? (
              <button
                type="button"
                onClick={handleDelete}
                className={`px-4 py-2 ${confirmDelete ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500/30 hover:bg-red-500/50'} rounded-lg text-white transition-colors flex items-center`}
              >
                <FaTrash className="mr-2" />
                {confirmDelete ? 'Confirm Delete' : 'Delete Event'}
              </button>
            ) : (
              <div></div> /* Empty div to maintain flex spacing */
            )}
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => {
                  setConfirmDelete(false);
                  onClose();
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
              >
                {event ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Calendar Day Component
const CalendarDay = ({ day, events, currentMonth, selectedDate, onSelectDate, onEventClick }) => {
  const isToday = day.toDateString() === new Date().toDateString();
  const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
  const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
  
  // Filter events for this day
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === day.getDate() && 
           eventDate.getMonth() === day.getMonth() && 
           eventDate.getFullYear() === day.getFullYear();
  });
  
  // Sort events by start time
  dayEvents.sort((a, b) => {
    if (!a.startTime) return -1;
    if (!b.startTime) return 1;
    return a.startTime.localeCompare(b.startTime);
  });
  
  const priorityColors = {
    low: 'bg-green-500/20 border-green-500/30',
    medium: 'bg-yellow-500/20 border-yellow-500/30',
    high: 'bg-red-500/20 border-red-500/30',
    urgent: 'bg-purple-500/20 border-purple-500/30'
  };
  
  const typeIcons = {
    meeting: <FaUsers className="mr-1" />,
    deadline: <FaCalendarCheck className="mr-1" />,
    reminder: <FaRegClock className="mr-1" />,
    task: <FaClipboardList className="mr-1" />,
    event: <FaCalendarDay className="mr-1" />
  };
  
  return (
    <div 
      onClick={() => onSelectDate(day)}
      className={`min-h-[120px] p-2 border ${isCurrentMonth ? 'border-gray-700' : 'border-gray-800'} 
                 ${isToday ? 'bg-blue-900/20' : ''} 
                 ${isSelected ? 'ring-2 ring-blue-500' : ''} 
                 ${!isCurrentMonth ? 'bg-gray-900/50 text-gray-500' : 'bg-gray-800/50'} 
                 rounded-lg transition-all cursor-pointer hover:bg-gray-700/30`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${isToday ? 'text-blue-400' : isCurrentMonth ? 'text-white' : 'text-gray-500'}`}>
          {day.getDate()}
        </span>
        {isToday && (
          <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
            Today
          </span>
        )}
      </div>
      
      <div className="space-y-1 overflow-y-auto max-h-[80px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {dayEvents.slice(0, 3).map((event, index) => (
          <div 
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
            className={`text-xs p-1 rounded border ${priorityColors[event.priority]} truncate hover:bg-gray-700/50 cursor-pointer`}
          >
            {typeIcons[event.type]}
            <span className="truncate">{event.title}</span>
          </div>
        ))}
        {dayEvents.length > 3 && (
          <div className="text-xs text-gray-400 text-center">
            +{dayEvents.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

// Calendar Component
export default function Calendar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [view, setView] = useState('month'); // 'month', 'week', 'day', 'agenda'
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch events (mock data for now)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock events data
      const mockEvents = [
        {
          id: 1,
          title: 'Team Meeting',
          description: 'Weekly team sync to discuss project progress',
          date: '2023-07-15',
          startTime: '10:00',
          endTime: '11:00',
          type: 'meeting',
          priority: 'medium',
          participants: ['John Doe', 'Jane Smith', 'Mike Johnson'],
          location: 'Conference Room A',
          reminder: '15'
        },
        {
          id: 2,
          title: 'Project Deadline',
          description: 'Final submission for the website redesign project',
          date: '2023-07-20',
          startTime: '',
          endTime: '',
          type: 'deadline',
          priority: 'high',
          participants: [],
          location: '',
          reminder: '1440'
        },
        {
          id: 3,
          title: 'Client Call',
          description: 'Discussion about new requirements',
          date: '2023-07-18',
          startTime: '14:00',
          endTime: '15:00',
          type: 'meeting',
          priority: 'medium',
          participants: ['John Doe', 'Client'],
          location: 'Zoom',
          reminder: '30'
        },
        {
          id: 4,
          title: 'Review Designs',
          description: 'Review and approve the new UI designs',
          date: '2023-07-16',
          startTime: '11:00',
          endTime: '12:00',
          type: 'task',
          priority: 'medium',
          participants: ['John Doe', 'Design Team'],
          location: 'Design Lab',
          reminder: '60'
        },
        {
          id: 5,
          title: 'Backend Deployment',
          description: 'Deploy the new backend services to production',
          date: '2023-07-25',
          startTime: '09:00',
          endTime: '10:00',
          type: 'task',
          priority: 'high',
          participants: ['John Doe', 'DevOps Team'],
          location: '',
          reminder: '60'
        }
      ];
      
      // Update today's date to current year/month for demo purposes
      const today = new Date();
      mockEvents.forEach(event => {
        const eventDate = new Date(event.date);
        eventDate.setFullYear(today.getFullYear());
        eventDate.setMonth(today.getMonth());
        event.date = eventDate.toISOString().split('T')[0];
      });
      
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Get days in month grid (including days from prev/next month to fill the grid)
  const getDaysInMonthGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Total days in the month
    const daysInMonth = lastDay.getDate();
    
    // Days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;
    
    // Days from next month to show (to fill a 6-row grid)
    const totalCells = 42; // 6 rows x 7 days
    const daysFromNextMonth = totalCells - daysInMonth - daysFromPrevMonth;
    
    // Generate array of days
    const days = [];
    
    // Add days from previous month
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      days.push(new Date(year, month - 1, i));
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add days from next month
    for (let i = 1; i <= daysFromNextMonth; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() - 1);
      return newMonth;
    });
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + 1);
      return newMonth;
    });
  };
  
  // Go to today
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };
  
  // Handle date selection
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };
  
  // Open modal to create new event
  const handleCreateEvent = () => {
    setCurrentEvent(null);
    setIsModalOpen(true);
  };
  
  // Open modal to edit event
  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };
  
  // Save event (create or update)
  const handleSaveEvent = (eventData) => {
    if (currentEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === currentEvent.id ? { ...eventData, id: event.id } : event
      ));
    } else {
      // Create new event
      const newEvent = {
        ...eventData,
        id: Date.now() // Simple ID generation
      };
      setEvents(prev => [...prev, newEvent]);
    }
  };
  
  // Delete event
  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };
  
  // Filter events based on search term, type, and priority
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesPriority = filterPriority === 'all' || event.priority === filterPriority;
    
    return matchesSearch && matchesType && matchesPriority;
  });
  
  // Get events for selected date
  const selectedDateEvents = filteredEvents.filter(event => {
    const eventDate = new Date(event.date);
    return selectedDate && 
      eventDate.getDate() === selectedDate.getDate() && 
      eventDate.getMonth() === selectedDate.getMonth() && 
      eventDate.getFullYear() === selectedDate.getFullYear();
  });
  
  // Sort events by start time
  selectedDateEvents.sort((a, b) => {
    if (!a.startTime) return -1;
    if (!b.startTime) return 1;
    return a.startTime.localeCompare(b.startTime);
  });
  
  // Get upcoming events (next 7 days)
  const upcomingEvents = filteredEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    return diffDays >= 0 && diffDays < 7;
  });
  
  // Sort upcoming events by date and time
  upcomingEvents.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    
    if (!a.startTime) return -1;
    if (!b.startTime) return 1;
    return a.startTime.localeCompare(b.startTime);
  });
  
  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Days of the week
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <style>{backgroundCSS}</style>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-gray-400">
              Manage your events, meetings, and deadlines
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={goToToday}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Today
            </button>
            <button 
              onClick={prevMonth}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={nextMonth}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaChevronRight />
            </button>
            <div className="px-4 py-2 bg-gray-800 rounded-lg">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <button 
              onClick={handleCreateEvent}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Event
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-3 bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekdays.map(day => (
                <div key={day} className="text-center text-gray-400 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonthGrid().map((day, index) => (
                <CalendarDay 
                  key={index}
                  day={day}
                  events={filteredEvents}
                  currentMonth={currentMonth}
                  selectedDate={selectedDate}
                  onSelectDate={handleSelectDate}
                  onEventClick={handleEditEvent}
                />
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Search & Filter</h3>
              
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="meeting">Meetings</option>
                  <option value="deadline">Deadlines</option>
                  <option value="reminder">Reminders</option>
                  <option value="task">Tasks</option>
                  <option value="event">Events</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            
            {/* Selected Date Events */}
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">
                {selectedDate ? formatDate(selectedDate) : 'Select a date'}
              </h3>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map(event => (
                    <div 
                      key={event.id}
                      onClick={() => handleEditEvent(event)}
                      className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${event.priority === 'low' ? 'bg-green-500/20 text-green-400' : event.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : event.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'}`}>
                          {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
                        </span>
                      </div>
                      
                      {event.startTime && (
                        <div className="text-sm text-gray-400 mt-1 flex items-center">
                          <FaRegClock className="mr-1" />
                          {event.startTime} {event.endTime && `- ${event.endTime}`}
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="text-sm text-gray-400 mt-1 flex items-center">
                          <FaTag className="mr-1" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-4">
                  No events scheduled for this day
                </div>
              )}
              
              <button 
                onClick={() => {
                  setCurrentEvent(null);
                  setIsModalOpen(true);
                }}
                className="w-full mt-4 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-colors flex items-center justify-center"
              >
                <FaPlus className="mr-2" />
                Add Event
              </button>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
              
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 5).map(event => (
                    <div 
                      key={event.id}
                      onClick={() => handleEditEvent(event)}
                      className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${event.priority === 'low' ? 'bg-green-500/20 text-green-400' : event.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : event.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'}`}>
                          {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-400 mt-1 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      
                      {event.startTime && (
                        <div className="text-sm text-gray-400 mt-1 flex items-center">
                          <FaRegClock className="mr-1" />
                          {event.startTime}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-4">
                  No upcoming events in the next 7 days
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={currentEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}
