import React from 'react'
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom';
import KanbanChart from './kandenchart';

export default function Adminapp() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<KanbanChart/>}/>


        </Routes>
      </Router>
    </div>
  );
};
