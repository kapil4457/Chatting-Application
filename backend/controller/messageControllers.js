

const Chat = require('../models/chatModel');
const Message = require('../models/messageModel')
const User = require('../models/userModel')

const sendMessage = (async(req,res,next)=>{
    try{
        const {content , chatId} = req.body;
        if(!content  || !chatId){
            console.log("Invalid data passed into the request !!")
            return res.status(400).send("Invalid data passed into the request !!")
        }

        var newMessage = {
            sender : req.user._id,
            content:content,
            chat:chatId,
        }

        try{
            var message = await Message.create(newMessage);
            message = await message.populate("sender" , "name pic");
            message = await message.populate("chat");
            message = await User.populate(message , {
                path:'chat.users',
                select : 'name pic email'
            })

            await Chat.findByIdAndUpdate(req.body.chatId , {
                latestChat : message
            })

            res.json(message)

        }catch(err){
           return res.status(400).send(err.stack)
        }
        
    }catch(err){
        return res.status(400).send(err.stack)
    }

})

const allMessages = (async(req,res,next)=>{
    try{
        
    }catch(err){
        return res.status(400).send(err.message)
    }

})



module.exports = {sendMessage , allMessages}