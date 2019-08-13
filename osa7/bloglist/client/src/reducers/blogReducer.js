import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return [...state, action.data]
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

export const likeBlog = (id, blogObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id, blogObject)
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

export default reducer