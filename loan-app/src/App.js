import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import LoanApplication from "./LoanApplication";
import AdminLogin from "./AdminLogin";
import EmployeeLogin from "./EmployeeLogin";
import Login from "./Login";
import Register from "./Register";
import IsLoggedIn from "./components/IsLoggedIn"; // Make sure this is defined correctly

function App() {
  return (
    <Router>
      <Dashboard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/apply"
            element={
              <IsLoggedIn>
                <LoanApplication />
              </IsLoggedIn>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Dashboard>
    </Router>
  );
}

export default App;
