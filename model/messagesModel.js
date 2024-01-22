'use strict'
const { connection } = require('../database/mysqlConnection');


const save = async (details) => {
    console.log("details--/model----");

   let query = ` INSERT INTO messages (chatId, msgType, fromUserId, toUserId, message, imgUrl, videoImgUrl, videoUrl, audioUrl, stickerId, stickerImgUrl, area, country, city, removeFromUserId, removeToUserId, seenAt, seenFromUserId, seenToUserId, u_agent) VALUE ('${details.chatId}','${details.msgType}','${details.fromUserId}','${details.toUserId}','${details.message}','${details.imgUrl}','${details.videoImgUrl}','${details.videoUrl}','${details.audioUrl}','${details.stickerId}','${details.stickerImgUrl}','${details.area}','${details.country}','${details.city}','${details.removeFromUserId}','${details.removeToUserId}','${details.seenAt}','${details.seenFromUserId}','${details.seenToUserId}','${details.u_agent}')`

    return new Promise(await function (resolve, reject){
        connection.query(query, (error, result) => {
            if (error) {
                console.error("Error executing query:", error);
                reject("Error executing query");
            } else {
                console.log("result---");
                resolve(true);
            }
        });
    });
};


const getData = async(data)=>{

    console.log("data/model--");

    let query = `SELECT * FROM messages WHERE (sender_id = :sender_id AND receiver_id = :receiver_id)
    OR (sender_id = :receiver_id AND receiver_id = :sender_id);`

    console.log("data/model-->>>>>");


    return new Promise(await function (resolve, reject){
        connection.query(query, (error, result) => {
            if (error) {
                console.error("Error executing query:", error);
                reject("Error executing query");
            } else {
                console.log("result-model-0-get--");
                resolve(true);
            }
        });
    });
}

module.exports = { save , getData };

