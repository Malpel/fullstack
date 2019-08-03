import React from 'react'
import { connect } from 'react-redux'
import { showVoteNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const vote = (id, content) => {
        console.log('vote', id, content)
        props.showVoteNotification({
            data: {
                id: id,
                content: content
            }
        })
        setTimeout(() => {
            props.hideNotification()
        }, 5000)
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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
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
    showVoteNotification,
    hideNotification
}

const ConnectedAnecdotes = connect(
    mapeStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes