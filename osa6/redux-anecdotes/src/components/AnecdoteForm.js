import React, { useState } from 'react'

const AnecdoteForm = ({ store }) => {
    const [newAnecdote, setNewAnecdote] = useState('')

    const handleAnecdoteChange = (event) => {
        setNewAnecdote(event.target.value)
    }

    const create = (event) => {
        event.preventDefault()
        console.log('create new')
        store.dispatch({
            type: 'CREATE',
            data: newAnecdote
        })
        setNewAnecdote('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div>
                    <input value={newAnecdote}
                        onChange={handleAnecdoteChange} /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm

