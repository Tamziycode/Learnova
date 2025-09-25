const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',      // MySQL host
  user: 'root',           // your MySQL username
  password: 'shawndavid', // your MySQL password
  database: 'elearning'   // name of your database
});

// Export promise-based connection
const db = pool.promise();

module.exports = db;