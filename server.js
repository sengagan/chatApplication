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

// const express = require("express");
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// const PORT = 3000;
// http.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('joinRoom', (room) => {
//         socket.join(room);
//         console.log(`User ${socket.id} joined room ${room}`);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });

//     socket.on('privateMessage', (data) => {
//         console.log("data===",data);
//         console.log("dataRoom===",data.room);
//        let response =  io.to(data.room).emit('message', data.msg,data.room);
//         // socket.broadcast.emit("message",data.msg);
//         console.log("response ====",response,data.msg,data.room);
    
    
// });

// })


// const express = require("express");
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// const PORT = 3000;
// http.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// io.on('connection', async function (socket) {
//     console.log('User connected:', socket.id);

//     socket.on('sendTyping', (data) => {
//         io.to(data.room).emit('typing', { name: data.name, room: data.room });
//     });

//     socket.on('joinRoom', (room) => {
//         socket.join(room);
//         console.log(`User ${socket.id} joined room ${room}`);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });

//     socket.on('privateMessage', (data) => {
//         const msg = { ...data.msg, status: 'delivered' };
//         io.to(data.room).emit('message', msg, data.room);
//     });

//     socket.on('messageDelivered', (data) => {
//         io.to(data.room).emit('messageDelivered', { messageId: data.messageId });
//     });

//     socket.on('messageSeen', (data) => {
//         io.to(data.room).emit('messageSeen', { messageId: data.messageId });
//     });

//     // Listener for the notifyRecipient event
//     socket.on('notifyRecipient', (data) => {
//         io.to(data.recipientRoom).emit('notifyRecipient', {
//             sender: data.sender,
//             message: data.message
//         });
//     });
// });


// 27/1/24  updated code


'use strict'
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const db = require('./database/connection');
// Assuming that chatModel has a 'save' function
const chatModel = require('./model/chatModel'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Assuming that userRouter is defined elsewhere in your code
// const userRouter = require('./Route/userRouter');
// app.use("/API", userRouter);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendTyping', (data) => {
        io.to(data.room).emit('typing', { name: data.name, room: data.room });
    });

    /************** save chat ****** */
    socket.on('newchat', async (data) => {
        console.log("data====----->>>>>",data);
        try {
            console.log("data===>", data.sender_id, data.receiver_id, data.msg);

            // Assuming 'chatModel.save' is the correct function
            let user = await chatModel.create({
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
                message: data.msg,
                user:data.user
            });
            // console.log("user====>", user);
           
        } catch (error) {
            console.error("Error while processing newchat:", error);
        }
    });

    /******************** */
    /********** load data ********** */
    socket.on('existschat', async function (data) {
        console.log("data-----",data);
        try {
            let chat = await chatModel.find({
                $or: [
                    { sender_id: data.sender_id, receiver_id: data.receiver_id },
                    { sender_id: data.receiver_id, receiver_id: data.sender_id }
                ]
            });

            console.log("chat ==",chat);
            socket.emit('load-chat',{chat:chat});
        } catch (error) {
            console.error(error);
        }
    });
    


    /******************** */


    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('privateMessage', (data) => {
        const msg = { ...data.msg, status: 'delivered' };
        io.to(data.room).emit('message', msg, data.room);
    });

    socket.on('messageDelivered', (data) => {
        io.to(data.room).emit('messageDelivered', { messageId: data.messageId });
    });

    socket.on('messageSeen', (data) => {
        io.to(data.room).emit('messageSeen', { messageId: data.messageId });
    });

    // Listener for the notifyRecipient event
    socket.on('notifyRecipient', (data) => {
        io.to(data.recipientRoom).emit('notifyRecipient', {
            sender: data.sender,
            message: data.message
        });
    });
});

