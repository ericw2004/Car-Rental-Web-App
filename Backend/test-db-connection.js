require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  try {
    const config = {
      host: process.env.DB_HOST || '10.53.7.146',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password123',
      database: process.env.DB_NAME || 'rentalapp',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      connectTimeout: 10000,
    };

    console.log('Testing DB connection with config:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
    });

    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query('SELECT 1 AS ok');
    console.log('Query result:', rows);
    await conn.end();
    console.log('DB connection successful');
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
})();
