const router = require('express').Router()
const controller = require('./vedio.controller')
//router.get('/list', controller.list)
router.delete('/delete/:id', controller.delete)
router.post('/create', controller.create)
router.get('/index', controller.index)

router.put('/update', controller.update)
module.exports = router