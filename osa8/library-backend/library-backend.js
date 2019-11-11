const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const Genre = require('./models/genre')

mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)

const password = process.argv[2]

const MONGODB_URI = `mongodb+srv://malpel:${password}@fullstack-vaslr.mongodb.net/graphql?retryWrites=true&w=majority`

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Genre {
        name: String!
        id: ID!
    }
    
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
        allGenres: [Genre!]!
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]
        ) : Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ) : Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
        addGenre(
            name: String!
        ): Genre
    }
`
const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const books = await Book.find({}).populate('author')
            if (args.genre) {
                return books.filter(b => b.genres.includes(args.genre))
            }
            return books
        },
        allAuthors: async () => await Author.find({}).populate('books'),
        me: (root, args, context) => {
            return context.currentUser
        },
        allGenres: async () => await Genre.find({})
    },
    Book: {
        title: (root) => root.title,
        published: (root) => root.published,
        author: (root) => root.author,
        genres: (root) => root.genres,
        id: (root) => root.id
    },
    Author: {
        name: (root) => root.name,
        born: (root) => root.born,
        bookCount: (root) => root.books.length,
        id: (root) => root.id,
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            let book = {}
            let author = {}
            
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const existingAuthor = await Author.findOne({ name: args.author })

            if (existingAuthor) {
                author = existingAuthor
                book = new Book({ ...args, author: existingAuthor.id })

                author.books = author.books.concat(book)
            } else {
                author = new Author({ name: args.author })
                await author.save()
                book = new Book({ ...args, author: author.id })
                author.books = author.books.concat(book)
            }

            for (let i = 0; i < args.genres.length; i++) {
                let genre = args.genres[i]
                let existingGenre = await Genre.findOne({ name: genre })
                if (!existingGenre) {
                    let newGenre = new Genre({ name: genre })
                    newGenre.save()
                }
            }

            try {
                await book.save()
                await author.save()
            } catch (error) {
                if (!existingAuthor) {
                    author.delete()
                }

                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            return book
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const author = await Author.findOne({ name: args.name })

            try {
                await author.updateOne({ born: args.setBornTo })
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            return author
        },
        createUser: (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message,
                        { invalidArgs: args })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})