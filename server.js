const express = require('express');
const app = express();

const cors = require('cors');
const middleRouter = require('./router/middleRouter');
const bodyParser = require('body-parser');

app.listen(8080,function(){
    console.log('listning 8080');

}); 
app.use(cors({
    origin: true,
    credentials: true
  })); 
app.use(bodyParser.json());
//app.use(express.static('public'));

app.use('/api',middleRouter);
/*
app.get('/api',function(request,response){
   // response.send('home 입니다 2');
  // response.header("Access-Control-Allow-Origin","*");
    executeQueryBoard.selectBoard(response);
});
*/   

/*
app.get('/login',function(request,response){
    response.send('login 창 입니다'+request.query.id);
    //console.log(__dirname);
    //response.sendFile(__dirname+'/index.html');
});
*/