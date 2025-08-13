


import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/ui/Navbar'
import Register from './Pages/Registration'
import Login from './Pages/Login'
import { DashLayout } from './Layout/dashLayout'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with Navbar */}
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
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
  )
}

export default App
