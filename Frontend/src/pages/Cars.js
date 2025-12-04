import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cars.css';

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars');
      setCars(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cars');
      setLoading(false);
    }
  };

  const handleBookNow = (carId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    navigate(`/rental/${carId}`);
  };

  if (loading) return <div className="loading">Loading cars...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cars-container">
      <h2>Available Cars</h2>
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image">🚗</div>
            <h3>{car.year} {car.make} {car.model}</h3>
            <p className="license-plate">License: {car.license_plate}</p>
            <p className="price">${car.daily_rate}/day</p>
            <p className={car.availability ? 'available' : 'unavailable'}>
              {car.availability ? 'Available' : 'Not Available'}
            </p>
            <button
              className="book-btn"
              disabled={!car.availability}
              onClick={() => handleBookNow(car.id)}
            >
              {car.availability ? 'Book Now' : 'Unavailable'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
