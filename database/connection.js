const mongoose = require("mongoose");

const url = "mongodb://chat-application-glki.onrender.com/chatApplication";

// const url = "https://chat-application-glki.onrender.com";

mongoose.connect(url);
console.log("database connected successfully");



