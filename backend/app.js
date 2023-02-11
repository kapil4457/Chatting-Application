const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();


app.use(cors())

const chats = require('./routes/chatRoute.js')


app.use('/api/v1/' , chats);


module.exports = app;