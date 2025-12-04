import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminDashboard.css';

function AdminDashboard({ setIsAdminLoggedIn }) {
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // Form states for adding/editing
  const [carForm, setCarForm] = useState({ make: '', model: '', year: '', license_plate: '', daily_rate: '', availability: true });
  const [userForm, setUserForm] = useState({ name: '', email: '', phone: '' });
  const [rentalForm, setRentalForm] = useState({ user_id: '', car_id: '', start_date: '', end_date: '', total_cost: '', status: 'pending' });

  const API_URL = 'http://localhost:5000/api';
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
    } else {
      if (activeTab === 'cars') fetchCars();
      if (activeTab === 'users') fetchUsers();
      if (activeTab === 'rentals') fetchRentals();
    }
  }, [activeTab]);

  // Fetch functions
  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/cars`);
      setCars(response.data);
    } catch (error) {
      alert('Error fetching cars: ' + error.message);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      alert('Error fetching users: ' + error.message);
    }
    setLoading(false);
  };

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/rentals`);
      setRentals(response.data);
    } catch (error) {
      alert('Error fetching rentals: ' + error.message);
    }
    setLoading(false);
  };

  // Cars CRUD
  const handleAddCar = async () => {
    if (!carForm.make || !carForm.model || !carForm.year || !carForm.license_plate || !carForm.daily_rate) {
      alert('Please fill all car fields');
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/cars/${editingId}`, carForm);
        alert('Car updated successfully');
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/cars`, carForm);
        alert('Car added successfully');
      }
      setCarForm({ make: '', model: '', year: '', license_plate: '', daily_rate: '', availability: true });
      fetchCars();
    } catch (error) {
      alert('Error: ' + error.response?.data?.error || error.message);
    }
  };

  const handleDeleteCar = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/cars/${id}`);
        alert('Car deleted successfully');
        fetchCars();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleEditCar = (car) => {
    setCarForm(car);
    setEditingId(car.id);
  };

  // Users CRUD
  const handleAddUser = async () => {
    if (!userForm.name || !userForm.email || !userForm.phone) {
      alert('Please fill all user fields');
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/users/${editingId}`, userForm);
        alert('User updated successfully');
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/users`, { ...userForm, password: 'defaultpassword' });
        alert('User added successfully');
      }
      setUserForm({ name: '', email: '', phone: '' });
      fetchUsers();
    } catch (error) {
      alert('Error: ' + error.response?.data?.error || error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/users/${id}`);
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleEditUser = (user) => {
    setUserForm(user);
    setEditingId(user.id);
  };

  // Rentals CRUD
  const handleAddRental = async () => {
    if (!rentalForm.user_id || !rentalForm.car_id || !rentalForm.start_date || !rentalForm.end_date || !rentalForm.total_cost) {
      alert('Please fill all rental fields');
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/rentals/${editingId}`, rentalForm);
        alert('Rental updated successfully');
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/rentals`, rentalForm);
        alert('Rental added successfully');
      }
      setRentalForm({ user_id: '', car_id: '', start_date: '', end_date: '', total_cost: '', status: 'pending' });
      fetchRentals();
    } catch (error) {
      alert('Error: ' + error.response?.data?.error || error.message);
    }
  };

  const handleDeleteRental = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/rentals/${id}`);
        alert('Rental deleted successfully');
        fetchRentals();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleEditRental = (rental) => {
    setRentalForm(rental);
    setEditingId(rental.id);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === 'cars' ? 'active' : ''}`} onClick={() => setActiveTab('cars')}>
          🚗 Manage Cars
        </button>
        <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
          👥 Manage Users
        </button>
        <button className={`tab-btn ${activeTab === 'rentals' ? 'active' : ''}`} onClick={() => setActiveTab('rentals')}>
          📋 Manage Rentals
        </button>
      </div>

      {/* Cars Management */}
      {activeTab === 'cars' && (
        <div className="admin-section">
          <h2>Cars Management</h2>
          <div className="form-section">
            <h3>{editingId ? 'Edit Car' : 'Add New Car'}</h3>
            <div className="form-grid">
              <input type="text" placeholder="Make" value={carForm.make} onChange={(e) => setCarForm({ ...carForm, make: e.target.value })} />
              <input type="text" placeholder="Model" value={carForm.model} onChange={(e) => setCarForm({ ...carForm, model: e.target.value })} />
              <input type="number" placeholder="Year" value={carForm.year} onChange={(e) => setCarForm({ ...carForm, year: e.target.value })} />
              <input type="text" placeholder="License Plate" value={carForm.license_plate} onChange={(e) => setCarForm({ ...carForm, license_plate: e.target.value })} />
              <input type="number" placeholder="Daily Rate" value={carForm.daily_rate} onChange={(e) => setCarForm({ ...carForm, daily_rate: e.target.value })} />
              <select value={carForm.availability} onChange={(e) => setCarForm({ ...carForm, availability: e.target.value === 'true' })}>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
            <button onClick={handleAddCar} className="submit-btn">{editingId ? 'Update Car' : 'Add Car'}</button>
            {editingId && <button onClick={() => { setEditingId(null); setCarForm({ make: '', model: '', year: '', license_plate: '', daily_rate: '', availability: true }); }} className="cancel-btn">Cancel</button>}
          </div>

          <div className="table-section">
            {loading ? <p>Loading...</p> : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>License Plate</th>
                    <th>Daily Rate</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id}>
                      <td>{car.id}</td>
                      <td>{car.make}</td>
                      <td>{car.model}</td>
                      <td>{car.year}</td>
                      <td>{car.license_plate}</td>
                      <td>${car.daily_rate}</td>
                      <td>{car.availability ? '✓' : '✗'}</td>
                      <td>
                        <button onClick={() => handleEditCar(car)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDeleteCar(car.id)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Users Management */}
      {activeTab === 'users' && (
        <div className="admin-section">
          <h2>Users Management</h2>
          <div className="form-section">
            <h3>{editingId ? 'Edit User' : 'Add New User'}</h3>
            <div className="form-grid">
              <input type="text" placeholder="Name" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
              <input type="email" placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
              <input type="tel" placeholder="Phone" value={userForm.phone} onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} />
            </div>
            <button onClick={handleAddUser} className="submit-btn">{editingId ? 'Update User' : 'Add User'}</button>
            {editingId && <button onClick={() => { setEditingId(null); setUserForm({ name: '', email: '', phone: '' }); }} className="cancel-btn">Cancel</button>}
          </div>

          <div className="table-section">
            {loading ? <p>Loading...</p> : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleEditUser(user)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Rentals Management */}
      {activeTab === 'rentals' && (
        <div className="admin-section">
          <h2>Rentals Management</h2>
          <div className="form-section">
            <h3>{editingId ? 'Edit Rental' : 'Add New Rental'}</h3>
            <div className="form-grid">
              <input type="number" placeholder="User ID" value={rentalForm.user_id} onChange={(e) => setRentalForm({ ...rentalForm, user_id: e.target.value })} />
              <input type="number" placeholder="Car ID" value={rentalForm.car_id} onChange={(e) => setRentalForm({ ...rentalForm, car_id: e.target.value })} />
              <input type="date" placeholder="Start Date" value={rentalForm.start_date} onChange={(e) => setRentalForm({ ...rentalForm, start_date: e.target.value })} />
              <input type="date" placeholder="End Date" value={rentalForm.end_date} onChange={(e) => setRentalForm({ ...rentalForm, end_date: e.target.value })} />
              <input type="number" placeholder="Total Cost" value={rentalForm.total_cost} onChange={(e) => setRentalForm({ ...rentalForm, total_cost: e.target.value })} />
              <select value={rentalForm.status} onChange={(e) => setRentalForm({ ...rentalForm, status: e.target.value })}>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button onClick={handleAddRental} className="submit-btn">{editingId ? 'Update Rental' : 'Add Rental'}</button>
            {editingId && <button onClick={() => { setEditingId(null); setRentalForm({ user_id: '', car_id: '', start_date: '', end_date: '', total_cost: '', status: 'pending' }); }} className="cancel-btn">Cancel</button>}
          </div>

          <div className="table-section">
            {loading ? <p>Loading...</p> : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Car</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Cost</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.map((rental) => (
                    <tr key={rental.id}>
                      <td>{rental.id}</td>
                      <td>{rental.user_name}</td>
                      <td>{rental.make} {rental.model}</td>
                      <td>{rental.start_date}</td>
                      <td>{rental.end_date}</td>
                      <td>${rental.total_cost}</td>
                      <td>{rental.status}</td>
                      <td>
                        <button onClick={() => handleEditRental(rental)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDeleteRental(rental.id)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
