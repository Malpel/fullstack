import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Button } from 'semantic-ui-react'

const NavMenu = (props) => {
    if (!props.loggedUser) {
        return null
    }

    const style = {
        padding: 5
    }

    return (
        <Menu borderless >
            <Menu.Item  >
                <Link to='/' style={style}>Blogs</Link>
            </Menu.Item >
            <Menu.Item >
                <Link to='/users' style={style} data-cy='usersMenuLink'>Users</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item data-cy='menu-username'>
                    <h4>{props.loggedUser.username}</h4>
                </Menu.Item>
                <Menu.Item >
                    <Button compact color='grey' onClick={props.logout}>Logout</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu >
    )
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(NavMenu)