const app = require('./app')
const chats = require("./data/data");
const connectDatabase = require('./database');
require("dotenv").config();
const colors = require('colors')

// //handling uncaught exceptions
// process.on("uncaughtException", (err) => {
// 	console.log(err.message);
// 	console.log("Shutting down due to unhandled Promise Rejection ");
// 	process.exit(1);
// });





const server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`.yellow.bold);
});


const io = require('socket.io')(server , {
	pingTimeout : 60000,
	cors:{
		origin : "http://localhost:3000"
	}
})

io.on("connection" , (socket)=>{
	console.log("connected to socket.io");
	socket.on('setup' , (userData)=>{
		socket.join(userData._id);
		socket.emit('connected')

	})
	socket.on('join chat' , (room)=>{
		socket.join(room);
		socket.emit('User Joined Room : ' + room)

	})
	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
	socket.on("new message", (newMessageRecieved) => {
	  var chat = newMessageRecieved.chat;
  
	  if (!chat.users) return console.log("chat.users not defined");
  
	  chat.users.forEach((user) => {
		if (user._id == newMessageRecieved.sender._id) return;
		socket.in(user._id).emit("message recieved", newMessageRecieved);
	  });
	});
  
	socket.off("setup", () => {
	  console.log("USER DISCONNECTED");
	  socket.leave(userData._id);
	});
})







connectDatabase()

// //Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
// 	console.log(`Error  :${err.message}`);
// 	console.log("Shutting down due to unhandled Promise Rejection ");
// 	server.close(() => {
// 		process.exit(1);
// 	});
// });