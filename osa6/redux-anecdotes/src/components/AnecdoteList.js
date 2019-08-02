import React from 'react'
import { showVoteNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState().anecdotes
        .sort((a, b) => b.votes - a.votes)

    const vote = (id, content) => {
        console.log('vote', id, content)
        //store.dispatch()
        store.dispatch(showVoteNotification({
            data: {
                id: id,
                content: content
            }
        }))
        setTimeout(() => {
            store.dispatch(hideNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList