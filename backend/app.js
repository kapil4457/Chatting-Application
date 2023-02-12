const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const {errorHandler, notFound} =require('./middleware/errorMiddleware')


app.use(cors());
app.use(express.json())  // To accept json

const chatRoutes = require('./routes/chatRoute.js')
const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute.js')


app.use('/api/v1/' , chatRoutes);
app.use('/api/v1/' , userRoute);
app.use('/api/v1/' , messageRoute);



app.use(notFound);
app.use(errorHandler)

module.exports = app;