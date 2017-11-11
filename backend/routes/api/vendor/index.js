const router = require('express').Router()
const controller = require('./vendor.controller')
router.get('/list', controller.list)
router.get('/index', controller.index)
router.post('/create', controller.create)
router.put('/update', controller.update)
router.delete('/delete/:id', controller.delete)
router.post('/uploadfile', controller.uploadfile)
module.exports = router