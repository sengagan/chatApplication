// // group chat
// "use strict";

// const express = require("express");
// const app = express();
// const http = require('http').createServer(app);
// const PORT = process.env.PORT || 3005;
// const io = require('socket.io')(http);

// http.listen(PORT, () => {
//     console.log(`listening on port ${PORT}`);
// });

// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// io.on("connection", (socket) => {
//     console.log("Connected to socket.io");

//     socket.on("setup", (userData) => {
//         socket.userData = userData;
//         socket.join(userData._id);
//         socket.emit("connected");
//     });

//     socket.on("join chat", (room) => {
//         socket.join(room);
//         console.log("User Joined Room: " + room);
//     });

//     socket.on("typing", (room) => socket.in(room).emit("typing"));

//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//     socket.on("new message", (newMessageReceived) => {
//         var chat = newMessageReceived.chat;

//         if (!chat.users) return console.log("chat.users not defined");

//         chat.users.forEach((user) => {
//             if (user._id == newMessageReceived.sender._id) return;

//             socket.in(user._id).emit("message received", newMessageReceived);
//         });
//     });

//     socket.on("disconnect", () => {
//         if (socket.userData) {
//             console.log("USER DISCONNECTED:", socket.userData._id);
//             socket.leave(socket.userData._id);
//         }
//     });
// });


// one to one chat

const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('privateMessage', (data) => {
        console.log("data===",data);
        console.log("dataRoom===",data.room);
       let response =  io.to(data.room).emit('message', data.msg,data.room);
        // socket.broadcast.emit("message",data.msg);
        console.log("response ====",response,data.msg);
    });
});

