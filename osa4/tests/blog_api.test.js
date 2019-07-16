const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when blogs initially exist in database', () => {
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

    test('blogs\' id fields are called id, not _id', async () => {
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

        const blogsAtEnd = await helper.blogsInDb()
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

        const allBlogs = await helper.blogsInDb()
        const latestBlog = allBlogs[allBlogs.length - 1]
        expect(latestBlog.likes).toBe(0)
    })

    test('blogs with missing required fields cannot be added', async () => {
        await api
            .post('/api/blogs')
            .send(helper.faultyBlog)
            .expect(400)

        const allBlogs = await helper.blogsInDb()
        expect(allBlogs.length).toBe(helper.initialBlogs.length)
    })

    test('blogs can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

        const contents = blogsAtEnd.map(r => r.title)
        expect(contents).not.toContain(blogToDelete.title)
    })

    test('blog\'s likes can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
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

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toBe(originalLikes + 1)

    })
})

describe('user creation (with initial users)', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const userObjects = helper.initialUsers
            .map(user => new User(user))
        const promiseArray = userObjects.map(user => user.save())
        await Promise.all(promiseArray)
    })

    test('fails with proper statuscode if username is too short', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = helper.usernameTooShort

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username should be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('fails with proper statuscode if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = helper.passwordTooShort

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password should be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('fails with proper statuscode if missing username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = helper.userMissingFields
        newUser.password = 'atleast3'

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })

    test('fails with proper statuscode if missing password', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = helper.userMissingFields
        newUser.username = 'atleast3'

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password should be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('fails if username already exists', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = helper.initialUsers[0]

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('succeeds with valid data', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = helper.validUser

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const users = usersAtEnd.map(u => u.username)
        expect(users).toContain(newUser.username)
    })
})


afterAll(() => {
    mongoose.connection.close()
})

