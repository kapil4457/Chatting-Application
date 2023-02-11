const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();


app.use(cors());
app.use(express.json())  // To accept json

const chatRoutes = require('./routes/chatRoute.js')
const userRoute = require('./routes/userRoute')


app.use('/api/v1/' , chatRoutes);
app.use('/api/v1/' , userRoute);


module.exports = app;