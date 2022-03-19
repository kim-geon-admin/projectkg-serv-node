const express = require('express');
const router = express.Router();
const executeQueryBoard = require('../mysql/executeQueryBoard');
const validateAuth = require('../middleware/auth/validateAuth');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* GET home page. */
router.get('/getContents',validateAuth.verifyToken ,function(req, res, next) {
 // res.render('index', { title: 'Express' });
 
  console.log('getContents js 수행 됩니다');
  executeQueryBoard.selectBoardData(req,res);
});

router.get('/getDetailContents',validateAuth.verifyToken ,function(req, res, next) {
  // res.render('index', { title: 'Express' });
  
   console.log('getDetailContents js 수행 됩니다');
   executeQueryBoard.selectDetailData(req,res);
 });

/* GET home page. */
router.post('/insertContents',validateAuth.verifyToken, function(req, res, next) {
  // res.render('index', { title: 'Express' });
  
   console.log('insertContents js 수행 됩니다');
   executeQueryBoard.insertBoardData(req,res);
 });

module.exports = router;