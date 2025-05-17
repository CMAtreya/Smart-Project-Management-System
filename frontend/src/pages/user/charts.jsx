import React, { useState } from 'react';

// Card component definition
function Card({ children, className }) {
  return <div className={`p-4 bg-white shadow-md rounded ${className}`}>{children}</div>;
}

function ChartPage() {
  const [view, setView] = useState('kanban');
  const kanbanData = [
    { title: 'To Do', tasks: ['Task 1', 'Task 2'] },
    { title: 'In Progress', tasks: ['Task 3'] },
    { title: 'Done', tasks: ['Task 4', 'Task 5'] }
  ];
  const ganttData = [
    { task: 'Task 1', start: 0, end: 3, color: 'bg-blue-500' },
    { task: 'Task 2', start: 2, end: 5, color: 'bg-green-500' }
  ];

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setView('kanban')} className="px-4 py-2 bg-blue-500 text-white rounded">Kanban</button>
        <button onClick={() => setView('gantt')} className="px-4 py-2 bg-green-500 text-white rounded">Gantt</button>
      </div>

      <Card className="mb-4">
        <h2 className="text-lg font-bold">Chart Overview</h2>
        <p>This is a summary of the chart data.</p>
      </Card>

      {view === 'kanban' && (
        <div className="grid grid-cols-3 gap-4">
          {kanbanData.map((column, index) => (
            <Card key={index} className="">
              <h3 className="font-bold mb-2">{column.title}</h3>
              <ul>
                {column.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}

      {view === 'gantt' && (
        <div className="space-y-4">
          {ganttData.map((item, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm font-medium">{item.task}</p>
              <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-full rounded-full transition-all`}
                  style={{
                    marginLeft: `${item.start * 10}%`,
                    width: `${(item.end - item.start) * 10}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
          <div className="flex justify-between text-xs text-gray-400 pt-2">
            {[...Array(11).keys()].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartPage;