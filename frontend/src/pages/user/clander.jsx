import React from "react";

export default function App() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateCalendar = () => {
    const daysInMonth = new Date(2025, 4, 0).getDate(); // May 2025
    const firstDay = new Date(2025, 4, 1).getDay();
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
    }

    return calendar;
  };

  const events = [
    { date: "May 8", title: "Team Sync-up", type: "today" },
    { date: "May 21", title: "Demo Presentation", type: "upcoming" },
    { date: "May 13", title: "Design Review", type: "past" },
  ];

  const calendar = generateCalendar();

  return (
    <div className="flex h-screen bg-[#0d1117] text-white">
      {/* Sidebar */}
      <div className="w-60 bg-[#161b22] p-4 flex flex-col space-y-6">
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="w-16 h-16 mx-auto rounded-full border"
            alt="profile"
          />
          <h2 className="mt-2 font-semibold">Admin</h2>
        </div>
        <nav className="flex flex-col space-y-2">
          {[
            "Home",
            "Chart",
            "Finished Project",
            "Calendar",
            "Assigned Work",
            "Team Chats",
          ].map((item) => (
            <button
              key={item}
              className={`text-left py-2 px-4 rounded hover:bg-blue-700 ${
                item === "Calendar" ? "bg-blue-600" : "hover:bg-[#1f2937]"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto space-y-4">
        <h1 className="text-3xl font-bold">Calendar</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Calendar Grid */}
          <div className="col-span-1 md:col-span-3 bg-[#161b22] rounded-lg p-4">
            <div className="grid grid-cols-7 text-center font-semibold mb-2">
              {days.map((day) => (
                <div key={day} className="text-sm text-gray-300">
                  {day}
                </div>
              ))}
            </div>
            {calendar.map((week, i) => (
              <div key={i} className="grid grid-cols-7 text-center gap-2 mb-1">
                {week.map((day, j) => (
                  <div
                    key={j}
                    className={`h-10 flex items-center justify-center rounded ${
                      day === 8 || day === 21
                        ? "bg-red-600 text-white"
                        : day
                        ? "hover:bg-[#2f3c4a] cursor-pointer"
                        : ""
                    }`}
                  >
                    {day || ""}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Events Sidebar */}
          <div className="col-span-1 bg-[#161b22] rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold">Events</h3>
            {events.map((event, idx) => (
              <div
                key={idx}
                className="p-3 rounded bg-[#1f2937] hover:bg-[#2a3545]"
              >
                <p className="text-sm text-gray-400">{event.date}</p>
                <p className="font-medium">{event.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg text-xl">
          +
        </button>
      </main>
    </div>
  );
}