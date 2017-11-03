const router = require('express').Router()
const controller = require('./user.controller')

router.get('/list', controller.list)
// router.get('/list2/:pageSize', controller.list2)
// router.get('/in', controller.in)
router.post('/assign-admin/:username', controller.assignAdmin)

module.exports = router