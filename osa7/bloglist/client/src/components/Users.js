import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
    console.log('USERS ', props.users[0])
    return (
        <div>
            {props.users[0].map(user => <div>
                {user.username} {user.blogs.length}
            </div>)}
            <h1>KRAPPA123</h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}


export default connect(mapStateToProps)(Users)