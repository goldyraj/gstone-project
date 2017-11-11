const router = require('express').Router()
//var multer = require('multer'); 
const controller = require('./branch.controller')
//var uploads = multer({dest: '../../uploads'});
router.get('/list', controller.list)
router.get('/index', controller.index)
router.post('/uploadfile', controller.uploadfile)
router.post('/create', controller.create)
router.post('/apipost', controller.apipost)
// router.post('/apipost', uploads.single('profileimg'), function(req, res, next) {

//    // ...
//    console.log(req.file);
//    if (req.profileimg) {
//      console.log('Profile image uploaded');
//    }
// });
router.put('/update', controller.update)
router.delete('/delete/:id', controller.delete)
module.exports = router