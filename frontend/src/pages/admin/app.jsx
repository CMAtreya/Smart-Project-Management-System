import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./mainDashboard";

import ChartPage from "./charts";


function Adminapp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/chart" element={<ChartPage/>} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Adminapp;
