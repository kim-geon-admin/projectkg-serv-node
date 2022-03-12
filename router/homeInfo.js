const express = require('express');
const router = express.Router();
const executeQueryBoard = require('../mysql/executeQueryBoard');
const validateAuth = require('../middleware/auth/validateAuth');
const app = express();
const bodyParser = require('body-parser');
const cheerio = require("cheerio");
const axios = require("axios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getHtml = async () => {
    try {
      return await axios.get("https://news.imaeil.com/latest_article");
    } catch (error) {
      console.error(error);
    }
  };

/* GET home page. */
router.get('/getNews',validateAuth.verifyToken ,function(req, res, next) {
 
    getHtml()
    .then(html => {
        console.log('정상적으로 뉴스 데이터를 가져왔습니다');      
        let dataList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.wcms_bestnews_day ul").children("li");

        $bodyList.each(function(i, elem) {
            dataList[i] = {
               
                title: $(this).find('a').text(),
                url: 'https://news.imaeil.com'+ $(this).find('a').attr('href')
            };
          });

          res.send(dataList);
       // console.log($bodyList);
    })
    .catch (
        function(err) {
            res.send({
                msg : 'error'
            });
            console.log('getNews error : ', err); 
          }
    )
  console.log('getNews  수행 됩니다');
 
});



module.exports = router;