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


// 27/1/24  updated code /*********************************************************** */


// 'use strict'
// const express = require("express");
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// // const db = require('./database/connection');
// // Assuming that chatModel has a 'save' function
// const chatModel = require('./model/chatModel'); 

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Assuming that userRouter is defined elsewhere in your code
// // const userRouter = require('./Route/userRouter');
// // app.use("/API", userRouter);

// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// const PORT = process.env.PORT || 3001;
// http.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('sendTyping', (data) => {
//         console.log("typing data :",data);

//         io.to(data.room).emit('typing', { name: data.name, room: data.room,data:data });
//     });

//     /************** save chat ****** */
//     socket.on('newchat', async (data) => {
//         console.log("data====----->>>>>",data);
//         try {
//             console.log("data===>", data.sender_id, data.receiver_id, data.msg);

//             // Assuming 'chatModel.save' is the correct function
//             let user = await chatModel.create({
//                 sender_id: data.sender_id,
//                 receiver_id: data.receiver_id,
//                 message: data.msg,
//                 user:data.user
//             });
//             console.log("user====>", user);
           
//         } catch (error) {
//             console.error("Error while processing newchat:", error);
//         }
//     });

//     /******************** */
//     /********** load data ********** */
//     socket.on('existschat', async function (data) {
//         console.log("data-----",data);
//         try {
//             let chat = await chatModel.find({
//                 $or: [
//                     { sender_id: data.sender_id, receiver_id: data.receiver_id },
//                     { sender_id: data.receiver_id, receiver_id: data.sender_id }
//                 ]
//             });

//             console.log("chat ==",chat);
//             socket.emit('load-chat',{chat:chat});
//         } catch (error) {
//             console.error(error);
//         }
//     });
    


//     /******************** */


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




////  new code with mysql    /*************************************** */




// 'use strict';
// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// // const db = require('./database/connection');
// const messageController = require('./Controller/messageController');
// // Assuming that chatModel has a 'save' function
// // const chatModel = require('./model/chatModel'); 

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Assuming that userRouter is defined elsewhere in your code
// const userRouter = require('./Routes/messageRouter');
// app.use('/API', userRouter);

// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// const PORT = process.env.PORT || 3001;
// http.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('sendTyping', (data) => {
//         console.log('typing data :', data);
//         io.to(data.room).emit('typing', { name: data.name, room: data.room, data: data });
//     });

//     /************** save chat ****** */
//     socket.on('newchat', async (data) => {
//         console.log('data====----->>>>>', data.room);
//         try {
//             console.log('data===>', data.sender_id, data.receiver_id, data.msg);

//             // Assuming 'chatModel.save' is the correct function
//             // let user = await chatModel.create({
//             //     sender_id: data.sender_id,
//             //     receiver_id: data.receiver_id,
//             //     message: data.msg,
//             //     user: data.user
//             // });
//             // console.log("user====>", user);

//             let details = {
//                 chatId:data.room,
//                 fromUserId: data.sender_id,
//                 toUserId: data.receiver_id,
//                 message: data.msg,
//             };


//             var router = express.Router();
//             router.post('/message',messageController.save(details))
//             // console.log("details--",details);
//             // let response = await messageController.save(details);

//             console.log('response/server-->');
//         } catch (error) {
//             console.error('Error while processing newchat:', error);
//         }
//     });

//     /******************** */
//     /********** load data ********** */
//     socket.on('existschat', async function (data) {
//         console.log('data-----', data);
//         try {
//         //     // Assuming 'chatModel' is the correct model
//         //     let chat = await chatModel.find({
//         //         $or: [
//         //             { sender_id: data.sender_id, receiver_id: data.receiver_id },
//         //             { sender_id: data.receiver_id, receiver_id: data.sender_id },
//         //         ],
//         //     });

//         //     console.log('chat ==', chat);
//             socket.emit('load-chat', { chat: "chat" });
//         } catch (error) {
//             console.error(error);
//         }
//     });

//     /******************** */

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
//             message: data.message,
//         });
//     });
// });

/************************************************** */

// 'use strict';
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const path = require('path');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // Uncomment the following line if you have a database connection logic
// // const db = require('./database/connection');
// const messageController = require('./Controller/messageController');
// const userRouter = require('./Routes/messageRouter');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/API', userRouter);

