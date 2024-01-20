const mysql = require('mysql2');
const dotenv = require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.password,
    database: process.env.database
});



connection.connect(function (error) {
    if (error) {
        console.log("Database connection failed:", error);
    } else {
        console.log("Database connected successfully");
    }
});

module.exports = { connection };
