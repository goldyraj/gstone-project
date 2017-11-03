const router = require('express').Router()
const controller = require('./hsn.controller')
var fs = require('fs');
// var multer  = require('multer');
// var upload = multer({ dest: '/tmp/'});
router.get('/list', controller.list)
router.get('/index', controller.index)
router.post('/create', controller.create)
router.post('/uploadfile', controller.uploadfile)
router.delete('/delete/:id', controller.delete)
router.put('/update', controller.update)
module.exports = router