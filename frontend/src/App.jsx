import React from 'react'
import Authapp from './pages/auth/app';
import Adminapp from './pages/admin/app'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
     <Router>
      <Routes>
        <Route path='/auth' element={<Authapp/>}/>
        <Route path='/' element={<Adminapp/>}/>
        <Route path='/User' element={<USerapp/>}/>
        
      </Routes>
     </Router>

    </div>
  )
}
