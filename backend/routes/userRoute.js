const express  = require('express');
const { loginUser,registerUser , allUsers } = require('../controller/userController');
const protect = require('../middleware/auth');

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser)
router.route('/all/users').get(protect,allUsers)

module.exports = router