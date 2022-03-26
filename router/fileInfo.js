const express = require('express');
const router = express.Router();
const validateAuth = require('../middleware/auth/validateAuth');
const app = express();
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)

var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));




const storage = multer.diskStorage({
      destination : function(req,file,cb){
        cb(null,'../kg/public/img')
      },
      filename : function(req,file,cb){
        console.log(file);
        let array = file.originalname.split('.'); 
        array[0] = array[0] + '_'; 
        array[1] = '.' + array[1]; 
        array.splice(1, 0, Date.now().toString()); 
        const result = array.join('');

        cb(null,result)
        
        //cb(null,file.originalname)
      }

})

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          return cb(new Error('Invalid mime type'));
      }
  }
});

const uploadSingleImage = upload.single('userfile');

//const uploadSingleImage = multer({ storage: storage })

const readDir = function(req, res, next) {

  fs.readdir('../kg/public/img', function(err, filelist){  // 배열 형태로 출력

    const file = req.file;
    if(file != undefined ){
      res.status(200).send({
        filename: file.filename,
        mimetype: file.mimetype,
        originalname: file.originalname,
        size: file.size,
        fieldname: file.fieldname,
        fileList : filelist,
        isSuccess : 'success'
    })

    }else{
      res.status(200).send({
    
        fileList : filelist,
        isSuccess : 'success'
    })
    }
  
    //console.log(filelist);
   
  })

 }


 /* push img file */
router.get('/fileList',validateAuth.verifyToken,readDir);

/* push img file */
router.post('/fileUpload',validateAuth.verifyToken, function(req, res, next) {
  
   console.log('fileUpload js 수행 됩니다');

   uploadSingleImage(req, res, function (err) {
   
    if (err) {
        return res.status(400).send({ message: err.message })
    }

    // Everything went fine.
    /*
  
      */
     next();
  })

   /*
   let saveFilepath = path.join( __dirname,  "build", "/")  ;
   console.log(req.file);
   let file = req.files.file;
   let fileName = file.originalname;

   file.mv(saveFilepath+fileName, (err) => {
    if (err) {
      res.status(500).send({ message: "파일 전송 실패", code: 200 });
    }
    res.status(200).send({ message: "파일 전송 성공", code: 200 });
  });
 */
 },readDir);

module.exports = router;