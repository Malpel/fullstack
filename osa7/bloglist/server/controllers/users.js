const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        const password = req.body.password

        if (!password || password.length < 3) {
            return res.status(400).json({
                error: 'password should be at least 3 characters long'
            }).end()
        } else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash
            })

            const savedUser = await user.save()
            res.status(201).json(savedUser.toJSON())
        }
    }
    catch (exception) {
        next(exception)
    }
})

usersRouter.delete('/:id', async (req, res, next) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        res.status(204).end()
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter