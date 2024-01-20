const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '50.62.139.196',
    user: 'techiefreight',
    password: 'NCviwkO_;Wfx',
    database: 'techiefreight'
});

connection.connect(function (error) {
    if (error) {
        console.log("Database connection failed:", error);
    } else {
        console.log("Database connected successfully");
    }
});

module.exports = { connection };
