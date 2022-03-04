const express = require('express');
const router = express.Router();
const executeQueryUser = require('../mysql/executeQueryUser');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* GET home page. */
router.post('/userInfo', function(req, res, next) {
 // res.render('index', { title: 'Express' });
  console.log(req.body);
  executeQueryUser.selectUser(req,res);
  console.log('user js 수행 됩니다');
});

module.exports = router;