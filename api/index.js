const router = require('express').Router()
const userHandler = require('./users')
const tweetsHandler = require('./tweets')

router.use('/users', userHandler)
router.use('/tweets', tweetsHandler)

module.exports = router