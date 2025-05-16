export default function MonthlyTasks() {
    const tasks = {
      Mon: 40,
      Tue: 60,
      Wed: 80,
      Thu: 70,
      Fri: 90,
    };
  
    return (
      <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Monthly Tasks</h3>
        {Object.entries(tasks).map(([day, width], idx) => (
          <div key={idx} className="mb-2">
            <div className="text-sm mb-1">{day}</div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }