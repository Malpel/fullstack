import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Menu = (props) => {
    if (!props.loggedUser) {
        return null
    }

    const style = {
        padding: 5
    }

    return (
        <div>
            <Link to='/' style={style}>blogs</Link>
            <Link to='/users' style={style}>users</Link>
            {props.loggedUser.name} logged in <button onClick={props.logout}>logout</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(Menu)