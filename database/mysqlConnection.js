
const mysql = require('mysql2');

const connection = mysql.createConnection({
    // host: '50.62.139.196',
    // user: 'techiefreight',
    // password: 'NCviwkO_;Wfx',
    // database: 'techiefreight'
    host     : 'localhost',
    user     : 'root',
    password : '152897',
    database : 'customer'
});

connection.connect(function (error) {
    console.log(error);
    if (error) {
        console.log("database not connected",error);
    } else {
        console.log("database connected successfully",error);
    }
});

module.exports = { connection };
