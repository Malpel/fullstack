const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/blogs/:id/comments', async (req, res, next) => {
    const token = req.token
    console.log('KRAPPA123', req.body)
    const comment = new Comment({
        content: req.body.comment
    })

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'missing or invalid token' })
        }

        const blog = Blog.findById(req.params.id)
        const postedComment = await comment.save(`blogs/${req.params.id}/comments`, comment)
        blog.comments = blog.comments.concat(postedComment._id)
        await blog.save()
        res.status(201).json(postedComment.toJSON())
    }
    catch (exception) {
        next(exception)
    }
})
