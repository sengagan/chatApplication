// const messagesModel = require('../model/messagesModel');

// const save = async (data) => {
//     try {
//         console.log("data--/service",data);

//         if (data.imgUrl && data.imgUrl.path !== undefined && data.imgUrl.path == '') {
//             data.imgUrl.path = '';
//         }

//         console.log("data.imgUrl.path",data);

//         let details = {
//             chatId: data.chatId,
//             msgType: data.msgType || 0,
//             fromUserId: data.fromUserId || 0,
//             toUserId: data.toUserId || 0,
//             message: data.message || 0,
//             imgUrl: data.imgUrl.path || 0,
//             videoImgUrl: data.videoImgUrl || 0,
//             videoUrl: data.videoUrl || 0,
//             audioUrl: data.audioUrl || 0,
//             stickerId: data.stickerId || 0,
//             stickerImgUrl: data.stickerImgUrl || 0,
//             area: data.area || 0,
//             country: data.country || 0,
//             city: data.city || 0,
//             lat: data.lat || null,
//             lng: data.lng || null,
//             createAt: data.createAt || Date.now(), // Set default value to current timestamp
//             removeAt: data.removeAt || 0,
//             removeFromUserId: data.removeFromUserId || 0,
//             removeToUserId: data.removeToUserId || 0,
//             seenAt: data.seenAt || 0,
//             seenFromUserId: data.seenFromUserId || 0,
//             seenToUserId: data.seenToUserId || 0,
//             u_agent: data.u_agent || 0,
//             ip_addr: data.ip_addr || 0
//         };

//         console.log("details====>>>>", details);

//         // Call the save method from the messagesModel
//         let response = await messagesModel.save(details);
//         console.log("resp-----",response);
//         return response;
//     } catch (error) {
//         console.error('Error while processing save:', error.message);
//         throw error; // Re-throw the error to be handled by the calling code
//     }
// };

// module.exports = { save };


// /*********************************** */
// const fs = require("fs"); 
// const express = require('express');
// const multer = require("multer");
// const path = require("path");
// const messagesModel = require('../model/messagesModel');

// const save = async (data) => {
//     try {
//         console.log("data receive from controller", data);

//         let imageUrl = '';
//         let stickerUrl = '';
//         let videoImgUrl = '';
//         let audioUrl = '';

//         if (data && data.imageUrl && data.imageUrl.name) {
//             imageUrl = data.imageUrl.name;
//         }

//         if (data && data.stickerUrl && data.stickerUrl.name) {
//             stickerUrl = data.stickerUrl.name;
//         }

//         if (data && data.videoImgUrl && data.videoImgUrl.name) {
//             videoImgUrl = data.videoImgUrl.name;
//         }

//         if (data && data.audioUrl && data.audioUrl.name) {
//             audioUrl = data.audioUrl.name;
//         }

//         let details = {
//             chatId: data.room,
//             msgType: data.msgType || 0,
//             fromUserId: data.sender_id,
//             toUserId: data.receiver_id,
//             message: data.msg.message,
//             imgUrl: imageUrl,
//             videoImgUrl: videoImgUrl,
//             videoUrl: data.videoUrl,
//             audioUrl: audioUrl,
//             stickerId: stickerUrl,
//             stickerImgUrl: stickerUrl,
//             area: data.area || 0,
//             country: data.country || 0,
//             city: data.city || 0,
//             lat: data.lat || null,
//             lng: data.lng || null,
//             createAt: data.createAt || Date.now(),
//             removeAt: data.removeAt || 0,
//             removeFromUserId: data.removeFromUserId || '0',
//             removeToUserId: data.removeToUserId || '0',
//             seenAt: data.seenAt || 0,
//             seenFromUserId: data.seenFromUserId || '0',
//             seenToUserId: data.seenToUserId || '0',
//             u_agent: data.u_agent || '',
//             ip_addr: data.ip_addr || ''
//         };

//         const app = express();

//         const storage = multer.diskStorage({
//             destination: (req, file, cb) => {
//                 cb(null, path.join(__dirname, '../images'));
//             },
//             filename: (req, file, cb) => {
//                 cb(null, Date.now() + '-' + file.originalname);
//             },
//         });

//         const upload = multer({ storage: storage }).single('file');
//         console.log("upload/services",upload);
//         app.post('/', async (req, res) => {
//             try {
//                 await new Promise((resolve, reject) => {
//                     upload(req, res, (err) => {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve();
//                         }
//                     });
//                 });

//                 const base64Data = (details.imgUrl.base64Data || details.videoImgUrl.base64Data || details.videoUrl.base64Data || details.audioUrl.base64Data || details.stickerImgUrl.base64Data || '' );

//                 console.log("base64Data",base64Data);

//                 const buffer = Buffer.from(base64Data, 'base64');
//                 const fileName = 'uploaded_file.txt'; 
//                 fs.writeFileSync(fileName, buffer);
//                 res.send('File uploaded successfully!');

