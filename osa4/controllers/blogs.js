const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs.map(blog => blog.toJSON()))
    console.log('GET successful')
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog) {
            res.json(blog.toJSON())
        } else {
            res.status(404).end()
        }
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body
    const token = req.token

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'missing or invalid token' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save(blog)
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.status(201).json(savedBlog.toJSON())
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const blog = {
        likes: req.body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updatedBlog.toJSON())
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {
    const token = req.token
    const blogToDelete = await Blog.findById(req.params.id)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token
            || !decodedToken.id
            || decodedToken.id !== blogToDelete.user.toString()) {
            return res.status(401).json({ error: 'missing or invalid token' })
        }

        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter