const router = require('express').Router()
const userHandler = require('./users')
const tweetsHandler = require('./tweets')
const commentsHandler = require('./comments')

router.use('/users', userHandler)
router.use('/tweets', tweetsHandler)
router.use('/comments', commentsHandler)
module.exports = router