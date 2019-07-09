const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
}

const mostBlogs = (blogs) => {
    const blogCounts = _.map(_.countBy(blogs, 'author'),
        (val, key) => ({ author: key, blogs: val }))

    return blogCounts.reduce((max, author) => (
        author.blogs > max.blogs
            ? author
            : max
    ))
}

const mostLikes = (blogs) => {
    const authorsLikes = _.map(_.groupBy(blogs, 'author'),
        (val, key) => ({ author: key, likes: _.map(val, 'likes') }))
    const summedLikes = authorsLikes.map(element => ({
        author: element.author,
        likes: element.likes.reduce((sum, like) => sum + like, 0)
    }))
    const mostLiked = summedLikes.reduce((max, al) => al.likes > max.likes ? al : max)
    return mostLiked
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}