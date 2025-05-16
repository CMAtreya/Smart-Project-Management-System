import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Mainpage from './mainpage';
import Signup from './sign-up';
import Signin from './sign-in';

export default function AuthApp() {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
