

const express = require('express');
const messageRouter = express.Router();
const messageController = require('../Controller/messageController');

// messageRouter.post('/message-post', messageController.save);

messageRouter.post('/save-phrases', messageController.savePhrases);
messageRouter.get('/get-phrases-byId', messageController.getPhrasesById);


module.exports = messageRouter;
