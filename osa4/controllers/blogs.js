const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        res.json(blogs.map(blog => blog.toJSON()))
        console.log('GET successful')
    }
    catch (exception) {
        next(exception)
    }
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
    const blog = new Blog(req.body)

    try {
        const savedBlog = await blog.save(blog)
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
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter