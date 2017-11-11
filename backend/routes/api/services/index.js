const router = require('express').Router()
const controller = require('./services.controller')
router.get('/list', controller.list)
router.get('/index', controller.index)
router.delete('/delete/:id', controller.delete)
router.put('/update', controller.update)
router.post('/uploadfile', controller.uploadfile)
router.post('/create', controller.create)

module.exports = router