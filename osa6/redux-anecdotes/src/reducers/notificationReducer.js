const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return action.message
        case 'HIDE_NOTIFICATION':
            return null
        default:
            return state
    }
}

let timeout = null

const delayDispatch = (dispatch, seconds) => {
    timeout = setTimeout(() => {
        dispatch(hideNotification())
    }, seconds * 1000)
}

export const setNotification = (message, seconds) => {
    return dispatch => {
        clearTimeout(timeout)
        dispatch(notify(message))
        delayDispatch(dispatch, seconds)
    }
}

export const notify = message => {
    return {
        type: 'NOTIFY',
        message
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default reducer