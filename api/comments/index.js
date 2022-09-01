const router = require('express').Router()
const { addComments , getComments , editComments , deleteComments } = require('./comments')


router.post('/', addComments)
router.get('/:tweetId', getComments)
router.put('/:id', editComments)
router.delete('/:id', deleteComments)


module.exports = router