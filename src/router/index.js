const express = require('express')

const router = express.Router()

router.use('/test', require('../controllers/test'))
router.use('/createRequest', require('../controllers/createRequest'))

module.exports = router