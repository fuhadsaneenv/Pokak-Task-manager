import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/ui/Navbar'
import Register from './Pages/Registration'
import Login from './Pages/Login'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Default route */}
        <Route path="*" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
