const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },

    author: String,

    url: {
        type: String,
        reqruired: true
    },

    likes: {
        type: Number,
        default: 0
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)