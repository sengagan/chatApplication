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



// ===========================  final  correct code 1/2/24 start=================================================================== 


// const fs = require("fs");
// const express = require('express');
// const multer = require("multer");
// const path = require("path");
// const messagesModel = require('../model/messagesModel');

// const save = async (data) => {
//     try {
//         console.log("data receive from controller",data);
//         // data = data.msg.data;
//         let imageUrl = '';
//         let stickerUrl = '';
//         let videoImgUrl = '';
//         let audioUrl = '';
//         let videoUrl = '';

//         // if (data || data.imageUrl || data.imageUrl.name || data.msg.data) {
//         //     console.log(".,.,.,.,",);
//         //     imageUrl = data.msg.data
//         //     const  timestamp = new Date().getTime();
//         //     const imgName = timestamp + "-" + data.msg.name;    
//         //     const filePath = __dirname + "/images/" + imgName + ".jpg";
//         //     // console.log("......",timestamp,imgName,filePath);
//         //     imageUrl = filePath;
//         // }

//         if (data && data.msg.imgUrl && data.msg.imgUrl) {
//             console.log("imagUrl.,.,.,.,");
//             imageUrl = data.msg.data
//             const  timestamp = new Date().getTime();
//             const imgName = timestamp + "-" + data.msg.name;    
//             const filePath = __dirname + "/images/" + imgName ;
//             console.log("......",timestamp,imgName,filePath);
//             imageUrl = filePath;
//         }

//         if (data && data.msg.stickerUrl && data.msg.stickerUrl) {
//             console.log("stickerUrl.,.,.,.,");
//             imageUrl = data.msg.data
//             const  timestamp = new Date().getTime();
//             const imgName = timestamp + "-" + data.msg.name;    
//             const filePath = __dirname + "/images/" + imgName ;
//             console.log("......",timestamp,imgName,filePath);
//             stickerUrl = filePath;
//         }

//         if (data && data.msg.videoImgUrl && data.msg.videoImgUrl) {
//             console.log("videoImgUrl.,.,.,.,");
//             imageUrl = data.msg.data
//             const  timestamp = new Date().getTime();
//             const imgName = timestamp + "-" + data.msg.name;    
//             const filePath = __dirname + "/images/" + imgName ;
//             console.log("......",timestamp,imgName,filePath);
//             videoImgUrl = filePath;
//         }

//         if (data && data.msg.audioUrl && data.msg.audioUrl) {
//             console.log("audioUrl.,.,.,.,");
//             imageUrl = data.msg.data
//             const  timestamp = new Date().getTime();
//             const imgName = timestamp + "-" + data.msg.name;    
//             const filePath = __dirname + "/images/" + imgName ;
//             console.log("......",timestamp,imgName,filePath);
//             audioUrl = filePath;
//         }

//         if( data && data.msg.videoUrl && data.msg.videoUrl){
//             console.log("videoUrl.,.,.,.,",);
//             imageUrl = data.msg.data
//             const  timestamp = new Date().getTime();
//             const imgName = timestamp + "-" + data.msg.name;    
//             const filePath = __dirname + "/images/" + imgName;
//             console.log("......",timestamp,imgName,filePath);
//             videoUrl = filePath;
//         }



//         let details = {
//             chatId: data.msg.chatId,
//             msgType: data.msgType || 0,
//             fromUserId: data.sender_id || 'defaultmessage',
//             toUserId: data.receiver_id || 'defaultmessage',
//             message: data.msg.message || 'defaultmessage',
//             imgUrl: imageUrl ,
//             videoImgUrl: videoImgUrl,
//             videoUrl: videoUrl,
//             audioUrl: audioUrl,
//             stickerId: data.msg.stickerId || 0,
//             stickerImgUrl: stickerUrl,
//             area: data.area || 0,
//             country: data.country || 0,
//             city: data.city || 0,
//             // lat: data.lat || null,
//             // lng: data.lng || null,
//             createAt: data.timestamp || 1,
//             removeAt: data.removeAt || 0,
//             removeFromUserId: data.removeFromUserId || '0',
//             removeToUserId: data.removeToUserId || '0',
//             seenAt: data.seenAt || 0,
//             seenFromUserId: data.seenFromUserId || '0',
//             seenToUserId: data.seenToUserId || '0',
//             u_agent: data.u_agent || '',
//             ip_addr: data.ip_addr || '',
//             location :{
//                 lat : data.msg.location.lat || null ,
//                 long : data.msg.location.long || null 
//             } 
//         };

//         console.log("load---service---->");
//         let response = await messagesModel.save(details);
//         console.log("resp-service---->");
//         return response;

//     } catch (error) {
//         console.error('Error uploading file:', error);
//         res.status(500).send('Error uploading file');
//     }

// };

// const getData = async (data) => {
//     console.log("getdata/service-gg--");
//     let response = await messagesModel.getData(data);
//     console.log("response---gg--");
//     return response;
// }



// module.exports = { save, getData };

