// const mongoose = require("mongoose");
// require('dotenv').config();
// // const url = "mongodb://127.0.0.1:27017/chatApplication";
// const url = process.env.BASEBASE
// console.log("url",url);


// mongoose.connect(url);
// console.log("database connected successfully");



const mongoose = require("mongoose");
require('dotenv').config();

// const url = "mongodb://127.0.0.1:27017/chatApplication";
// Change BASEBASE to DATABASE
const url = process.env.DATABASE;
console.log("url", url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.on('connected', () => {
    console.log('Database connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error(`Database connection error: ${err}`);
});





