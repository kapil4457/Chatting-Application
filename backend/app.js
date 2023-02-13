const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const {errorHandler, notFound} =require('./middleware/errorMiddleware')
const path = require("path");
const bodyParser = require("body-parser");


app.use(cors());
app.use(express.json())  // To accept json

const chatRoutes = require('./routes/chatRoute.js')
const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute.js')


app.use('/api/v1/' , chatRoutes);
app.use('/api/v1/' , userRoute);
app.use('/api/v1/' , messageRoute);


app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


app.use(notFound);
app.use(errorHandler)



module.exports = app;