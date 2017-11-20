const router = require('express').Router()
const controller = require('./invoice.controller')
router.get('/list', controller.list)
router.get('/view/:id', controller.view)
router.post('/create', controller.create)
router.get('/searchf', controller.searchf)
router.delete('/delete', controller.delete)
module.exports = router