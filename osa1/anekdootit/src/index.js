import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Anecdote = (props) => {
    return (
        <div>
            <p>{props.text}</p>
            <p>{props.votes} votes</p>
        </div>

    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(6).fill(0))
    const random = () => Math.floor((Math.random() * 6))
    const mostVoted  = points.indexOf(Math.max(...points))
    console.log(mostVoted)

    const voteAnecdote = (n) => {
        const copy = [...points]
        copy[n] += 1
        setPoints(copy)
    }
    
    

    return (
        <div>
            <Header text="Anecdote of the day"/>
            <Anecdote text={props.anecdotes[selected]} votes={points[selected]} />
            <Button handleClick={() => voteAnecdote(selected)} text="vote"/>
            <Button handleClick={() => setSelected(random)} text="next anecdote" />  
            <Header text="Anecdote with most votes" />
            <Anecdote text={props.anecdotes[mostVoted]} votes={points[mostVoted]}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)