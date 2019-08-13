import React from 'react'
//import Blog from './Blog'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Segment } from 'semantic-ui-react'


const Blogs = (props) => {
    if (props.blogs[0]) {
        props.blogs[0].sort((a, b) => b.likes - a.likes)
        return (
            <div>
                <Header as='h2'>Blogs</Header>
                {props.blogForm()}
                <br />
                {props.blogs[0].map(blog =>
                    <Segment vertical key={blog.id} >
                        <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
                    </Segment>
                )}
            </div>
        )
    }
    return <div>
        nothing
    </div>
}

/* Blogs.propTypes = {
    user: PropTypes.string.isRequired
} */

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}


export default connect(mapStateToProps)(Blogs)