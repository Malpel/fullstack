const Blog = require('../models/blog')
const User = require('../models/user')

const testBlog = {
    title: 'In the Mouth of Madness',
    author: 'Sutter Cane',
    url: 'Hobb\'s End'
}

const faultyBlog = {
    author: 'Tester',
    likes: 13
}

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },

    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },

    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },

    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10
    },

    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    },

    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
    }
]

const initialUsers = [
    {
        username: 'generic_username',
        name: 'John Smith',
        password: 'password123'
    },

    {
        username: 'M_Nem',
        name: 'Maydup Nem',
        password: 'good_password'
    },

    {
        username: 'tester',
        name: 'Test Testerson',
        password: 'testpassword'
    }

]

const usernameTooShort = {
    username: '2s',
    name: 'Hugh Kers',
    password: 'secretwords'
}

const passwordTooShort = {
    username: 'long_enough',
    name: 'Hugh Kers',
    password: 's'
}

const userMissingFields = {
    username: '',
    name: 'Hugh Kers',
    password: ''
}

const validUser = {
    username: 'long_enough',
    name: 'Hugh Kers',
    password: 'secretwords'
}


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    testBlog,
    faultyBlog,
    initialBlogs,
    blogsInDb,
    initialUsers,
    usernameTooShort,
    passwordTooShort,
    userMissingFields,
    validUser,
    usersInDb
}