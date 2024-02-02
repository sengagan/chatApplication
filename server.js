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



//          29/1/24     ************************


// 'use strict';
// const dotenv = require('dotenv').config()
// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// const messageController = require('./Controller/messageController');
// const path = require('path');
// const { count } = require('console');
// const { object } = require('joi');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + './public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// const PORT = process.env.PORT || 3000;
// http.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('sendTyping', (data) => {
//         console.log('typing data :');
//         io.to(data.room).emit('typing', { name: data.name, room: data.room, data: data });
//     });



//     /************** save chat ****** */
//     // socket.on('newchat',async (data) => {
//     //     console.log("Received newchat data from client:");

//     //     try {
//     //         // const timestamp = new Date().getTime();
//     //         // const imgName = `${timestamp}-${data.user}`;
//     //         // const fileName = `${__dirname}/images/${imgName}.jpg`;  // filepath
//     //         const fs = require("fs").promises;
//     //         var timestamp = new Date().getTime();
//     //         var imgName = timestamp + "-" + data.msg.name ;
//     //         const filePath = __dirname + "/images/" + imgName + ".jpg";
//     //         const base64Data = data.msg.data.split(';base64,').pop();
//     //         console.log("base64Data",base64Data);
//     //         const decodedData = Buffer.from(base64Data,'base64');
//     //         console.log("decodedData", decodedData);
//     //         console.log("filepath", filePath);
//     //         console.log("imgName", imgName);
//     //         console.log("timestamp", timestamp);
//     //         fs.writeFile(filePath,decodedData,"binary");
//     //         let response_server = messageController.save(data);
//     //         console.log('Response from server:', response_server);
//     //     } catch (error) {
//     //         console.error('Error in newchat:', error);
//     //     }
//     // });

//     // socket.on('newchat', async (data) => {
//     //     console.log("Received newchat data from client:", data.msg.imgUrl);
//     //     // if(data.msg.imgUrl.lenght >1  || data.msg.videoImgUrl.lenght > 1 || data.msg.videoUrl.lenght > 1 || data.msg.audioUrl.lenght > 1 || data.msg.stickerImgUrl.lenght > 1 ){}

//     //     try {
//     //         if (!data.msg.imgUrl == '' || !data.msg.videoImgUrl == '' || !data.msg.videoUrl == '' || !data.msg.audioUrl == '' || !data.msg.stickerImgUrl == '') {

//     //             console.log("innside");
//     //             const fs = require("fs").promises;
//     //             var timestamp = new Date().getTime();
//     //             var imgName = timestamp + "-" + data.msg.name;
//     //             const filePath = __dirname + "/images/" + imgName + ".jpg";
//     //             const base64Data = data.msg.data.split(';base64,').pop();
//     //             const buffer = Buffer.from(base64Data, 'base64');
//     //             await fs.writeFile(filePath, buffer);
//     //         }
//     //         console.log("uuuuyyyyuyuy--", data);

//     //         let response_server = messageController.save(data);
//     //         console.log('Response from server:', response_server);
//     //     } catch (error) {
//     //         console.error('Error in newchat:', error);
//     //     }
//     // });


//     socket.on('newchat', async (data) => {
//         console.log("Received newchat data from client:");
//         try {
//             if (!data.msg.imgUrl == '' || !data.msg.videoImgUrl == '' || !data.msg.videoUrl == '' || !data.msg.audioUrl == '' || !data.msg.stickerImgUrl == '') {
//                 console.log("inside");
//                 const fs = require("fs").promises;
//                 var timestamp = new Date().getTime();
//                 var imgName = timestamp + "-" + data.msg.name;
//                 const filePath = __dirname + "/images/" + imgName + ".jpg";
//                 let base64Data;
//                 if (data.msg.imgUrl.includes('data:image/jpeg;base64,')) {
//                     base64Data = data.msg.imgUrl.split(';base64,').pop();
//                 } else {
//                     base64Data = data.msg.imgUrl;
//                 }
//                 const buffer = Buffer.from(base64Data, 'base64');
//                 await fs.writeFile(filePath, buffer);
//             }
//             console.log("uuuuyyyyuyuy--");
//             let response_server = messageController.save(data);
//             io.to(data).emit('message', data.room, data.image, data, response_server);
//             console.log('Response from server:');
//         } catch (error) {
//             console.error('Error in newchat:', error);
//         }
//     });


