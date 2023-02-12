const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const {errorHandler, notFound} =require('./middleware/errorMiddleware')


app.use(cors());
app.use(express.json())  // To accept json

const chatRoutes = require('./routes/chatRoute.js')
const userRoute = require('./routes/userRoute')


app.use('/api/v1/' , chatRoutes);
app.use('/api/v1/' , userRoute);



app.use(notFound);
app.use(errorHandler)

module.exports = app;