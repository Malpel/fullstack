import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = JSON.parse(window.localStorage.getItem('loggedBlogListUser'))

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            window.localStorage.setItem(
                'loggedBlogListUser', JSON.stringify(action.data)
            )
            blogService.setToken(action.data.token)
            return action.data
        case 'SET_USER':
            return action.data
        default:
            return state
    }
}

export const login = credentials => {
    return async dispatch => {
        console.log(credentials)
        const user = await loginService.login(credentials)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const setUser = user => {
    return {
        type: 'SET_USER',
        data: user
    }
}

export default reducer