const router = require('express').Router()
const controller = require('./user.controller')

router.get('/list', controller.list)
router.get('/index', controller.index)
router.get('/view', controller.view)
router.put('/update', controller.update)
router.put('/profileupdate', controller.profileupdate)

router.post('/assign-admin/:username', controller.assignAdmin)
router.post('/changepassword', controller.changepassword)
module.exports = router