'use strict'
const { connection } = require('../database/mysqlConnection');


const save = async (details) => {
    console.log("details--", details);

    let query = `INSERT INTO messages (chatId, msgType, fromUserId, toUserId, message, imgUrl, videoImgUrl, videoUrl, audioUrl, stickerId, stickerImgUrl, area, country, city, lat, lng, createAt, removeAt, removeFromUserId, removeToUserId, seenAt, seenFromUserId, seenToUserId, u_agent, ip_addr) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, ?)`;

    let values = [
        details.chatId, details.msgType, details.fromUserId, details.toUserId,
        details.message, details.imgUrl, details.videoImgUrl, details.videoUrl,
        details.audioUrl, details.stickerId, details.stickerImgUrl, details.area,
        details.country, details.city, details.lat, details.lng, details.removeAt,
        details.removeFromUserId, details.removeToUserId, details.seenAt,
        details.seenFromUserId, details.seenToUserId, details.u_agent, details.ip_addr
    ];

    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, result) => {
            if (error) {
                console.error("Error executing query:", error);
                reject("Error executing query");
            } else {
                console.log("result", result);
                resolve(result);
            }
        });
    });
};

module.exports = { save };
