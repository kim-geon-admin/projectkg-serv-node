const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 // jwt.sign() 메소드: 토큰 발급

 exports.jwtToken = function (req, res, next) {
     console.log('ㅇㅇㅇㅇ',req.body.user_id);
     
     const id = req.body.user_id;
     
     try{
       const token = jwt.sign({
            id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h',
            issuer: '토큰발급자',
        });

         //request header에 토큰을 담아 리턴할 준비를 한다
        req.jwt_token = token;
        console.log('토큰이 정상 발급 되었습니다');
        next();
    }catch(error){
        console.log(err);
    }

    
 }
