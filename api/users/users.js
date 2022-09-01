const Joi = require('joi')
const models = require('../../models')


const addUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            firstName: Joi.string().min(2).required(),
            lastName: Joi.string().min(2).required(),
            email: Joi.string().email().min(2).required(),
            userName: Joi.string().min(2).required(),
            password: Joi.string().min(6).max(20).required()
        })
        await schema.validateAsync(req.body)

        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password
        }
        await models.User.create(data)
        res.json({
            success: true
        })
    }
    catch (error) {
        next(error)
    }

}

const getUser = async (req, res, next) => {
    try {
        const result = await models.User.findAll({ order: [['id', 'ASC']] })
        res.json({
            result
        })
    }
    catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const schema = Joi.object({

            firstName: Joi.string().min(2).required(),
            lastName: Joi.string().min(2).required(),
            email: Joi.string().email().min(2).required(),
            userName: Joi.string().min(2).required(),
        })
        await schema.validateAsync(req.body)
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName
        }

        await models.User.update(data, {
            where: {
                id: req.params.id
            }
        })
        res.json({
            result
        })

    }
    catch (error) {
        next(error)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        await models.User.destroy({
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


// Login

// username, password from postman
// search user via username
// bcrypt compare, (foundUser.password, req.body.password)

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser
}

