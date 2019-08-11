import React from 'react'
//import Blog from './Blog'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Blogs = (props) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    if (props.blogs[0]) {
        props.blogs[0].sort((a,b) => b.likes - a.likes)
        return (
            <div>
                <br />
                {props.blogForm()}
                <br />
                {props.blogs[0].map(blog =>
                    <div key={blog.id} style={blogStyle}>
                        <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
                    </div>)}
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