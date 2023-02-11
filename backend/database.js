const mongoose = require("mongoose")

require('dotenv').config();

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI , {  useUnifiedTopology:true,}).then((data)=>{
        console.log(`MongoDb Connected with server : ${data.connection.host}`.yellow.bold)
    }).catch((err)=>{
        console.log(`Error : ${err.message}`.red.bold)
    })
}

module.exports = connectDatabase;