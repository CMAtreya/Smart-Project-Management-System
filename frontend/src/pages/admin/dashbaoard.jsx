import React from 'react';
import { FaUsers, FaTasks, FaProjectDiagram, FaCalendarCheck, FaChartLine, FaEllipsisV } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

// Sample data - in a real app, this would come from your backend
const projectStats = {
  total: 12,
  active: 8,
  completed: 3,
  onHold: 1
};

const taskStats = {
  total: 86,
  todo: 24,
  inProgress: 32,
  done: 30
};

const teamMembers = [
  { id: 1, name: 'John Doe', role: 'Frontend Developer', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', tasksCompleted: 15, currentTasks: 3 },
  { id: 2, name: 'Jane Smith', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', tasksCompleted: 12, currentTasks: 2 },
  { id: 3, name: 'Mike Johnson', role: 'Backend Developer', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', tasksCompleted: 18, currentTasks: 4 },
  { id: 4, name: 'Sarah Williams', role: 'Project Manager', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', tasksCompleted: 10, currentTasks: 5 },
];

const recentActivities = [
  { id: 1, user: 'Sarah Williams', action: 'created a new project', project: 'Website Redesign', time: '2 hours ago' },
  { id: 2, user: 'John Doe', action: 'completed task', task: 'Homepage Layout', time: '3 hours ago' },
  { id: 3, user: 'Mike Johnson', action: 'commented on task', task: 'API Integration', time: '5 hours ago' },
  { id: 4, user: 'Jane Smith', action: 'uploaded a file', file: 'design-mockup.fig', time: 'Yesterday' },
  { id: 5, user: 'John Doe', action: 'started task', task: 'User Authentication', time: 'Yesterday' },
];

const upcomingDeadlines = [
  { id: 1, task: 'Complete API Documentation', project: 'CRM System', deadline: '2023-06-15', assignee: 'Mike Johnson' },
  { id: 2, task: 'Finalize Homepage Design', project: 'Website Redesign', deadline: '2023-06-18', assignee: 'Jane Smith' },
  { id: 3, task: 'User Testing', project: 'Mobile App', deadline: '2023-06-20', assignee: 'Sarah Williams' },
];

export default function Dashboard() {
  // Chart data for task status distribution
  const taskStatusData = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        data: [taskStats.todo, taskStats.inProgress, taskStats.done],
        backgroundColor: ['#EF4444', '#3B82F6', '#10B981'],
        borderWidth: 0,
      },
    ],
  };

  // Chart data for project progress over time
  const projectProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [12, 19, 25, 32, 45, 56],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // Chart data for team performance
  const teamPerformanceData = {
    labels: teamMembers.map(member => member.name),
    datasets: [
      {
        label: 'Tasks Completed',
        data: teamMembers.map(member => member.tasksCompleted),
        backgroundColor: '#8B5CF6',
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mr-4">
            <FaProjectDiagram className="text-blue-600 dark:text-blue-300 text-xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{projectStats.total}</p>
            <p className="text-xs text-green-600 dark:text-green-400">
              <span className="font-medium">{projectStats.active} Active</span> • {projectStats.completed} Completed
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900 p-3 mr-4">
            <FaTasks className="text-red-600 dark:text-red-300 text-xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{taskStats.total}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(taskStats.done / taskStats.total) * 100}%` }}></div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {Math.round((taskStats.done / taskStats.total) * 100)}% Completed
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
            <FaUsers className="text-green-600 dark:text-green-300 text-xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Members</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{teamMembers.length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">3 Online</span> • 1 Offline
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 mr-4">
            <FaCalendarCheck className="text-purple-600 dark:text-purple-300 text-xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Deadlines</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{upcomingDeadlines.length}</p>
            <p className="text-xs text-red-600 dark:text-red-400">
              <span className="font-medium">1 Due Soon</span> • 2 This Week
            </p>
          </div>
        </div>
      </div>
      
      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Task Status Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Task Status</h2>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <FaEllipsisV />
            </button>
          </div>
          <div className="flex justify-center" style={{ height: '200px' }}>
            <Doughnut 
              data={taskStatusData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }} 
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">To Do</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{taskStats.todo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{taskStats.inProgress}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Done</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{taskStats.done}</p>
            </div>
          </div>
        </div>
        
        {/* Project Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Project Progress</h2>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <FaEllipsisV />
            </button>
          </div>
          <div style={{ height: '250px' }}>
            <Line 
              data={projectProgressData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: true,
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>
        
        {/* Team Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Team Performance</h2>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <FaEllipsisV />
            </button>
          </div>
          <div style={{ height: '250px' }}>
            <Bar 
              data={teamPerformanceData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: true,
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Recent Activity & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-300 font-medium text-sm">
                      {activity.user.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                    {activity.project && <span className="font-medium"> {activity.project}</span>}
                    {activity.task && <span className="font-medium"> {activity.task}</span>}
                    {activity.file && <span className="font-medium"> {activity.file}</span>}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Deadlines</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View Calendar
            </button>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map(deadline => {
              const deadlineDate = new Date(deadline.deadline);
              const today = new Date();
              const diffTime = Math.abs(deadlineDate - today);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              return (
                <div key={deadline.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{deadline.task}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{deadline.project}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                        {deadline.assignee}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${diffDays <= 3 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}>
                      {new Date(deadline.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {diffDays === 0 ? 'Today' : diffDays === 1 ? 'Tomorrow' : `${diffDays} days left`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
