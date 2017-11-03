const router = require('express').Router()
const controller = require('./dealer.controller')
//var fs = require('fs');
// var multer  = require('multer');
// var upload = multer({ dest: '/tmp/'});
router.get('/list', controller.list)
router.get('/index', controller.index)
router.post('/create', controller.create)
router.post('/uploadfile', controller.uploadfile)
router.delete('/delete/:id', controller.delete)

// router.post('/file_upload', upload.single('file'), function(req, res) {
//   var file = __dirname + '/' + req.file.filename;
//   fs.rename(req.file.path, file, function(err) {
//     if (err) {
//       console.log(err);
//       res.send(500);
//     } else {
//       res.json({
//         message: 'File uploaded successfully',
//         filename: req.file.filename
//       });
//     }
//   });
// });
module.exports = router