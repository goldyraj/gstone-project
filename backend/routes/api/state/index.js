const router = require('express').Router()
const controller = require('./state.controller')
router.get('/list', controller.list)
router.get('/index', controller.index)
router.put('/update', controller.update)
router.post('/create', controller.create)
router.delete('/delete/:id', controller.delete)
router.post('/uploadfile', controller.uploadfile)
module.exports = router