//     /******************** */

//     /********** load data ********** */
//     socket.on('existschat', async function (data) {     // right  code 
//         console.log('receive existschat data from client', data);
//         try {
//             let get_data = await messageController.getData(data);
//             console.log("getdata/server----", get_data, data)
//             socket.emit('load-chat', { chat: "chat", loadedData: get_data, data: data });
//         } catch (error) {
//             console.error(error);
//         }
//     });

//     /******************** */
//     let u = 0
//     socket.on('joinRoom', (room) => {
//         socket.join(room);
//         console.log("u",u);
//         // console.log(`User ${socket.id} joined room ${room}`);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });

//     socket.on('privateMessage', (data) => {
//         console.log("privateMessage data receive from client:", data);
//         const msg = { ...data.msg, status: 'delivered' };
//         io.to(data.room).emit('message', msg, data.room, data.image, data);
//     });

//     socket.on('messageDelivered', (data) => {       // room id , sender id , recerver id,status unseen
//         console.log("data/messageDelivered=====", data);
//         io.to(data.room).emit('messageDelivered', { messageId: data.messageId, status: true });
//     });

//     socket.on('leave', (data) => {                      // kaun leave hua hai room se
//         console.log("data/leave", data);
//         io.to(data.room).emit('leave', emit('data', { data: data, status: false }));
//     })

//     socket.on('messageSeen', (data) => {         //  room id , sender id , recerver id
//         console.log("data/messageSeen========", data);
//         io.to(data.room).emit('messageSeen', { messageId: data.messageId, status: true , data: data});
//     });

//     socket.on('notifyRecipient', (data) => {
//         io.to(data.recipientRoom).emit('notifyRecipient', {
//             sender: data.sender,
//             message: data.message,
//         });
//     });
// });









// 'use strict';
// const dotenv = require('dotenv').config()
// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// const messageController = require('./Controller/messageController');
// const messageModel = require("./model/messagesModel");
// const path = require('path');
// const { count } = require('console');
// const { object } = require('joi');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + './public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// const PORT = process.env.PORT || 3000;
// http.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('sendTyping', (data) => {
//         console.log('typing data :');
//         io.to(data.room).emit('typing', { name: data.name, room: data.room, data: data });
//     });

//     /***************** */

//     socket.on('markMessagesAsSeen', async (data) => {
//         try {
//             // Assuming you have a function to mark messages as seen in your controller
//             console.log("seen-----",data);      // jab user2 seen karega tb update hoga aur get api chalegi
//              await messageModel.markMessagesAsSeen(data);
//             data.id=9      
//             let response = await messageModel.getDataById(data.id)
//             console.log("response/seen/server",response);
//             // Emit an event to notify clients that messages have been marked as seen
//             io.to(data.room).emit('messagesSeen', { room: data.room, sender_id: data.sender_id, receiver_id: data.receiver_id,resp});
//             // Inside the markMessagesAsSeen event handler
//             // io.to(data.room).emit('messageSeen', { room: data.room, sender_id: data.sender_id, receiver_id: data.receiver_id });

//         } catch (error) {
//             console.error('Error marking messages as seen:', error);
//         }
//     });

//     // const userId = socket.handshake.query.userId;

//     // if (userId !== "undefined") {
//     //     userSocketMap[userId] = socket.id;
//     //     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     //     socket.on("MarkMessagesAsSeen", async ({ room, userId }) => {
//     //         try {
//     //             // await executeQuery(`UPDATE message SET seen = true WHERE room = ${room} AND seen = false`);
//     //             // await executeQuery(`UPDATE conversation SET lastMessage_seen = true WHERE _id = ${room}`);

//     //             // io.to(userSocketMap[userId]).emit("messageSeen", { room });
//     //         } catch (error) {
//     //             console.log(error);
//     //         }
//     //     });
//     // }

//     // function executeQuery(query) {
//     //     return new Promise((resolve, reject) => {
//     //         connection.query(query, (error, results) => {
//     //             if (error) {
//     //                 reject(error);
//     //             } else {
//     //                 resolve(results);
//     //             }
//     //         });
//     //     });
//     // }



//     /***************** */

//     socket.on('newchat', async (data) => {
//         console.log("Received newchat data from client:");
//         try {
//             if (!data.msg.imgUrl == '' || !data.msg.videoImgUrl == '' || !data.msg.videoUrl == '' || !data.msg.audioUrl == '' || !data.msg.stickerImgUrl == '') {
//                 console.log("inside");
//                 const fs = require("fs").promises;
//                 var timestamp = new Date().getTime();
//                 var imgName = timestamp + "-" + data.msg.name;
//                 const filePath = __dirname + "/images/" + imgName + ".jpg";
//                 let base64Data;
//                 if (data.msg.imgUrl.includes('data:image/jpeg;base64,')) {
//                     base64Data = data.msg.imgUrl.split(';base64,').pop();
//                 } else {
//                     base64Data = data.msg.imgUrl;
//                 }
//                 const buffer = Buffer.from(base64Data, 'base64');
//                 await fs.writeFile(filePath, buffer);
//             }
//             console.log("uuuuyyyyuyuy--");
//             let response_server = messageController.save(data);
//             io.to(data).emit('message', data.room, data.image, data, response_server);
//             console.log('Response from server:');
//         } catch (error) {
//             console.error('Error in newchat:', error);
//         }
//     });


//     /******************** */

//     /********** load data ********** */
//     socket.on('existschat', async function (data) {     // right  code 
//         console.log('receive existschat data from client', data);
//         try {
//             let get_data = await messageController.getData(data);
//             console.log("getdata/server----", get_data, data)
//             socket.emit('load-chat', { chat: "chat", loadedData: get_data, data: data });
//         } catch (error) {
//             console.error(error);
//         }
//     });

//     /******************** */

//     socket.on('joinRoom', (room) => {
//         socket.join(room);
//         // console.log(`User ${socket.id} joined room ${room.room}`);

//         // const roomMembers = io.sockets.adapter.rooms.get(room.room);
//         // console.log("roomMembers");
//         // const numberOfPeopleInRoom = roomMembers ? roomMembers.size : 0;
//         // console.log(`Number of people in room ${room.room}: ${numberOfPeopleInRoom}`);


//         console.log("roomlength==")
//         if((room.room ==room.room)&&(room.sender_id ==room.receiver_id) && (room.receiver_id==room.sender_id)){
//             console.log("room========",room);
//             // console.log(`User ${socket.id} joined room ${room}`);
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });

//     socket.on('privateMessage', (data) => {
//         console.log("privateMessage data receive from client:", data);
//         const msg = { ...data.msg, status: 'delivered' };
//         io.to(data.room).emit('message', msg, data.room, data.image, data);
//     });

//     socket.on('messageDelivered', (data) => {       // room id , sender id , recerver id,status unseen
//         console.log("data/messageDelivered=====", data);
//         io.to(data.room).emit('messageDelivered', { messageId: data.messageId, status: true });
//     });

//     socket.on('leave', (data) => {                      // kaun leave hua hai room se
//         console.log("data/leave", data);
//         io.to(data.room).emit('leave', emit('data', { data: data, status: false }));
//     })

