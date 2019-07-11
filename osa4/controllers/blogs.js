const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        res.json(blogs)
        console.log('GET successful')
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter