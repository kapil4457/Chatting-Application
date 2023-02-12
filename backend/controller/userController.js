const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


exports.loginUser = (async(req,res)=>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(401).send("Invalid Email or Password")
            return;
        }
        else{

            const isMatch = await user.matchPassword(password);
            
        if(isMatch){
            res.status(200).json({_id : user._id , name : user.name , email : user.email , pic : user.pic  , token : generateToken(user._id)});
            return;
        }else{
            
            res.status(401).send("Invalid Email or Password");
            return;
        }
        }

    }catch(err){
        res.status(500).send(err.message);
        return;
    }

})

exports.registerUser = (async(req,res)=>{
    try{
        const {name, email , password,pic} = req.body;
        if(!name || !email || !password ){
            res.status(400);
            throw new Error("Please Enter all the fields")
            return;
        }

        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).send("User already exists");
            return;
        }

        const user = await User.create({
            name,email,password,pic
        })
        if(user){
            res.status(201).json({_id : user._id , name : user.name , email : user.email , pic : user.pic , token : generateToken(user._id)});
            return;
        }

    }catch(err){
        res.status(400);
        throw new Error(err.message);
        return;
    }

})


exports.allUsers = (async(req,res,next)=>{
    try{

        const keyword = req.query.search ? {
            $or : [
        {name : {$regex:req.query.search , $options : "i"}},
        {email : {$regex:req.query.search , $options : "i"}},
    ]
} : {}


const users = await User.find(keyword).find({_id: {$ne:req.user._id}});
res.status(200).send(users);
return;
}catch(err){
    res.status(400).send(err.message);
    return;
}
})