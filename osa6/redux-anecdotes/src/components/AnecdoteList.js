import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const vote = (anecdote) => {
        console.log('vote', anecdote.id, anecdote.content)
        props.voteAnecdote(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 5)
        
    }

    return (
        <div>
            {props.anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase()
        .indexOf(filter.toLowerCase()) > -1)
        .sort((a, b) => b.votes - a.votes)

}

const mapeStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
        anecdotesToShow: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    setNotification,
    voteAnecdote
}

const ConnectedAnecdotes = connect(
    mapeStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes