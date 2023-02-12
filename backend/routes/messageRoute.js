const express = require("express")
const protect = require("../middleware/auth")
const { sendMessage , allMessages} = require('../controller/messageControllers.js')
const router = express.Router()


router.route('/send/message').post(protect , sendMessage)
router.route('/:chatid').post(protect , allMessages)

module.exports = router