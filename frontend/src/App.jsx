import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Mainpage from './pages/auth/mainpage';
import SignUp from './pages/auth/sign-up';
import SignIn from './pages/auth/sign-in';


// User Pages
import UserChartPage from './pages/user/charts';
import UserChatPage from './pages/user/chatpage';
import UserDashboard from './pages/user/dashboard';
import AssignWork from './pages/user/assignwork';
import FinishedProject from './pages/user/finishedproject';
import Calendar from './pages/user/clander';

export default function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Mainpage />} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp />} />
      
      
      {/* User Routes */}
      <Route path="/user" element={<UserChartPage />} />
      <Route path="/user/chat" element={<UserChatPage />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/assignwork" element={<AssignWork />} />
      <Route path="/user/finishedproject" element={<FinishedProject />} />
      <Route path="/user/calendar" element={<Calendar />} />
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