// const publicPath = path.join(__dirname, 'public');
// app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// const PORT = process.env.PORT || 10000;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// // Create a router for message routes
// const messageRouter = express.Router();

// /************** save chat ****** ****** ****** ****** ****** ****** ****** ****** ****** */

// const multer = require("multer");


// const storage = multer.diskStorage({
//     destination:(req, file, cb) => {
//         cb(null, path.join(__dirname,'./images')); 
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() +'-'+(file.originalname));
//     },
// });
// const upload = multer({ storage: storage }).single('imgUrl');


// // messageRouter.post('/message',upload,async (req, res) => {
// //     try {
// //         const data = req.body;
// //         const file = req.file;
// //         console.log("file----",file);
// //         if (file == '') {
// //             file = '';
// //         }
// //         console.log("file----2", file);
        
       
// //         if(data.msg == ''){
// //             data.msg = ''
// //         }
// //         // console.log("data---",data);
        
// //         let details = {
// //             chatId: data.room,
// //             fromUserId: data.sender_id,
// //             toUserId: data.receiver_id,
// //             message: data.msg ,
// //             imgUrl:file,
// //         };

// //         // Assuming 'messageController.save' is an asynchronous function
// //        let response =  await messageController.save(details);
// //         console.log("response/server",response);
// //            res.status(200).send('Message saved successfully');

// //     } catch (error) {
// //         console.error('Error while processing newchat:', error);
// //         res.status(500).send('Internal Server Error');
// //     }
// // });

// // Use the message router for '/API' path
// app.use('/API', messageRouter);

// /********** load data ********** */
// messageRouter.get('/message', async (req, res) => {
//     try {
//         // Your existing code for loading messages goes here
//         // ...

//         res.status(200).json({ chat: "chat" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// /******************** */

// // Rest of your socket.io code remains unchanged
// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     // ... (rest of your socket.io event listeners)

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });

//     socket.on('privateMessage', (data) => {
//         var msg = { ...data.msg, status: 'delivered' };
//         console.log("msg=---",msg);
// /*** */

       

//         let details = {
//             chatId: data.room,
//             fromUserId: data.sender_id,
//             toUserId: data.receiver_id,
//             message: message,
//             imgUrl: imgUrl,
//         };
//             async()=>{
//                 let response = await messageController.save(details);
//                 console.log("response/server", response);
//             }
//         // Assuming 'messageController.save' is an asynchronous function

//         res.status(200).send('Message saved successfully');
   
// // });

    

// /**** */
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
//             message: data.message,
//         });
//     });
// });






'use strict';
const dotenv = require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// const db = require('./database/connection');
const messageController = require('./Controller/messageController');
// Assuming that chatModel has a 'save' function
const messageModel = require('./model/messagesModel'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Assuming that userRouter is defined elsewhere in your code
const userRouter = require('./Routes/messageRouter');
app.use('/API', userRouter);

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
        console.log('typing data :', data);
        io.to(data.room).emit('typing', { name: data.name, room: data.room, data: data });
    });

/******************************************************************* */
    /************** save chat ****** */
    socket.on('newchat',async (data) => {
        console.log('data====----->>>>>', data.room);
        try {
            console.log('data===>', data.sender_id, data.receiver_id, data.msg);
            let details = {
                chatId:data.room,
                fromUserId: data.sender_id,
                toUserId: data.receiver_id,
                message: data.msg,
            };
            console.log("details",details);
           let response_server =  await messageController.save(details);
            console.log('response/server---successfull',response_server);
        } catch (error) {
            console.error('Error while processing newchat:', error);
        }
    });


    /******************** */
    /********** load data ********** */
    socket.on('existschat', async function (data) {
        console.log('data-----', data);
        try {
        //     // Assuming 'chatModel' is the correct model
        //     let chat = await chatModel.find({
        //         $or: [
        //             { sender_id: data.sender_id, receiver_id: data.receiver_id },
        //             { sender_id: data.receiver_id, receiver_id: data.sender_id },
        //         ],
        //     });

        //     console.log('chat ==', chat);
            socket.emit('load-chat', { chat: "chat" });
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
            message: data.message,
        });
    });
});