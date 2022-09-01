const Joi = require('joi')
const models = require('../../models')

const addComments = async (req, res, next) => {
    const t = models.sequelize.transaction()
    try {
        await models.comments.create({
            userId: req.body.userId,
            tweetId: req.body.tweetId,
            commentBody: req.body.commentBody
        })
        res.json({
            success: true
        })

    } catch (error) {
        next(error)
    }
}

const getComments = async (req, res, next) => {
    try {
        
        const data = await models.comments.findAll({
            where:{
                tweetId: req.params.tweetId
            },
            include: [
                {
                    model: models.tweets
                },
                {
                    model: models.User
                }
            ]

        })
        res.json(data)
    } catch (error) {
        next(error)
    }
}

const editComments = async (req, res, next) => {
    try {
        const data = {
            userId: req.body.userId,
            tweetId: req.body.tweetId,
            commentBody: req.body.commentBody
        }
        await models.comments.update(data, {
            where: {
                id: req.params.id
            }
        })
        res.json({
            success: true
        })

    } catch (error) {
        next(error)
    }
}

const deleteComments = async (req, res, next) => {
    try {
        await models.comments.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            success: true
        })
    } catch (error) {
        next(error)
    }

}

module.exports = {
    addComments,
    getComments,
    editComments,
    deleteComments
}