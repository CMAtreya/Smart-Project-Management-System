import React from 'react';

export default function Calendar() {
  const taskLoad = {
    6: 'red',
    8: 'red',
    21: 'blue',
  };

  const getColor = (date) => {
    if (taskLoad[date] === 'red') return 'bg-red-500';
    if (taskLoad[date] === 'blue') return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Calendar</h3>
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-300">
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <div key={day} className="relative">
            <span>{day}</span>
            {taskLoad[day] && (
              <span
                className={`absolute top-0 right-0 w-3 h-3 rounded-full ${getColor(day)}`}
              ></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}