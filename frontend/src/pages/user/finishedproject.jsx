import React from "react";


export default function App() {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-[#111827] p-5 space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl">👨‍💻</div>
        </div>
        <nav className="flex flex-col space-y-4 text-sm">
          <button className="bg-blue-600 px-4 py-2 rounded text-left">Finished Projects</button>
          <button className="hover:text-blue-500 text-left">Home</button>
          <button className="hover:text-blue-500 text-left">Chart</button>
          <button className="hover:text-blue-500 text-left">Calendar</button>
          <button className="hover:text-blue-500 text-left">Assigned Work</button>
          <button className="hover:text-blue-500 text-left">Team Chats</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4"> Projects Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#1e293b] p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-400">Total Projects</h2>
            <p className="text-3xl font-bold mt-2">58</p>
          </div>
          <div className="bg-[#1e293b] p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-400">Success Rate</h2>
            <p className="text-3xl font-bold mt-2 text-green-400">94%</p>
          </div>
          <div className="bg-[#1e293b] p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-400">Avg Completion</h2>
            <p className="text-3xl font-bold mt-2 text-blue-400">32 Days</p>
          </div>
        </div>

        {/* Highlighted Project */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1e293b] p-6 rounded-lg shadow space-y-4">
            <h2 className="text-lg font-semibold">⭐ Featured Project</h2>
            <img
              src="https://source.unsplash.com/random/800x400?technology"
              alt="Project"
              className="rounded-lg h-40 object-cover"
            />
            <p className="text-gray-300">
              AI-Powered Car Recommender System that integrates 3D models, voice search and live chat.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-blue-600 px-2 py-1 rounded">AI</span>
              <span className="text-xs bg-green-600 px-2 py-1 rounded">Chatbot</span>
              <span className="text-xs bg-purple-600 px-2 py-1 rounded">3D Models</span>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-[#1e293b] p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">🏆 Top Performers</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Meena - Frontend</span>
                <span className="text-green-400">12 Projects</span>
              </li>
              <li className="flex justify-between">
                <span>Akash - Backend</span>
                <span className="text-green-400">10 Projects</span>
              </li>
              <li className="flex justify-between">
                <span>Priya - Full Stack</span>
                <span className="text-green-400">9 Projects</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Completion Chart (Mocked Bars) */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">📊 Project Completion Overview</h2>
          <div className="space-y-3">
            {["Jan", "Feb", "Mar", "Apr", "May"].map((month, idx) => (
              <div key={idx}>
                <p className="text-sm text-gray-400 mb-1">{month}</p>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      idx % 2 === 0 ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${60 + idx * 8}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">🗂️ Recent Projects</h2>
          <ul className="divide-y divide-gray-700 text-sm">
            <li className="py-2 flex justify-between">
              <span>Smart Agriculture System</span>
              <span className="text-gray-400">Completed on May 12</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>E-Commerce Web App</span>
              <span className="text-gray-400">Completed on May 3</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Fitness Tracker API</span>
              <span className="text-gray-400">Completed on Apr 24</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}