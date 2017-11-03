const router = require('express').Router()
const controller = require('./client.controller')
router.get('/list', controller.list)
router.post('/create', controller.create)
router.delete('/delete/:id', controller.delete)
router.put('/update', controller.update)
module.exports = router