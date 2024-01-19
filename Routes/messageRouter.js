

const express = require('express');
const messageRouter = express.Router();
const messageController = require('../Controller/messageController');

messageRouter.post('/message-post', messageController.save);

module.exports = messageRouter;
