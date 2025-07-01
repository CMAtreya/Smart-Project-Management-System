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
import AdminPlanningPage from './pages/admin/PlanningPage';

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
import PlanningPage from './pages/user/PlanningPage';
import ConstructionPage from './pages/user/ConstructionPage';

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

// Protected Route Components
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return children;
};

const AdminRoute = ({ element }) => (
  <ProtectedRoute allowedRole="admin">
    {element}
  </ProtectedRoute>
);

const UserRoute = ({ element }) => (
  <ProtectedRoute allowedRole="user">
    {element}
  </ProtectedRoute>
);

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
          <Route path="/admin/dashboard" element={<AdminRoute element={<Admindashboard />} />} />
          <Route path="/admin/chat" element={<AdminRoute element={<ChatPage />} />} />
          <Route path="/admin/projects" element={<AdminRoute element={<Projects />} />} />
          <Route path="/admin/tasks" element={<AdminRoute element={<Tasks />} />} />
          <Route path="/admin/calendar" element={<AdminRoute element={<CAlendar />} />} />
          <Route path="/admin/analytics" element={<AdminRoute element={<Analytics />} />} />
          <Route path="/admin/profile" element={<AdminRoute element={<AdminProfile />} />} />
          <Route path="/admin/project-architecture" element={<AdminRoute element={<Projectarchitecture />} />} />
          <Route path="/admin/planning" element={<AdminRoute element={<AdminPlanningPage />} />} />
        </Route>

        {/* User Routes with Layout */}
        <Route element={<SharedLayout />}>
          <Route path="/user/dashboard" element={<UserRoute element={<UserDashboard />} />} />
          <Route path="/user/projects" element={<UserRoute element={<UserProjects />} />} />
          <Route path="/user/charts" element={<UserRoute element={<UserChartPage />} />} />
          <Route path="/user/chat" element={<UserRoute element={<UserChatPage />} />} />
          <Route path="/user/assignwork" element={<UserRoute element={<AssignWork />} />} />
          <Route path="/user/finishedproject" element={<UserRoute element={<FinishedProject />} />} />
          <Route path="/user/calendar" element={<UserRoute element={<Calendar />} />} />
          <Route path="/user/tasks" element={<UserRoute element={<UserTasks />} />} />
          <Route path="/user/profile" element={<UserRoute element={<UserProfile />} />} />
          <Route path="/user/project-architecture" element={<UserRoute element={<ProjectArchitecture />} />} />
          <Route path="/user/planning" element={<UserRoute element={<PlanningPage />} />} />
          <Route path="/user/construction" element={<UserRoute element={<ConstructionPage />} />} />
        </Route>
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
