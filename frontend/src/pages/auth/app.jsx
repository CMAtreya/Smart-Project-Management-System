import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Mainpage from './mainpage';
import Signup from './sign-up';
import Signin from './sign-in';

export default function AuthApp() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Mainpage/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}
