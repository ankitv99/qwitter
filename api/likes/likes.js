const models = require('../../models')

const likes = async (req, res, next) => {
    const t = models.sequelize.transaction()
    try {
        const tweet = await models.tweets.findOne({
            where: {
                id: req.body.tweetId
            }
        })
        const isAlreadyLikedByUser = await models.likes.findOne({
            where: {
                userId: req.body.userId,
                tweetId: req.body.tweetId
            }
        })
        if(isAlreadyLikedByUser){
            tweet.set({
                likeCount: tweet.likeCount - 1
            })
            await isAlreadyLikedByUser.destroy()
        } else {
            tweet.set({
                likeCount: tweet.likeCount ? tweet.likeCount + 1 : 1
            })
            await models.likes.create({
                userId: req.body.userId,
                tweetId: req.body.tweetId
            })
        }
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