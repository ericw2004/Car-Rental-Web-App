const pool = require('../config/db');

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [cars] = await connection.query('SELECT * FROM cars');
    connection.release();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single car
exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [car] = await connection.query('SELECT * FROM cars WHERE id = ?', [id]);
    connection.release();
    res.json(car[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create car
exports.createCar = async (req, res) => {
  try {
    const { make, model, year, license_plate, daily_rate, availability } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO cars (make, model, year, license_plate, daily_rate, availability) VALUES (?, ?, ?, ?, ?, ?)',
      [make, model, year, license_plate, daily_rate, availability === true ? 1 : 0]
    );
    connection.release();
    res.json({ success: true, id: result.insertId, message: 'Car added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update car
exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, year, license_plate, daily_rate, availability } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE cars SET make = ?, model = ?, year = ?, license_plate = ?, daily_rate = ?, availability = ? WHERE id = ?',
      [make, model, year, license_plate, daily_rate, availability === true ? 1 : 0, id]
    );
    connection.release();
    res.json({ success: true, message: 'Car updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete car
exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM cars WHERE id = ?', [id]);
    connection.release();
    res.json({ success: true, message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
