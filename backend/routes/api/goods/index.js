const router = require('express').Router()
const controller = require('./goods.controller')
router.get('/list', controller.list)
router.get('/index', controller.index)
router.delete('/delete/:id', controller.delete)
router.put('/update', controller.update)
router.post('/uploadfile', controller.uploadfile)

module.exports = router