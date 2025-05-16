import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashbaoard';
import KanbanChart from './kandenchart';
import GanttChart from './ghanttchart';
import ChatInterface from './chatinterface';
import CreateProject from './createproject';
import CreateTask from './createtask';
import EditProject from './editproject';
import EditTask from './edittask';

export default function Adminapp() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/kanban' element={<KanbanChart />} />
            <Route path='/gantt' element={<GanttChart />} />
            <Route path='/chat' element={<ChatInterface />} />
            <Route path='/create-project' element={<CreateProject />} />
            <Route path='/create-task' element={<CreateTask />} />
            <Route path='/edit-project/:projectId' element={<EditProject />} />
            <Route path='/edit-task/:taskId' element={<EditTask />} />
        </Routes>
      </Router>
    </div>
  );
};
