const {createPool} = require('mysql2');
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'SentimentAnalysis',
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected!');
    connection.release();
  }
});

module.exports = pool;
