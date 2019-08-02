import React, { useState } from 'react'
import { showCreateNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
    const [newAnecdote, setNewAnecdote] = useState('')

    const handleAnecdoteChange = (event) => {
        setNewAnecdote(event.target.value)
    }

    const create = (event) => {
        event.preventDefault()
        console.log('create new')
        store.dispatch(showCreateNotification({
            type: 'CREATE',
            data: newAnecdote
        }))
        setTimeout(() => {
            store.dispatch(hideNotification())
        }, 5000)
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