//     socket.on('messageSeen', (data) => {         //  room id , sender id , recerver id
//         console.log("data/messageSeen========", data);
//         io.to(data.room).emit('messageSeen', { messageId: data.messageId, status: true, data: data });
//     });

//     socket.on('notifyRecipient', (data) => {
//         io.to(data.recipientRoom).emit('notifyRecipient', {
//             sender: data.sender,
//             message: data.message,
//         });
//     });
// });

// ========================== final correct code 1/2/24 start========================================


// 'use strict';
// const dotenv = require('dotenv').config()
// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// const messageController = require('./Controller/messageController');
// const messageModel = require("./model/messagesModel");
// const path = require('path');
// const { count } = require('console');
// const { object } = require('joi');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + './public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// const PORT = process.env.PORT || 3000;
// http.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('sendTyping', (data) => {
//         console.log('typing data :');
//         io.to(data.room).emit('typing', { name: data.name, room: data.room, data: data });
//     });

//     socket.on('markMessagesAsSeen', async (data) => {
//         try {
//             console.log("seen-----",data);      // jab user2 seen karega tb update hoga aur get api chalegi
//             await messageModel.markMessagesAsSeen(data);
//             let response = await messageModel.getDataById(data.id)
//             console.log("response/seen/server",response);
//             io.to(data.room).emit('messagesSeen', { room: data.room, sender_id: data.sender_id, receiver_id: data.receiver_id, response });
//         } catch (error) {
//             console.error('Error marking messages as seen:', error);
//         }
//     });

//     socket.on('newchat', async (data) => {
//         console.log("Received newchat data from client:");
//         try {
//             if (!data.msg.imgUrl == '' || !data.msg.videoImgUrl == '' || !data.msg.videoUrl == '' || !data.msg.audioUrl == '' || !data.msg.stickerImgUrl == '') {
//                 console.log("inside");
//                 const fs = require("fs").promises;
//                 var timestamp = new Date().getTime();
//                 var imgName = timestamp + "-" + data.msg.name;
//                 const filePath = __dirname + "/images/" + imgName + ".jpg";
//                 let base64Data;
//                 if (data.msg.imgUrl.includes('data:image/jpeg;base64,')) {
//                     base64Data = data.msg.imgUrl.split(';base64,').pop();
//                 } else {
//                     base64Data = data.msg.imgUrl;
//                 }
//                 const buffer = Buffer.from(base64Data, 'base64');
//                 await fs.writeFile(filePath, buffer);
// /****************************** */
// setTimeout(async () => {
//     try {
//         // Delete the image file
//         await fs.unlink(filePath);
//         console.log(`Image ${imgName} deleted successfully.`);
//     } catch (error) {
//         console.error(`Error deleting image ${imgName}:`, error);
//     }
// }, 60000); // 1 minute in milliseconds
// /*********************************** */
//             }
//             console.log("uuuuyyyyuyuy--",data);
//             let response_server =await messageController.save(data);
//             console.log("response_server===",response_server);

//             let response = await messageModel.getDataWithRoom(data)
//             console.log("responSeenAt",response,data.noofpeopleinroom)
//         if(data.noofpeopleinroom >1){   
//             let updateResponse = await messageModel.markMessagesAsSeen(response[0].id);
//             console.log("updateResponse==",updateResponse);
//         }  
// /******************* */
//         let updateOne = await messageModel.updateOne(response);       //jab userone ho
//         console.log("updateOne==",updateOne);                           // extra code

// /******************* */

//         let getData = await messageModel.getDataById(response[0].id);
// /** */
//         if(getData[0].seenFromUserId == 1 && getData[0].seenToUserId == 1 ){
//             getData[0].seenAt = '1'
//         }
//         console.log("getdata[0].seenAt",getData[0].seenAt);
// /** */

