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

const messagesModel = require('../model/messagesModel');

const save = async (data) => {
    try {
        console.log("data--/service", data);

        if (data.imgUrl && data.imgUrl.path !== undefined && data.imgUrl.path === '') {
            data.imgUrl.path = '';
        }
        // console.log("data.imgUrl.path", data);

        let details = {
            chatId: data.chatId || '0', // Provide a default value if data.chatId is undefined
            msgType: data.msgType || 0,
            fromUserId: data.fromUserId || '0', // Provide a default value if data.fromUserId is undefined
            toUserId: data.toUserId || '0', // Provide a default value if data.toUserId is undefined
            message: data.message || '',
            imgUrl: data.imgUrl ? data.imgUrl.path || '' : '', // Check if data.imgUrl is defined before accessing its properties
            videoImgUrl: data.videoImgUrl || '',
            videoUrl: data.videoUrl || '',
            audioUrl: data.audioUrl || '',
            stickerId: data.stickerId || 0,
            stickerImgUrl: data.stickerImgUrl || '',
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

        // console.log("details====>>>>", details);

        // const multer = require("multer");
        // const storage = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //         cb(null, path.join(__dirname, './images'));
        //     },
        //     filename: (req, file, cb) => {
        //         cb(null, Date.now() + '-' + (file.originalname));
        //     },
        // });
        // const upload = multer({ storage: storage }).single('imgUrl');



        let response = await messagesModel.save(details);
        console.log("resp-----", response);
        return response;
    } catch (error) {
        console.error('Error while processing save:', error.message);
        throw error;
    }
};

module.exports = { save };
