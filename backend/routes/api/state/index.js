const router = require('express').Router()
const controller = require('./state.controller')
router.get('/list', controller.list)
router.get('/index', controller.index)
router.post('/create', controller.create)
router.delete('/delete/:id', controller.delete)

module.exports = router