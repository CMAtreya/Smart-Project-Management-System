import React, { useEffect, useRef, useState } from 'react';
import Gantt from 'frappe-gantt';
import { FaPlus, FaFilter, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Sample data - in a real app, this would come from your backend
const initialTasks = [
  {
    id: 'task-1',
    name: 'Project Kickoff',
    start: '2023-06-01',
    end: '2023-06-05',
    progress: 100,
    dependencies: '',
    custom_class: 'bar-milestone' // Custom class for styling
  },
  {
    id: 'task-2',
    name: 'Design Phase',
    start: '2023-06-06',
    end: '2023-06-15',
    progress: 85,
    dependencies: 'task-1',
    custom_class: 'bar-design'
  },
  {
    id: 'task-3',
    name: 'Development Phase',
    start: '2023-06-16',
    end: '2023-07-05',
    progress: 50,
    dependencies: 'task-2',
    custom_class: 'bar-development'
  },
  {
    id: 'task-4',
    name: 'Testing Phase',
    start: '2023-07-06',
    end: '2023-07-15',
    progress: 20,
    dependencies: 'task-3',
    custom_class: 'bar-testing'
  },
  {
    id: 'task-5',
    name: 'Deployment',
    start: '2023-07-16',
    end: '2023-07-20',
    progress: 0,
    dependencies: 'task-4',
    custom_class: 'bar-deployment'
  }
];

export default function GanttChart() {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState('Week');
  const ganttContainer = useRef(null);
  const ganttChart = useRef(null);

  useEffect(() => {
    if (ganttContainer.current && tasks.length > 0) {
      // Initialize the Gantt chart
      ganttChart.current = new Gantt(ganttContainer.current, tasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: view,
        date_format: 'YYYY-MM-DD',
        custom_popup_html: null
      });

      // Add event listeners
      ganttChart.current.on('click', (task) => {
        console.log('Task clicked:', task);
      });

      ganttChart.current.on('date_change', (task, start, end) => {
        console.log(`Task ${task.name} changed: ${start} to ${end}`);
        // In a real app, you would update the backend here
      });

      ganttChart.current.on('progress_change', (task, progress) => {
        console.log(`Task ${task.name} progress changed to ${progress}%`);
        // In a real app, you would update the backend here
      });

      // Add custom CSS for the Gantt chart
      const style = document.createElement('style');
      style.innerHTML = `
        .gantt .bar-milestone {
          fill: #38B2AC;
        }
        .gantt .bar-design {
          fill: #4299E1;
        }
        .gantt .bar-development {
          fill: #9F7AEA;
        }
        .gantt .bar-testing {
          fill: #ED8936;
        }
        .gantt .bar-deployment {
          fill: #F56565;
        }
      `;
      document.head.appendChild(style);

      return () => {
        // Clean up
        document.head.removeChild(style);
      };
    }
  }, [tasks, view]);

  const changeView = (newView) => {
    setView(newView);
    if (ganttChart.current) {
      ganttChart.current.change_view_mode(newView);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Timeline</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <FaPlus className="mr-2" /> Add Task
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
            <FaFilter className="mr-2" /> Filter
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
            <FaDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={() => changeView('Day')} 
            className={`px-3 py-1 rounded ${view === 'Day' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Day
          </button>
          <button 
            onClick={() => changeView('Week')} 
            className={`px-3 py-1 rounded ${view === 'Week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Week
          </button>
          <button 
            onClick={() => changeView('Month')} 
            className={`px-3 py-1 rounded ${view === 'Month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Month
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
            <FaChevronLeft />
          </button>
          <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div ref={ganttContainer} className="gantt-container" style={{ height: '400px', width: '100%' }}></div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Task Legend</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-teal-500 mr-2"></div>
            <span>Milestone</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-blue-500 mr-2"></div>
            <span>Design</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-purple-500 mr-2"></div>
            <span>Development</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-orange-500 mr-2"></div>
            <span>Testing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-red-500 mr-2"></div>
            <span>Deployment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
