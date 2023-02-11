const express = require("express");
const router = express.Router();

const {allChats} = require('../controller/chatController.js')


router.route('/chat').get(allChats)


module.exports = router;