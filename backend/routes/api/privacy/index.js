const router = require('express').Router()
const controller = require('./privacy.controller')

router.post('/create', controller.create)
router.put('/update', controller.update)
router.get('/list', controller.list)
module.exports = router