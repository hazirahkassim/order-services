import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Orders from "./components/Orders";
import WorkDoneForm from "./components/WorkDoneForm";
import TechnicianJobList from "./components/TechnicianJobList"

function App() {
  const selectedJob = JSON.parse(localStorage.getItem("selectedJob") || "{}");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Orders/>} />
        <Route path="/technician" element={<TechnicianJobList />} />
        <Route path="/technician/job" element={<WorkDoneForm selectedJob={selectedJob} />} />
      </Routes>
    </Router>
  );
}

export default App;
