import React from 'react'
import Blog from './Blog'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Blogs = (props) => {
    if (props.blogs) {
        return (
            <div>
                {props.blogs.map(blog => <Blog key={blog.title}
                    blog={blog} user={props.loggedUser} />)}
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