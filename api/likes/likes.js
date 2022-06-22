const models = require('../../models')

const likes = async (req, res, next) => {
    const t = models.sequelize.transaction()
    try {
        const tweet = await models.tweets.findOne({
            where: {
                id: req.body.tweetId
            }
        })
        tweet.set({
            likeCount: tweet.likeCount ? tweet.likeCount + 1 : 1
        })
        await tweet.save()
        res.json({
            success: true
        })
    } catch (error) {
        next(error)
    }
}

// validation
// check userId
// check tweetId
// check if the user has already liked
// transaction -> increment the likeCount
// transaction -> create a row in like table


module.exports = {
    likes
}