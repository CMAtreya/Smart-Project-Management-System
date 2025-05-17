import React from 'react';
import Mainpage from './mainpage';

// This component is no longer used for routing
// Routes have been moved to the main App.jsx file
export default function AuthApp() {
  return (
    <div className="auth-container">
      <Mainpage />
    </div>
  );
}
