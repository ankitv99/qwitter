const likesHandler = require('../likes')
const { addTweet } = require('./tweets')
const { getTweet } = require('./tweets')


const router = require('express').Router()


router.use('/likes', likesHandler)
router.post('/', addTweet)
router.get('/', getTweet)


module.exports = router