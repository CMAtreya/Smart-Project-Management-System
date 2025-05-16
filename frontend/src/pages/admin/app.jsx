import React from 'react'
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom';
import Dashboard from './dashboard';

export default function Adminapp() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<dashboard/>}/>

        </Routes>
      </Router>
    </div>
  );
};
