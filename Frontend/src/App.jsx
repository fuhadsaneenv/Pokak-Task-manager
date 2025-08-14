import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Registration";
import { DashLayout } from "./Layout/Dashboardlayout";
import { PublicRoute } from "./ProtectRoute/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/dashboard" element={<DashLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/ui/Navbar";
// import Register from "./Pages/Registration";
// import Login from "./Pages/Login";
// import "./App.css";
// import { DashLayout } from "./Layout/Dashboardlayout";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/register"
//           element={
//             <>
//               <Navbar />
//               <Register />
//             </>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <>
//               <Navbar />
//               <Login />
//             </>
//           }
//         />

//         <Route path="/dashboard" element={<DashLayout />} />

//         <Route
//           path="*"
//           element={
//             <>
//               <Navbar />
//               <Register />
//             </>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
