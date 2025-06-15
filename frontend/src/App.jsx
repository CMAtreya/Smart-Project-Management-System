import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Mainpage from './pages/auth/mainpage';
import SignUp from './pages/auth/sign-up';
import SignIn from './pages/auth/sign-in';
// Admin pages
import Admindashboard from './pages/admin/admindashboard';
import Analytics from './pages/admin/analytics';
import Projects from './pages/admin/projects';
import CAlendar from './pages/admin/calendar';
import ChatPage from './pages/user/chatpage';


// User Pages
import UserChartPage from './pages/user/charts';
import UserChatPage from './pages/user/chatpage';
import UserDashboard from './pages/user/dashboard';
import AssignWork from './pages/user/assignwork';
import FinishedProject from './pages/user/finishedproject';
import Calendar from './pages/user/calendar';
import TasksPage from './pages/user/TasksPage';

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
        {/*  Admin Routes */}

        <Route path="/admin/dashboard" element = { < Admindashboard  />} />
        <Route path="/admin/chat" element = { <ChatPage />} />
        <Route path="/admin/projects" element = { <Projects />} />
        <Route path="/admin/calendar" element = { <CAlendar />} />
        <Route path="/admin/analytics" element = { < Analytics/>} />

        {/* User Routes */}
        <Route path="/user/charts" element={<UserChartPage />} />
        <Route path="/user/chat" element={<UserChatPage />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/assignwork" element={<AssignWork />} />
        <Route path="/user/finishedproject" element={<FinishedProject />} />
        <Route path="/user/calendar" element={<Calendar />} />
        <Route path="/user/TasksPage" element={<TasksPage />} />
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
