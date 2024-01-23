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


/*********************************** */

const { response } = require('express');
const messagesModel = require('../model/messagesModel');
const multer = require("multer");
const path = require("path");
const http = require("http");

const save = async (data,file) => {
    try {
        console.log("data--/service");

        // let file =file.msg.image || data.msg.stickerImgUrl || '';
        let imageUrl = '';
        let stickerUrl = '';
        let videoImgUrl = '';
        let audioUrl = '';

        if (file && file.imageUrl && file.imageUrl.name) {
            imageUrl = file.imageUrl.name;
        }

        if (file && file.stickerUrl && file.stickerUrl.name) {
            stickerUrl = file.stickerUrl.name;
        }

        if(file && file.videoImgUrl && file.videoImgUrl.name){
            videoImgUrl = file.videoImgUrl.name
        }

        if(file && file.audioUrl && file.audioUrl.name){
            audioUrl = file.audioUrl.name
        }
        

        console.log("imageurl,stikar after");

        // if (data.imgUrl && data.imgUrl.path !== undefined && data.imgUrl.path === '') {
            
            // console.log("dataimgurlpath-------->",data.imgUrl.path);
        // }
        // console.log("data.imgUrl.path", data);

        let details = {
            chatId: data.chatId || '0', // Provide a default value if data.chatId is undefined
            msgType: data.msgType || 0,
            fromUserId: data.fromUserId || '0', // Provide a default value if data.fromUserId is undefined
            toUserId: data.toUserId || '0', // Provide a default value if data.toUserId is undefined
            message: data.message || '',
            imgUrl: imageUrl, // Check if data.imgUrl is defined before accessing its properties
            videoImgUrl: videoImgUrl || '',
            videoUrl: data.videoUrl || '',
            audioUrl: audioUrl || '',
            stickerId: stickerUrl || 0,
            stickerImgUrl: stickerUrl || '',
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


        console.log("messageservice --3- ");


        
       
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const  express =  require('express');
const app = express();

const upload = multer({ storage: storage }).single('image');

app.post('/', async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            upload(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // Convert the uploaded file to base64
        const imagePath = path.join(__dirname, '../images', req.file.filename);
        const imageBase64 = fs.readFileSync(imagePath, 'base64');

        // Send the base64 data or do something else with it
        res.send(imageBase64);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});



        console.log("load---service---->");

        let response = await messagesModel.save(details);
        console.log("resp-service---->");
        return response;
    } catch (error) {
        console.error('Error while processing save:', error.message);
        throw error;
    }
};

const getData= async(data)=>{
    console.log("getdata/service---");
    let response = await messagesModel.getData(data);
    console.log("response-----");
    return response;

}

module.exports = { save , getData };
