import React from 'react'

const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState()
        .sort((a, b) => b.votes - a.votes)


    const vote = (id) => {
        console.log('vote', id)
        store.dispatch({
            type: 'VOTE',
            data: id
        })
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList