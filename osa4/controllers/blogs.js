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

blogsRouter.post('/', async (req, res, next) => {
    try {
        const blog = new Blog(req.body)
        const savedBlog = await blog.save(blog)
        res.status(201).json(savedBlog.toJSON())
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter