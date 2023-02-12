const Chat = require('../models/chatModel');
const User = require('../models/userModel');

exports.accessChat = (async(req,res,next)=>{
    try{
       const {userId} =  req.body;
       if(!userId){
        console.log("UserId param not sent with the request")
        return res.sendStatus(400)
       }

       var isChat = await Chat.find({
        isGroupChat : false,
        $and : [
            {
                users : {$elemMatch : {$eq:req.user._id}}
            },
            {
                users : {$elemMatch : {$eq:userId}}
            }
        ]
       }).populate("users" , "-password").populate("latestChat")
    
       isChat = await User.populate(isChat , {
        path : 'latestChat.sender',
        select : "name pic email"
       })

       if(isChat.length>0){
        res.send(isChat[0])
       }else{
        var chatData = {
            chatName : "sender",
            isGroupChat : false,
            users :[req.user._id , userId]
        }

        try{
            const createChat = await Chat.create(chatData);
            const FullChat = await  Chat.find({_id : createChat._id}).populate("users" , "-password")
            res.status(200).send(FullChat);
        }catch(err){
            res.status(400).send(err.message);
            return;
        }
       }
    }   
    catch(err){
        await res.status(400).send(err);
    }
})

exports.fetchChats = (async(req,res,next)=>{
    try{
        Chat.find({users : {$elemMatch : {$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestChat")
        .sort({ updatedAt : -1})
        .then(async(results)=>{
            results = await User.populate(results , {
                path : "latestChat.sender",
                select : "name pic email"
            })

            res.status(200).send(results)
            return;
        })  
    }catch(err){
      return  res.status(400).send(err.message)
    }
})


exports.createGroup = (async(req,res,next)=>{
    try{
        if(!req.body.users || !req.body.name){
            return res.status(400).send(({message : "Please Fill in all the details"}))

        }

        var users = JSON.parse(req.body.users)
        if(users.length < 2){
            return res.status(400).send("More than 2 users are required to form a group")
            
        }
        users.push(req.user)


        try{
            const grpChat  = await Chat.create(
                {
                    chatName : req.body.name,
                    users: users,
                    isGroupChat : true,
                    groupAdmin : req.user
                }
            )

            const fullGroupChat = await Chat.findOne({_id : grpChat._id}).populate("users" , "-password").populate("groupAdmin" , "-password")
            return res.status(201).json(fullGroupChat)
        }catch(err){
            return res.status(400).send(err.message)
        }

    }catch(err){
       return res.status(400).send(err.message)
    }
})

exports.renameGroup = (async(req,res,next)=>{
    try{
    const {chatId , chatName} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(chatId , 
        {
        chatName : chatName
    },{
        new:true
    }).populate("users","-password").populate("groupAdmin" , "-password")

    if(!updatedChat){
        return res.status(400).send("Chat Not  Found")
    }
    return res.json({updatedChat})
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})

exports.AddToGroup = (async(req,res,next)=>{
try{
    const {chatId , userId}  = req.body;
    const added =await Chat.findByIdAndUpdate(chatId , 
        {
            $push : {users : userId}
        },
        {
            new : true
        }
        ).populate("users" , "-password").populate("groupAdmin" , "-password")


        if(!added){
            return res.status(404).end("Chat Not Found")
        }else{
            return res.json(added)
        }

}catch(err){
    return res.status(400).send(err.message)
}
})
exports.removeFromGroup = (async(req,res,next)=>{
try{
    const {chatId , userId}  = req.body;
    const removed =await Chat.findByIdAndUpdate(chatId , 
        {
            $pull : {users : userId}
        },
        {
            new : true
        }
        ).populate("users" , "-password").populate("groupAdmin" , "-password")


        if(!removed){
            return res.status(404).end("Chat Not Found")
        }else{
            return res.json(removed)
        }

}catch(err){
    return res.status(400).send(err.message)
}
})