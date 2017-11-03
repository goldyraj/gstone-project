const router = require('express').Router()
const controller = require('./notification.controller')
router.get('/list', controller.list)
router.get('/index', controller.index)
router.post('/create', controller.create)
router.delete('/delete/:id', controller.delete)
router.put('/update', controller.update)
module.exports = router