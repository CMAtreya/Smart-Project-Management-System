import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
  const sidebarItems = [
    { name: "Home", path: "/home" },
    { name: "Chart", path: "/chart" },
    { name: "Finished Project", path: "/finished-project" },
    { name: "Calendar", path: "/calendar" },
    { name: "Assigned Work", path: "/assigned-work" },
    { name: "Team Chats", path: "/team-chats" },
  ];

  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-[#06101f] text-white font-sans">
      {/* Sidebar */}
      <div className="w-60 bg-[#0b1a2e] p-6 flex flex-col gap-6">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-slate-400 flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
        </div>
        <nav className="flex flex-col gap-4">
          {sidebarItems.map(({ name, path }, idx) => (
            <NavLink
              key={idx}
              to={path}
              className={({ isActive }) =>
                `text-left py-2 px-4 rounded-xl ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-blue-900"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Only show full dashboard widgets on Home */}
        {location.pathname === "/home" && (
          <>
            <div>
              <h1 className="text-3xl font-bold">ADMIN DASHBOARD</h1>
              <div className="mt-2 h-2 w-full bg-slate-700 rounded-full">
                <div className="h-full w-[80%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              <p className="text-sm text-slate-400 mt-1">TASK COMPLETION</p>
            </div>

            {/* Top widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Task Stats */}
              <div className="bg-[#0d1b2a] rounded-xl p-4 space-y-2">
                <h2 className="text-lg font-semibold">TODAY'S TASKS</h2>
                <div className="flex justify-between">
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Ongoing</p>
                    <p className="text-orange-400 font-bold text-xl">1</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Completed</p>
                    <p className="text-green-400 font-bold text-xl">5</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Pending</p>
                    <p className="text-red-400 font-bold text-xl">2</p>
                  </div>
                </div>
              </div>

              {/* Team Leads */}
              <div className="bg-[#0d1b2a] rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-2">TEAM LEADS</h2>
                <ul className="space-y-1 text-sm">
                  <li>Suresh - web</li>
                  <li>Mahesh - web</li>
                  <li>Ganesh - app</li>
                </ul>
              </div>

              {/* Stress Monitor */}
              <div className="bg-[#0d1b2a] rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-2">Stress Monitor</h2>
                <div className="relative w-full h-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"></div>
                  <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-1 h-16 bg-black origin-bottom rotate-[-20deg] rounded-md"></div>
                </div>
              </div>
            </div>

            {/* Bottom widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Tasks */}
              <div className="bg-[#0d1b2a] rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-4">MONTHLY TASKS</h2>
                {[
                  { day: "Mon", value: 50 },
                  { day: "Tue", value: 70 },
                  { day: "Wed", value: 90 },
                  { day: "Thu", value: 80 },
                  { day: "Fri", value: 60 },
                  { day: "Sat", value: 40 },
                ].map((item, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="text-sm text-slate-300">{item.day}</p>
                    <div className="w-full h-3 bg-slate-700 rounded-full">
                      <div
                        className={`h-full rounded-full ${
                          item.value > 80
                            ? "bg-red-400"
                            : item.value > 60
                            ? "bg-orange-400"
                            : "bg-blue-400"
                        }`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calendar */}
              <div className="bg-[#0d1b2a] rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-2">Calendar</h2>
                <div className="grid grid-cols-7 gap-1 text-sm text-center">
                  {["MON", "TUE", "WED", "THU", "FRI", "SA", "SU"].map((day) => (
                    <div key={day} className="font-bold text-slate-300">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 30 }, (_, i) => {
                    const date = i + 1;
                    const redDates = [6, 8];
                    const blueDates = [21];
                    const isRed = redDates.includes(date);
                    const isBlue = blueDates.includes(date);
                    return (
                      <div
                        key={date}
                        className={`py-1 rounded-full ${
                          isRed
                            ? "bg-red-500 text-white"
                            : isBlue
                            ? "bg-blue-500 text-white"
                            : "text-slate-200"
                        }`}
                      >
                        {date}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Other Routes render here */}
        <Outlet />
      </div>
    </div>
  );
}
