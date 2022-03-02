const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

console.log(__dirname);
//set static path
app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.json());
//vapid key 발급
//./node_modules/.bin/web-push generate-vapid-keys

//Public Key:
//BNDsYmOYxKRYvIEqgSLr_XsYMbEVfwTMCq3rcVZqRpdk5pG8-V-xXwJ-Pu9tIb-qZl-Z2lMQR5jz5J5jQPEIZc0

//Private Key:
//nyjaoQiAxKWV0vynG0bSGD8GFwupH8XOcxNvQlgE3UE
const publicVapidKey ='BNDsYmOYxKRYvIEqgSLr_XsYMbEVfwTMCq3rcVZqRpdk5pG8-V-xXwJ-Pu9tIb-qZl-Z2lMQR5jz5J5jQPEIZc0';
const privateVapidKey ='nyjaoQiAxKWV0vynG0bSGD8GFwupH8XOcxNvQlgE3UE';

webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);

// Subscribe route
app.post('/subscribe',(req,res)=>{
    console.log('post 실행');
    // get pushSubscription object
    const subscription = req.body;
    
    // Send 201 - resource created
    console.log(subscription);
    //send 201
    res.status(201).json({});

    //푸시알람의 제목을 설정
    const payload = JSON.stringify({title:'push test'});

    //알람 보내기
    webpush.sendNotification(subscription,payload).catch(err=>console.log(err));

});

const port = 3000;

app.listen(port,()=>console.log(`서버 실행중 ${port}`));