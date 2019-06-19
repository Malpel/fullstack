import React from 'react'


const Content = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
            {course.parts.map((part) => {
                return <Part key={part.id} part={part.name} exercises={part.exercises} />
            })
            }
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

const Total = ({ course }) => {
    return (
        <p key={course.name}>
            <b>Total of {
                course.parts.reduce(
                    (sum, part) => sum + part.exercises, 0)
            } exercises</b>
        </p>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => {
                return <div key={course.name}>
                    <Content course={course} />
                    <Total course={course} />
                </div>
            })}
        </div>

    )
}

export default Course