//         console.log("getData=====;;;",getData,data.msg.chatId);
//         let seenStatus = {
//             seenAt:getData[0].seenAt,
//             seenFromUserId:getData[0].seenFromUserId,
//             seenToUserId:getData[0].seenToUserId
//         }
//         console.log("seenStatus",seenStatus);
//         // const msg = { ...data.msg,"chatId":data.msg.chatId,"tableResponse":getData };
                                                           
//         const msg = { ...data.msg,"chatId":data.msg.chatId,"seenStatus":seenStatus };

//         io.to(data.msg.chatId).emit('message', msg);
          
//             console.log('Response from server:');
//         } catch (error) {
//             console.error('Error in newchat:', error);
//         }
//     });

//     socket.on('existschat', async function (data) {
//         console.log('receive existschat data from client');
//         try {
//             let get_data = await messageController.getData(data);
//             console.log("getdata/server----")
//             socket.emit('load-chat', { chat: "chat", loadedData: get_data, data: data });
//         } catch (error) {
//             console.error(error);
//         }
//     });

    
   
//     const fs = require("fs").promises;
//     const path = require("path");
    
//     socket.on('joinRoom', async (room) => {
//         console.log("room====>>>>", room);
//         socket.join(room);
//         console.log("roomjoin-",room);
//         updateNumberOfPeopleInRoom(room);
//     });
    
//     socket.on('leaveRoom', async (room) => {
//         console.log("room====>>>>", room);
//         socket.leave(room);
//         console.log("roomleave-",room);
//         updateNumberOfPeopleInRoom(room);
//     });
    
//     function updateNumberOfPeopleInRoom(room) {
//         console.log("room==",room);
//         const roomMembers = io.sockets.adapter.rooms.get(room);
//         console.log("roomMembers-------",roomMembers);
//         const numberOfPeopleInRoom = roomMembers ? roomMembers.size : 0;
//         console.log(`Number of people in room ${room}: ${numberOfPeopleInRoom}`);
    
//         // Emit the updated number of people to all clients in the room
//         io.to(room).emit('numberOfPeopleInRoom', { numberOfPeopleInRoom });
    
//         console.log("Updated number of people in room sent to clients");
//     }
    


//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });


//     socket.on('notifyRecipient', (data) => {
//         io.to(data.recipientRoom).emit('notifyRecipient', {
//             sender: data.sender,
//             message: data.message,
//         });
//     });
// });
 
