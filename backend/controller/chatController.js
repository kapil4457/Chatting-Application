const data = require('../data/data')

exports.allChats = (async(req,res,next)=>{
    try{
        await res.status(200).send(data);
    }   
    catch(err){
        await res.status(400).send(err);
    }
})