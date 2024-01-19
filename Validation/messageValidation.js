const joi = require('joi');
const comman = require('../comman');

const save = async (data) => {
    let schema = joi.object({
       
        chatId: joi.string(),
        msgType: joi.string(),
        fromUserId: joi.string(),
        toUserId: joi.string(),
        message: joi.any().allow(''),
        imgUrl: joi.any().allow('') ,
        videoImgUrl: joi.string(),
        videoUrl: joi.string(),
        audioUrl: joi.string(),
        stickerId: joi.string(),
        stickerImgUrl: joi.string(),
        area: joi.string(),
        country: joi.string(),
        city: joi.string(),
        lat: joi.string(),
        lng: joi.string(),
        createAt: joi.string(),
        removeAt: joi.string(),
        removeFromUserId: joi.string(),
        removeToUserId: joi.string(),
        seenAt: joi.string(),
        seenFromUserId: joi.string(),
        seenToUserId: joi.string(),
        u_agent: joi.string(),
        ip_addr: joi.string()

    })
    let response = await comman.comman(schema, data);
    return response;
}

module.exports = {save}