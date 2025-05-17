import React, { useState } from "react";

const kanbanData = {
  "To Do": ["Design UI", "Define endpoints"],
  "In Progress": ["Develop API", "Set up DB"],
  "Done": ["Create wireframes"],
};

const ganttData = [
  { task: "Design UI", start: 1, end: 3, color: "bg-blue-500" },
  { task: "Develop API", start: 2, end: 5, color: "bg-red-500" },
  { task: "Set up DB", start: 3, end: 6, color: "bg-green-500" },
  { task: "Create wireframes", start: 1, end: 2, color: "bg-purple-500" },
];

export default function ChartPage() {
  const [isKanban, setIsKanban] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chart Dashboard</h1>
        <button
          onClick={() => setIsKanban(!isKanban)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
        >
          {isKanban ? "Switch to Gantt Chart" : "Switch to Kanban Chart"}
        </button>
      </div>

      {isKanban ? (
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(kanbanData).map(([column, tasks]) => (
            <div
              key={column}
              className="bg-slate-800 p-4 rounded-xl shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4">{column}</h2>
              {tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="bg-slate-700 p-2 rounded-lg mb-2 shadow-md hover:bg-slate-600 transition"
                >
                  {task}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
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
