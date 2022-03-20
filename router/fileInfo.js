const express = require('express');
const router = express.Router();
const validateAuth = require('../middleware/auth/validateAuth');
const app = express();
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)


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
        cb(null,file.originalname)
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



/* GET home page. */
router.post('/fileUpload',validateAuth.verifyToken, function(req, res, next) {
  
   console.log('fileUpload js 수행 됩니다');

   uploadSingleImage(req, res, function (err) {

    if (err) {
        return res.status(400).send({ message: err.message })
    }

    // Everything went fine.
    const file = req.file;
      res.status(200).send({
          filename: file.filename,
          mimetype: file.mimetype,
          originalname: file.originalname,
          size: file.size,
          fieldname: file.fieldname
      })
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
 });

module.exports = router;