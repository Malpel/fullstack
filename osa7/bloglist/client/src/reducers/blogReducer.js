import blogService from '../services/blogs'
import commentService from '../services/comments'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_BLOG':
            return [...state, action.data]
        case 'LIKE_BLOG':
            return state.map(blog => blog.id !== action.data.id ?
                blog
                : action.data)
        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.data)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = blogObject => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: 'CREATE_BLOG',
            data: newBlog
        })
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        console.log('REDUCER', blog)
        const updatedBlog = await blogService.update(blog.id,
            {
                likes: blog.likes + 1,
                user: {
                    id: blog.user.id,
                    username: blog.user.username,
                    name: blog.user.name
                }
            }
        )
        console.log('UPDATEDBLOG', updatedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: updatedBlog
        })
    }
}

export const removeBlog = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export const addComment = comment => {
    return async dispatch => {
        const newComment = await commentService.saveComment(comment)
        dispatch({
            type: 'default',
            data: newComment
        })
    }
}

export default reducer