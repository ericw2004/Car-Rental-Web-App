import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🚗 CarRental
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/cars" className="nav-link">Browse Cars</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/bookings" className="nav-link">My Bookings</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link login-btn">Login</Link>
            </li>
          )}
            <li className="nav-item">
              <Link to="/admin/login" className="nav-link admin-btn">Admin</Link>
            </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
