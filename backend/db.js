const mysql = require("mysql2");

// connection pool creation
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Tells it to look at door 24288
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    // Explicitly handles Aiven's security requirement
    rejectUnauthorized: false,
  },
});

// Export promise-based connection
const db = pool.promise();

module.exports = db;
