// const userModel = require('../model/userModel');
// const db = require('../database/connection');

// const userRegister = async (req, res) => {
//     try {
//         const data = req.body;
//         const file = req.files;

//         console.log("this is register api",  file.image[0].filename,file.emoji[0].filename);

//         const user = await userModel.create({name:data.name,message:data.message,image:file.image[0].filename,emoji:file.emoji[0].filename});

//         if (user) {
//             res.status(200).json({ "msg": "created" });
//         } else {
//             res.status(404).json({ "error": "user not created" });
//         }
//     } catch (error) {
//         console.error("Error in userRegister:", error);
//         res.status(500).json({ "error": "Internal Server Error" });
//     }
// };


// const getUserByID = async(req,res)=>{
//     const id = req.params.id;
//     console.log("id",id);
//     const getData = await userModel.find({_id:id});
//     console.log("getData====>",getData);
//     if(getData){
//         res.status(200).json({"getUserData":getData});
//     }else{
//         res.status(404).json({"error":"data not found"});
//     }
// }

// const deleteUserById = async(req,res)=>{
//     const id = req.params.id;
//     const getData = await userModel.findOne({_id:id});
//     console.log("getData",getData);
//     if(getData){
//         const userDelete = await userModel.deleteOne({_id:id});
//         if(userDelete){
//          res.status(200).json({"message":"user deleted"});
//         }else{
//             res.status(404).json({"error":"user not deleted"});
//         }
//     }else{
//         res.status(500).json({"error":"userdata not found"});
//     }
// }
// // const saveChat = async (req, res) => {
// //     try {
// //         const data = req.body;
// //         console.log('data', data);

      
// //         if (!data.message) {
// //             return res.status(400).json({ error: "Message is required" });
// //         }

// //         const user = await chatModel.create(data);
        
// //         console.log("user", user);
        
// //         res.status(200).json({ msg: "Chat saved" });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // };


// module.exports={userRegister,getUserByID , deleteUserById  };