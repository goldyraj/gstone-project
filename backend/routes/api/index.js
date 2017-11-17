const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const state = require('./state')
const customer = require('./customer')
const hsn = require('./hsn')
const branch = require('./branch')
const goods = require('./goods')
const vendor = require('./vendor')
const client = require('./client')
const notification = require('./notification')
const dealer = require('./dealer')
const vedio = require('./vedio')
const faq = require('./faq')
const invoice = require('./invoice')
const privacy =require('./privacy')
const contact =require('./contact')
const internal =require('./internal')
const about =require('./about')
const home =require('./home')
const goodsuser =require('./goodsuser')
const services =require('./services')

//================ home page list API =============
router.use('/home', home)
//====================== End home page list API ================
router.use('/auth', auth)
// router.use('/about', authMiddleware)
router.use('/about/update', authMiddleware)
router.use('/about/create', authMiddleware)
router.use('/about', about)
router.use('/state/index', authMiddleware)
router.use('/state/create', authMiddleware)
router.use('/state/update', authMiddleware)
router.use('/state', state)
router.use('/services/index', authMiddleware)
router.use('/services/create', authMiddleware)
router.use('/services/uploadfile', authMiddleware)
router.use('/services/update', authMiddleware)
router.use('/services', services)
//router.use('/invoice', authMiddleware)
router.use('/invoice', invoice)
router.use('/contact/index', authMiddleware)
router.use('/contact', contact)
router.use('/user', authMiddleware)
router.use('/user', user)
router.use('/dealer', authMiddleware)
router.use('/dealer', dealer)
router.use('/privacy/create',authMiddleware)
router.use('/privacy/update',authMiddleware)
router.use('/privacy',privacy)
router.use('/internal/create',authMiddleware)
router.use('/internal/update',authMiddleware)
router.use('/internal/index',authMiddleware)
router.use('/internal',internal)
router.use('/customer/index', authMiddleware)
router.use('/customer/uploadfile', authMiddleware)
router.use('/customer/create', authMiddleware)
router.use('/customer/update', authMiddleware)
router.use('/customer', customer)
router.use('/hsn/create', authMiddleware)
router.use('/hsn/update', authMiddleware)
router.use('/hsn', hsn)
router.use('/branch/index', authMiddleware)
router.use('/branch/update', authMiddleware)
router.use('/branch/uploadfile', authMiddleware)
router.use('/branch/create', authMiddleware)
router.use('/branch', branch)
router.use('/goods/update', authMiddleware)
router.use('/goods/uploadfile', authMiddleware)
router.use('/goods/index', authMiddleware)
router.use('/goods/create', authMiddleware)
router.use('/goods', goods)
router.use('/goodsuser/create', authMiddleware)
router.use('/goodsuser/update', authMiddleware)
router.use('/goodsuser/list', authMiddleware)
router.use('/goodsuser/uploadfile', authMiddleware)
router.use('/goodsuser/index', authMiddleware)
router.use('/goodsuser', goodsuser)
router.use('/vendor/index', authMiddleware)
router.use('/vendor/create', authMiddleware)
router.use('/vendor/uploadfile', authMiddleware)
router.use('/vendor/update', authMiddleware)
router.use('/vendor', vendor)
router.use('/client/index', authMiddleware)
router.use('/client/create', authMiddleware)
router.use('/client/update', authMiddleware)
router.use('/client', client)
router.use('/notification/index', authMiddleware)
router.use('/notification/create', authMiddleware)
router.use('/notification/update', authMiddleware)
router.use('/notification', notification)
router.use('/vedio/index', authMiddleware)
router.use('/vedio/create', authMiddleware)
router.use('/vedio/update', authMiddleware)
router.use('/vedio', vedio)
router.use('/faq/update', authMiddleware)
router.use('/faq/create', authMiddleware)
router.use('/faq', faq)
module.exports = router