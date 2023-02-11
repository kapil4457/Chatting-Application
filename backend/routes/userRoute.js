const express  = require('express');
const { loginUser,registerUser } = require('../controller/userController');

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser)

module.exports = router