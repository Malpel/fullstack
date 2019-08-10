import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const Users = (props) => {
    console.log('USERS ', props.users[0])
    if (props.users[0] === undefined) {
        return null
    }
    return (
        <div>
            <h2>Users</h2>
            {props.users[0].map(user => <div key={user.id}>
                <Link to={`users/${user.id}`}>{user.name}</Link> {user.blogs.length}
            </div>)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}


export default connect(mapStateToProps)(Users)