// ===========================  final end correct code 1/2/24 =================================================================== -->



const fs = require("fs");
const express = require('express');
const multer = require("multer");
const path = require("path");
const messagesModel = require('../model/messagesModel');
const { log } = require("console");

const save = async (data) => {
    try {
        console.log("data receive from controller", data);
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

        if (data && data.msg.imgUrl) {
            console.log("imagUrl.,.,.,.,");
            // imageUrl = data.msg.imageUrl
            // const imgName = timestamp + "-" + data.msg.name;
            var timestamp = new Date().getTime();
            var imgName = timestamp;
            const filePath = __dirname + "/images/" + imgName + ".jpg";
            console.log("......", timestamp, imgName, filePath);
            imageUrl = filePath;
        }

        if (data && data.msg.stickerImgUrl) {
            console.log("stickerUrl.,.,.,.,");
            // imageUrl = data.msg.stickerImgUrl
            const timestamp = new Date().getTime();
            const imgName = timestamp;
            const filePath = path.join(__dirname + "/images/" + imgName + ".jpg");
            console.log("......", timestamp, imgName, filePath);
            stickerUrl = filePath;
        }

        if (data && data.msg.videoImgUrl) {
            console.log("videoImgUrl.,.,.,.,");
            // imageUrl = data.msg.data
            const timestamp = new Date().getTime();
            const imgName = timestamp;
            const filePath = path.join(__dirname + "/images/" + imgName + ".jpg");
            console.log("......", timestamp, imgName, filePath);
            videoImgUrl = filePath;
        }

        if (data && data.msg.audioUrl) {
            console.log("audioUrl.,.,.,.,");
            // imageUrl = data.msg.data
            const timestamp = new Date().getTime();
            const imgName = timestamp + "-" + data.msg.name;
            const filePath =path.join(__dirname + "/images/" + imgName + ".jpg");
            console.log("......", timestamp, imgName, filePath);
            audioUrl = filePath;
        }

        if (data && data.msg.videoUrl) {
            console.log("videoUrl.,.,.,.,",);
            // imageUrl = data.msg.data
            const timestamp = new Date().getTime();
            const imgName = timestamp + "-" + data.msg.name;
            const filePath = path.join(__dirname + "/images/" + imgName + ".jpg");
            console.log("......", timestamp, imgName, filePath);
            videoUrl = filePath;
        }

        let details = {
            chatId: data.msg.chatId || 5,
            msgType: data.msgType || 0,
            fromUserId: data.sender_id,
            toUserId: data.receiver_id,
            message: data.msg.message,
            imgUrl: imageUrl,
            videoImgUrl: videoImgUrl,
            videoUrl: videoUrl,
            audioUrl: audioUrl,
            stickerId: data.msg.stickerId || 0,
            stickerImgUrl: stickerUrl,
            area: data.area || 0,
            country: data.country || 0,
            city: data.city || 0,
            // lat: data.lat || null,
            // lng: data.lng || null,
            createAt: data.timestamp || 1,
            removeAt: data.removeAt || 0,
            removeFromUserId: data.removeFromUserId || '0',
            removeToUserId: data.removeToUserId || '0',
            seenAt: data.seenAt || 0,
            seenFromUserId: data.seenFromUserId || '0',
            seenToUserId: data.seenToUserId || '0',
            u_agent: data.u_agent || '',
            ip_addr: data.ip_addr || '',
            location: {
                lat: data.msg.location.lat || null,
                long: data.msg.location.long || null
            }
        };

        console.log("load---service---->", details);
        let response = await messagesModel.save(details);
        console.log("resp-service---->", response);
        /** */
        if (data.expiryImage == 1) {
            const imageUrlPath = details.imgUrl;
            setTimeout(async () => {
                try {
                    await messagesModel.deleteImgUrl(details);
                    console.log(`Image deleted successfully.`);
                } catch (error) {
                    console.error(`Error deleting image :`, error);
                }
            }, 60000);
        }
        /** */
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
};

const getData = async (data) => {
    console.log("getdata/service-gg--");
    let response = await messagesModel.getData(data);
    console.log("response---gg--");
    return response;
}

const savePhrases = async (details) => {
    let data = {
        text: details.text,
        id: details.id
    };
    console.log("data---->", data);
    let response = await messagesModel.savePhrases(data);
    console.log("resp-service---->", response);
    return response;
}

const getPhrasesById = async (data) => {
    // console.log("getdata/service-gg--");
    let response = await messagesModel.getPhrasesById(data);
    // console.log("response---gg--");
    return response;
}

/********************************************** */
const createGallery = async (details) => {
    console.log("createGalleryservices-->>>>");
    let data = {
        user_id: details.user_id,
        image: details.image
    };

    var timestamp = new Date().getTime();
    // var imgName = timestamp + "-" + data.msg.name ;
    const filePath = __dirname + "/../photo/" + timestamp + ".jpg";
    let base64Data;
    if (data.image.includes('data:image/jpeg;base64,')) {
        base64Data = data.image.split(';base64,').pop();
    } else {
        base64Data = data.image;
    }

    // var bs64 = base64.encode(isUtf8.encode());
    // Uint8List decodedImage = base64.decode(bs64);
    // Image.memory(decodedImage)
    const fs = require("fs").promises;
    const buffer = Buffer.from(base64Data, 'base64');
    await fs.writeFile(filePath, buffer);
    let response = await messagesModel.createGallery(data.user_id, filePath);
    return response;
}

const readGallery = async (user_id) => {
    console.log("readGallery services-->>>>");
    let response = await messagesModel.readGallery(user_id);
    console.log("response", response);
    return response;
}

// const deleteGallery = async (user_id) => {
//     console.log("deleteGallery services-->>>>")
//     let getData = await messagesModel.readGallery(user_id)
//     console.log("getData",getData);
//     let path =getData[0].imgUrl;
//     console.log("path",path);
//     await fs.unlink(path);
//     // let response = await messagesModel.deleteGallery(user_id);
//     // console.log("response", response);

//     return response;
// }


const util = require('util');
const { isUtf8 } = require("buffer");
const unlinkAsync = util.promisify(fs.unlink);

const deleteGallery = async (user_id) => {
    console.log("deleteGallery services-->>>>");
    try {
        let getData = await messagesModel.readGallery(user_id);
        console.log("getData", getData);
        if (getData && getData.length > 0) {
            let path = getData[0].imgUrl;
            console.log("path", path);
            await unlinkAsync(path);
            let response = await messagesModel.deleteGallery(user_id);
            console.log("response", response);
            return response;
        } else {
            console.log("No data found for user_id:", user_id);
            return null;
        }
    } catch (error) {
        console.error("Error in deleteGallery:", error);
        throw error;
    }
};

const updateGallery = async (details) => {
    console.log("updateGallery services-->>>>");
    // let response = await messagesModel.updateGallery(data);
    // console.log("response", response);
    // return response;
    let data = {
        user_id: details.user_id,
        image: details.image
    };
    let getData = await messagesModel.readGallery(data.user_id);
    let path;
    if (getData && getData.length > 0) {
        path = getData[0].imgUrl;
        // console.log("Deleting old image:", path);
        await unlinkAsync(path);
    } else {
        console.log("No data found for user_id:", data.user_id);
    }
    // console.log("oldpath",path);
    const fs = require('fs').promises;
    var timestamp = new Date().getTime();
    const filePath = __dirname + "/../photo/" + timestamp + ".jpg";
    let base64Data;
    if (data.image.includes('data:image/jpeg;base64,')) {
        base64Data = data.image.split(';base64,').pop();
    } else {
        base64Data = data.image;
    }
    const buffer = Buffer.from(base64Data, 'base64');
    // console.log("buffer/filepath",filePath,buffer);
    await fs.writeFile(filePath, buffer, "binary");

    let updateData = {
        user_id: data.user_id,
        oldImgUrl: path,
        newImgUrl: filePath
    }

    let response = await messagesModel.updateGallery(updateData);
    // console.log("updateGallery response", response);
    return response;
}

/**********************************************/

// const multipleImage = async (req, res) => {
//     let details = {
//         chatId: req.body.chatId,
//         fromUserId: req.body.fromUserId,
//         toUserId: req.body.toUserId,
//         imgUrl: req.body.imgUrl,
//         seenAt: req.body.seenAt || 0,
//         seenFromUserId: req.body.seenFromUserId || '0',
//         seenToUserId: req.body.seenToUserId || '0',
//     }
//     console.log("details/service");
//     let file = details.imgUrl;
//     console.log("updateGallery services-->>>>",file);
//     if (file.length ) {
//         console.log("file");
//         await messagesModel.multipleImage(file,details);
//     } else {
//         for (let i = 0; i < file.length; i++) {
//             console.log("filelength", file[i]);
//             await messagesModel.multipleImage(file[i],details);
//         }
//     }
//     return true
// }

const multipleImage = async (req, res) => {
    try {
        const details = {
            chatId: req.body.chatId,
            fromUserId: req.body.fromUserId,
            toUserId: req.body.toUserId,
            imgUrl: req.body.imgUrl,
            seenAt: req.body.seenAt || 0,
            seenFromUserId: req.body.seenFromUserId || '0',
            seenToUserId: req.body.seenToUserId || '0',
        };

        console.log("details/service", details);

        const files = Array.isArray(details.imgUrl) ? details.imgUrl : [details.imgUrl];
        console.log("updateGallery services-->>>>", files);

        const maxImagesToSave = 6;

        for (let i = 0; i < Math.min(files.length, maxImagesToSave); i++) {
            console.log("filelength", files[i]);
            await messagesModel.multipleImage(files[i], details);
        }

        return true
    } catch (error) {
        console.error("Error in multipleImage:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


module.exports = { save, getData, savePhrases, getPhrasesById, createGallery, readGallery, updateGallery, deleteGallery, multipleImage };
