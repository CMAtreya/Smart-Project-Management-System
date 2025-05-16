import React, { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';

const tasks = [
  {
    id: 'Task 1',
    name: 'Design Phase',
    start: '2024-02-01',
    end: '2024-02-15',
    progress: 80,
    dependencies: ''
  },
  {
    id: 'Task 2',
    name: 'Development Phase',
    start: '2024-02-15',
    end: '2024-03-15',
    progress: 40,
    dependencies: 'Task 1'
  },
  {
    id: 'Task 3',
    name: 'Testing Phase',
    start: '2024-03-10',
    end: '2024-03-25',
    progress: 20,
    dependencies: 'Task 2'
  },
  {
    id: 'Task 4',
    name: 'Deployment',
    start: '2024-03-25',
    end: '2024-04-05',
    progress: 0,
    dependencies: 'Task 3'
  }
];

export default function GanttChart() {
  const ganttRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = new Gantt(ganttRef.current, tasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: 'Week',
        date_format: 'YYYY-MM-DD',
        custom_popup_html: null
      });

      // Add click event listener
      chartRef.current.on('click', (task) => {
        console.log('Task clicked:', task);
      });

      // Add progress change event listener
      chartRef.current.on('progress_change', (task, progress) => {
        console.log('Task progress changed:', task, progress);
      });

      // Add date change event listener
      chartRef.current.on('date_change', (task, start, end) => {
        console.log('Task date changed:', task, start, end);
      });
    }

    // Cleanup function
    return () => {
      if (chartRef.current) {
        // Clean up event listeners if needed
      }
    };
  }, []);

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Project Timeline</h2>
      <div className="gantt-container overflow-x-auto">
        <svg
          ref={ganttRef}
          className="gantt"
          width="100%"
          height="400"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
          <span>Not Started</span>
        </div>
      </div>
    </div>
  );
}