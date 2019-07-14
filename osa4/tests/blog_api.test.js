const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs\' id field is called id, not _id', async () => {
    const res = await api.get('/api/blogs')
    console.log(res.body[0])
    expect(res.body[0].id).toBeDefined()
})

test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(helper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
    await api
        .post('/api/blogs')
        .send(helper.testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain('In the Mouth of Madness')

})

test('unset likes default to zero', async () => {
    await api
        .post('/api/blogs')
        .send(helper.testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.getAllBlogs()
    const latestBlog = allBlogs[allBlogs.length - 1]
    expect(latestBlog.likes).toBe(0)
})

test('blogs with missing required fields cannot be added', async () => {
    await api
        .post('/api/blogs')
        .send(helper.faultyBlog)
        .expect(400)

    const allBlogs = await helper.getAllBlogs()
    expect(allBlogs.length).toBe(helper.initialBlogs.length)
})

test('blogs can be deleted', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
})

test('blog\'s likes can be updated', async () => {
    const blogsAtStart = await helper.getAllBlogs()
    const blogToUpdate = blogsAtStart[0]
    const originalLikes = blogToUpdate.likes

    const updatedBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: (blogToUpdate.likes + 1)
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getAllBlogs()
    expect(blogsAtEnd[0].likes).toBe(originalLikes + 1)

})

afterAll(() => {
    mongoose.connection.close()
})

