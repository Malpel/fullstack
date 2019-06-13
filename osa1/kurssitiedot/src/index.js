import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Content = (props) => {
    const parts = props.course.parts

    return (
        <div>
            <Part part={parts[0].name} exercises={parts[0].exercises} />
            <Part part={parts[1].name} exercises={parts[1].exercises} />
            <Part part={parts[2].name} exercises={parts[2].exercises} />
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part}, {props.exercises}</p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>{props.course.parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
        </div>
    )
}

const App = () => {

    const course = {
        name: "Half Stack application development",

        parts: [
            {
                name: "Fundamentals of React",
                exercises: 7
            },
        
            {
                name: "Using props to pass data",
                exercises: 10
            },
        
            {
                name: "State of a component",
                exercises: 14
            }
        ]
    }
    

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} /> 
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
