import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Suspense, lazy } from 'react';

// Auth Pages
import Mainpage from './pages/auth/mainpage';
import SignUp from './pages/auth/sign-up';
import SignIn from './pages/auth/sign-in';

// Admin Pages
import Admindashboard from './pages/admin/admindashboard';
import Navbar from './components/Navbar';
import ChatPage from './pages/admin/chatpage';
import Projects from './pages/admin/projects';
import Tasks from './pages/admin/tasks';
import CAlendar from './pages/admin/calendar';
import Analytics from './pages/admin/analytics';
import Projectarchitecture from './pages/admin/projectarch';
import AdminProfile from './pages/admin/profile';

// User Pages
import UserChartPage from './pages/user/charts';
import UserChatPage from './pages/user/chatpage';
import UserDashboard from './pages/user/dashboard';
import AssignWork from './pages/user/assignwork';
import FinishedProject from './pages/user/finishedproject';
import UserProjects from './pages/user/projects';
import Calendar from './pages/user/calendar';
import UserTasks from './pages/user/UserTasks';
import UserProfile from './pages/user/profile';
import ProjectArchitecture from './pages/user/projectarch';

// Shared Layout Component for both Admin and User
const SharedLayout = () => {
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
        <Route element={<SharedLayout />}>
          <Route path="/admin/dashboard" element={<Admindashboard />} />
          <Route path="/admin/chat" element={<ChatPage />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/admin/tasks" element={<Tasks />} />
          <Route path="/admin/calendar" element={<CAlendar />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
           <Route path="/admin/project-architecture" element={<Projectarchitecture />} />

        </Route>

        {/* User Routes with Layout */}
        <Route element={<SharedLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/projects" element={<UserProjects />} />
          <Route path="/user/charts" element={<UserChartPage />} />
          <Route path="/user/chat" element={<UserChatPage />} />
          <Route path="/user/assignwork" element={<AssignWork />} />
          <Route path="/user/finishedproject" element={<FinishedProject />} />
          <Route path="/user/calendar" element={<Calendar />} />
          <Route path="/user/tasks" element={<UserTasks />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/project-architecture" element={<ProjectArchitecture />} />
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
