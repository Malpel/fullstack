const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return {
                message: action.message,
                type: action.notificationType
            }
        case 'HIDE_NOTIFICATION':
            return null
        default:
            return state
    }
}

let timeout = null

const delayDispatch = (dispatch) => {
    timeout = setTimeout(() => {
        dispatch(hideNotification())
    }, 5000)
}

export const setNotification = (message, notificationType) => {
    return dispatch => {
        clearTimeout(timeout)
        dispatch(notify(message, notificationType))
        delayDispatch(dispatch)
    }
}

export const notify = (message, notificationType) => {
    return {
        type: 'NOTIFY',
        message,
        notificationType
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default reducer