import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const menuItems = [
      { name: "Home", path: "/" },
      { name: "Kanban Board", path: "/kanban" },
      { name: "Gantt Chart", path: "/gantt" },
      { name: "Calendar", path: "/calendar" },
      { name: "Tasks", path: "/tasks" },
      { name: "Team Chat", path: "/chat" }
    ];
  
    return (
      <aside className="w-64 bg-slate-900 rounded-r-2xl p-4 flex flex-col justify-start space-y-6 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold">
            👤
          </div>
        </div>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                location.pathname === item.path ? "bg-blue-700 text-white" : "hover:bg-slate-700"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </aside>
    );
  }