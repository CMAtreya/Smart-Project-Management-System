import React from 'react'
import Authapp from './pages/auth/app';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
     <Router>
      <Routes>
        <Route path='/' element={<Authapp/>}/>
        <Route path='/Admin' element={<Adminapp/>}/>
        <Route path='/User' element={<USerapp/>}/>
        
      </Routes>
     </Router>

    </div>
  )
}
