const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const protect = (async(req,res,next)=>{
let token;
if(req.headers.authorization &&req.headers.authorization.startsWith("Bearer")){
    try{
        token  = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next()
    }catch(err){
            res.status(401).send("Not Authorized , token failed");
            return;
    }
}

if(!token){
    req.status(401).send("Not Authorized , No token");
    return;
}

})

module.exports = protect