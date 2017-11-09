const router = require('express').Router()
const controller = require('./home.controller')
router.get('/internal', controller.internal)
router.get('/vedio', controller.vedio)
router.get('/notification', controller.notification)

module.exports = router