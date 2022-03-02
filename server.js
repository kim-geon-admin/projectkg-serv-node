const express = require('express');
const app = express();
const connection = require('./mysql/connection');
const executeQueryBoard = require('./mysql/executeQueryBoard');


app.listen(3000,function(){
    console.log('listning 3000');

}); 

//app.use(express.static('public'));

app.get('/',function(request,response){
    response.send('home 입니다 2');
    executeQueryBoard.selectBoard(response);
});

app.get('/login',function(request,response){
    response.send('login 창 입니다'+request.query.id);
    //console.log(__dirname);
    //response.sendFile(__dirname+'/index.html');
});