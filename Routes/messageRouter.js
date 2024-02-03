const express = require('express');

const app = express();
const messageRouter = express.Router();
const messageController = require('../Controller/messageController');


messageRouter.post('/save-phrases', messageController.savePhrases);
messageRouter.get('/get-phrases-byId', messageController.getPhrasesById);

messageRouter.post('/create-gallery', messageController.createGallery);

messageRouter.get('/read-gallery', messageController.readGallery);
// messageRouter.put('/update-gallery/:id', messageController.updateGallery);
messageRouter.delete('/delete-gallery', messageController.deleteGallery);



module.exports = messageRouter;
