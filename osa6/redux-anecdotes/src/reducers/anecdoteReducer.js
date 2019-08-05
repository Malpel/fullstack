import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'VOTE':
            const votedAnecdote = action.data
            return state.map(
                anecdote => anecdote.id !== votedAnecdote.id ?
                    anecdote
                    : votedAnecdote)

        case 'CREATE':
            return [...state, action.data]

        case 'INIT':
            return action.data

        default:
            return state
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT',
            data: anecdotes
        })
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'CREATE',
            data: newAnecdote
        })
    }
}

export const voteAnecdote = anecdote => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update(
            anecdote.id,
            {
                content: anecdote.content,
                votes: anecdote.votes + 1
            }
        )
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote
        })
    }
}

export default reducer