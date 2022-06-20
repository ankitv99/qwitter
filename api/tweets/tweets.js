const Joi = require('joi')
const models = require('../../models')

const addTweet = async (req, res, next) => {
    const t = await models.sequelize.transaction();
    try {

        const foundUser = await models.User.findOne({
            where: { id: req.body.userId },
            transaction: t
        })
        if (!foundUser) {
            return res.json({
                success: false,
                message: 'User not found'
            })

        }


        await models.userBook.create({
            userName: foundUser.id,
            tweet: require.body.tweet

        }, { transaction: t })
        await t.commit()
        res.json({
            success: true

        })

    } catch (error) {
        await t.rollback()
        next(error)
    }

}

const getTweet = async (req, res, next) => {
    try {
        const data = await models.userTweet.findAll({
            include: [

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

module.exports = { addTweet, getTweet }




