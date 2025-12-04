const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes will go here

const PORT = process.env.PORT || 5000;
// Import routes
const authRoutes = require('./routes/authRoutes');
const carsRoutes = require('./routes/carsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const rentalsRoutes = require('./routes/rentalsRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/rentals', rentalsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});