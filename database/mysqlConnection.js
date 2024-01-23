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

console.log("-=-=connection-=->>>",process.env.HOST,process.env.DATABASE,process.env.USER,process.env.PASSWORD)
// Use createPool instead of createConnection for better scalability
const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, // Use uppercase for consistency
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testing the database connection
connection.getConnection((error, connection) => {
    if (error) {
        console.error('Database connection failed:', error.message);
    } else {
        console.log('Database connected successfully');
        connection.release();
    }
});

// Handle errors on the connection
connection.on('error', (err) => {
    console.error('Database connection error:', err.message);
});

module.exports = { connection };
