const router = require('express').Router()
const { likes } = require('./likes')


router.post('/', likes)

module.exports = router