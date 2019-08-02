
const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VOTE':
            return `you voted '${action.data.content}'`
        case 'CREATE':
            return `created '${action.data}'`
        case 'HIDE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const showCreateNotification = stuff => {
    return {
        type: 'CREATE',
        data: stuff.data
    }
}

export const showVoteNotification = stuff => {
    return {
        type: 'VOTE',
        data: stuff.data
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default reducer