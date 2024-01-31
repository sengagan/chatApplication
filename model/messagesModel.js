'use strict'
const { connection } = require('../database/mysqlConnection');


const save = async (details) => {
    console.log("receive data from service",details);

    var lat = details.location.lat;
    var lng = details.location.long;

    console.log("location/model");


    let query = ` INSERT INTO messages (chatId, msgType, fromUserId, toUserId, message, imgUrl, videoImgUrl, videoUrl, audioUrl, stickerId, stickerImgUrl, area, country, city,lat,lng, removeFromUserId, removeToUserId, seenAt, seenFromUserId, seenToUserId, u_agent,ip_addr,createAt) VALUES ('${details.chatId}','${details.msgType}','${details.fromUserId}','${details.toUserId}','${details.message}','${details.imgUrl}','${details.videoImgUrl}','${details.videoUrl}','${details.audioUrl}','${details.stickerId}','${details.stickerImgUrl}','${details.area}','${details.country}','${details.city}','${lat}','${lng}','${details.removeFromUserId}','${details.removeToUserId}','${details.seenAt}','${details.seenFromUserId}','${details.seenToUserId}','${details.u_agent}','${details.ip_addr}','${details.createAt}')`

    return new Promise(await function (resolve, reject) {
        connection.query(query, (error, result) => {
            if (error) {
                console.error("Error executing query:", error);
                reject("Error executing query");
            } else {
                console.log("result---");
                resolve(result);
            }
        });
    });
};

const getData = async (data) => {
    console.log("getdata/model--", data);
    
    let query = `SELECT * FROM messages 
              WHERE (fromUserId = ${data.sender_id} AND toUserId = ${data.receiver_id})
              OR (fromUserId = ${data.receiver_id} AND toUserId = ${data.sender_id})
              ORDER BY id ASC`;
    console.log("getdata/model-->>2>>>");
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                console.error("Error executing query:", error);
                reject("Error executing query");
            } else {
                console.log("result-model-0-get--", result);
                resolve(result);
            }
        });
    });
};


const markMessagesAsSeen = async(data)=>{       //update
    console.log("data/mark==");
    let query = `UPDATE messages SET seenAt = '1', seenFromUserId = '1',seenToUserId = '1' WHERE chatId = ${data.room} AND seenAt = '0'`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                console.error("Error executing query:", error);
                reject("Error executing query");
            } else {
                console.log("result-model-0-get--");
                resolve(result);
            }
        });
    });
}

const getDataById = async (data) => {
    console.log("getdata/model--");

    let query = `SELECT * FROM messages WHERE (id = ${data});`;
    console.log("getdata/model-->>2>>>");
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                console.error("Error executing query:", error);
                reject("Error executing query");
            } else {
                console.log("result-model-0-get--");
                resolve(result);
            }
        });
    });
};

module.exports = { save, getData , markMessagesAsSeen , getDataById};

