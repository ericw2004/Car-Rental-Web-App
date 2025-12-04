import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Bookings.css';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Cost</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.car_make} {booking.car_model}</td>
                <td>{booking.start_date}</td>
                <td>{booking.end_date}</td>
                <td>${booking.total_cost}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bookings;
