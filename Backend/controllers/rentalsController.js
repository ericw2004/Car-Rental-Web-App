const pool = require('../config/db');

// Get all rentals
exports.getAllRentals = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rentals] = await connection.query(
      'SELECT r.*, u.name as user_name, c.make, c.model FROM rentals r JOIN users u ON r.user_id = u.id JOIN cars c ON r.car_id = c.id'
    );
    connection.release();
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single rental
exports.getRentalById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [rental] = await connection.query('SELECT * FROM rentals WHERE id = ?', [id]);
    connection.release();
    res.json(rental[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create rental
exports.createRental = async (req, res) => {
  try {
    const { user_id, car_id, start_date, end_date, total_cost, status } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO rentals (user_id, car_id, start_date, end_date, total_cost, status) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, car_id, start_date, end_date, total_cost, status || 'pending']
    );
    connection.release();
    res.json({ success: true, id: result.insertId, message: 'Rental created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update rental
exports.updateRental = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_date, end_date, total_cost, status } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE rentals SET start_date = ?, end_date = ?, total_cost = ?, status = ? WHERE id = ?',
      [start_date, end_date, total_cost, status, id]
    );
    connection.release();
    res.json({ success: true, message: 'Rental updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete rental
exports.deleteRental = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM rentals WHERE id = ?', [id]);
    connection.release();
    res.json({ success: true, message: 'Rental deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
