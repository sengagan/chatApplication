// const mysql = require('mysql2');
// const dotenv = require('dotenv').config();

// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.password,
//     database: process.env.database
// });

// connection.connect(function (error) {
//     console.log("error/connection",error)
//     if (error) {
//         console.log("Database connection failed:", error);
//     } else {
//         console.log("Database connected successfully");
//     }
// });

// module.exports = { connection };


const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const { HOST, USER, PASSWORD, DATABASE } = process.env;

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000, // 30 seconds (adjust as needed)
});

const retryConnection = () => {
    console.log('Attempting to reconnect...');
    setTimeout(() => {
        pool.promise().getConnection()
            .then((connection) => {
                console.log('Database connected successfully');
                connection.release();
            })
            .catch((error) => {
                console.error('Database connection failed:', error.message);
                retryConnection();
            });
    }, 5000); // Wait for 5 seconds before retrying
};

// Use Promise-based connections
pool.promise().getConnection()
    .then((connection) => {
        console.log('Database connected successfully');
        connection.release();
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        retryConnection();
    });

// Handle connection errors
pool.on('error', (err) => {
    console.error('Database connection error:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Handle lost connection gracefully
        retryConnection();
    } else {
        throw err;
    }
});

module.exports = { pool };
