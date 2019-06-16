import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => (<h1>{props.text}</h1>)

const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>)

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>

    )
}

const Statistics = (props) => {
    const all = props.values.reduce((acc, value) => acc + value)
    const average = (props.values[0] - props.values[2]) / all
    const positive = ((props.values[0] / all) * 100 + " %")

    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="good" value={props.values[0]} />
                    <Statistic text="neutral" value={props.values[1]} />
                    <Statistic text="bad" value={props.values[2]} />
                    <Statistic text="all" value={all} />
                    <Statistic text="average" value={average} />
                    <Statistic text="positive" value={positive} />
                </tbody>
            </table>
        </div>
    )

}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [feedbackGiven, setFeedbackGiven] = useState(false)

    let stats = <Statistics values={[good, neutral, bad]} />

    if (!feedbackGiven) {
        stats = <p>no feedback given</p>
    }

    return (
        <div>
            <Header text="give feedback" />
            <Button handleClick={() => { setGood(good + 1); setFeedbackGiven(true) }} text="good" />
            <Button handleClick={() => { setNeutral(neutral + 1); setFeedbackGiven(true) }} text="neutral" />
            <Button handleClick={() => { setBad(bad + 1); setFeedbackGiven(true) }} text="bad" />
            <Header text="statistics" />
            {stats}
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)