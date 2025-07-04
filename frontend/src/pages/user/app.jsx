import React from 'react'
import ChartPage from './charts'
import ModellingPage from './ModellingPage'
import MermaidViewer from './MermaidViewer'

// This component is no longer used for routing
// Routes have been moved to the main App.jsx file
export default function Userapp() {
  return (
    <div className="user-container">
      <ChartPage/>
    </div>
  )
}
