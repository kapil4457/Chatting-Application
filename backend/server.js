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


connectDatabase()

// //Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
// 	console.log(`Error  :${err.message}`);
// 	console.log("Shutting down due to unhandled Promise Rejection ");
// 	server.close(() => {
// 		process.exit(1);
// 	});
// });