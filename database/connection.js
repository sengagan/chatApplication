const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/chatApplication";

mongoose.connect(url);
console.log("database connected successfully");



