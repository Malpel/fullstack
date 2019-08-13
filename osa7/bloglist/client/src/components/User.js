import React from 'react'
import { Segment, Statistic } from 'semantic-ui-react'

const User = ({ user }) => {

    console.log('props in user view: ', user)
    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.username}</h2>
            <Segment compact>
                <Statistic size='mini'>
                    <Statistic.Value>
                        {user.blogs.length}
                    </Statistic.Value>
                    <Statistic.Label>
                        added blogs
                    </Statistic.Label>
                </Statistic>
            </Segment>


            {user.blogs.map(blog => <Segment vertical key={blog.id}>{blog.title}</Segment>)}

        </div >
    )
}

export default User