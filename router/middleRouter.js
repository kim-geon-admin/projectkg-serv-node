const express = require('express');
const router = express.Router();

//router info
const userInfo = require('./userInfo.js');
const boardInfo = require('./boardInfo.js');
const homeInfo = require('./homeInfo.js');
//const user = require('./user.js')

router.use('/user', userInfo);
router.use('/board', boardInfo);
router.use('/home', homeInfo);
//router.use('/user', user);

module.exports = router;