import React, { useState } from "react";

export default function App() {
  const tasks = [
    {
      title: "Fix login bug",
      assignedTo: "Anil",
      priority: "High",
      status: "Pending",
      due: "May 20",
    },
    {
      title: "Create landing page",
      assignedTo: "Neha",
      priority: "Medium",
      status: "Ongoing",
      due: "May 22",
    },
    {
      title: "Database backup",
      assignedTo: "Ravi",
      priority: "Low",
      status: "Completed",
      due: "May 15",
    },
    {
      title: "Chatbot integration",
      assignedTo: "Sana",
      priority: "High",
      status: "Pending",
      due: "May 25",
    },
  ];

  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTasks = tasks.filter(
    (task) =>
      (priorityFilter === "All" || task.priority === priorityFilter) &&
      (statusFilter === "All" || task.status === statusFilter)
  );

  const badgeColor = (type, value) => {
    if (type === "priority") {
      return {
        High: "bg-red-600",
        Medium: "bg-yellow-500",
        Low: "bg-green-500",
      }[value];
    }
    if (type === "status") {
      return {
        Pending: "bg-orange-600",
        Ongoing: "bg-blue-600",
        Completed: "bg-green-600",
      }[value];
    }
    return "bg-gray-500";
  };

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
                item === "Assigned Work" ? "bg-blue-600" : "hover:bg-[#1f2937]"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Assigned Work</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#161b22] text-white px-4 py-2 rounded border border-gray-600"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#161b22] text-white px-4 py-2 rounded border border-gray-600"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Task Table */}
        <div className="bg-[#161b22] rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-[#1f2937]">
              <tr>
                {["Task", "Assigned To", "Priority", "Status", "Due Date"].map(
                  (head) => (
                    <th
                      key={head}
                      className="text-left py-3 px-4 font-medium text-gray-300"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#2f3c4a] transition-colors duration-200"
                >
                  <td className="py-3 px-4">{task.title}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${task.assignedTo}&background=random`}
                      alt={task.assignedTo}
                      className="w-6 h-6 rounded-full"
                    />
                    {task.assignedTo}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${badgeColor(
                        "priority",
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${badgeColor(
                        "status",
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{task.due}</td>
                </tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No tasks match the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}