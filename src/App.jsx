import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Employee from './Pages/Employee.jsx';
import Profile from './Pages/Profile.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route Example */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
           <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <Employee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
};

export default App;
