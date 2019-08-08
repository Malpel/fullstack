const blogs = [
    {
        id: '5a451df7571c224a31b5c8ce',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: 'Malpel'
    },

    {
        id: '5a451e21e0b8b04a45638211',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: 'Malpel'
    },

    {
        id: '5a451e30b5ffd44a58fa79ab',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
        user: 'Malpel'
    },
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = () => {
    console.log('token set')
}

export default { getAll, setToken }