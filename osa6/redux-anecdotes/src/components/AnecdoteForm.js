import React, { useState } from 'react'
import { connect } from 'react-redux'
import { showCreateNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const [newAnecdote, setNewAnecdote] = useState('')

    const handleAnecdoteChange = (event) => {
        setNewAnecdote(event.target.value)
    }

    const create = (event) => {
        event.preventDefault()
        console.log('create new')
        props.showCreateNotification({
            type: 'CREATE',
            data: newAnecdote
        })
        setTimeout(() => {
            props.hideNotification()
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    showCreateNotification,
    hideNotification
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm

