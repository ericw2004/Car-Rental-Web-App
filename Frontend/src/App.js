import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarRental from './pages/CarRental';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/rental/:carId" element={<CarRental />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/bookings" element={isLoggedIn ? <Bookings /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin/login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
        <Route path="/admin/dashboard" element={isAdminLoggedIn ? <AdminDashboard setIsAdminLoggedIn={setIsAdminLoggedIn} /> : <AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