//                 const imagePath = path.join(__dirname, '../images', req.file.filename);
//                 console.log("imagePath/service",imagePath);
//                 const imageBase64 = fs.readFileSync(imagePath, 'base64');
//                 console.log("image upload in service :",imageBase64);
//                 res.send(imageBase64);
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//                 res.status(500).send('Error uploading file');
//             }
//         });

//         console.log("load---service---->");

//         let response = await messagesModel.save(details);
//         console.log("resp-service---->");
//         return response;
//     } catch (error) {
//         console.error('Error while processing save:', error.message);
//         throw error;
//     }
// };

// const getData = async (data) => {
//     console.log("getdata/service---");
//     let response = await messagesModel.getData(data);
//     console.log("response-----");
//     return response;
// }

// module.exports = { save, getData };





const fs = require("fs");
const express = require('express');
const multer = require("multer");
const path = require("path");
const messagesModel = require('../model/messagesModel');

const save = async (data) => {
    try {
        console.log("data receive from controller",data);
        // data = data.msg.data;
        let imageUrl = '';
        let stickerUrl = '';
        let videoImgUrl = '';
        let audioUrl = '';
        let videoUrl = '';

        // if (data || data.imageUrl || data.imageUrl.name || data.msg.data) {
        //     console.log(".,.,.,.,",);
        //     imageUrl = data.msg.data
        //     const  timestamp = new Date().getTime();
        //     const imgName = timestamp + "-" + data.msg.name;    
        //     const filePath = __dirname + "/images/" + imgName + ".jpg";
        //     // console.log("......",timestamp,imgName,filePath);
        //     imageUrl = filePath;
        // }

        if (data && data.msg.imgUrl && data.msg.imgUrl) {
            console.log("imagUrl.,.,.,.,",);
            imageUrl = data.msg.data
            const  timestamp = new Date().getTime();
            const imgName = timestamp + "-" + data.msg.name;    
            const filePath = __dirname + "/images/" + imgName ;
            console.log("......",timestamp,imgName,filePath);
            imageUrl = filePath;
        }

        if (data && data.msg.stickerUrl && data.msg.stickerUrl) {
            console.log("stickerUrl.,.,.,.,",);
            imageUrl = data.msg.data
            const  timestamp = new Date().getTime();
            const imgName = timestamp + "-" + data.msg.name;    
            const filePath = __dirname + "/images/" + imgName ;
            console.log("......",timestamp,imgName,filePath);
            stickerUrl = filePath;
        }

        if (data && data.msg.videoImgUrl && data.msg.videoImgUrl) {
            console.log("videoImgUrl.,.,.,.,",);
            imageUrl = data.msg.data
            const  timestamp = new Date().getTime();
            const imgName = timestamp + "-" + data.msg.name;    
            const filePath = __dirname + "/images/" + imgName ;
            console.log("......",timestamp,imgName,filePath);
            videoImgUrl = filePath;
        }

        if (data && data.msg.audioUrl && data.msg.audioUrl) {
            console.log("audioUrl.,.,.,.,",);
            imageUrl = data.msg.data
            const  timestamp = new Date().getTime();
            const imgName = timestamp + "-" + data.msg.name;    
            const filePath = __dirname + "/images/" + imgName ;
            console.log("......",timestamp,imgName,filePath);
            audioUrl = filePath;
        }

        if( data && data.msg.videoUrl && data.msg.videoUrl){
            console.log("videoUrl.,.,.,.,",);
            imageUrl = data.msg.data
            const  timestamp = new Date().getTime();
            const imgName = timestamp + "-" + data.msg.name;    
            const filePath = __dirname + "/images/" + imgName;
            console.log("......",timestamp,imgName,filePath);
            videoUrl = filePath;
        }



        let details = {
            chatId: data.msg.chatId,
            msgType: data.msgType || 0,
            fromUserId: data.sender_id || 'defaultmessage',
            toUserId: data.receiver_id || 'defaultmessage',
            message: data.msg.message || 'defaultmessage',
            imgUrl: imageUrl ,
            videoImgUrl: videoImgUrl,
            videoUrl: videoUrl,
            audioUrl: audioUrl,
            stickerId: data.msg.stickerId || 0,
            stickerImgUrl: stickerUrl,
            area: data.area || 0,
            country: data.country || 0,
            city: data.city || 0,
            lat: data.lat || null,
            lng: data.lng || null,
            createAt: data.createAt || Date.now(),
            removeAt: data.removeAt || 0,
            removeFromUserId: data.removeFromUserId || '0',
            removeToUserId: data.removeToUserId || '0',
            seenAt: data.seenAt || 0,
            seenFromUserId: data.seenFromUserId || '0',
            seenToUserId: data.seenToUserId || '0',
            u_agent: data.u_agent || '',
            ip_addr: data.ip_addr || ''
        };

        console.log("load---service---->",details);
        let response = await messagesModel.save(details);
        console.log("resp-service---->");
        return response;

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
   
};

const getData = async (data) => {
    console.log("getdata/service-gg--",data);
    let response = await messagesModel.getData(data);
    console.log("response---gg--",response);
    return response;
}

module.exports = { save, getData };
