const pool = require('../config/db');

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Simple admin credentials check (in production, use proper authentication)
    if (username === 'admin' && password === 'admin') {
      const token = 'admin_token_' + Date.now(); // Simple token (use JWT in production)
      res.json({
        success: true,
        token,
        message: 'Admin login successful',
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid admin credentials',
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
