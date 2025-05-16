import React from 'react';
import Sidebar from './sidebar';
import TaskSummary from './tasksummary';
import StressMonitor from './stressmonitor';
import MonthlyTasks from './monthlytask';
import Calendar from './calender';
import TaskCompletionBar from './taskcompletion';
import MotivationalPopup from './motivationalpopup';
import KanbanBoard from './kanbanboard';

const UserApp = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f2027] to-[#203a43] text-white font-sans">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto relative">
        <MotivationalPopup />

        <h1 className="text-3xl font-bold mb-4">USER DASHBOARD</h1>

        <TaskCompletionBar />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <TaskSummary />
          <StressMonitor />
          <MonthlyTasks />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Calendar />
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};

export default UserApp;
