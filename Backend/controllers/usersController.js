const pool = require('../config/db');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT id, name, email, phone, created_at FROM users');
    connection.release();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT id, name, email, phone, created_at FROM users WHERE id = ?', [id]);
    connection.release();
    res.json(user[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, password, phone]
    );
    connection.release();
    res.json({ success: true, id: result.insertId, message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, id]
    );
    connection.release();
    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM users WHERE id = ?', [id]);
    connection.release();
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
