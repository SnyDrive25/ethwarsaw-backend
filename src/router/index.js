const express = require('express')

const router = express.Router()

router.use('/test', require('../controllers/test'))

module.exports = router