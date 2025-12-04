import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminLogin.css';

function AdminLogin({ setIsAdminLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        setIsAdminLoggedIn(true);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        <p className="info-text">Demo: username: admin | password: admin</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login as Admin</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
