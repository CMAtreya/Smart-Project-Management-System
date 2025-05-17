import React from "react";
import Dashboard from "./mainDashboard";
import ChartPage from "./charts";
import Calender from "./calender";
import Chat from './chatpage';

// This component is no longer used for routing
// Routes have been moved to the main App.jsx file
function Adminapp() {
  return (
    <div className="admin-container">
      <Dashboard />
    </div>
  );
}

export default Adminapp;
