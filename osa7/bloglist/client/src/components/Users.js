import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = (props) => {
    console.log('USERS ', props.users)
    if (props.users === undefined) {
        return null
    }
    return (
        <div>
            <h2>Users</h2>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Added blogs</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.users.map(user =>
                        <Table.Row key={user.id}>
                            <Table.Cell>
                                <Link to={`users/${user.id}`}>{user.username}</Link>
                            </Table.Cell>
                            <Table.Cell>
                                {user.blogs.length}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}


export default connect(mapStateToProps)(Users)