const { addTweet } = require('./tweets')
const { getTweet } = require('./tweets')


const router = require('express').Router()


router.post('/', addTweet)
router.get('/', getTweet)


module.exports = router