import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Segment } from 'semantic-ui-react'


const Blogs = (props) => {
    if (!props.blogs) {
        return null
    }

    return (
        <div data-cy='bloglist'>
            <Header data-cy='header' as='h2'>Blogs</Header>
            {props.blogForm()}
            <br />
            {props.sortedBlogs.map(blog =>
                <Segment vertical key={blog.id} >
                    <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
                </Segment>
            )}
        </div>
    )

}

const sortedBlogs = ({ blogs }) => {
    if (!blogs) return []
    return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        sortedBlogs: sortedBlogs(state)
    }
}


export default connect(mapStateToProps)(Blogs)