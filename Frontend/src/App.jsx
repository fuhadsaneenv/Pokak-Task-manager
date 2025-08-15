

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/ui/Navbar";
import Register from "./Pages/Registration";
import Login from "./Pages/Login";
import "./App.css";
import { DashLayout } from "./Layout/Dashboardlayout";
import { PublicRoute } from "./ProtectRoute/PublicRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Navbar />
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Navbar />
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/dashboard" element={<DashLayout />} />

        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