// ===========================  final end correct code 1/2/24 ===================================================================

   
'use strict';
const dotenv = require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const messageController = require('./Controller/messageController');
const messageModel = require("./model/messagesModel");
const path = require('path');
const { count } = require('console');
const { object } = require('joi');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + './public'));

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
        console.log('typing data :');
        io.to(data.room).emit('typing', { name: data.name, room: data.room, data: data });
    });

    socket.on('markMessagesAsSeen', async (data) => {
        try {
            console.log("seen-----",data);      // jab user2 seen karega tb update hoga aur get api chalegi
            await messageModel.markMessagesAsSeen(data);
            let response = await messageModel.getDataById(data.id)
            console.log("response/seen/server",response);
            io.to(data.room).emit('messagesSeen', { room: data.room, sender_id: data.sender_id, receiver_id: data.receiver_id, response });
        } catch (error) {
            console.error('Error marking messages as seen:', error);
        }
    });

    socket.on('newchat', async (data) => {
        console.log("Received newchat data from client:");
        try {
            if (!data.msg.imgUrl == '' || !data.msg.videoImgUrl == '' || !data.msg.videoUrl == '' || !data.msg.audioUrl == '' || !data.msg.stickerImgUrl == '') {
                console.log("inside");
                const fs = require("fs").promises;
                var timestamp = new Date().getTime();
                var imgName = timestamp + "-" + data.msg.name;
                const filePath = __dirname + "/images/" + imgName + ".jpg";
                let base64Data;
                if (data.msg.imgUrl.includes('data:image/jpeg;base64,')) {
                    base64Data = data.msg.imgUrl.split(';base64,').pop();
                } else {
                    base64Data = data.msg.imgUrl;
                }
                console.log("base64Data",base64Data)
                const buffer = Buffer.from(base64Data, 'base64');
                await fs.writeFile(filePath, buffer);
                /****************************** */
                setTimeout(async () => {
                    try {
                        // Delete the image file
                        await fs.unlink(filePath);
                        console.log(`Image ${imgName} deleted successfully.`);
                    } catch (error) {
                        console.error(`Error deleting image ${imgName}:`, error);
                    }
                }, 60000); // 1 minute in milliseconds
                /*********************************** */
            }
            console.log("uuuuyyyyuyuy--",data);
            let response_server =await messageController.save(data);
            console.log("response_server===",response_server);
           


            let response = await messageModel.getDataWithRoom(data)
            console.log("responSeenAt",response,data.noofpeopleinroom)
        if(data.noofpeopleinroom >1){   
            let updateResponse = await messageModel.markMessagesAsSeen(response[0].id);
            console.log("updateResponse==",updateResponse);
        }  
/******************* */
        let updateOne = await messageModel.updateOne(response);       //jab userone ho
        console.log("updateOne==",updateOne);                           // extra code

/******************* */

        let getData = await messageModel.getDataById(response[0].id);
/** */
        if(getData[0].seenFromUserId == 1 && getData[0].seenToUserId == 1 ){
            getData[0].seenAt = '1'
        }
        console.log("getdata[0].seenAt",getData[0].seenAt);
/** */

        console.log("getData=====;;;",getData,data.msg.chatId);
        let seenStatus = {
            seenAt:getData[0].seenAt,
            seenFromUserId:getData[0].seenFromUserId,
            seenToUserId:getData[0].seenToUserId
        }
        console.log("seenStatus",seenStatus);
        // const msg = { ...data.msg,"chatId":data.msg.chatId,"tableResponse":getData };
                                                           
        const msg = { ...data.msg,"chatId":data.msg.chatId,"seenStatus":seenStatus };

        io.to(data.msg.chatId).emit('message', msg);
          
            console.log('Response from server:');
        } catch (error) {
            console.error('Error in newchat:', error);
        }
    });

    socket.on('existschat', async function (data) {
        console.log('receive existschat data from client');
        try {
            let get_data = await messageController.getData(data);
            console.log("getdata/server----")
            socket.emit('load-chat', { chat: "chat", loadedData: get_data, data: data });
        } catch (error) {
            console.error(error);
        }
    });

    
   
    const fs = require("fs").promises;
    const path = require("path");
    
    socket.on('joinRoom', async (room) => {
        console.log("room====>>>>", room);
        socket.join(room);
        console.log("roomjoin-",room);
        updateNumberOfPeopleInRoom(room);
    });
    
    socket.on('leaveRoom', async (room) => {
        console.log("room====>>>>", room);
        socket.leave(room);
        console.log("roomleave-",room);
        updateNumberOfPeopleInRoom(room);
    });
    
    function updateNumberOfPeopleInRoom(room) {
        console.log("room==",room);
        const roomMembers = io.sockets.adapter.rooms.get(room);
        console.log("roomMembers-------",roomMembers);
        const numberOfPeopleInRoom = roomMembers ? roomMembers.size : 0;
        console.log(`Number of people in room ${room}: ${numberOfPeopleInRoom}`);
    
        // Emit the updated number of people to all clients in the room
        io.to(room).emit('numberOfPeopleInRoom', { numberOfPeopleInRoom });
    
        console.log("Updated number of people in room sent to clients");
    }
    


    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });


    socket.on('notifyRecipient', (data) => {
        io.to(data.recipientRoom).emit('notifyRecipient', {
            sender: data.sender,
            message: data.message,
        });
    });
});

// *******************************************************************************************

