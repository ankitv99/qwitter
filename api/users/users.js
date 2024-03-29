const Joi = require('joi')
const models = require('../../models')
const bcrypt = require('bcrypt')


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

const login = async (req, res, next) => {
    try {
        const foundUser = await models.User.findOne({
            where: {
                userName: req.body.userName
            }
        })
        if (foundUser){
            const matched = await bcrypt.compare(req.body.password, foundUser.password)
                
            if (matched) {
                res.json({
                    success: true
                })
            }
                else {
                    res.json({
                        success: false
                    })
                }

        }
        else {
            res.json({
                message: "User Not Found"
            })
        }
        
       

    }

    catch (error) {
        next(error)

    }
}



module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser,
    login
}

