const express = require('express');
const router = express.Router();
const executeQueryBoard = require('../mysql/executeQueryBoard');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* GET home page. */
router.get('/getContents', function(req, res, next) {
 // res.render('index', { title: 'Express' });
 
  console.log('getContents js 수행 됩니다');
  executeQueryBoard.selectBoardData(req,res);
});

module.exports = router;