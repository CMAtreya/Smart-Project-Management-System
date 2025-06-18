import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

// Auth Pages
import Mainpage from './pages/auth/mainpage';
import SignUp from './pages/auth/sign-up';
import SignIn from './pages/auth/sign-in';
// Admin pages
import Admindashboard from './pages/admin/admindashboard';
import Analytics from './pages/admin/analytics';
import Projects from './pages/admin/projects';
import CAlendar from './pages/admin/calendar';
import Tasks from './pages/admin/tasks';
import ChatPage from './pages/admin/chatpage';


// User Pages
import UserChartPage from './pages/user/charts';
import UserChatPage from './pages/user/chatpage';
import UserDashboard from './pages/user/dashboard';
import AssignWork from './pages/user/assignwork';
import FinishedProject from './pages/user/finishedproject';
import Calendar from './pages/user/calendar';
import TasksPage from './pages/user/TasksPage';

// Admin Layout Component
const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
        <Outlet />
      </div>
    </>
  );
};

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Admin Routes with Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Admindashboard />} />
          <Route path="/admin/chat" element={<ChatPage />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/admin/tasks" element={<Tasks />} />
          <Route path="/admin/calendar" element={<CAlendar />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Route>

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
