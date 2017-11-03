const router = require('express').Router()
const controller = require('./branch.controller')
router.get('/list', controller.list)
router.get('/index', controller.index)
router.post('/uploadfile', controller.uploadfile)
router.post('/create', controller.create)
router.put('/update', controller.update)
router.delete('/delete/:id', controller.delete)
module.exports = router