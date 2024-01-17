const chatModel = require('../model/chatModel');
const db = require('../database/connection');

const saveChat = async (req, res) => {
    try {
        const data = req.body;
        console.log('data==controller===', data);

        if (!data.message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const user = await chatModel.create(data);
        
        console.log("user", user);
        
        res.status(200).json({ msg: "Chat saved" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports={saveChat };