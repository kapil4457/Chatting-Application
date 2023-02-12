const express = require("express");
const router = express.Router();

const {accessChat , fetchChats  , createGroup } = require('../controller/chatController.js');
const protect = require("../middleware/auth.js");


router.route('/accessChat').post(protect , accessChat)
router.route('/fetchChats').get(protect , fetchChats)
router.route('/group').post(protect , createGroup)
// router.route('/group/rename').put(protect , renameGroup)
// router.route('/group/remove').put(protect , removeFromGroup)
// router.route('/group/add').put(protect , AddToGroup)



module.exports = router;